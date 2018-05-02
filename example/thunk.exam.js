var fs = require('fs');
var path = require('path');

/* eslint semi: ["warn", "never"] */

// 正常版本的readFile（多参数版本）
// fs.readFile(fileName, callback);

// Thunk-es5
+function () {
    var Thunk = require('../thunk-es5');

    var filePath = path.resolve(__dirname, './test.txt');
    var callback = function (err, data) {
        if (err) throw err;
        console.log(data);
    };

    // Thunk版本的readFile（单参数版本）
    var readFileThunk = Thunk(fs.readFile);
    readFileThunk(filePath, 'utf8')(callback);
}();

// Thunk-es6
!function () {
    var Thunk = require('../thunk-es6')

    var filePath = path.resolve(__dirname, './test.txt')
    var callback = function (err, data) {
        if (err) throw err
        console.log(data)
    }

    // Thunk版本的readFile（单参数版本）
    var readFileThunk = Thunk(fs.readFile)
    readFileThunk(filePath, 'utf8')(callback)
}();

// Thunk
(function () {
    var Thunk = require('../thunk')

    var filePath = path.resolve(__dirname, './test.txt')
    var callback = function (err, data) {
        if (err) throw err
        console.log(data)
    }

    // Thunk版本的readFile（单参数版本）
    var readFileThunk = Thunk(fs.readFile)
    readFileThunk(filePath, 'utf8')(callback)
})();
