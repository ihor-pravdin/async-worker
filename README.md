# async-worker
Async worker for running iterator on the current event loop with "*down/up execution stream*". 
Package has zero dependencies and works in browser as well.

## Usage

Functions that called with `yield` keyword inside generators should take only one argument **callback**. 
Use `curry` and `callbackify` helpers to make suitable functions with single **callback** arg.  

```js:./test/example.js
const {Worker, curry, callbackify} = require('../src/index');

// callback function
const cfn = (str, callback) => {
    const timeout = Math.floor(Math.random() * 500) + 500; // random int from 500 to 1000
    setTimeout(() => {
        console.log(str);
        return timeout > 950 // returns error if 'timeout' > 950
            ? callback(new Error(`Timeout error '${timeout}'.`))
            : callback(null, {str, timeout});
    }, timeout);
};

// promise function
const pfn = (str) => {
    const timeout = Math.floor(Math.random() * 500) + 500; // random int from 500 to 1000
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(str);
            return timeout > 950 // returns error if 'timeout' > 950
                ? reject(new Error(`Timeout error '${timeout}'.`))
                : resolve({str, timeout});
        }, timeout);
    });
};

const fn1 = curry(null, cfn, 'fn1'); // or cfn.bind(null, 'fn1')
const fn2 = callbackify(null, pfn, 'fn2');
const fn3 = curry(null, cfn, 'fn3');
const fn4 = callbackify(null, pfn, 'fn4');
const fn5 = curry(null, cfn, 'fn5');

const workerContext = {};

const worker = new Worker('example', [

    function* (next) {
        this.result1 = yield fn1;
        yield next;
        this.result5 = yield fn5;
    },

    function* (next) {
        this.result2 = yield fn2;
        yield next;
        this.result4 = yield fn4;
    },

    function* () {
        this.result3 = yield fn3;
    }

]);

worker.run(workerContext, function (err, ctx) {
    if (err) {
        console.log('Error: ', err);
    }
    console.log('Context: ', ctx || workerContext);
});

// Success:
//
// fn1
// fn2
// fn3
// fn4
// fn5
// Context:  {
//     result1: { str: 'fn1', timeout: 792 },```
