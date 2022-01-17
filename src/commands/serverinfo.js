//ts-check
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "serverinfo",
    aliases: ["serverinfo", "sinfo", "si"],
    category: "misc",
    description: "Shows usefull information about this server.",
    usage: " ",
    example: " ",
    async execute({message, args, db, bot}) {
        const { guild } = message
        const embed = new bot.embed()
        embed.setTitle(`Serverinfo`)
        embed.addField('🛑 Name', `\`\`\`${guild.name}\`\`\``)
        embed.addField(`${bot.emoji.owner} Owner`, `${guild.members.cache.get(guild.ownerId)}`)
        embed.addField('👥 Members', `\`\`\`${(await guild.members.fetch()).filter(member => !member.user.bot).size}\`\`\``, true)
        embed.addField('🤖 Bots', `\`\`\`${await (await guild.members.fetch()).filter(member => member.user.bot).size}\`\`\``, true)
        embed.addField(`${bot.emoji.channel} Channels`, `\`\`\`${guild.channels.cache.size}\`\`\``, true)
        embed.addField(`✦ Roles`, `\`\`\`${guild.roles.cache.size}\`\`\``, true)
        embed.addField(`😀 Emoji's`, `\`\`\`${guild.emojis.cache.size}\`\`\``, true)
        embed.addField(`${bot.emoji.server_boost} Server-Boost Tier`, `\`\`\`${guild.premiumTier}\`\`\``, true)
        if (guild.verifyed === true) { embed.addField(`${bot.emoji.verifyed} Verifyed`, `${bot.emoji.check} True`, true) } else { embed.addField(`${bot.emoji.verifyed} Verifyed`, `${bot.emoji.error} False`, true) }
        if (guild.partnered === true) { embed.addField(`${bot.emoji.partnered} Partnered`, `${bot.emoji.check} True`, true) } else { embed.addField(`${bot.emoji.partnered} Partnered`, `${bot.emoji.error} False`, true) }
        if (guild.afkChannel !== null) { embed.addField('💤 AFK Channell', `<#${guild.afkChannelId}>`, true) } else { embed.addField('💤 AFK Channel', `${bot.emoji.error} None`, true) }
        //embed.addField('', `\`\`\`${guild.}\`\`\``)
        embed.setThumbnail(guild.iconURL({ dynamic: true }))
        embed.setColor("ORANGE")
        await bot.reply({embeds: [embed]}, message, 30)
    }
}