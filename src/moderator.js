require('dotenv').config()
const Moderator = require('./utils/Moderator.js')
const fs = require('fs');
const admin = require('firebase-admin');
const dbAccount = require('./data/dbAccount.json');
admin.initializeApp({ credential: admin.credential.cert(dbAccount) });

const { Intents } = require('discord.js')
const bot = new Moderator({ intents: Object.values(Intents.FLAGS) })

console.clear()
bot.log('Starting...', 'src/moderator.js', 'INFO')
bot.log('Connected to Database', 'src/moderator.js', 'SUCCESS')
console.log(" ");

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
    if (!event.name) { return bot.log(`Missing event name!`, `src/events/${file}`, `ERROR`) } else {
	    bot.events.set(event.name, event);
        bot.log(`Loaded event ${event.name}`, `src/events/${file}`, 'SUCCESS')
        bot.on(event.name, (...args) => { event.execute(...args, bot, "RESTART") })
    }
}
console.log(" ");
const functionFiles = fs.readdirSync('./src/functions').filter(file => file.endsWith('.js'));
for (const file of functionFiles) {
    bot.log(`Loaded function ${file.split('.')[0]}`, `src/functions/${file}`, 'SUCCESS')
}

console.log(" ");
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const cmd = require(`./commands/${file}`);
    if (!cmd.name) { bot.log(`Missing command name!`, `src/commands/${file}`, `ERROR`) }
    else if (!cmd.category) { bot.log(`Missing command category!`, `src/commands/${file}`, `ERROR`) }
    else if (!cmd.description) { bot.log(`Missing command description!`, `src/commands/${file}`, `ERROR`) }
    else if (!cmd.usage) { bot.log(`Missing command usage!`, `src/commands/${file}`, `ERROR`) }
    else if (!cmd.example) { bot.log(`Missing command example!`, `src/commands/${file}`, `ERROR`) }
    else if (!cmd.id && cmd.name !== 'dev') { bot.log(`Missing command id!`, `src/commands/${file}`, `ERROR`) }
    else if (!cmd.execute) { bot.log(`Missing command execute!`, `src/commands/${file}`, `ERROR`) } else {
	    bot.commands.set(cmd.name, cmd);
        if (cmd.aliases && cmd.aliases !== []) { for (let alias of cmd.aliases) { bot.aliases.set(alias, cmd) } }
        bot.log(`Loaded command ${cmd.name}`, `src/commands/${file}`, 'SUCCESS')
    }
}

bot.login(process.env.TOKEN)

module.exports = bot;