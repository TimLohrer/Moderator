//ts-check
const fs = require('fs')
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "help",
    aliases: ["help", "h"],
    category: "MISC",
    description: "Help command.",
    usage: "{command / category}",
    example: "prefix",
    maxArgs: 1,
    async execute ({message, args, db, bot}) {
        let lowArgs = []
        let _args = []
        for (let i = 0; i < args.length; i++) {
            _args.push(args[i].toUpperCase())
            lowArgs.push(args[i].toLowerCase())
        }
        if (lowArgs[0] === "dev") { return bot.error(`Could not find a command or category by the name of \`dev\`!`, message) }
        
        const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
        let categorys = []
        for (let cmd of commandFiles) {
            if(cmd.split('.')[0] === 'dev') {}
            else if (bot.commands.has(cmd.split('.')[0]) && bot.commands.get(cmd.split('.')[0]).category && !categorys.includes(bot.commands.get(cmd.split('.')[0]).category.toUpperCase())) {
                categorys.push(bot.commands.get(cmd.split('.')[0]).category.toUpperCase())
            }
        }
        const commands = []
        for (let cmd of commandFiles) {
            if(cmd.split('.')[0] !== 'dev') {
                if (bot.commands.has(cmd.split('.')[0])) {
                    if (db.disabled !== []) {
                        if (db.disabled.includes(bot.commands.get(cmd.split('.')[0]).id)) {
                            commands.push(`${cmd.split('.')[0]}|Disabled for this server.`)
                        } else {
                            commands.push(bot.commands.get(cmd.split('.')[0])) 
                        }
                    }                   
                } else {
                    commands.push(`${cmd.split('.')[0]}|Currently disabled.`)
                }
            }
        }
        if (!_args[0] || message.mentions.users.first() && message.mentions.users.first().id === bot.user.id) {
            let cmds = ""
            let ctgrys = ""
            for (let cmd of commands) { if (cmd.name) { cmds += `**${cmd.name}** \n\`\`\`${db.prefix}${cmd.name} ${cmd.usage}\`\`\`` } else { cmds += `**${cmd.split('|')[0]}** \n\`\`\`${cmd.split('|')[1]}\`\`\`` }}
            for (let category of categorys) { if (ctgrys === "" && category.toLowerCase() !== 'dev') { ctgrys += `\`${category.toUpperCase()}\`` } else if (category.toLowerCase() !== 'dev') { ctgrys += `, \`${category.toUpperCase()}\`` } }
            const embed = new bot.embed()
            .setTitle(`Help`)
            .setDescription(`My Prefix for this server is \`${db.prefix}\`. \nDo \`${db.prefix}help {command}\` to get more information about a command, \n or \`${db.prefix}help {category}\` to get more information on a category! \n\nCurrently available categorys: ${ctgrys} \n\n${cmds}`)
            .setColor("ORANGE")
            .setFooter(`Please ignore {} and <> when using a command!`)
            bot.info('Check your DM\'s!', message, 10, false, "📬")
            try { return bot.send({ embeds: [embed]}, message.author) } catch (e) { console.log(e) }
        }
        if (_args[0]) {
            if (bot.commands.has(lowArgs[0]) || bot.aliases.has(lowArgs[0]) || commandFiles.includes(`${lowArgs[0]}.js`)) {
                const cmd = bot.commands.get(lowArgs[0]) || bot.aliases.get(lowArgs[0]) || lowArgs[0]
                let perms = ""
                if (cmd.permissions) { for (permission of cmd.permissions) { if(perms === "") { perms += `\`${permission}\`` } else { perms += `, \`${permission}\`` }}} else { perms = `\`No permissions required.\`` }
                let aliases = ""
                if (cmd.aliases) { for (alias of cmd.aliases) { if (alias !== cmd.name) { if(aliases === "") { aliases += `\`${alias}\`` } else { aliases += `, \`${alias}\`` }}}} else { aliases = `\`This command doesen't have any aliases.\``}
                let cooldown = ""
                if (cmd.cooldown) { cooldown = `${cmd.cooldown} sec` } else { cooldown = 'This command doesn\'t have a cooldown!' }
                const embed = new bot.embed()
                embed.setTitle(`Help for command ${cmd.name || cmd}`)
                if (cmd.name) {
                    embed.setDescription(`\nName: \`${cmd.name}\` \n\nAliases: ${aliases} \n\nDescription: \`${cmd.description}\` \n\nCategory: \`${cmd.category}\` \n\nUsage: \`${db.prefix}${cmd.name || cmd} ${cmd.usage}\` \n\nExample: \`${db.prefix}${cmd.name || cmd} ${cmd.example.replace('{user}', message.author.tag)}\` \n\nCooldown: \`${cooldown}\` \n\nPermissions: ${perms}`)
                } else {
                    embed.setDescription(`This command is currently disabled!`)
                }
                embed.setColor("ORANGE")
                embed.setFooter(`Please ignore {} and <> when using this command!`)
                return bot.reply({embeds:[embed]}, message, 60)
            }
            else if (categorys.includes(_args[0])) {
                let i = 1
                let cmds = ""
                for (let cmd of commands) {
                    if (bot.commands.has(cmd.name)) {
                        if (cmd.category && cmd.category.toUpperCase() === _args[0]) {
                            cmds += `\n\n${i}. \`${db.prefix}${cmd.name}\``; i++ 
                        }
                    } else {
                        const command = require(`./${cmd.split('|')[0]}.js`)
                        if (command.category && command.category.toUpperCase() === _args[0]) {
                            cmds += `\n\n ${i}. \`${db.prefix}${command.name}\`   (Currently disabled!)`
                            i++
                        }
                    }
                }
                const embed = new bot.embed()
                .setTitle(`Commands of category ${_args[0]}`)
                .setDescription(cmds)
                .setColor("BLUE")
                return bot.reply({embeds:[embed]}, message, 60)
            }
            return bot.error(`Could not find a command or category by the name of \`${args[0]}\`!`, message)
        }
    }
}