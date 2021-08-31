const admin = require('firebase-admin');
const firebase = admin.firestore();

module.exports = {
    name: "autorole",
    aliases: ["autorole", "arole", "join-role", "joinrole"],
    category: "UTILITY",
    description: "Automaticly assigns a role to a new member.",
    usage: "<@role / role name / role-ID / none>",
    example: "@member",
    cooldown: 60,
    id: 15,
    permissions: ["MANAGE_GUILD"],
    async execute(message, args, db, bot, command) {
        if (db.autorole === null) {
            let role
            if (!isNaN(parseInt(args[0]))) { role = message.guild.roles.cache.get(args[0]) }
            else if (!message.mentions.roles.first()) { role = message.guild.roles.cache.find(role => role.name === args[0]) }
            else if (message.mentions.roles.first()) { role = message.mentions.roles.first() }
            if (!role || role === undefined) { return bot.error(`Could not find the role \`${args[0].toString()}\`!`, message) }
            if (role.position > message.guild.roles.cache.find(role => role.name === bot.user.username).position) { return bot.error(`Please move my role (${message.guild.roles.cache.find(role => role.name === bot.user.username)}) **above** ${role} in your server settings! \nThis is necessary in order to use this role as an autorole!`, message, 60) }
            await firebase.collection('guilds').doc(message.guild.id).update({ autorole: role.id })
            bot.done(`Enabled autorole and set to ${role}`, message)
            bot.logs(`Enabled autorole!`, message)
            return bot.logs(`Set autorole to ${role}`, message)
        } else if (db.autorole !== null && !args[0]) {
            return bot.info(`The current autorole is <@&${db.autorole}>. Use \`${db.prefix}${command} none\` to **disable** autorole!`, message)
        } else if (db.autorole !== null && args[0] && args[0] !== 'none') {
            let role
            if (!isNaN(parseInt(args[0]))) { role = message.guild.roles.cache.get(args[0]) }
            else if (!message.mentions.roles.first()) { role = message.guild.roles.cache.find(role => role.name === args[0]) }
            else if (message.mentions.roles.first()) { role = message.mentions.roles.first() }
            if (!role || role === undefined) { return bot.error(`Could not find the role \`${args[0].toString()}\`!`, message) }
            if (role.position > message.guild.roles.cache.find(role => role.name === bot.user.username).position) { return bot.error(`Please move my role (${message.guild.roles.cache.find(role => role.name === bot.user.username)}) **above** ${role} in your server settings! \nThis is necessary in order to use this role as an autorole!`, message, 60) }
            if (role.id === db.autorole) { return bot.error(`${role} is already the autorole!`, message) }
            await firebase.collection('guilds').doc(message.guild.id).update({ autorole: role.id })
            bot.done(`Changed autorole to ${role}`, message)
            return bot.logs(`Changed autorole to ${role}`, message)
        } else if (db.autorole !== null && args[0] && args[0] === 'none') {
            await firebase.collection('guilds').doc(message.guild.id).update({ autorole: null })
            bot.done(`Disabled autorole!`, message)
            return bot.logs(`Disabled autorole!`, message)
        }
    }
}