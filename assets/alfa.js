// Build with  esbuild js/alfa.js  --bundle --minify --sourcemap --outfile=js/build/alfa.js --format=esm

import { Audit, Outcome } from '@siteimprove/alfa-act'
import { Node } from '@siteimprove/alfa-dom'
import * as dom from "@siteimprove/alfa-dom/native";
import { Device } from '@siteimprove/alfa-device'
import { Page } from '@siteimprove/alfa-web'
import { None } from '@siteimprove/alfa-option'
import { Future } from '@siteimprove/alfa-future'
import { Request, Response } from '@siteimprove/alfa-http'
import rules from '@siteimprove/alfa-rules'
import earl from '@siteimprove/alfa-formatter-earl'

const startAudit = async () => {
  // Parse Document into the correct structure (see https://github.com/Siteimprove/alfa/discussions/1254)
  const alfaDocument = Node.from(await dom.Native.fromNode(window.document))
  const oracleQuestions = []
  const oracle = (answers, t, url, used, page) => {
    oracleQuestions.push({ answers, t, url, used, page })
    return Future.now(None)
  }
  const input = Page.of(Request.empty(), Response.of(window.location.href,200), alfaDocument, Device.standard())
  const outcomes = [...await Audit.of(input, rules, oracle).evaluate()]
  // console.log(`${outcomes} outcomes`)
  const earlOutput = [...outcomes.map(outcome => outcome.toEARL())]
  // console.log(`${earl} earl`)
  const earlFormatter = earl()
  const realEarl = await earlFormatter(input, rules, outcomes)

  // Inspired by https://github.com/Siteimprove/alfa/blob/db3bbff5fa0f7d140859bc32e95d899cef39622e/packages/alfa-cli/bin/alfa/command/audit/run.ts#L91-L108
  // TODO don't iterate over it 3 times
  const passedOutcomes = outcomes.filter(outcome => Outcome.isPassed(outcome))
  const failedOutcomes = outcomes.filter(outcome => Outcome.isFailed(outcome))
  const failedOutcomesEarl = await earlFormatter(input, rules, failedOutcomes)
  const limitiedfailedOutcomesEarl = await earlFormatter(input, failedOutcomes.map(o => o.rule), failedOutcomes)
  const cantTellOutcomes = outcomes.filter(outcome => Outcome.isCantTell(outcome))

  const inapplicableOutcomes = outcomes.filter(outcome => Outcome.isInapplicable(outcome))
  debugger
  oracleQuestions.forEach(q => {
    const match = cantTellOutcomes.find(outcome => outcome.target === q.t.subject && outcome.rule === q.answers)
    if (match) {
      match.question = q
    }
  })

  return {
    outcomes,
    passedOutcomes,
    failedOutcomes,
    inapplicableOutcomes,
    cantTellOutcomes,
    earlOutput,
    realEarl,
  }
}

const startRubyAudit = async () => {
  const parseOutcomeResult = outcome => {
    const sarif = outcome.toSARIF()
    return {
      kind: sarif.kind,
      level: sarif.level,
      path: outcome.target?.path?.(), // TODO this is not defined for all outcomes
      message: sarif.message.text,
      ruleId: sarif.ruleId,
    }

  }
  const res = await startAudit()
  const failedOutcomes = res.failedOutcomes.map(parseOutcomeResult)
  const cantTellOutcomes = res.cantTellOutcomes.map(outcome => {
    const res = parseOutcomeResult(outcome)
    // The PR https://github.com/Siteimprove/alfa/pull/1027 says that this message should be in the diagnostics
    // It isn't though, maybe for some of the rules or in semiAutomatic mode
    res.message = outcome?.question.t.message ?? res.message
    return res
  })
  return {
    passed: res.failedOutcomes.length === 0 && res.cantTellOutcomes.length === 0,
    failures: failedOutcomes,
    warnings: cantTellOutcomes,
  }
}
window.alfa = {
  startRubyAudit, startAudit
}
