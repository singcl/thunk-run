/**
 * 基于回调的函数 promise 化
 * 用于 Generator 函数的自动流程管理的Promise 函数
 *
 * @param {Function} fn 需要promisify 的目标函数
 */
declare function promisify(fn: (...args: any[]) => void): (...args: any[]) => Promise<any>;
export = promisify;
