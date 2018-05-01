var fs = require('fs');
var path = require('path');
var Thunk = require('../thunk-es5');

// 正常版本的readFile（多参数版本）
// fs.readFile(fileName, callback);

var filePath = path.resolve(__dirname, './test.txt');
var callback = function(err, data) {
    if (err) throw err;
    console.log(data);
};

// Thunk版本的readFile（单参数版本）
var readFileThunk = Thunk(fs.readFile);
readFileThunk(filePath, 'utf8')(callback);