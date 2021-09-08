//ts-check
const admin = require('firebase-admin');
const firebase = admin.firestore();
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "membercount",
    aliases: ["membercount", "mcount", "mbc", "mc"],
    category: "UTILITY",
    description: "Creates a membercount for your server.",
    usage: " ",
    example: " ",
    cooldown: 60,
    maxArgs: 1,
    permissions: ["MANAGE_GUILD"],
    async execute({message, args, db, bot, command}) {
        if (!args[0] && db.membercount === null) {
            const channel = await message.guild.channels.create(`👥 Member Count: ${message.guild.memberCount}`, {
                type: 'GUILD_VOICE',
                permissionOverwrites: [{ id: message.guild.roles.everyone.id, deny: ['CONNECT'] },],
            })
            await firebase.collection('guilds').doc(message.guild.id).update({ membercount: channel.id })
            bot.done(`Created <#${channel.id}>!`, message)
            return bot.logs(`Created membercount (<#${channel.id}>).`, message)
        } else if (!args[0] && db.membercount !== null) {
            return bot.info(`The current membercount is <#${db.membercount}>. Use \`${db.prefix}${command} none\` to **disable** membercount!` ,message)
        } else if (args[0] && args[0] == 'none' && db.membercount !== null) {
            const channel = message.guild.channels.cache.get(db.membercount)
            channel.delete()
            await firebase.collection('guilds').doc(message.guild.id).update({ membercount: null })
            bot.done(`Disabled membercount!`, message)
            return bot.logs(`Disabled membercount.`, message)
        } else if (args[0] && args[0] == 'none' && db.membercount == null) {
            return bot.error(`You can't disable membercount, since it's already disabled!`, message)
        } else {
            return bot.error(`Please use \`${db.prefix}help ${command}\` to find out more about how to use this command!`, message)
        }
    }
}