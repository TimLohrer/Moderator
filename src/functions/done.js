//ts-check
const { MessageEmbed } = require('discord.js')
const emoji = require('../data/emojis.json')
const { green } = require('../data/colors.json')
const log = require('./log')
/**
 * 
 * @param {import('discord.js').Message} msg
 * @param {string} message
 * @param {number} dur
 * @returns 
 */
module.exports = async function error(message, msg, dur = 15) {
    if (!msg) { return log(`Missing message object!`, `src/functions/done.js`, 'ERROR') }
    const embed = new MessageEmbed()
    .setTitle('Done')
    .setDescription(`${emoji.check} ${message}`)
    .setColor(green)
    const reply = await msg.reply({embeds: [embed]})
    if (dur < 1) { return; }
    setTimeout(() => { msg.deletable === true ? msg.delete() : null; reply.deletable === true ? reply.delete() : null }, dur * 1000)
}