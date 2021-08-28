const { MessageEmbed} = require('discord.js')
const emoji = require('../data/emojis.json')
const { red } = require('../data/colors.json')
const log = require('./log')

module.exports = async function error(err, msg, dur = 10) {
    if (!msg) { return log(`Missing message object!`, `src/functions/error.js`, 'ERROR')}
    const embed = new MessageEmbed()
    .setTitle('Error')
    .setDescription(`${emoji.error} ${err}`)
    .setColor(red)
    const message = await msg.lineReply(embed)
    if (dur < 1) { return; }
    setTimeout(() => { if(msg.deleted === false) { msg.delete() } if(message.deleted === false) { message.delete() } }, dur * 1000)
}