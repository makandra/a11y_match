// Build with  esbuild js/alfa.js  --bundle --minify --sourcemap --outfile=js/build/alfa.js --format=esm

import {Audit, Outcome} from '@siteimprove/alfa-act'
import {Node} from '@siteimprove/alfa-dom'
import * as dom from "@siteimprove/alfa-dom/native";
import {Device} from '@siteimprove/alfa-device'
import {Page} from '@siteimprove/alfa-web'
import {None} from '@siteimprove/alfa-option'
import {Future} from '@siteimprove/alfa-future'
import {Request, Response} from '@siteimprove/alfa-http'
import rules from '@siteimprove/alfa-rules'
// import earl from '@siteimprove/alfa-earl'

const startAudit = async () => {
    // Parse Document into the correct structure (see https://github.com/Siteimprove/alfa/discussions/1254)
    const alfaDocument = Node.from(await dom.Native.fromNode(window.document))
    const oracleQuestions = []
    const oracle = (answers, t, url, used, page) => {
        oracleQuestions.push({answers, t, url, used, page})
        return Future.now(None)
    }
    const input = Page.of(Request.empty(), Response.of(window.location.href, 200), alfaDocument, Device.standard())
    const outcomes = [...await Audit.of(input, rules, oracle).evaluate()]
    // template: https://github.com/Siteimprove/alfa-integrations/blob/main/packages/alfa-formatter-earl/src/earl.ts#L22
    const earlSubject = input.toEARL()
    // const earlRules = [...rules].map(rule => rule.toEARL())

    const earlAssertions = [...outcomes.filter(Outcome.isFailed, Outcome.isCantTell).map(outcome => outcome.toEARL())]
    const result = earlAssertions.reduce((intermediateResult, assertion) => {
        const outcome = assertion["earl:result"]["earl:outcome"]["@id"]
        const key = assertion["earl:test"]["@id"] + assertion["earl:result"]["earl:info"] + assertion["earl:result"]["earl:outcome"]["@id"] + outcome
        const newPointers = [
            assertion["earl:result"]["earl:pointer"]["ptr:expression"] ??
            assertion["earl:result"]["earl:pointer"]["ptr:groupPointer"]["@list"].map(pointer => pointer["ptr:expression"])
        ].flat()
        if (key in intermediateResult[outcome]) {
            intermediateResult[outcome][key]["occurences"].push(...newPointers)
        } else {
            intermediateResult[outcome][key] = {
                "url": assertion["earl:test"]["@id"],
                "info": assertion["earl:result"]["earl:info"].replace(/\s{2,}/g, ' '),
                "outcome": assertion["earl:result"]["earl:outcome"]["@id"],
                "occurences": newPointers
            }
        }
        return intermediateResult
    }, {"earl:failed": {}, "earl:cantTell": {}});

    // Inspired by https://github.com/Siteimprove/alfa/blob/db3bbff5fa0f7d140859bc32e95d899cef39622e/packages/alfa-cli/bin/alfa/command/audit/run.ts#L91-L108
    // const passedOutcomes = outcomes.filter(outcome => Outcome.isPassed(outcome))
    // const failedOutcomes = outcomes.filter(outcome => Outcome.isFailed(outcome))
    // const failedOutcomesEarl = await earlFormatter(input, rules, failedOutcomes)
    // const limitiedfailedOutcomesEarl = await earlFormatter(input, failedOutcomes.map(o => o.rule), failedOutcomes)
    // const cantTellOutcomes = outcomes.filter(outcome => Outcome.isCantTell(outcome))

    // const inapplicableOutcomes = outcomes.filter(outcome => Outcome.isInapplicable(outcome))

    // TODO macht das Oracle eigentlich irgendwas?
    // oracleQuestions.forEach(q => {
    //     const match = cantTellOutcomes.find(outcome => outcome.target === q.t.subject && outcome.rule === q.answers)
    //     if (match) {
    //         match.question = q
    //     }
    // })

    // const parsedResults = outcomes.reduce((intermediateResult, outcome) => {
    //         if (Outcome.isPassed(outcome))
    //             intermediateResult["passed"].push(outcome);
    //         else if (Outcome.isFailed(outcome))
    //             intermediateResult["failed"].push(outcome)
    //         else if (Outcome.isInapplicable(outcome))
    //             intermediateResult["inapplicable"].push(outcome);
    //         else if (Outcome.isCantTell(outcome))
    //             intermediateResult["cantTell"].push(outcome);
    //         else
    //             console.error(`outcome unknown: ${outcome}`)
    //         return intermediateResult
    //     },
    //     {
    //         passed: [],
    //         inapplicable: [],
    //         cantTell: [],
    //         failed: [],
    //     }
    // )
    // const parseOutcomeResult = outcome => {
    //   const sarif = outcome.toSARIF()
    //   return {
    //     kind: sarif.kind,
    //     level: sarif.level,
    //     path: outcome.target?.path?.(), // TODO this is not defined for all outcomes
    //     message: sarif.message.text,
    //     ruleId: sarif.ruleId,
    //   }

    // }
    // const failedOutcomes = res.failedOutcomes.map(parseOutcomeResult)
    // const cantTellOutcomes = res.cantTellOutcomes.map(outcome => {
    //   const res = parseOutcomeResult(outcome)
    //   // The PR https://github.com/Siteimprove/alfa/pull/1027 says that this message should be in the diagnostics
    //   // It isn't though, maybe for some of the rules or in semiAutomatic mode
    //   res.message = outcome?.question.t.message ?? res.message
    //   return res
    // })
    return {
        passed: result["earl:failed"].length === 0,
        errors: Object.values(result["earl:failed"]),
        warnings: Object.values(result["earl:cantTell"])
    }
}

window.alfa = {
    startAudit
}

// function filter_aggregate(assertions) {
//     // Filter for only cantTell and failed
//     function isInteresting(assertion) {
//         const testResult = assertion["result"] ?? assertion["earl:result"]
//         const outcome = testResult["outcome"] ?? testResult["earl:outcome"]
//         const outcomeResult = (typeof outcome === 'string' ? outcome : outcome["@id"])
//         return ["earl:failed", "earl:cantTellnono"].some(match => match === outcomeResult)
//     }
//
//     const groupAssertions = assertions.reduce((intermediateResult, assertion) => {
//         if (!isInteresting(assertion))
//             return intermediateResult;
//         const testResult = assertion["result"] ?? assertion["earl:result"]
//         const errorMessage = testResult["earl:info"] ?? testResult["info"] ?? testResult["description"]
//         const key = (assertion["earl:test"] ?? assertion["test"])["@id"]// + errorMessage
//
//     }, {})
//
//     // const filteredAssertions = assertions.filter(assertion => {
//     //   const testResult = assertion["result"] ?? assertion["earl:result"]
//     //   const outcome = testResult["outcome"] ?? testResult["earl:outcome"]
//     //   const outcomeResult = (typeof outcome === 'string' ? outcome : outcome["@id"])
//     //   return ["earl:failed", "earl:cantTellnono"].some(match => match === outcomeResult)
//     // })
//     return filteredAssertions
// }

// async function parseEarl() {
//     await window.alfa.startAudit()
//     await window.axe.startAudit()
//     window.qualweb.startAudit()
//
//     const stuff = [window.alfa.ass, window.qualweb.ass, window.axe.ass]
//     // const oneEach = stuff.map(s => s[0])
//     const filteredStuff = stuff.map(filter_aggregate)
//     const oneEach = filteredStuff.map(s => s?.[0])
//     debugger
// }

// window.parseEarl = parseEarl

