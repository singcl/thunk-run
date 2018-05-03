var fs = require('fs');
var path = require('path');

var thunkify = require('../index').thunkify;
var thunkifyRun = require('../index').thunkifyRun;

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
