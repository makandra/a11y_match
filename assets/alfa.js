// Build with  esbuild js/alfa.js  --bundle --minify --sourcemap --outfile=js/build/alfa.js --format=esm

import { Audit, Outcome } from "@siteimprove/alfa-act"
import { Node } from "@siteimprove/alfa-dom"
import * as dom from "@siteimprove/alfa-dom/native"
import { Device } from "@siteimprove/alfa-device"
import { Page } from "@siteimprove/alfa-web"
import { None } from "@siteimprove/alfa-option"
import { Future } from "@siteimprove/alfa-future"
import { Request, Response } from "@siteimprove/alfa-http"
import rules, { ARIA, BestPractice } from "@siteimprove/alfa-rules"
import { Conformance, Criterion, Technique } from "@siteimprove/alfa-wcag"
import { Refinement } from "@siteimprove/alfa-refinement"
const { and, or } = Refinement
import { URL as alfaURL } from "@siteimprove/alfa-url"

async function startAudit(auditOptions) {
  const isNotCriterion = (rule) => !rule.hasRequirement(Criterion.isCriterion)
  const wcagRuleKeywords = {
    wcag_a: Conformance.isA,
    wcag_aa: Conformance.isAA,
    wcag_aaa: Conformance.isAAA,
  }
  const otherRuleKeywords = {
    techniques: Technique.isTechnique,
    best_practices: BestPractice.isBestPractice,
    aria: ARIA.isARIA,
  }

  // Parse the included Rules array
  const { wcagLevel, otherRequirementTypes, includedRules, miscRules } =
    auditOptions["included_rules"].reduce(
      (intermediateValue, currentRule) => {
        const wcagConformance = wcagRuleKeywords[currentRule]
        if (wcagConformance) intermediateValue.wcagLevel = wcagConformance
        else if (currentRule === "misc_rules")
          intermediateValue.miscRules = true
        else {
          const otherRequirementType = otherRuleKeywords[currentRule]
          if (otherRequirementType)
            intermediateValue.otherRequirementTypes.push(otherRequirementType)
          else includedRules.push(currentRule)
        }
        return intermediateValue
      },
      {
        wcagLevel: undefined,
        miscRules: false,
        otherRequirementTypes: [],
        includedRules: [],
      }
    )
  const excludedRules = auditOptions["excluded_rules"]

  const filteredRules = rules.filter((rule) => {
    const ruleId = rule.uri.split("/").pop()

    // Check if rule is included explicitly
    if (includedRules.includes(ruleId)) return true

    // Check if rule is excluded explicitly
    if (excludedRules.includes(ruleId)) return false

    // Check if rule is a WCAG criterion of the specified level
    if (wcagLevel && rule.hasRequirement(and(Criterion.isCriterion, wcagLevel)))
      return true
    // Check if rule is of other types as specified
    else if (
      isNotCriterion(rule) &&
      rule.hasRequirement(or(...otherRequirementTypes))
    )
      return true
    // Check if rule is without any requirements
    else if (miscRules && rule.requirements.length === 0) return true
  })

  // Parse Document into the correct structure (see https://github.com/Siteimprove/alfa/discussions/1254)
  const alfaDocument = Node.from(await dom.Native.fromNode(window.document))
  // const oracleQuestions = []
  // const oracle = (answers, t, url, used, page) => {
  //   debugger
  //   oracleQuestions.push({ answers, t, url, used, page })
  //   return Future.now(None)
  // }
  const input = Page.of(
    Request.empty(),
    Response.of(alfaURL.parse(window.location.href).getUnsafe(), 200),
    alfaDocument,
    Device.standard()
  )
  const outcomes = [
    ...(await Audit.of(input, filteredRules).evaluate()),
  ]
  // template: https://github.com/Siteimprove/alfa-integrations/blob/main/packages/alfa-formatter-earl/src/earl.ts#L22
  // const earlSubject = input.toEARL()
  // const earlRules = [...rules].map(rule => rule.toEARL())

  const earlAssertions = [
    ...outcomes
      .filter(Outcome.isFailed, Outcome.isCantTell)
      .map((outcome) => outcome.toEARL()),
  ]
  const result = earlAssertions.reduce(
    (intermediateResult, assertion) => {
      const outcome = assertion["earl:result"]["earl:outcome"]["@id"]
      const key =
        assertion["earl:test"]["@id"] +
        assertion["earl:result"]["earl:info"] +
        assertion["earl:result"]["earl:outcome"]["@id"] +
        outcome
      const newPointers = [
        assertion["earl:result"]["earl:pointer"]["ptr:expression"] ??
          assertion["earl:result"]["earl:pointer"]["ptr:groupPointer"][
            "@list"
          ].map((pointer) => pointer["ptr:expression"]),
      ].flat()
      if (key in intermediateResult[outcome]) {
        intermediateResult[outcome][key]["occurences"].push(...newPointers)
      } else {
        intermediateResult[outcome][key] = {
          url: assertion["earl:test"]["@id"],
          ruleId: new URL(assertion["earl:test"]["@id"]).pathname
            .split("/")
            .pop(),
          info: assertion["earl:result"]["earl:info"].replace(/\s{2,}/g, " "),
          outcome: assertion["earl:result"]["earl:outcome"]["@id"],
          occurences: newPointers,
        }
      }
      return intermediateResult
    },
    { "earl:failed": {}, "earl:cantTell": {} }
  )

  return {
    errors: Object.values(result["earl:failed"]),
    warnings: Object.values(result["earl:cantTell"]),
  }
}

window.alfa = {
  startAudit,
}
