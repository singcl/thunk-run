import promisify = require("./src/promisify");
import promisifyRun = require("./src/promisifyRun");
import thunkify = require("./src/thunkify");
import thunkifyRun = require("./src/thunkifyRun");
declare const _default: {
    promisify: typeof promisify;
    promisifyRun: typeof promisifyRun;
    thunkify: typeof thunkify;
    thunkifyRun: typeof thunkifyRun;
};
export = _default;
