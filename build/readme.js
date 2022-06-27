const fs = require('node:fs');
const path = require('node:path');

const readmemd = fs.readFileSync(path.dirname(__dirname) + '/README.md', 'utf8');

// console.log('readmemd:', readmemd);
// console.log('test', ("```foo```" + readmemd).match(/```(\w*?)```/));

// let foo = '```foo```# async-worker\n' +
//     'Async worker for running iterator on the current event loop with "*down/up execution stream*". \n' +
//     'Package has zero dependencies and works in browser as well.\n' +
//     '\n' +
//     '## Usage\n' +
//     '\n' +
//     'Functions that called with `yield` keyword inside generators should take only one argument **callback**. \n' +
//     'Use `curry` and `callbackify` helpers to make suitable functions with single **callback** arg.  \n' +
//     '\n' +
//     '```js:./test/example.js\n' +
//     '```'
//
// console.log('match', foo.match(/`{3}(\w*?):(.*?)\s*`{3}/));
// const paths = Array.from(readmemd.matchAll(/```(\w*?):(.*?)\r+\s+```/gs));
// console.log('paths', paths);

const embedded = readmemd.replaceAll(/`{3}(\w*?):(.*?)\s*`{3}/gs, (match, lang, scriptPath) => {
    const script = path.resolve(path.dirname(__dirname), scriptPath);
    if (fs.existsSync(script)) {
        const code = fs.readFileSync(script, 'utf8');
        return '```' + lang + ':' + scriptPath + '\r\n' + code + '```';
    }
    return  match;
});

// console.log('embedded:', embedded);

fs.writeFileSync(path.dirname(__dirname) + '/README.md', embedded);
