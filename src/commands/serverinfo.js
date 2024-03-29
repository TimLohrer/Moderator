//ts-check
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "serverinfo",
    aliases: ["serverinfo", "sinfo", "si", "serveri"],
    category: "misc",
    description: "Shows usefull information about this server.",
    usage: " ",
    example: " ",
    async execute({message, args, db, bot}) {
        const { guild } = message
        const embed = new bot.embed()
        embed.setTitle(`Serverinfo`)
        embed.addField('🛑 Name', `\`\`\`${guild.name}\`\`\``)
        embed.addField('👥 Members', `\`\`\`${guild.memberCount}\`\`\``)
        embed.addField(`${bot.emoji.channel} Channels`, `\`\`\`${guild.channels.cache.size}\`\`\``)
        if (guild.verifyed === true) { embed.addField(`${bot.emoji.verifyed} Verifyed`, `${bot.emoji.check} True`, true) } else { embed.addField(`${bot.emoji.verifyed} Verifyed`, `${bot.emoji.error} False`, true) }
        if (guild.partnered === true) { embed.addField(`${bot.emoji.partnered} Partnered`, `${bot.emoji.check} True`, true) } else { embed.addField(`${bot.emoji.partnered} Partnered`, `${bot.emoji.error} False`, true) }
        if (guild.afkChannel !== null) { embed.addField('💤 AFK Channell', `<#${guild.afkChannelId}>`) } else { embed.addField('💤 AFK Channel', `${bot.emoji.error} None`) }
        //embed.addField('', `\`\`\`${guild.}\`\`\``)
        embed.setThumbnail(guild.iconURL())
        embed.setColor("ORANGE")
        bot.reply({embeds: [embed]}, message)
    }
}