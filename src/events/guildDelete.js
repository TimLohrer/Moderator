const admin = require('firebase-admin');
const firebase = admin.firestore();
module.exports = {
    name: "guildDelete",
    async execute (guild, bot) {
        firebase.collection('guilds').doc(guild.id).delete()

        const embed = new bot.embed()
        .setTitle(`I have left a guild! (\`${bot.guilds.cache.size}\`)`)
        .setAuthor(guild.name, guild.iconURL())
        .addFields(
            {
                name: '🛑 Name',
                value: `${guild.name}`,
                inline: true
            }
        )
        .setTimestamp()
        .setColor(bot.colors.red)
        bot.guilds.cache.get(process.env.GUILD_ID).channels.cache.get(process.env.GUILDS_ID).send({embeds: [embed]})
    }
}