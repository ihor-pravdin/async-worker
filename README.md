# async-worker
Async worker for running iterator on the current event loop with "*down/up execution stream*". 
Package has zero dependencies and works in browser as well.

## Usage

Functions that called with `yield` keyword inside generators should take only one argument **callback**. 
Use `curry` and `callbackify` helpers to make suitable functions with single **callback** arg.  

```javascript:example.js
```

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./example.js) -->
<!-- MARKDOWN-AUTO-DOCS:END -->