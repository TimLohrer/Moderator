const log = require('./log')

module.exports = async function send(msg, channel, dur = 0) {
    if (!msg) { return log(`Missing message object!`, `src/functions/send.js`, 'ERROR') }
    const message = await channel.send(msg)
    if (dur < 1) { return; }
    setTimeout(() => { message.deletable === true ? message.delete() : null }, dur * 1000)
}