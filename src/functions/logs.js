const { MessageEmbed } = require('discord.js')
const log = require('./log')
const get_db = require('./get_db');

module.exports = async (msg, message) => {
    if (!message) { return log(`Missing message object!`, `src/functions/logs.js`, 'ERROR') }
    let db = await get_db(message.guild)
    if (!db.logs || db.prefix === null) { return; }
    const embed = new MessageEmbed()
    .setDescription(msg)
    .setFooter(`Executed by ${message.author.tag}`)
    .setTimestamp()
    const channel = message.guild.channels.cache.get(db.logs)
    channel.send(embed)
}