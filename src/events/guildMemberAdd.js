module.exports = {
    name: "guildMemberAdd",
    async execute(member, bot) {
        const db = await bot.get_db(member.guild)
        if (db.membercount && db.membercount !== null) {
            const channel = member.guild.channels.cache.get(db.membercount)
            channel.edit({ name: `👥 Member Count: ${member.guild.memberCount}` })
        }
        if (db.logs) {
            const embed = new bot.embed()
            .setDescription(`New member: <@${member.user.id}>`)
            .setTimestamp()
            const channel = member.guild.channels.cache.get(db.logs.split('‎')[0])
            channel.send({embeds: [embed]})
        }
        const autorole = require('../features/autorole')
        const welcomeMsg = require('../features/welcomeMsg')

        autorole(member, bot, db)
        welcomeMsg(member, bot, db)
    }
}