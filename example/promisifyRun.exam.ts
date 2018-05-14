import fs = require("fs");
import path = require("path");

import promisify = require("../src/promisify");
import promisifyRun = require("../src/promisifyRun");

// 这里也可以不写类型，类型推论会自动判断类型
const reaFilePromisify: (...args: any[]) => Promise<any> = promisify(fs.readFile);
const filePath: string = path.resolve(__dirname, "../example/test.txt");

// Generator Promise 自动执行器单独为一个 promisifyRun 模块

function* gen() {
    try {
        const r1: Promise<any> = yield reaFilePromisify(filePath, "utf8");
        console.log(r1);
        const r2: Promise<any> = yield reaFilePromisify(filePath, "utf8");
        console.log(r2);
    } catch (error) {
        console.log("Generator内捕获错误：", error);
    }
}

promisifyRun(gen);
