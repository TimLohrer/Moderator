const admin = require('firebase-admin');
const firebase = admin.firestore();
const fs = require('fs')
const antispam = require('../features/antispam')

module.exports = {
    name: "message",
    async execute (message, bot) {
        if (message.author.bot || message.channel.type === 'DM') { return; }
        let data = await firebase.collection('guilds').doc(message.guild.id).get()
        let db = data.data()
        if (!db) {
            await firebase.collection('guilds').doc(message.guild.id).set({
                prefix: process.env.PREFIX,
                logs: null,
                membercount: null,
                antispam: null,
                owner: message.guild.owner.user.id,
                premium: false,
                welcome: {
                    channel: null,
                    msg: null,
                    ifembed: false,
                    embed: {
                        title: null,
                        description: null,
                        footer: null,
                        color: null,
                    },
                },
            })
            data = await firebase.collection('guilds').doc(message.guild.id).get()
            db = data.data()
        }
        if (db.antispam !== null && !message.author.bot && !message.member.permissions.has('ADMINISTRATOR')) { antispam(message, bot, db) }
        const args = message.content.slice(db.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if (message.mentions.users.first() && message.mentions.users.first().id === bot.user.id) {
            if (!message.content.startsWith(db.prefix) && !args[1]) {
                if (bot.commands.has('help')) {
                    bot.commands.get('help').execute(message, args, db, bot)
                } else {
                    return bot.error(`This command is currently disabled due to maintenence... Try again in \`5min\`!`, message)
                }
            }
        }
        if (!message.content.startsWith(db.prefix)) { return; }
        if (args[0] == "") { return; }
        let cmd = bot.commands.get(command) || bot.aliases.get(command)
        if (!cmd) {
            const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
            for (let file of commandFiles) {
                cmd = require(`../commands/${file}`)
                if (cmd.name && cmd.name === command || cmd.aliases && cmd.aliases.includes(command)) {
                    return bot.error(`This command is currently disabled due to maintenence... Try again in \`5min\`!`, message)
                }
            }
            return;
        }
        if(!message.guild.me.permissions.has('ADMINISTRATOR')) { return bot.send(`I can't execute this command, since I am missing the permission \`ADMINISTRATOR\`! \nPlease make sure to inform an Admin about this issue.`, message.author) }
        if (message.channel.type === 'dm') { return bot.send(`Hey <@${message.author.id}>, \nPlease only use my commands in servers...`, message.channel) }
        if (cmd.permissions) {
            for (permission of cmd.permissions) {
                if (message.member.permissions.has(permission)) { break; }        
                let reqPerms = ""
                for (permission of cmd.permissions) { if(reqPerms === "") { reqPerms += `\`${permission}\`` } else { reqPerms += `, \`${permission}\`` } }
                return bot.error(`You are missing the following permissions: ${reqPerms}`, message)
            }
        }

        if (cmd.minArgs) { if (args.length < cmd.minArgs) { return bot.error(`This command requires a minimum of \`${cmd.minArgs}\` arguments!`, message)}}
        if (cmd.maxArgs) { if (args.length > cmd.maxArgs) { return bot.error(`This command only allows a maximum of \`${cmd.maxArgs}\` arguments!`, message)}}

        try { cmd.execute(message, args, db, bot, command) } catch (e) { bot.log(`An error accured while executing this command!`, `src/commands/${cmd.name}.js`, `ERROR`); bot.error(`An error accured while executing this command!\nPlease report this immediately! [[Report]](https://discord.gg/bjMSsVzjve)`, message)}
    }
}