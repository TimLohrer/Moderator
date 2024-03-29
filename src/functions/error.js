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
    const reply = await msg.reply({embeds: [embed]})
    if (dur < 1) { return; }
    setTimeout(() => { msg.deletable === true ? msg.delete() : null; reply.deletable === true ? reply.delete() : null }, dur * 1000)
}