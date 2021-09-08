//ts-check
/**
 * @type {import('../utils/types').Command}
 */
module.exports = {
    name: "kick",
    aliases: ["kick", "k", "yeet"],
    category: "MODERATION",
    description: "Kicks a member from this server.",
    usage: "<user> {reason}",
    example: "@{user} being too cool",
    minArgs: 1,
    permissions: ["KICK_MEMBERS"],
    async execute({message, args, db, bot}) {
        let target = message.mentions.users.first()
        if (!target) { return bot.error(`Please make sure to mention a valid user!`, message) }
        if (target.id === message.author.id) { return bot.error(`You can't kick yourself... :thinking:`, message) }
        target = message.guild.members.cache.get(target.id)
        if (!target.kickable) { return bot.error(`I can't kick this user due to their permissions!`, message) }
        let reason = args.slice(1).join(' ')
        if (!reason) { reason = 'No reason provided!' }
        target.kick(reason)
        bot.done(`Kicked <@${target.id}> for \`${reason}\`!`, message)
        bot.logs(`Kicked <@${target.id}> for \`${reason}\`!`, message)
    }
}