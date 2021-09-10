const log = require('./log')

module.exports = async function send(message, msg, dur = 0) {
    if (!msg) { return log(`Missing message object!`, `src/functions/reply.js`, 'ERROR') }
    if (!message.title && !message.description) {
        const reply = await msg.reply(message)
        if (dur < 1) { return; }
        setTimeout(() => { msg.deletable === true ? msg.delete() : null; reply.deletable === true ? reply.delete() : null }, dur * 1000)
    } else { 
        const reply = await msg.reply({embeds: [message]})
        if (dur < 1) { return; }
        setTimeout(() => { msg.deletable === true ? msg.delete() : null; reply.deletable === true ? reply.delete() : null }, dur * 1000)
    }
}