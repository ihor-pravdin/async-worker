'use strict';

// HELPERS

const curry = (ctx, fn, ...args) => callback => fn.call(ctx, ...args, callback);

// WORKER

function Worker(name, tasks = []) {
    this.name = name;

    const _tasks = tasks; // private

    this.task = function (task) {
        _tasks.push(task);
        return this;
    };

    this.run = function (context, callback) {
        const tasks = _tasks[Symbol.iterator]();
        const iterators = [];

        const next = () => {
            const job = tasks.next();
            if (job.done) {
                return prev();
            }
            const iterator = job.value.call(context, next);
            iterators.unshift(iterator);
            const task = iterator.next();
            return task.done ? prev() : task.value(step.bind(null, iterator));
        };

        const prev = () => {
            const iterator = iterators.shift();
            if (!iterator) {
                return callback(null, context);
            }
            const task = iterator.next();
            return task.done ? prev() : task.value(step.bind(null, iterator));
        };

        const step = (iterator, err, value) => {
            if (err) {
                return callback(err);
            }
            const task = iterator.next(value);
            return task.done ? prev() : task.value.call(context, step.bind(null, iterator));
        };

        next();
    }
}

// EXPORTS

module.exports = {Worker, curry};
