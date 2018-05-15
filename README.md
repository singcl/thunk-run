## Thunkify Runner & Promisify Runner.

[![npm (scoped)](https://img.shields.io/npm/v/@singcl/thunk-run.svg?style=flat-square)](https://www.npmjs.com/package/@singcl/thunk-run)
![David](https://img.shields.io/david/dev/singcl/thunk-run.svg?style=flat-square)
![David](https://img.shields.io/david/singcl/thunk-run.svg?style=flat-square)
[![npm](https://img.shields.io/npm/dm/@singcl/thunk-run.svg?style=flat-square)](https://www.npmjs.com/package/@singcl/thunk-run)
![Github file size](https://img.shields.io/github/size/singcl/thunk-run/dist/bundle.min.js.svg?style=flat-square)

### Usage

#### `await` along with Thunkify function.
```js
var fs = require('fs');
var path = require('path');

var thunkify = require('@singcl/thunk-run').thunkify;
var thunkifyRun = require('@singcl/thunk-run').thunkifyRun;

var reaFileThunkify = thunkify(fs.readFile);
var filePath = path.resolve(__dirname, '../package.json');

// Generator Thunk自动执行器单独为一个thunkifyRun 模块

function* gen() {
    try {
        var r1 = yield reaFileThunkify(filePath, 'utf8');
        console.log(r1);
        var r2 = yield reaFileThunkify(filePath, 'utf8');
        console.log(r2);
    } catch (error) {
        console.log('Generator内捕获错误：', error);
    }
}

thunkifyRun(gen);
```

#### `await` along with Promisify function.
```js
var fs = require('fs');
var path = require('path');

var promisify = require('../index').promisify;
var promisifyRun = require('../index').promisifyRun;

var reaFilePromisify = promisify(fs.readFile);
var filePath = path.resolve(__dirname, '../example/test.txt');

// Generator Promise 自动执行器单独为一个 promisifyRun 模块

function* gen() {
    try {
        var r1 = yield reaFilePromisify(filePath, 'utf8');
        console.log(r1);
        var r2 = yield reaFilePromisify(filePath, 'utf8');
        console.log(r2);
    } catch (error) {
        console.log('Generator内捕获错误：', error);
    }
}

promisifyRun(gen);
```