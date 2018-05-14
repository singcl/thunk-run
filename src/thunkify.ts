type callback = (err: any, ...args: any[]) => void;
type SrcFunc = (...args: any[]) => void;

/**
 * 专为Generator Function 设计的thunk 函数
 * Thunk 函数有什么用？回答是以前确实没什么用
 * 但是 ES6 有了 Generator 函数，Thunk 函数现在可以用于 Generator 函数的自动流程管理。
 *
 * @param {Function} fn 需要thunk 的目标函数
 * @see https://github.com/tj/node-thunkify
 */
function thunk(fn: SrcFunc): (...args: any[]) => (callback: callback) => void {
    return function(this: void, ...args: any[]) {
        const ctx = this;
        return function(done: callback): void {
            let called: boolean;

            args.push(function(...args2: any[]) {
                if (called) { return; }
                called = true;
                done.apply(null, args2);
            });

            try {
                fn.apply(ctx, args);
            } catch (error) {
                done(error);
            }
        };
    };
}

export = thunk;
