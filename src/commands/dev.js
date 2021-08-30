const fs = require('fs');

module.exports = {
    name: "dev",
    category: "dev",
    description: " ",
    usage: " ",
    example: " ",
    id: 4,
    async execute(message, args, db, bot) {
        if (!bot.devs.includes(message.member.id)) { return; }
        async function consl (msg, path, type, tag) {
            const types = ["SUCCESS", "WARNING", "ERROR", "INFO"]
            if (!types.includes(type.toUpperCase())) { return bot.log('Invalid type!', 'src/commands/dev', 'ERROR')}
            let color
            let LowType = type.toLowerCase()
            if (LowType === 'success') { color = bot.colors.green } else if (LowType === 'warning') { color = bot.colors.yellow } else if (LowType === 'error') { color = bot.colors.red } else if (LowType === 'info') { color = bot.colors.blue }
            const channel = bot.guilds.cache.get(process.env.GUILD_ID).channels.cache.get(process.env.CONSOLE_ID)
            const embed = new bot.embed()
            .setDescription(`**[${path}]** - ${msg}`)
            .setColor(color)
            .setTimestamp()
            .setFooter(`By ${tag}`)
            const message = await channel.send(embed)
            if (LowType === 'warning' || LowType === 'error') { setTimeout(() => { if(message.deleted === false) { message.delete() }}, 60 * 1000)}
        }
        setTimeout(() => { message.delete() }, 5 * 1000)
        const command = args[0]
        if (!command) { return message.react('❌') }
        if (command.toLowerCase() === "load") {
            const cmdName = args[1]
            if (cmdName && cmdName !== "dev") {
                if (!bot.commands.get(cmdName.toLowerCase())) {
                    const commandFiles = fs.readdirSync('src/commands/').filter(file => file.endsWith('.js'));
                    if (!commandFiles.includes(`${cmdName}.js`)) { return message.react('❌')}
                    let cmd = require(`./${cmdName.toLowerCase()}`)
                    delete require.cache[require.resolve(`./${cmd.name}.js`)]
                    cmd = require(`./${cmdName.toLowerCase()}`)
                    if (!cmd.name) { bot.log(`Missing command name!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command name!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                    else if (!cmd.category) { bot.log(`Missing command category!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command category!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                    else if (!cmd.description) { bot.log(`Missing command description!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command description!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                    else if (!cmd.usage) { bot.log(`Missing command usage!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command usage!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                    else if (!cmd.example) { bot.log(`Missing command example!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command example!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                    else if (!cmd.execute) { bot.log(`Missing command execute!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command execute!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) } else {
                        bot.commands.set(cmd.name, cmd);
                        if (cmd.aliases && cmd.aliases !== []) { for (let i = 0; i < cmd.aliases.length; i++) { bot.aliases.set(cmd.aliases[i], cmd)}}
                        message.react('✅')
                        consl(`Loaded command \`${cmd.name}\`!`, `src/commands/dev.js`, `SUCCESS`, message.author.tag)
                        return bot.log(`${message.author.tag} loaded command ${cmd.name}`, `src/commands/dev.js`, 'SUCCESS')
                    }
                    return message.react('⚠️')
                }
                return message.react('❌')
            }
            return message.react('❌')
        }
        if (command.toLowerCase() === "reload") {
            const cmdName = args[1]
            if (cmdName) {
                if (cmdName.toLowerCase() === "all") {
                    const commandFiles = fs.readdirSync('src/commands/').filter(file => file.endsWith('.js'));
                    const loaded = []
                    for (file of commandFiles) {
                        const cmd = file.split('.')
                        if (bot.commands.get(cmd[0])) { loaded.push(bot.commands.get(cmd[0]).name) }
                    }
                    for (const file of commandFiles) {
                        let cmd = require(`./${file}`);
                        delete require.cache[require.resolve(`./${cmd.name}.js`)]
                        cmd = require(`./${cmd.name}`)
                        if (loaded.includes(cmd.name)) {
                            if (!cmd.name) { bot.log(`Missing command name!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command name!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                            else if (!cmd.category) { bot.log(`Missing command category!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command category!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                            else if (!cmd.description) { bot.log(`Missing command description!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command description!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                            else if (!cmd.usage) { bot.log(`Missing command usage!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command usage!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                            else if (!cmd.example) { bot.log(`Missing command example!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command example!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                            else if (!cmd.execute) { bot.log(`Missing command execute!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command execute!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) } else {
                                bot.commands.delete(cmd.name, cmd);
                                if (cmd.aliases && cmd.aliases !== []) { for (let i = 0; i < cmd.aliases.length; i++) { bot.aliases.delete(cmd.aliases[i], cmd)}}
                                cmd = require(`./${cmd.name}`);
                                bot.commands.set(cmd.name, cmd);
                                if (cmd.aliases && cmd.aliases !== []) { for (let i = 0; i < cmd.aliases.length; i++) { bot.aliases.set(cmd.aliases[i], cmd)}}
                                bot.log(`${message.author.tag} reloaded command ${cmd.name}`, `src/commands/dev.js`, 'SUCCESS')
                            }
                        }
                    }
                    console.log(' ')
                    consl(`Reloaded \`all commands\`!`, `src/commands/dev.js`, `SUCCESS`, message.author.tag)
                    return message.react('✅')
                }
                else if (bot.commands.get(cmdName.toLowerCase())) {
                    const commandFiles = fs.readdirSync('src/commands/').filter(file => file.endsWith('.js'));
                    if (!commandFiles.includes(`${cmdName}.js`)) { return message.react('❌')}
                    let cmd = require(`./${cmdName.toLowerCase()}`)
                    delete require.cache[require.resolve(`./${cmd.name}.js`)]
                    if (!cmd.name) { bot.log(`Missing command name!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command name!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                    else if (!cmd.category) { bot.log(`Missing command category!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command category!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                    else if (!cmd.description) { bot.log(`Missing command description!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command description!`, `ERROR`, `src/commands/${cmd.name}.js`, message.author.tag) }
                    else if (!cmd.usage) { bot.log(`Missing command usage!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command usage!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                    else if (!cmd.example) { bot.log(`Missing command example!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command example!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) }
                    else if (!cmd.execute) { bot.log(`Missing command execute!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command execute!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) } else {
                        bot.commands.delete(cmd.name, cmd);
                        if (cmd.aliases && cmd.aliases !== []) { for (let i = 0; i < cmd.aliases.length; i++) { bot.aliases.delete(cmd.aliases[i], cmd)}}
                        cmd = require(`./${cmd.name}`)
                        bot.commands.set(cmd.name, cmd);
                        if (cmd.aliases && cmd.aliases !== []) { for (let i = 0; i < cmd.aliases.length; i++) { bot.aliases.set(cmd.aliases[i], cmd)}}
                        message.react('✅')
                        consl(`Reloaded command \`${cmd.name}\`!`, `src/commands/dev.js`, `SUCCESS`, message.author.tag)
                        return bot.log(`${message.author.tag} reloaded command ${cmd.name}`, `src/commands/dev.js`, 'SUCCESS')
                    }
                    return message.react('⚠️')
                }
                return message.react('❌')
            }
            return message.react('❌')
        }
        if (command.toLowerCase() === "disable") {
            const cmdName = args[1]
            if (cmdName && cmdName !== "dev") {
                if (bot.commands.get(cmdName.toLowerCase())) {
                    const commandFiles = fs.readdirSync('src/commands/').filter(file => file.endsWith('.js'));
                    if (!commandFiles.includes(`${cmdName}.js`)) { return message.react('❌')}
                    const cmd = require(`./${cmdName.toLowerCase()}`)
                    if (!cmd.name) { bot.log(`Missing command name!`, `src/commands/${cmd.name}.js`, `ERROR`); consl(`Missing command name!`, `src/commands/${cmd.name}.js`, `ERROR`, message.author.tag) } else {
                        bot.commands.delete(cmd.name, cmd);
                        if (cmd.aliases && cmd.aliases !== []) { for (let i = 0; i < cmd.aliases.length; i++) { bot.aliases.delete(cmd.aliases[i], cmd)}}
                        message.react('✅')
                        consl(`Disabled command \`${cmd.name}\`!`, `src/commands/dev.js`, `SUCCESS`, message.author.tag)
                        return bot.log(`${message.author.tag} disabled command ${cmd.name}`, `src/commands/dev.js`, 'SUCCESS')
                    }
                    return message.react('⚠️')
                }
                return message.react('❌')
            }
            return message.react('❌')
        }
        if (command.toLowerCase() === "list") {
            const commandFiles = fs.readdirSync('src/commands/').filter(file => file.endsWith('.js'));
            let disabled = ""
            let enabled = ""
            for (cmd of commandFiles) {
                const command = cmd.split('.')[0]
                if (!bot.commands.has(command)) {
                    if (disabled === '') { disabled += `${command}` } else { disabled += `, ${command}` }
                } else {
                    if (enabled === '') { enabled += `${command}` } else { enabled += `, ${command}` }
                }
            }
            if (disabled === "") { disabled = `All commands are currently enabled!` }
            if (enabled === "") { enabled = `All commands are currently disabled!` }
            const embed = new bot.embed()
            .setTitle(`List of all enabled / disabled commands (${commandFiles.length})`)
            .setDescription(`Enabled (${bot.commands.size}): \`\`\`${enabled}\`\`\` Disabled (${commandFiles.length - bot.commands.size}): \`\`\`${disabled}\`\`\``)
            bot.reply(embed, message, 60)
            return message.react('✅')
        }
        if (command.toLowerCase() === 'restart') {
            bot.destroy()
            const ready = require('../events/ready')
            ready(bot, "RESTART")
            bot.login(process.env.TOKEN)
            consl('Restarting...', 'src/commands/dev.js', 'SUCCESS', message.author.tag)
            return message.react('✅')
        }
    }
}