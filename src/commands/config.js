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
    permissions: ["MANAGE_GUILD"],
    async execute({message, args, db, bot}) {
        let disabled = ""
        for (let cmd of db.disabled) { disabled !== "" ? disabled += `, ${cmd}` : disabled += cmd }
        const embed = new bot.embed()
        .setTitle('Moderator Config')
        .setDescription(`\n Hate using commands to change my settings.. ? \n**Try out our new **[Web Dashboard](${process.env.DASHBOARD}) \n\n${db.disabled.length > 0 ? `**Disabled commands for this guild:** \`\`\`${disabled}\`\`\`` : ''}`)
        .addFields([
            { name :'Prefix:', value: `\`${db.prefix}\``, inline: true },
            { name: 'Logs:', value: `${db.logs !== null ? `<#${db.logs}>` : `${bot.emoji.error} \`Disabled\`` }`, inline: true},
            { name: 'Membercount:', value: `${db.membercount !== null ? `<#${db.membercount}>` : `${bot.emoji.error} \`Disabled\``}`, inline: true },
            { name: 'Welcome message:', value: `${db.welcome.channel !== null ? `<#${db.welcome.channel}> ([Web-Dashboard](${process.env.DASHBOARD}))` : `${bot.emoji.error} \`Disabled\` ([Web-Dashboard](${process.env.DASHBOARD}))`}`, inline: true },
            { name: 'Autorole', value: `${db.autorole !== null ? `<@&${db.autorole}>` : `${bot.emoji.error} \`Disabled\``}`, inline: true },
            { name: 'Antispam:', value: `${db.antispam !== null ? `${bot.emoji.check} \`Enabled\` ([Web-Dashboard](${process.env.DASHBOARD}))` : `${bot.emoji.error} \`Disabled\` ([Web-Dashboard](${process.env.DASHBOARD}))`}`, inline: true },
            { name: 'Premium:', value: `${db.premium === true ? `${bot.emoji.premium} \`Enabled\`` : `${bot.emoji.error} [Get Premium](${process.env.DASHBOARD}/premium)`}`, inline: true },
        ])
        .setColor("ORANGE")
        bot.reply({embeds: [embed]}, message, 120)
    }
}