"use strict";
const promisify = require("./src/promisify");
const promisifyRun = require("./src/promisifyRun");
const thunkify = require("./src/thunkify");
const thunkifyRun = require("./src/thunkifyRun");
module.exports = {
    promisify,
    promisifyRun,
    thunkify,
    thunkifyRun,
};
