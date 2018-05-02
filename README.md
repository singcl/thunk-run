## Thunk

### Usage
```js
var fs = require('fs');
var path = require('path');

var thunk = require('@singcl/thunk-run').thunk;
var run = require('@singcl/thunk-run').run;

var reaFileThunk = thunk(fs.readFile);
var filePath = path.resolve(__dirname, '../package.json');

// Generator Thunk自动执行器单独为一个run 模块
function* gen() {
    try {
        var r1 = yield reaFileThunk(filePath, 'utf8');
        console.log(r1);
        var r2 = yield reaFileThunk(filePath, 'utf8');
        console.log(r2);
    } catch (error) {
        console.log('Generator内捕获错误：', error);
    }
}

run(gen);
```