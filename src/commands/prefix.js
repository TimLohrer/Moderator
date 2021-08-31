const admin = require('firebase-admin');
const firebase = admin.firestore();

module.exports = {
    name: "prefix",
    aliases: ["prefix", "setPrefix", "botPrefix"],
    category: "UTILITY",
    description: "Set a custom Prefix!",
    usage: "{new Prefix}",
    example: "-",
    cooldown: 60,
    minArgs: 1,
    maxArgs: 1,
    id: 10,
    permissions: ["MANAGE_GUILD"],
    async execute(message, args, db, bot) {
        const newPrefix = args[0].toString()
        if (newPrefix.length > 5) { return bot.error(`This maximum length is \`5\`!`, message) }
        await firebase.collection('guilds').doc(message.guild.id).update({ prefix: newPrefix })
        bot.done(`Changed Prefix to \`${newPrefix}\`.`, message)
        bot.logs(`Changed prefix from \`${db.prefix}\` to \`${newPrefix}\`.`, message)
    }
}