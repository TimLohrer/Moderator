const admin = require('firebase-admin');
const firebase = admin.firestore();
const fs = require('fs')

module.exports = {
    name: "enable",
    aliases: ["enable", "activate"],
    category: "UTILITY",
    description: "Enables a command for your server.",
    usage: "{command}",
    example: "ping",
    cooldown: 60,
    id: 17,
    minArgs: 1,
    maxArgs: 1,
    permissions: ["ADMINISTRATOR", "MANAGE_GUILD"],
    async execute(message, args, db, bot) {
        const command = args[0]
        const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
        if (bot.commands.has(command) || bot.aliases.has(command)) {
            for (let cmd of commandFiles) {
                cmd = bot.commands.get(command) || bot.aliases.get(command)
                if (cmd.name === command.toLowerCase() || cmd.aliases.includes(command.toLowerCase())) {
                    if (!db.disabled.includes(cmd.id)) { return bot.error(`The command \`${command}\` is **already enabled** for this server. If you want to **disable** it, do \`${db.prefix}disable ${command.toLowerCase()}\`!`, message) }
                    const disabled = db.disabled
                    if (disabled.indexOf(cmd.id) > -1) { disabled.splice(disabled.indexOf(cmd.id), 1) }
                    firebase.collection('guilds').doc(message.guild.id).update({ disabled: disabled })
                    bot.done(`Enabled command \`${command}\` for this server.`, message)
                    return bot.logs(`Enabled command \`${command.toLowerCase()}\` for this server`, message)
                }      
            }
        } else {
            if (commandFiles.includes(`${command.toLowerCase()}.js`)) {
                return bot.error(`This command is currently disabled globaly due to maintenance... Try again in \`5min\`!`, message)
            } else {
                return bot.error(`Could not find a command by the name of \`${command}\`!`, message)
            }
        }
    }
}