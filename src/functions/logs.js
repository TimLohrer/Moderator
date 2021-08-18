const { MessageEmbed } = require('discord.js')
const log = require('./log')
const admin = require('firebase-admin');
const firebase = admin.firestore();

module.exports = async (msg, message) => {
    if (!message) { return log(`Missing message object!`, `src/functions/logs.js`, 'ERROR') }
    let data = await firebase.collection('guilds').doc(message.guild.id).get()
    let db = data.data()
    if (!db.logs || db.prefix === null) { return; }
    const embed = new MessageEmbed()
    .setDescription(msg)
    .setFooter(`Executed by ${message.author.tag}`)
    .setTimestamp()
    const channel = message.guild.channels.cache.get(db.logs)
    channel.send(embed)
}