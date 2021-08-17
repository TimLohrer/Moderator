require('discord-reply')
const { MessageEmbed } = require('discord.js')
const emoji = require('../data/emojis.json')
const { green } = require('../data/colors.json')
const log = require('./log')

module.exports = async function error(message, msg, dur = 15) {
    if (!msg) { return log(`Missing message object!`, `src/functions/done.js`, 'ERROR') }
    const embed = new MessageEmbed()
    .setTitle('Done')
    .setDescription(`${emoji.check} ${message}`)
    .setColor(green)
    const reply = await msg.lineReply(embed)
    if (dur < 1) { return; }
    setTimeout(() => { if(msg.deleted === false) { msg.delete() } if(reply.deleted === false) { reply.delete() } }, dur * 1000)
}