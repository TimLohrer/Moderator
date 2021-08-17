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
            channel.send(embed)
        }
        if (db.welcome.channel !== null) {
            if (db.welcome.ifembed === true) {
                const Embed = db.welcome.embed
                let title = Embed.title
                let description = Embed.description
                let footer = Embed.footer
                if (Embed.title !== null) {
                    for (let i = 0; i < title.split(' ').length; i++){
                        title = title.replace('{user}', member.user.tag)
                        title = title.replace('{guild}', member.guild.name)
                    }
                }
                if (Embed.description !== null) {
                    for (let i = 0; i < description.split(' ').length; i++){
                        description = description.replace('@{user}', `<@${member.user.id}>`)
                        description = description.replace('{user}', member.user.tag)
                        description = description.replace('{guild}', member.guild.name)
                        description = description.replace('{br}', '\n')
                        description = description.replace('{#', '<#')
                        description = description.replace('#}', '>')
                        description = description.replace('{@', '<@&')
                        description = description.replace('@}', '>')
                    }        
                }
                if (Embed.footer !== null) {
                    for (let i = 0; i < footer.split(' ').length; i++){
                        footer = footer.replace('{user}', member.user.tag)
                        footer = footer.replace('{guild}', member.guild.name)
                    }
                }
                const embed = new bot.embed()
                if (Embed.title !== null) { embed.setTitle(title) }
                if (Embed.description !== null) { embed.setDescription(description) }
                if(Embed.footer !== null) { embed.setFooter(footer) }
                embed.setColor(Embed.color)
                member.guild.channels.cache.get(db.welcome.channel.split('‎')[0]).send(embed)
            } else if (db.welcome.ifembed === false && db.welcome.msg) {
                let msg = db.welcome.msg
                for (let i = 0; i < msg.split(' ').length; i++){
                    msg = msg.replace('@{user}', `<@${member.user.id}>`)
                    msg = msg.replace('{user}', member.user.tag)
                    msg = msg.replace('{guild}', member.guild.name)
                    msg = msg.replace('{br}', '\n')
                    msg = msg.replace('{#', '<#')
                    msg = msg.replace('#}', '>')
                    msg = msg.replace('{@', '<@&')
                    msg = msg.replace('@}', '>')
                }
                member.guild.channels.cache.get(db.welcome.channel.split('‎')[0]).send(msg)
            }
        }
    }
}