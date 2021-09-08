const { MessageEmbed } = require('discord.js')
const emoji = require('../data/emojis.json')
const log = require('./log')

module.exports = async function info(message, msg, dur = 15, title = true, custom_emoji = emoji.info) {
    if (!msg) { return log(`Missing message object!`, `src/functions/info.js`, 'ERROR') }
    const embed = new MessageEmbed()
    title === true ? embed.setTitle('Info') : {} 
    embed.setDescription(`${custom_emoji} ${message}`)
    embed.setColor("ORANGE")
    const reply = await msg.reply({embeds: [embed]})
    if (dur < 1) { return; }
    setTimeout(() => { msg.deletable === true ? msg.delete() : null; reply.deletable === true ? reply.delete() : null }, dur * 1000)
}