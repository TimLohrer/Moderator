//ts-check
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "config",
    aliases: ["config", "botconfig"],
    category: "MISC",
    description: "Shows my configuration for this server.",
    usage: " ",
    example: " ",
    maxArgs: 1,
    id: 3,
    permissions: ["MANAGE_GUILD"],
    async execute({message, args, db, bot}) {
        const embed = new bot.embed()
        .setTitle('Moderator Config')
        .setDescription(`\n Hate using commands to change my settings.. ? \n**Try out our new and convenient way to change my settings with *eez*** \n [[Web Dashboard]](${process.env.DASHBOARD})\n\n`)
        .addFields([
            { name :'Prefix:', value: `\`${db.prefix}\``, inline: true },
            { name: 'Logs:', value: `${db.logs !== null ? `<#${db.logs}>` : `${bot.emoji.error} \`Disabled\`` }`, inline: true},
            { name: 'Membercount:', value: `${db.membercount !== null ? `<#${db.membercount}>` : `${bot.emoji.error} \`Disabled\``}`, inline: true },
            // { name: '', value: `${}`, inline: true },
            // { name: '', value: `${}`, inline: true },
            // { name: '', value: `${}`, inline: true },
            // { name: '', value: `${}`, inline: true },
        ])
        .setColor("ORANGE")
        bot.reply({embeds: [embed]}, message)
    }
}