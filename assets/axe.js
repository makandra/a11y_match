import axe from "axe-core";
import reporter from "@axe-core/reporter-earl"

async function startAudit(auditOptions) {

    const tagRuleKeywords = {
        "wcag_a": ["wcag2aaa"],
        "wcag_aa": ["wcag2a", "wcag2aa"],
        "wcag_aaa": ["wcag2a", "wcag2aa", "wcag2aaa"],
        "best_practices": ["best-practice"],
        "en_301_549": ["EN-301-549"]
    }

    const {tags, includedRules} = auditOptions["included_rules"].reduce(
        (intermediateValue, currentRule) => {
            if (tagRuleKeywords[currentRule])
                intermediateValue.tags = [...intermediateValue.tags, ...tagRuleKeywords[currentRule]]
            else
                intermediateValue.includedRules.push(currentRule)
            return intermediateValue
        }, {tags: [], includedRules: []})

    const runOnly =
        tags.length === 0 ? {
            type: "rule",
            values: includedRules
        } : {
            type: "tag",
            values: tags
        }

    const rules = {
        ...(runOnly["type"] === "rule" ? []: Object.fromEntries(includedRules.map(rule => [rule, {enabled: true}]))),
        ...Object.fromEntries(auditOptions["excluded_rules"].map(rule => [rule, {enabled: false}])),
    }

    const options = {reporter, runOnly, rules}
    const results = await window.axe.run(options)
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
            intermediateResult[outcome][key] = {
                "url": assertion["test"]["@id"],
                "info": assertion["result"]["info"],
                "outcome": assertion["result"]["outcome"],
                // Extract rule ID from rule doc link
                "ruleId": new URL(assertion["test"]["@id"]).pathname.split("/").pop(),
                "occurences": [
                    assertion["result"]["pointer"]
                ]
            }
        }
        return intermediateResult
    }, {"earl:failed": {}, "earl:cantTell": {}});
    return {
        errors: Object.values(result["earl:failed"]),
        warnings: Object.values(result["earl:cantTell"])
    }
}

window.axe = {
    ...axe,
    startAudit
}

