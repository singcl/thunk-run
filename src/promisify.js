"use strict";
/**
 * 基于回调的函数 promise 化
 * 用于 Generator 函数的自动流程管理的Promise 函数
 *
 * @param {Function} fn 需要promisify 的目标函数
 */
function promisify(fn) {
    return function (...args) {
        const ctx = this;
        return new Promise(function (resolve, reject) {
            // 增加callback 函数参数大于等于3个兼容
            // 当参数大于等于3个时 resolve 的data 是一个数组
            args.push(function (err, ...args2) {
                if (err) {
                    return reject(err);
                }
                if (args2.length > 1) {
                    resolve(args2);
                }
                else {
                    resolve(args2[0]);
                }
            });
            fn.apply(ctx, args);
        });
    };
}
module.exports = promisify;
