const admin = require('firebase-admin');
const firebase = admin.firestore();

module.exports = {
    name: "logs",
    aliases: ["logs", "audit-logs", "bot-logs"],
    category: "utility",
    description: "Set a audit-Logs channel.",
    usage: "logs <channel / none>",
    example: "logs #logs",
    maxArgs: 1,
    permissions: ["MANAGE_GUILD"],
    async execute(message, args, db, bot, command) {
        if (!args[0] && db.logs === null) {
            const channel = await message.guild.channels.create('logs', {
                type: 'text',
                permissionOverwrites: [{ id: message.guild.roles.everyone.id, deny: ["VIEW_CHANNEL"] }]
            })
            await firebase.collection('guilds').doc(message.guild.id).update({ logs: `${channel.id}‎${channel.name}` })
            bot.done(`<#${channel.id}> will now be the logs channel.`, message)
            return bot.logs(`This will now be the logs channel.`, message)
        } else if (!args[0] && db.logs !== null) {
            return bot.done(`The current logs channel is <#${db.logs.split('‎')[0]}>. Use \`${db.prefix}${command} none\` to disable audit-logs!`, message)
        } else if (args[0] && args[0] !== "none") {
            const channel = message.mentions.channels.first()
            if (!channel) { return bot.error(`Please mention a channel!`, message) }
            if(!message.guild.channels.cache.get(channel.id)) { return bot.error(`\`${channel.name}\` is not a valid channel.`) }
            if (db.logs === channel.id) { return bot.error(`<#${channel.id}> is already the logs channel.`, message)}
            await firebase.collection('guilds').doc(message.guild.id).update({ logs: `${channel.id}‎${channel.name}` })
            bot.done(`<#${channel.id}> will now be the logs channel.`, message)
            return bot.logs(`This will now be the logs channel.`, message)
        } else if (args[0] && args[0] === 'none') {
            bot.logs(`Disabled audit-logs.`, message)
            await firebase.collection('guilds').doc(message.guild.id).update({ logs: null })
            return bot.done(`Disabled audit-logs.`, message)
        }
    }
}