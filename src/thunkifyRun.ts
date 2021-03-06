/// <reference path="../typings/index.d.ts" />

function run(gen: (...args: any[]) => IterableIterator<Thunk>) {
    const g = gen();

    function next(err?: any, data?: any) {
        try {
            // 解决throw方法是一个可选方法引起的编译错误： https://github.com/Microsoft/TypeScript/issues/10642
            const methodThrow = g.throw;
            if (methodThrow) {
                const result = err ? methodThrow.call(g, err) : g.next(data);
                console.log(result);
                if (result.done) { return; }
                result.value(next);
            }
        } catch (error) {
            console.log("Generator外捕获错误：", error);
        }
    }

    next();
}

export = run;
