const admin = require('firebase-admin');
const firebase = admin.firestore();
const fs = require('fs')
const antispam = require('../features/antispam')
const get_db = require('../functions/get_db')
const { Collection } = require('discord.js')

module.exports = {
    name: "messageCreate",
    async execute (message, bot) {
        if (message.author.bot) { return; }
        if (message.channel.type === 'dm') { try { return bot.error(`Please only use my commands in server's!`, message, -1) } catch (e) { console.log(e) } }
        let db = await get_db(message.guild)
        if (message.guild.ownerID !== db.owner) { await firebase.collection('guilds').doc(message.guild.id).update({ owner: message.guild.ownerId }) }
        // if (db.antispam !== null && !message.author.bot && !message.member.permissions.has('ADMINISTRATOR')) { antispam(message, bot, db) }
        const args = message.content.slice(db.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if (message.mentions.users.first() && message.mentions.users.first().id === bot.user.id) {
            if (!message.content.startsWith(db.prefix) && !args[1]) {
                if (bot.commands.has('help')) {
                    bot.commands.get('help').execute({message, args, db, bot})
                } else {
                    return bot.error(`This command is currently disabled globaly due to maintenance... Try again in \`5min\`!`, message)
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
                    return bot.error(`This command is currently disabled globaly due to maintenence... Try again in \`5min\`!`, message)
                }
            }
            return;
        }
        if (cmd.name !== 'dev' && db.disabled.includes(cmd.name)) { return bot.info(`This command was **disabled** for **this server** by an **Admin**...`, message, true, 30) }
        if(!message.guild.me.permissions.has('ADMINISTRATOR')) { return bot.info(`I can't execute this command, since I am missing the permission \`ADMINISTRATOR\`! \n\n**Please make sure to inform an Admin about this issue!**`, message, true, 60) }
        if (message.guild.roles.cache.size - 1 > message.guild.roles.cache.find(role => role.name === bot.user.username).position) { return bot.error(`Please move my role (${message.guild.roles.cache.find(role => role.name === bot.user.username)}) **above** ${message.guild.roles.cache.find(role => role.position === message.guild.roles.cache.size - 1)} in your server settings! \nThis is important for some commands to work! \n\n**Please make sure to inform an Admin about this issue!**`, message, 60) }
        if (message.channel.type === 'dm') { return bot.send(`Hey <@${message.author.id}>, \nPlease only use my commands in servers...`, message.channel) }
        if (cmd.permissions) {
            for (permission of cmd.permissions) {
                if (message.member.permissions.has(permission)) { break; }        
                let reqPerms = ""
                for (permission of cmd.permissions) { if(reqPerms === "") { reqPerms += `\`${permission}\`` } else { reqPerms += `, \`${permission}\`` } }
                return bot.error(`You are missing the following permissions: ${reqPerms}`, message)
            }
        }
        if (cmd.cooldown && cmd.cooldown > 0 && !bot.devs.includes(message.author.id)) {
            if (!bot.cooldowns.has(cmd.name)) { bot.cooldowns.set(cmd.name, new Collection()) }
            const current_time = Date.now()
            const time_stamps = bot.cooldowns.get(cmd.name);
            const cooldown_ammount = (cmd.cooldown) * 1000
            if (time_stamps.has(message.author.id)) {
                const expiration_time = time_stamps.get(message.author.id) + cooldown_ammount;
                if (current_time < expiration_time) {
                    const time_left = (expiration_time - current_time) / 1000
                    return bot.error(`Please wait \`${time_left.toFixed(1)}\` more secconds before using this command again!`, message)
                }
            }
            time_stamps.set(message.author.id, current_time)
        }

        if (cmd.minArgs) { if (args.length < cmd.minArgs) { return bot.error(`This command requires a minimum of \`${cmd.minArgs}\` arguments!`, message)}}
        if (cmd.maxArgs) { if (args.length > cmd.maxArgs) { return bot.error(`This command only allows a maximum of \`${cmd.maxArgs}\` arguments!`, message)}}

        try { cmd.execute({message, args, db, bot, command}) } catch (e) { bot.log(`An error accured while executing this command!`, `src/commands/${cmd.name}.js`, `ERROR`); bot.error(`An error accured while executing this command!\nPlease report this immediately! [[Report]](https://discord.gg/bjMSsVzjve)`, message)}
    }
}