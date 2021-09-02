const admin = require('firebase-admin');
const firebase = admin.firestore();
const log = require('./log')
/**
 * @param {import('discord.js').Guild} guild 
 * @returns {Promise<import('../utils/types').db>}
 */
module.exports = async (guild) => {
    //@ts-ignore
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
                disabled: [],
                owner: guild.ownerId,
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
    //@ts-ignore
    return db;
}