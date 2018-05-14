
function run(gen: (...args: any[]) => IterableIterator<Promise<any>>): void {
    const g = gen();
    let result = g.next();

    function next(value?: any): void {

        console.log(result);
        if (result.done) { return; }

        result.value.then(function(v: any): void {
            result = g.next(v);
            next();
        }).catch(function(e: any) {
            try {
                // 解决throw方法是一个可选方法引起的编译错误： https://github.com/Microsoft/TypeScript/issues/10642
                const methodThrow = g.throw;
                if (methodThrow) {                  // <-- methodThrow is of type IteratorResult<T>|undefined
                    result = methodThrow(e);        // <-- methodThrow is of type IteratorResult<T>
                } else {
                    throw e;
                }
                next();
            } catch (error) {
                console.log("Generator外捕获错误：", error);
            }
        });
    }

    next();
}

export = run;
