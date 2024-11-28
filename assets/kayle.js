// Build with  esbuild js/kayle.js  --bundle --minify --sourcemap --outfile=js/build/kayle.js --format=esm
// I use some alfa methods to generate nice URLs, increases coupling of testing tools
import { Criterion, Technique } from "@siteimprove/alfa-wcag"

// Include code from https://github.com/a11ywatch/kayle/blob/main/kayle/lib/runners/htmlcs.ts here so that I don't have to include two files for HTMLCS
const parseMessages = (messages) =>
  messages.map((message) => {
    return {
      type: message.type,
      message: message.message,
      code: message.code,
      element: undefined, // tbd
    }
  })

const parseAndGroupMessages = (messages) =>
  messages.reduce(
    (groupedMessages, message) => {
      var type
      if (message.type === "error") {
        type = "failures"
      } else if (message.type === "warning") type = "warnings"
      else if (message.type === "notice") type = "notice"
      else type = "passed"
      groupedMessages[type].push({
        type: message.type,
        message: message.message,
        code: message.code,
        element: undefined, // construct xpath from dom element
      })
      return groupedMessages
    },
    { failures: [], warnings: [], notice: [], passed: [] }
  )

function formatCode(code) {
  const extractNumbers = (string) =>
    string.match(/([0-9]+_)*[0-9]/)[0].replaceAll("_", ".")
  let [criterion, technique] = code.split(".").slice(3)
  criterion = extractNumbers(criterion)
  const criterionName = Criterion.of(criterion).uri ?? criterion
  const techniqueName = Technique.of(technique).uri ?? technique
  return (
    `WCAG Criterion: ${criterionName}` +
    (techniqueName ? `, Technique: ${techniqueName}` : "")
  )
}

async function startAudit() {
  const excludedRules = new Set(arguments[0]["excluded_rules"])
  const { wcagLevels, includedRules } = arguments[0]["included_rules"].reduce(
    (intermediateValue, currentRule) => {
      if (["wcag_a", "wcag_aa", "wcag_aaa"].includes(currentRule))
        intermediateValue.wcagLevels.push(currentRule)
      else intermediateValue.includedRules.add(currentRule)
      return intermediateValue
    },
    { wcagLevels: [], includedRules: new Set() }
  )
  let sniffs = new Set()
  if (wcagLevels.includes("wcag_aaa"))
    sniffs = sniffs.union(new Set(HTMLCS_WCAG2AAA.sniffs))
  else if (wcagLevels.includes("wcag_aa"))
    sniffs = sniffs.union(new Set(HTMLCS_WCAG2AA.sniffs[0].include))
  else if (wcagLevels.includes("wcag_a"))
    sniffs = sniffs.union(new Set(HTMLCS_WCAG2A.sniffs[0].include))

    sniffs = sniffs.union(includedRules).difference(excludedRules)
  HTMLCS.messages = []
  // TODO reset tags, standard and duplicates (I don't know how yet)
  sniffs.forEach((sniff) => HTMLCS.registerSniff("WCAG2AAA", sniff))
  const promise = new Promise((resolve, reject) => {
    HTMLCS.run(() => {
      resolve(HTMLCS.messages)
    }, window.document)
  })

  const messages = await promise
  const result = messages.reduce(
    (intermediateResult, assertion) => {
      const type = assertion["type"]
      if (type !== "error" && type !== "warning") return intermediateResult
      const code = assertion["code"]

      const message = assertion["message"]
      const element = assertion["element"]
      let elementName = ""
      if (element instanceof HTMLDocument) elementName = "/"
      else {
        elementName = element.outerHTML
        if (elementName.length > 130)
          elementName = elementName.substring(0, elementName.indexOf(">") + 1)
      }

      const key = type + code

      if (key in intermediateResult[type]) {
        intermediateResult[type][key]["occurences"].push(elementName)
        intermediateResult[type][key]["elements"].push(element)
      } else {
        intermediateResult[type][key] = {
          url: formatCode(code),
          info: message, // add something about the recurrence value
          outcome: type === "error" ? "earl:failed" : "earl:cantTell",
          // remove leading . and suffix
          ruleId: code.replace(/\.[^\.]*$/, "").substring(1),
          occurences: [elementName],
          elements: [element],
        }
      }
      return intermediateResult
    },
    { error: {}, warning: {} }
  )
  //const result = parseAndGroupMessages(messages)
  return {
    errors: Object.values(result.error),
    warnings: Object.values(result.warning),
  }
}

window.kayle = {
  startAudit: startAudit,
}
