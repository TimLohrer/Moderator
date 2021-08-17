const log = require('./log')

module.exports = function send(msg, channel, dur = 0) {
    if (!msg) { return log(`Missing message object!`, `src/functions/send.js`, 'ERROR') }
    const message = channel.send(msg)
    if (dur >= 0) { return; }
    setTimeout(() => { message.delete(); channel.delete() }, dur)
}