
const express = require('express')
const app = express()
const port = 80
const bot = require('../../moderator')

app.get('/', (req, res) => {
  res.send(bot.channels.cache.values())
})

module.exports = function run() {
        app.listen(port, () => {
            console.log(`App listening at port ${port}`)
        })
}