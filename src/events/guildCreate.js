const admin = require('firebase-admin');
const firebase = admin.firestore();

module.exports = {
    name: "guildCreate",
    async execute (guild, bot) {
        firebase.collection('guilds').doc(guild.id).set({
            prefix: process.env.PREFIX,
            logs: null,
            membercount: null,
            autorole: null,
            antispam: null,
            owner: guild.owner.user.id,
            premium: false,
            welcome: {
                channel: null,
                msg: null,
                ifembed: false,
                embed: {
                    title: null,
                    description: null,
                    footer: null,
                    color: null,
                },
            },
        })

        const embed = new bot.embed()
        .setTitle(`I have joined a new guild! (\`${bot.guilds.cache.size}\`)`)
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .addFields(
            {
                name: '🛑 Name',
                value: `${guild.name}`,
                inline: true
            },
            {
                name: '🕵️‍♂️ Owner',
                value: `${guild.owner.user.tag}`,
                inline: true
            },
            {
                name: '📊 Members',
                value: `${guild.memberCount}`,
                inline: true
            },
            {
                name: '🌎 Region',
                value: `${guild.region}`,
                inline: true
            }
        )
        .setTimestamp()
        .setColor("ORANGE")
        bot.guilds.cache.get(process.env.GUILD_ID).channels.cache.get(process.env.GUILDS_ID).send(embed)
        const hello = new bot.embed()
        .setTitle(`Hello! \\👋`)
        .setAuthor(`Moderator`, bot.user.displayAvatarURL())
        .setDescription(`It appears I have joined your server! My default prefix is \`${process.env.PREFIX}\`\n\n Here is the dashboard: [Dashboard](http://discord-moderator.com:5000)\n\nHave fun!`)
        .setColor('ORANGE')
        guild.owner.send(hello)
    }
}