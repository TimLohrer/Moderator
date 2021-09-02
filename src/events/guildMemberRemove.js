module.exports = {
    name: "guildMemberRemove",
    async execute(member, bot) {
        const db = await bot.get_db(member.guild)
        if (db.membercount && db.membercount !== null) {
            const channel = member.guild.channels.cache.get(db.membercount)
            channel.edit({ name: `👥 Member Count: ${member.guild.memberCount}` })
        }
        if (db.logs) {
            const embed = new bot.embed()
            .setDescription(`A member left: \`${member.user.tag}\``)
            .setTimestamp()
            const channel = member.guild.channels.cache.get(db.logs.split('‎')[0])
            channel.send({embeds: [embed]})
        }
    }
}