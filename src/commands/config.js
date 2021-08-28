module.exports = {
    name: "config",
    aliases: ["config", "botconfig"],
    category: "misc",
    description: "Shows my configuration for this server.",
    usage: "config",
    example: "config",
    permissions: ["MANAGE_GUILD"],
    async execute(message, args, db, bot) {
        const embed = new bot.embed()
        .setTitle('Config')
        .addField('Prefix:', `\`${db.prefix}\``)
        if (db.logs) { embed.addField(`Logs:`, `<#${db.logs}>`) } else { embed.addField(`Logs:`, bot.emoji.error) }
        if (db.membercount) { embed.addField(`Membercount:`, `<#${db.membercount}>`) } else { embed.addField(`Membercount:`, bot.emoji.error) }
        if (db.premium == true) { embed.addField(`Premium:`, `${bot.emoji.premium} True`) } else { embed.addField(`Premium:`, bot.emoji.error) }
        embed.setColor("ORANGE")
        bot.reply(embed, message)
    }
}