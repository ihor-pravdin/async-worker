const fs = require('node:fs');
const path = require('node:path');

const readmemd = fs.readFileSync(path.dirname(__dirname) + '/README.md', 'utf8');

const regexp = /`{3}(\w*?):((\.{0,2}[\/?\w]*\.?\w*\s*?)(.*?)\s*)`{3}/gs;

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
// console.log('match', readmemd.match(/`{3}(\w*?):(.*?)\s`{3}/gs));
// const paths = Array.from(readmemd.matchAll(/`{3}(\w*?):((\.{0,2}[\/?\w]*\.?\w*.*?).*?)\s`{3}/gs), m => m[3]);
// console.log('paths', paths);

const embedded = readmemd.replaceAll(regexp, (match, g1, g2, g3) => {
    const lang = g1;
    const scriptPath = g3;
    const script = path.resolve(path.dirname(__dirname), scriptPath);
    if (fs.existsSync(script)) {
        console.log('foo')
        const code = fs.readFileSync(script, 'utf8');
        return '```' + lang + ':' + scriptPath + '\n' + code + '```';
    }
    return match;
});

// console.log('embedded:', embedded);

fs.writeFileSync(path.dirname(__dirname) + '/README.md', embedded);
