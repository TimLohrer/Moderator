//ts-check
/**
 * @type {import('../utils/types').Command}
 */
 module.exports = {
    name: "bug",
    aliases: ["bug", "bugs", "glitch", "error"],
    category: "MISC",
    description: "Report a Moderator Bot / Dashboard bug to us.",
    usage: "{bug}",
    example: "kick commands doesn't work.",
    cooldown: 60,
    minArgs: 1,
    async execute({message, args, db, bot}) {
        const bug = args.slice(0).join(' ')
        bot.done(`Thank you for reporting this bug!\n  We will try to fix this problemm as fast as possible.\n\n **Please note, that false reporting can get you banned from using any Moderator products!**`, message)
        const embed = new bot.embed()
        .setTitle('New Bug-report!')
        .setDescription(`Bug: \n\`\`\`${bug}\`\`\``)
        .setAuthor(`${message.author.tag} | ${message.author.id}`, message.author.avatarURL({ dynamic: true }))
        .setColor('ORANGE')
        .setTimestamp()
        return bot.guilds.cache.get(process.env.GUILD_ID).channels.cache.get(process.env.BUGS_ID).send({embeds: [embed]})
    }
}