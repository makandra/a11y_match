// Build with  esbuild js/kayle.js  --bundle --minify --sourcemap --outfile=js/build/kayle.js --format=esm

// Include code from https://github.com/a11ywatch/kayle/blob/main/kayle/lib/runners/htmlcs.ts here so that I don't have to include two files for HTMLCS
const parseMessages = (messages) => messages.map(message => {
    return {
        type: message.type,
        message: message.message,
        code: message.code,
        element: undefined, // tbd
    }})

const parseAndGroupMessages = (messages) => messages.reduce(
    (groupedMessages, message) => {
        var type
        if (message.type === "error") {

            type = "failures"
        }
        else if (message.type === "warning")
            type = "warnings"
        else if (message.type === "notice")
            type = "notice"
        else
            type = "passed"
        groupedMessages[type].push({
            type: message.type,
            message: message.message,
            code: message.code,
            element: undefined // construct xpath from dom element
        })
        return groupedMessages
    },
    {failures: [], warnings: [], notice: [], passed: []}
)

async function startAudit() {
    const promise = new Promise((resolve, reject) => {
        HTMLCS.process(
            'WCAG2AA',
            window.document,
            (error) => {
                if (error) {
                    reject(error)
                }
                resolve(HTMLCS.messages)
            },
            (error) => {
                reject(error)
            },
            'en',
        )
    })
    //try {
    const messages = await promise
    const result = messages.reduce((intermediateResult, assertion) => {
        const type = assertion["type"]
        if (type !== "error" && type !== "warning")
            return intermediateResult
        const code = assertion["code"]
        const message = assertion["message"]
        const element = assertion["element"]
        let elementName = ""
        if (element instanceof HTMLDocument)
            elementName = "/"
        else {
            elementName = element.outerHTML
            if (elementName.length > 130)
                elementName = elementName.substring(0, elementName.indexOf(">") + 1)
        }

        const key = type + code

        if (key in intermediateResult[type]) {
            intermediateResult[type][key]["occurences"].push(
                elementName
            )
            intermediateResult[type][key]["elements"].push(
                element
            )
        } else {
            intermediateResult[type][key] =  {
                "url": code,
                "info": message, // add something about the recurrence value
                "outcome": type === "error" ? "earl:failed" : "earl:cantTell",
                "occurences": [
                    elementName
                ],
                "elements": [
                    element
                ]
            }
        }
        return intermediateResult
    }, { "error": {}, "warning": {} });
    //const result = parseAndGroupMessages(messages)
    return {
        passed: result["error"].length === 0,
        errors: Object.values(result.error),
        warnings: Object.values(result.warning)
    }
    // } catch (error) {
    //     return {passed: false, error: error, messages: undefined}
    // }
}
window.kayle = {
    "startAudit": startAudit,
}
