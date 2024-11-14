import "@qualweb/qw-page"
import { WCAGTechniques } from "@qualweb/wcag-techniques"
import { ACTRules } from "@qualweb/act-rules"
import { generateEARLAssertions, generateEARLReport} from "@qualweb/earl-reporter";

const earlReporter = require("@qualweb/earl-reporter")

const en = require("@qualweb/locale/dist/locales/en.json")

function getEvaluator() {
    return {
        name: 'QualWeb',
        description: 'QualWeb is an automatic accessibility evaluator for webpages.',
        version: '3.0.0',
        homepage: 'http://www.qualweb.di.fc.ul.pt/',
        date: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        url: {
            inputUrl: document.URL,
            completeUrl: document.URL
        },
    };
}

function startAudit() {
    // Execute WCAG rules
    const wcagResult = window.wcag.execute()

    // Execute ACT Rules
    window.act.executeAtomicRules()
    window.act.executeCompositeRules()

    const actResult = window.act.getReport()

    const earlAssertions = [...qualweb.generateEARLAssertions(actResult), ...qualweb.generateEARLAssertions(wcagResult)]
    const result = earlAssertions
        .filter(assertion => ["earl:failed", "earl:cantTell"].some(outcome => outcome === assertion["result"]["outcome"]))
        .map(assertion => {
            return {
                    "url": assertion["test"]["@id"],
                    // "info": assertion["test"]["description"] + assertion["result"]["description"],
                    "info": assertion["result"]["description"],
                    "outcome": assertion["result"]["outcome"],
                    "occurences": assertion["result"]["source"]
                        // TODO if I encounter a different outcome here, it should be split out instead of just filtered
                        .filter(occurence => assertion["result"]["outcome"] === occurence["result"]["outcome"])
                        //.filter(occurence => ["earl:failed", "earl:cantTell"].some(outcome => outcome ===occurence["result"]["outcome"]))
                        .map(occurence => occurence["result"]["pointer"])
            }
        })
        .reduce((intermediateResult, currentValue) => {
            intermediateResult[currentValue["outcome"]].push(currentValue)
            return intermediateResult
        },{ "earl:failed": [], "earl:cantTell": [] })
    return {
        passed: result["earl:failed"].length === 0,
        errors: result["earl:failed"],
        warnings: result["earl:cantTell"]
    }


    // const earlReporterInput = {system: getEvaluator(), metadata: actResult.metadata, modules: { "act-rules": actResult, "wcag-techniques": wcagResult }}
    // const fullEarlReport = window.qualweb.generateEARLReport({"url": earlReporterInput})["url"]

    // const parsedResults = [...Object.values(wcagResult.assertions), ...Object.values(actResult.assertions)]
    //     .reduce((intermediateResult, assertion) => {
    //         intermediateResult[assertion.metadata.outcome].push(assertion)
    //         return intermediateResult
    //     },
    //     {
    //         passed: [],
    //         inapplicable: [],
    //         warning: [],
    //         failed: [],
    //     }
    // )
    // return { passed: parsedResults.failed.length === 0 && parsedResults.warning.length === 0, results: parsedResults }
}


window.wcag = new WCAGTechniques({translate: en})
window.act = new ACTRules({translate: en})

window.qualweb = {
    startAudit,
    generateEARLAssertions,
    generateEARLReport,
}

