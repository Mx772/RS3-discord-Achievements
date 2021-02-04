const cmd = require('./commands')

module.exports = {
    router
}
const util = require('../util/tools')
const hasArg = /;(\S+) (\S+)$/
const noArg = /;(\S+)$/

function parseCommand (input) {
    if (input.match(hasArg)) {
        let command = input.match(hasArg)[1]
        let arg = input.match(hasArg)[2]
        console.log(`Command with Arg parsed. Command: ${command} | Arg: ${arg}`)
        return [command, arg]
    } else {
        let command = input.match(noArg)[1]
        console.log(`Command without Arg parsed. Command: ${command}`)
        return [command]
    }
}

async function router (input) {
    console.log(input)
    let [command, arg] = parseCommand(input)
    switch (command) {
        case 'setclan': 
        let clan = await util.getClanInfo(arg)
        console.log(clan)
        break;


    default:
        console.log(`Unable to match to ${command}`)
    }
}