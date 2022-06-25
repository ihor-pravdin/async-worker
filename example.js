alert('awesome!')
// const {Worker, curry} = require('./worker');
// //import {Worker, curry} from './worker.js';
//
//
// const fn = (str, callback) => {
//     const timeout = Math.floor(Math.random() * 500) + 500;
//     setTimeout(() => {
//         console.log(str);
//         return timeout > 950
//             ? callback(new Error('Timeout error.'))
//             : callback(null, {str, timeout});
//     }, timeout);
// };
//
// const fn1 = curry(null, fn, 'fn1'); // or fn.bind(null, 'fn1')
// const fn2 = curry(null, fn, 'fn2');
// const fn3 = curry(null, fn, 'fn3');
// const fn4 = curry(null, fn, 'fn4');
// const fn5 = curry(null, fn, 'fn5');
//
// const workerContext = {};
//
// const worker = new Worker('example', [
//
//     function* (next) {
//         this.result1 = yield fn1;
//         yield next;
//         this.result5 = yield fn5;
//     },
//
//     function* (next) {
//         this.result2 = yield fn2;
//         yield next;
//         this.result4 = yield fn4;
//     },
//
//     function* () {
//         this.result3 = yield fn3;
//     }
//
// ]);
//
// worker.run(workerContext, function (err, ctx) {
//     if (err) {
//         console.log('Error: ', err);
//     }
//     console.log('Context: ', ctx || workerContext);
// });
//
// // Success:
// //
// // fn1
// // fn2
// // fn3
// // fn4
// // fn5
// // Context:  {
// //     result1: { str: 'fn1', timeout: 735 },
// //     result2: { str: 'fn2', timeout: 915 },
// //     result3: { str: 'fn3', timeout: 941 },
// //     result4: { str: 'fn4', timeout: 909 },
// //     result5: { str: 'fn5', timeout: 586 }
// // }
//
//
// // Fail:
// //
// // fn1
// // fn2
// // Error:  Error: Timeout error.
// //     at Timeout._onTimeout (/mnt/g/Workspace/async-worker/example.js:8:24)
// // at listOnTimeout (node:internal/timers:559:17)
// // at processTimers (node:internal/timers:502:7)
// // Context:  { result1: { str: 'fn1', timeout: 753 } }
