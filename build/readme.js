const fs = require('node:fs');
const path = require('node:path');

const readmemd = fs.readFileSync(path.dirname(__dirname) + '/README.md', 'utf8');

// const paths = Array.from(readmemd.matchAll(/```js:(.*?)\r\s```/gs), m => m[1]);

// const scripts = paths.map(path => fs.readFileSync(path, 'utf8'));

const embedded = readmemd.replaceAll(/```js:(.*?)\r\s```/gs, (match, scriptPath) => {
    const script = fs.readFileSync(scriptPath, 'utf8');
    return '```\r\n' + script + '\r\n```';
});

console.log(embedded)

