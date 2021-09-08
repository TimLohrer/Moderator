//ts-check
//ts-check
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "ban",
    aliases: ["ban", "b"],
    category: "MODERATION",
    description: "Banns a member from this server.",
    usage: "ban <user> {reason}",
    example: `ban @{user} being anoying`,
    minArgs: 1,
    permissions: ["BAN_MEMBERS"],
    async execute({message, args, db, bot}) {
        let target = message.mentions.users.first()
        if (!target) { return bot.error(`Please make sure to mention a valid user!`, message) }
        if (target.id === message.author.id) { return bot.error(`You can't ban yourself... :thinking:`, message) }
        target = message.guild.members.cache.get(target.id)
        if (!target.bannable) { return bot.error(`I can't ban this user due to their permissions!`, message) }
        let reason = args.slice(1).join(' ')
        if (!reason) { reason = 'No reason provided!' }
        await target.ban({ days: 7, reason: reason })
        bot.done(`Banned <@${target.id}> for \`${reason}\`!`, message)
        bot.logs(`Banned <@${target.id}> (\`${target.id}\`) for \`${reason}\`!`, message)
    }
}