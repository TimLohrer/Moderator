module.exports = function ms(ms) {
    let time = "";
    let n = 0;
    if (ms >= 31536000000) {
        n = Math.floor(ms / 31536000000);
        time = `${n} year${n > 1 ? 's' : ''}`;
        ms -= n * 31536000000;
    }
    if (ms >= 2592000000) {
        n = Math.floor(ms / 2592000000);
        time += `${n} month${n > 1 ? 's' : ''} `;
        ms -= n * 2592000000;
    }
    if (ms >= 604800000) {
        n = Math.floor(ms / 604800000);
        time += `${n} week${n > 1 ? 's' : ''} `;
        ms -= n * 604800000;
    }
    if (ms >= 86400000) {
        n = Math.floor(ms / 86400000);
        time += `${n} day${n > 1 ? 's' : ''} `;
        ms -= n * 86400000;
    }
    if (ms >= 3600000) {
        n = Math.floor(ms / 3600000);
        time += `${n}h `;
        ms -= n * 3600000;
    }
    if (ms >= 60000) {
        n = Math.floor(ms / 60000);
        time += `${n}min `;
        ms -= n * 60000;
    }
    n = Math.ceil(ms / 1000);
    time += n === 0 ? '' : `${n}sec`;
    return time.trimEnd();
}