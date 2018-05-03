var fs = require('fs');
var path = require('path');

var promisify = require('../index').promisify;
var promisifyRun = require('../index').promisifyRun;

var reaFilePromisify = promisify(fs.readFile);
var filePath = path.resolve(__dirname, '../example/test.txt');

// Generator Thunk自动执行器单独为一个promisifyRun 模块

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

