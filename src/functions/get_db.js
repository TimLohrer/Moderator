const admin = require('firebase-admin');
const firebase = admin.firestore();
const log = require('./log')

module.exports = async (guild) => {
    if (!guild || !guild.id) { return log(`Missing guild object!`, `src/functions/get_db.js`, 'ERROR')}
    let data = await firebase.collection('guilds').doc(guild.id).get()
    let db = data.data()
    if (!db) {
        await firebase.collection('guilds').doc(guild.id).set({
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
        data = await firebase.collection('guilds').doc(guild.id).get()
        db = data.data()
    }
    return db;
}