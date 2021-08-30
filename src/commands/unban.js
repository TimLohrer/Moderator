module.exports = {
    name: "unban",
    aliases: ["unban", "uban", "ub"],
    category: "moderation",
    description: "Unbans a member from this server.",
    usage: "<user ID> {reason}",
    example: "697888642290679940 false ban",
    minArgs: 1,
    id: 13,
    permissions: ["BAN_MEMBERS"],
    async execute(message, args, db, bot) {
        const id = args[0]
        if (parseInt(id) === NaN) { return bot.error(`Please provide a valid ID!`, message) }
        if (message.guild.members.cache.get(id)) { return bot.error(`This user is not banned from this server!`, message) }
        const bans = await message.guild.fetchBans()
        if(bans.size === 0) { return bot.error(`No one is banned from this server!`, message) }
        const Buser = bans.get(id)
        if(!Buser) { return bot.error(`Could not find that user!`, message) }
        let reason = args.slice(1).join(' ')
        if (!reason) { reason = 'No reason provided!' }
        await message.guild.members.unban(Buser.user)
        bot.done(`Unbanned \`${Buser.user.username}#${Buser.user.discriminator}\` for \`${reason}\`!`, message)
        bot.logs(`Unbanned \`${Buser.user.username}#${Buser.user.discriminator}\` for \`${reason}\`!`, message)
    }
}