const admin = require('firebase-admin');
const firebase = admin.firestore();
const fs = require('fs')

module.exports = {
    name: "disable",
    aliases: ["disable", "deactivate"],
    category: "UTILITY",
    description: "Disables a command for your server.",
    usage: "{command}",
    example: "ping",
    cooldown: 60,
    id: 16,
    minArgs: 1,
    maxArgs: 1,
    permissions: ["ADMINISTRATOR", "MANAGE_GUILD"],
    async execute(message, args, db, bot) {
        const ALWAYS_ON = ["dev", "help", "enable", "disable"]
        const command = args[0]
        const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
        if (command.toLowerCase() !== 'dev' && bot.commands.has(command) || bot.aliases.has(command)) {
            const CMD = bot.commands.get(command) || bot.aliases.get(command)
            for (let cmd of commandFiles) {
                if(!ALWAYS_ON.includes(CMD.name)) {
                        if (CMD.name === command.toLowerCase() || cmd.aliases.includes(command.toLowerCase())) {
                            if (db.disabled.includes(CMD.id)) { return bot.error(`The command \`${command}\` is **already disabled** for this server. If you want to **enable** it again, do \`${db.prefix}enable ${command.toLowerCase()}\`!`, message) }
                            const disabled = db.disabled
                            disabled.push(CMD.id)
                            firebase.collection('guilds').doc(message.guild.id).update({ disabled: disabled })
                            bot.done(`Disabled command \`${command}\` for this server.`, message)
                            return bot.logs(`Disabled command \`${command.toLowerCase()}\` for this server`, message)
                        }      
                } else {
                    return bot.error(`You can't disable this command!`, message)
                }
            }
        } else {
            if (command.toLowerCase() !== 'dev' && commandFiles.includes(`${command.toLowerCase()}.js`)) {
                return bot.error(`This command is currently disabled globaly due to maintenance... Try again in \`5min\`!`, message)
            } else {
                return bot.error(`Could not find a command by the name of \`${command}\`!`, message)
            }
        }
    }
}