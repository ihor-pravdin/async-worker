const fs = require('node:fs');
const path = require('node:path');

const readmemd = fs.readFileSync(path.dirname(__dirname) + '/README.md', 'utf8');

// const paths = Array.from(readmemd.matchAll(/```(\w*?):(.*?)\r\s```/gs));
// console.log(paths);

const embedded = readmemd.replaceAll(/```(\w*?):(.*?)\r\s```/gs, (match, lang, scriptPath) => {
    const script = fs.readFileSync(scriptPath, 'utf8');
    return '```' + lang + ':' + scriptPath + '\r\n' + script + '```';
});

console.log(embedded);

fs.writeFileSync(path.dirname(__dirname) + '/README.md', embedded);
