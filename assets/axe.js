import axe from "axe-core";
import reporter from "@axe-core/reporter-earl"

async function startAudit() {
    try {
        axe.configure({ reporter })
        const results = await window.axe.run()
        const earlAssertions = results["assertions"]
        const result = earlAssertions.reduce((intermediateResult, assertion) => {
            const outcome = assertion["result"]["outcome"]
            if (!["earl:failed", "earl:cantTell"].some(passingOutcome => passingOutcome === outcome))
                return intermediateResult
            const key = assertion["test"]["@id"] + assertion["result"]["info"] + outcome
            if (key in intermediateResult[outcome]) {
                intermediateResult[outcome][key]["occurences"].push(
                    assertion["result"]["pointer"]
                )
            } else {
                intermediateResult[outcome][key] =  {
                    "url": assertion["test"]["@id"],
                    "info": assertion["result"]["info"],
                    "outcome": assertion["result"]["outcome"],
                    "occurences": [
                        assertion["result"]["pointer"]
                    ]
                }
            }
            return intermediateResult
        },{ "earl:failed": {}, "earl:cantTell": {} });
        return {
            passed: result["earl:failed"].length === 0,
            errors: Object.values(result["earl:failed"]),
            warnings: Object.values(result["earl:cantTell"])
        }
    } catch (error) {
        console.error('Something bad happened:', error.message);
    }
}

window.axe = {
    ...axe,
    startAudit
}

