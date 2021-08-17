require('discord-reply')
const log = require('./log')

module.exports = async function send(message, msg, dur = 0) {
    if (!msg) { return log(`Missing message object!`, `src/functions/reply.js`, 'ERROR') }
    const reply = await msg.lineReply(message)
    if (dur < 1) { return; }
    setTimeout(() => { if(msg.deleted === false) { msg.delete() } if(reply.deleted === false) { reply.delete() } }, dur * 1000)
}