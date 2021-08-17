const consoleColors = {
    "SUCCESS": "\u001b[32m",
    "WARNING": "\u001b[33m",
    "ERROR": "\u001b[31m",
    "INFO": "\u001b[36m"
};
const now = new Date()
let h = now.getHours()
let min = now.getMinutes()
if (h < 10 || min < 10) {
    if (h < 10) { h = `0${h}` }
    if (min < 10) { min = `0${min}` }
}

module.exports = (content, path, type) => {
    console.log(`\u001b[33m[${h}:${min}] \u001b[36;1mModerator\u001b[0m\u001b[34m [${path}]\u001b[0m - ${consoleColors[type]}${content}\u001b[0m`);
}