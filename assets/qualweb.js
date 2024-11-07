import "@qualweb/qw-page"
import { WCAGTechniques } from "@qualweb/wcag-techniques"
import { ACTRules } from "@qualweb/act-rules"

const en = require("@qualweb/locale/dist/locales/en.json")

function startAudit() {
    // Execute WCAG rules
    const wcagResult = window.wcag.execute()

    // Execute ACT Rules
    window.act.executeAtomicRules()
    window.act.executeCompositeRules()

    const actResult = window.act.getReport()


    const parsedResults = [...Object.values(wcagResult.assertions), ...Object.values(actResult.assertions)]
        .reduce((intermediateResult, assertion) => {
            intermediateResult[assertion.metadata.outcome].push(assertion)
            return intermediateResult
        },
        {
            passed: [],
            inapplicable: [],
            warning: [],
            failed: [],
        }
    )
    return { passed: parsedResults.failed.length === 0 && parsedResults.warning.length === 0, results: parsedResults }
}


window.wcag = new WCAGTechniques({translate: en})
window.act = new ACTRules({translate: en})

window.qualweb = {
    startAudit
}

console.log(window.act)
