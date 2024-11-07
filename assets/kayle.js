// Build with  esbuild js/kayle.js  --bundle --minify --sourcemap --outfile=js/build/kayle.js --format=esm
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
        if (message.type === "error")
            type = "failures"
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
            element: undefined // tbd
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
        const result = parseAndGroupMessages(await promise)
        debugger
        return {passed: result.failures.length === 0 && result.warnings.length === 0 , error: undefined, messages: result}
    // } catch (error) {
    //     return {passed: false, error: error, messages: undefined}
    // }
}
window.kayle = {
    "startAudit": startAudit,
}
