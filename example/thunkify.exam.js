var fs = require('fs');
var path = require('path');

var thunkify = require('../thunkify');

var reaFileThunkify = thunkify(fs.readFile);
var filePath = path.resolve(__dirname, '../package.json');

// 使用thunkify函数 手动执行Generator
(function () {
    function* gen() {
        var r1 = yield reaFileThunkify(filePath, 'utf8');
        console.log(r1);
        var r2 = yield reaFileThunkify(filePath, 'utf8');
        console.log(r2);
    }

    var g = gen();
    var r1 = g.next();
    r1.value(function (err, data) {
        if (err) throw err;
        var r2 = g.next(data);
        r2.value(function (err, data) {
            if (err) throw err;
            g.next(data);
        });
    });
})();

// 使用thunkify函数 自动执行Generator
(function () {
    function run(gen) {
        var g = gen();

        function next(err, data) {
            var result = g.next(data);
            if(result.done) return;
            result.value(next);
        }

        next();
    }

    function* gen() {
        var r1 = yield reaFileThunkify(filePath, 'utf8');
        console.log(r1);
        var r2 = yield reaFileThunkify(filePath, 'utf8');
        console.log(r2);
    }

    run(gen);
})();

// Generator Thunk自动执行器单独为一个run 模块
(function() {
    var run = require('../run');

    function* gen() {
        var r1 = yield reaFileThunkify(filePath, 'utf8');
        console.log(r1);
        var r2 = yield reaFileThunkify(filePath, 'utf8');
        console.log(r2);
    }

    run(gen);
})();