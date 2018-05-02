/**
 * 专为Generator Function 设计的Thunkify 函数
 * @param {Function} fn 需要thunkify 的目标函数
 * @see https://github.com/tj/node-thunkify 
 */
function thunkify(fn) {
    return function() {
        var args = new Array(arguments.length);
        var ctx = this;

        for (var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }

        return function(done) {
            var called;

            args.push(function() {
                if (called) return;
                called = true;
                done.apply(null, arguments);
            });

            try {
                fn.apply(ctx, args);
            } catch (error) {
                done(error);
            }
        };
    };
}

module.exports = thunkify;
