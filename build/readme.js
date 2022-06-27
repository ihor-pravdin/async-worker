const fs = require('node:fs');
const path = require('node:path');

const readmemd = fs.readFileSync(path.dirname(__dirname) + '/README.md', 'utf8');

// console.log('readmemd:', readmemd);
console.log('test', ("```foo```" + readmemd).match(/```(\w*?)```/));

console.log('match', readmemd.match(/```(\w*?):(.*?)\r+\s+```/));
// const paths = Array.from(readmemd.matchAll(/```(\w*?):(.*?)\r+\s+```/gs));
// console.log('paths', paths);

const embedded = readmemd.replaceAll(/```(\w*?):(.*?)\r+\s+```/gs, (match, lang, scriptPath) => {
    const script = path.resolve(path.dirname(__dirname), scriptPath);
    if (fs.existsSync(script)) {
        const code = fs.readFileSync(script, 'utf8');
        return '```' + lang + ':' + scriptPath + '\r\n' + code + '```';
    }
    return  match;
});

// console.log('embedded:', embedded);

fs.writeFileSync(path.dirname(__dirname) + '/README.md', embedded);
