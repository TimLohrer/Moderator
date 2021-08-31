const ms = require('ms')

module.exports = {
    name: "tempban",
    aliases: ["tempban", "timeban", "tban", "tb"],
    category: "MODERATION",
    description: "Temporarily banns a member from this server.",
    usage: "<user> {time (sec/min/h/d)} {reason}",
    example: "@{user} 5h being to epic",
    minArgs: 2,
    id: 12,
    permissions: ["BAN_MEMBERS"],
    async execute(message, args, db, bot) {
        let target = message.mentions.users.first()
        if (!target) { return bot.error(`Please make sure to mention a valid user!`, message) }
        if (target.id === message.author.id) { return bot.error(`You can't ban yourself... :thinking:`, message) }
        const time = args[1]
        if(!time) { return bot.error(`Please make sure to include the time!`, message) }
        target = message.guild.members.cache.get(target.id)
        if (!target.bannable) { return bot.error(`I can't ban this user due to their permissions!`, message) }
        let reason = args.slice(2).join(' ')
        if (!reason) { reason = 'No reason provided!' }
        await target.ban({days: 7, reason: reason})
        bot.done(`Temporarily banned <@${target.id}> for \`${time}\` because of \`${reason}\`!`, message)
        let embed = new bot.embed()
        .setDescription(`Temporarily banned <@${target.id}> (${target.id}) for \`${time}\` because of \`${reason}\`!`)
        .setFooter(`Executed by ${message.author.tag}`)
        .setTimestamp()
        let channel = message.guild.channels.cache.get(db.logs)
        const msg = await channel.send(embed)

        setTimeout(async function () {
            const bans = await message.guild.fetchBans()
            if(bans.size === 0) { return; }
            const Buser = bans.get(target.id)
            if(!Buser) { return; }
            message.guild.members.unban(Buser.user, `Automatic unban after ${time}`)
            const embed = new bot.embed()
            .setDescription(`Automaticly unbanned <@${Buser.user.id}> after \`${time}\`. [[Original ban message]](${msg.url})`)
            .setFooter(`Original ban by ${message.author.tag}`)
            .setTimestamp()
            const _db = await bot.get_db(message.guild)
            channel = message.guild.channels.cache.get(_db.logs)
            channel.send(embed)
        }, ms(time));
    }
}
