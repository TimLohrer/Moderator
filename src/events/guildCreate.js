const get_db = require('../functions/get_db')
/**
 * @param {import('discord.js').Guild} guild
 */
module.exports = {
    name: "guildCreate",
    async execute (guild, bot) {
        if (bot.blacklist.guilds.includes(guild.id) || bot.blacklist.users.includes(guild.ownerId)) { guild.leave() }
        await get_db(guild)
        const embed = new bot.embed()
        .setTitle(`I have joined a new guild! (\`${bot.guilds.cache.size}\`)`)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .addFields(
            {
                name: '🛑 Name', value: `${guild.name}`, inline: true
            },
            {
                name: '🕵️‍♂️ Owner', value: `${guild.members.cache.get(guild.ownerId).user.tag}`, inline: true
            },
            {
                name: '📊 Members', value: `${guild.memberCount}`, inline: true
            }
        )
        .setTimestamp()
        .setColor("ORANGE")
        bot.guilds.cache.get(process.env.GUILD_ID).channels.cache.get(process.env.GUILDS_ID).send({embeds: [embed]})
        const hello = new bot.embed()
        .setTitle(`Hello! \\👋`)
        .setAuthor(`Moderator`, bot.user.displayAvatarURL())
        .setDescription(`It appears I have joined your server! My default prefix is \`${process.env.PREFIX}\`\n\n Here is the dashboard: [Dashboard](${process.env.DASHBOARD})\n\nHave fun!`)
        .setColor('ORANGE')
        guild.members.cache.get(guild.ownerId).send({embeds: [hello]})
    }
}