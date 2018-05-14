import fs = require("fs");
import path = require("path");

import thunkify = require("../src/thunkify");
import thunkifyRun = require("../src/thunkifyRun");

const reaFileThunkify = thunkify(fs.readFile);
const filePath = path.resolve(__dirname, "../package.json");

// Generator Thunk 自动执行器单独为一个 thunkifyRun 模块

function* gen() {
    try {
        const r1 = yield reaFileThunkify(filePath, "utf8");
        console.log(r1);
        const r2 = yield reaFileThunkify(filePath, "utf8");
        console.log(r2);
    } catch (error) {
        console.log("Generator内捕获错误：", error);
    }
}

thunkifyRun(gen);
