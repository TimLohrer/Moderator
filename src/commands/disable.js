//ts-check
const admin = require('firebase-admin');
const firebase = admin.firestore();
const fs = require('fs')
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "disable",
    aliases: ["disable", "deactivate"],
    category: "UTILITY",
    description: "Disables a command for your server.",
    usage: "{command}",
    example: "config",
    cooldown: 60,
    minArgs: 1,
    maxArgs: 1,
    permissions: ["ADMINISTRATOR", "MANAGE_GUILD"],
    async execute({message, args, db, bot}) {
        const ALWAYS_ON = ["dev", "help", "enable", "disable", "invite", "dashboard", "ping", "uptime"]
        const command = args[0]
        const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
        if (command.toLowerCase() !== 'dev' && bot.commands.has(command) || bot.aliases.has(command)) {
            const CMD = bot.commands.get(command) || bot.aliases.get(command)
            for (let cmd of commandFiles) {
                if(!ALWAYS_ON.includes(CMD.name)) {
                        if (CMD.name === command.toLowerCase() || CMD.aliases.includes(command.toLowerCase())) {
                            if (db.disabled.includes(CMD.name.toLowerCase())) { return bot.error(`The command \`${CMD.name}\` is **already disabled** for this server. If you want to **enable** it again, do \`${db.prefix}enable ${CMD.name}\`!`, message) }
                            const disabled = db.disabled
                            disabled.push(CMD.name.toLowerCase())
                            firebase.collection('guilds').doc(message.guild.id).update({ disabled: disabled })
                            bot.done(`Disabled command \`${CMD.name}\` for this server.`, message)
                            return bot.logs(`Disabled command \`${CMD.name}\` for this server`, message)
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