module.exports = {
    name: "serverinfo",
    aliases: ["serverinfo", "sinfo", "si", "serveri"],
    category: "misc",
    description: "Shows usefull information about this server.",
    usage: "serverinfo",
    example: "serverinfo",
    async execute(message, args, db, bot) {
        const { guild } = message
        const embed = new bot.embed()
        embed.setTitle(`Serverinfo`)
        embed.addField('🛑 Name', `\`\`\`${guild.name}\`\`\``)
        embed.addField('👥 Members', `\`\`\`${guild.memberCount}\`\`\``)
        embed.addField('🌎 Region', `\`\`\`${guild.region}\`\`\``)
        embed.addField(`${bot.emoji.channel} Channels`, `\`\`\`${guild.channels.cache.size}\`\`\``)
        if (guild.verifyed === true) { embed.addField(`${bot.emoji.verify} Verifyed`, `${bot.emoji.check} True`, true) } else { embed.addField(`${bot.emoji.verify} Verifyed`, `${bot.emoji.nope} False`, true) }
        if (guild.partnered === true) { embed.addField(`${bot.emoji.partner} Partnered`, `${bot.emoji.check} True`, true) } else { embed.addField(`${bot.emoji.partner} Partnered`, `${bot.emoji.nope} False`, true) }
        if (guild.afkChannelID !== null) { embed.addField('💤 AFK Channell', `<#${guild.afkChannelID}>`) } else { embed.addField('💤 AFK Channel', `${bot.emoji.nope} None`) }
        //embed.addField('', `\`\`\`${guild.}\`\`\``)
        embed.setThumbnail(guild.iconURL())
        embed.setColor("ORANGE")
        bot.reply(embed, message)
    }
}