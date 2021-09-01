const { time } = require("console")
const { uptime } = require("process")

module.exports = {
    name: "uptime",
    aliases: ["uptime", "ut", "upt", "online", "utime"],
    category: "MISC",
    description: "Tells you how long the bot is online since the last restart.",
    usage: " ",
    example: " ",
    cooldown: 30,
    id: 4,
    async execute(message, args, db, bot) {
        let time = ""
        let uptime = bot.uptime
        if (uptime <= 60 * 1000) { time =  `\`${(uptime / 1000).toFixed(0)} sec\``}
        else if (uptime >= 60 * 1000 && uptime <= 60 * 1000 * 60) { time = `\`${(uptime / 1000 / 60).toFixed(1)} min\`` }
        else if (uptime >= 60 * 1000 * 60 && uptime <= 60 * 1000 * 60 * 24) { time = `\`${(uptime / 1000 / 60 / 60).toFixed(0)} h and \`${(uptime / 1000 / 60)} min\`` }
        else if (uptime >= 60 * 1000 * 60 * 24 && uptime <= 60 * 1000 * 60 * 24 * 365) { time = `\`${(uptime / 1000 / 60 / 60 / 24)} days\` \`${(uptime / 1000 / 60 / 60).toFixed(0)} h and \`${(uptime / 1000 / 60)} min\`` } 
        return bot.info(`I am now online since ${time}!`, message, 30)
    }
}