//ts-check
/**
 * @type {import('../types').Command}
 */
 module.exports = {
    name: "dashboard",
    aliases: ["dashboard", "db", "webdb", "web-dashboard", "webdashboard"],
    category: "INFO",
    description: "Gives you the link to my Web-Dashboard.",
    usage: " ",
    example: " ",
    async execute({message, args, db, bot}) {
        return bot.info(`[Web-Dashboard](${process.env.DASHBOARD})`, message, 30, false, '🔗')
    }
}