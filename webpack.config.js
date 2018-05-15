const path = require("path");

module.exports = [
    {
        mode: "development",
        entry: "./index.js",
        output: {
            path: path.join(__dirname, "dist"),
            filename: "bundle.js",
            libraryTarget: "umd",
            globalObject: "this"                 // 将顶层的全局对象指定为this. 浏览器环境下就是window node 环境下就是 global
        }
    },
    {
        mode: "production",
        entry: "./index.js",
        output: {
            path: path.join(__dirname, "dist"),
            filename: "bundle.min.js",
            libraryTarget: "umd",
            globalObject: "this"                  // 将顶层的全局对象指定为this. 浏览器环境下就是window node 环境下就是 global
        }
    }
];
