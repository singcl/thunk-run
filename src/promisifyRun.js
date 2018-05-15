"use strict";
function run(gen) {
    const g = gen();
    let result = g.next();
    function next(value) {
        console.log(result);
        if (result.done) {
            return;
        }
        result.value.then(function (v) {
            result = g.next(v);
            next();
        }).catch(function (e) {
            try {
                // 解决throw方法是一个可选方法引起的编译错误： https://github.com/Microsoft/TypeScript/issues/10642
                const methodThrow = g.throw;
                if (methodThrow) { // <-- methodThrow is of type IteratorResult<T>|undefined
                    result = methodThrow(e); // <-- methodThrow is of type IteratorResult<T>
                }
                else {
                    throw e;
                }
                next();
            }
            catch (error) {
                console.log("Generator外捕获错误：", error);
            }
        });
    }
    next();
}
module.exports = run;
