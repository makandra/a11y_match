import "@qualweb/qw-page"
import { WCAGTechniques } from "@qualweb/wcag-techniques"
import { ACTRules } from "@qualweb/act-rules"
import { BestPractices } from "@qualweb/best-practices"
import {
  generateEARLAssertions,
  generateEARLReport,
} from "@qualweb/earl-reporter"

const en = require("@qualweb/locale/dist/locales/en.json")

function getEvaluator() {
  return {
    name: "QualWeb",
    description:
      "QualWeb is an automatic accessibility evaluator for webpages.",
    version: "3.0.0",
    homepage: "http://www.qualweb.di.fc.ul.pt/",
    date: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
    url: {
      inputUrl: document.URL,
      completeUrl: document.URL,
    },
  }
}

async function startAudit(auditOptions) {
  return new Promise((resolve) => {
    const wcagRuleKeywords = {
      wcag_a: ["A"],
      wcag_aa: ["A", "AA"],
      wcag_aaa: ["A", "AA", "AAA"],
    }
    //ACT Rule Ids are either the ACT Rule hash made up of 5 characters or a QW-ACT-XX Id
    const isActRule = (rule) => rule.startsWith("QW-ACT-") || rule.length === 6
    // WCAG Rule IDs are either the W3C's technique ID which starts with Capital letters and ends with a number,
    // Or a QW-WCAG-XX ID
    const isWcagRule = (rule) => rule.startsWith("QW-WCAG-") || /^[A-Z]+[0-9]+$/

    const isBestPracticeRule = (rule) => rule.startsWith("QW-BP-")

    const {
      wcagLevels,
      includedWcagRules,
      includedActRules,
      includedBestPracticeRules,
      bestPracticesEnabled,
    } = auditOptions["included_rules"].reduce(
      (intermediateValue, currentRule) => {
        const wcagConformance = wcagRuleKeywords[currentRule]
        if (wcagConformance) intermediateValue.wcagLevels = wcagConformance
        else if (currentRule === "best_practices")
          intermediateValue.bestPracticesEnabled = true
        else if (isWcagRule(currentRule))
          intermediateValue.includedWcagRules.push(currentRule)
        else if (isActRule(currentRule))
          intermediateValue.includedActRules.push(currentRule)
        else if (isBestPracticeRule(currentRule))
          intermediateValue.includedBestPracticeRules.push(currentRule)
        return intermediateValue
      },
      {
        wcagLevels: [],
        includedWcagRules: [],
        includedActRules: [],
        includedBestPracticeRules: [],
        bestPracticesEnabled: false,
      }
    )

    const { excludedActRules, excludedWcagRules, excludedBestPracticeRules } =
      auditOptions["excluded_rules"].reduce(
        (intermediateValue, currentRule) => {
          if (isActRule(currentRule))
            intermediateValue.excludedActRules.push(currentRule)
          else if (isWcagRule(currentRule))
            intermediateValue.excludedWcagRules.push(currentRule)
          else if (isBestPracticeRule(currentRule))
            intermediateValue.excludedBestPracticeRules.push(currentRule)
        },
        {
          excludedActRules: [],
          excludedWcagRules: [],
          excludedBestPracticeRules: [],
        }
      )

    // Execute WCAG rules
    const wcagOptions = {
      levels: wcagLevels,
      techniques: includedWcagRules,
      exclude: excludedWcagRules,
    }
    window.wcag.configure(wcagOptions)
    const wcagResult = window.wcag.execute()

    // Execute ACT Rules
    const actOptions = {
      levels: wcagLevels,
      rules: includedActRules,
      exclude: excludedActRules,
    }
    window.act.configure(actOptions)
    window.act.executeAtomicRules()
    window.act.executeCompositeRules()
    const actResult = window.act.getReport()

    const bestPracticesOptions = {
      exclude: excludedBestPracticeRules,
    }
    // Setting the rules to empty array will disable all best practices rules
    if (!bestPracticesEnabled)
      bestPracticesOptions["bestPractices"] = includedBestPracticeRules

    window.bestPractices.configure(bestPracticesOptions)
    const bestPracticeResult = window.bestPractices.execute()

    // generate Results in EARL format
    const ruleIds = [
      ...Object.keys(actResult.assertions),
      ...Object.keys(wcagResult.assertions),
      ...Object.keys(bestPracticeResult.assertions),
    ]

    const earlAssertions = [
      ...qualweb.generateEARLAssertions(actResult),
      ...qualweb.generateEARLAssertions(wcagResult),
      ...qualweb.generateEARLAssertions(bestPracticeResult),
    ].map((assertion, index) => [ruleIds[index], assertion])

    // Parse Results
    const result = earlAssertions
      .filter(([_, assertion]) =>
        ["earl:failed", "earl:cantTell"].some(
          (outcome) => outcome === assertion["result"]["outcome"]
        )
      )
      .map(([ruleId, assertion]) => {
        return {
          url: assertion["test"]["@id"], // "info": assertion["test"]["description"] + assertion["result"]["description"],
          ruleId: ruleId,
          info: assertion["result"]["description"],
          outcome: assertion["result"]["outcome"],
          occurences: assertion["result"]["source"]
            // TODO if I encounter a different outcome here, it should be split out instead of just filtered
            .filter(
              (occurence) =>
                assertion["result"]["outcome"] ===
                occurence["result"]["outcome"]
            )
            //.filter(occurence => ["earl:failed", "earl:cantTell"].some(outcome => outcome ===occurence["result"]["outcome"]))
            .map((occurence) => occurence["result"]["pointer"]),
        }
      })
      .reduce(
        (intermediateResult, currentValue) => {
          intermediateResult[currentValue["outcome"]].push(currentValue)
          return intermediateResult
        },
        { "earl:failed": [], "earl:cantTell": [] }
      )
    resolve({
      errors: result["earl:failed"],
      warnings: result["earl:cantTell"],
    })
  })
}

window.wcag = new WCAGTechniques({ translate: en })
window.act = new ACTRules({ translate: en })
window.bestPractices = new BestPractices({ translate: en })

window.qualweb = {
  startAudit,
  generateEARLAssertions,
  generateEARLReport,
}
