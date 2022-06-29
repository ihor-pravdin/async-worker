/***
Embedding code into README.md from external file.

In README.md, write code block as follows:
```js:tests/src/sample.js
```
And, you can refer specific lines as
```js:tests/src/sample.js [4-5]
```

Then, this action links to tests/src/sample.js and modifies markdown.
***/

const fs = require('node:fs');
const path = require('node:path');

const readmemd = fs.readFileSync(path.dirname(__dirname) + '/README.md', 'utf8');

const regexp = /`{3}(\w*)?:((\.{0,2}[\/?\w]*\.?\w*\s*?) *\[?(\d+)?-?(\d+)?\]?(.*?)\s*)`{3}/gs;

const embedded = readmemd.replaceAll(regexp, (match, g1, g2, g3, g4, g5) => {
    const lang = g1;
    const scriptPath = g3;
    const script = path.resolve(path.dirname(__dirname), scriptPath);
    if (fs.existsSync(script)) {
        const code = fs.readFileSync(script, 'utf8');
        let start, end, chunk;
        switch (true) {
            case !!(g4 && g5):
                start = g4 - 1 < 0 ? 0 : g4 - 1;
                end = g5 - 1 <= start ? g5 : g5 - 1;
                chunk = code.split('\n').slice(start, end).join('\n');
                return '```' + lang + ':' + scriptPath + ' [' + g4 + '-' + g5 + ']' + '\n' + chunk + '```';
            case !!g4:
                start = g4 - 1 < 0 ? 0 : g4 - 1;
                chunk = code.split('\n').slice(start).join('\n');
                return '```' + lang + ':' + scriptPath + ' [' + g4 + ']' + '\n' + chunk + '```';
            default:
                return '```' + lang + ':' + scriptPath + '\n' + code + '```';
        }
    }
    return match;
});

fs.writeFileSync(path.dirname(__dirname) + '/README.md', embedded);
