const { MessageEmbed } = require('discord.js')
const emoji = require('../data/emojis.json')
const log = require('./log')

module.exports = async function info(message, msg, dur = 15, custom_emoji = emoji.info) {
    if (!msg) { return log(`Missing message object!`, `src/functions/info.js`, 'ERROR') }
    const embed = new MessageEmbed()
    .setTitle('Info')
    .setDescription(`${custom_emoji} ${message}`)
    .setColor("ORANGE")
    const reply = await msg.reply({embeds: [embed]})
    if (dur < 1) { return; }
    setTimeout(() => { msg.deletable === true ? msg.delete() : null; reply.deletable === true ? reply.delete() : null }, dur * 1000)
}