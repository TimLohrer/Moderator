//ts-check
/**
 * @type {import('../types').Command}
 */
 module.exports = {
    name: "invite",
    aliases: ["invite", "i"],
    category: "INFO",
    description: "Gives you the link to invite me to your server.",
    usage: " ",
    example: " ",
    async execute({message, args, db, bot}) {
        return bot.info(`[Invite me](${process.env.INVITE_URL})`, message, 30, false, '🔗')
    }
}