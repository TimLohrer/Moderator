//ts-check
/**
 * @type {import('../utils/types').Command}
 */
 module.exports = {
    name: "antispam",
    aliases: ["antispam", "nospam"],
    category: "UTILITY",
    description: "Get information about you antispam settings.",
    usage: "{none}",
    example: "none",
    cooldown: 60,
    maxArgs: 1,
    permissions: ["MANAGE_GUILD"],
    async execute({message, args, db, bot}) {
        return bot.info(`To change / enable / disable you antispam, checkout my **[Web-Dashboard](${process.env.DASHBOARD})**`, message, 30)
    }
}