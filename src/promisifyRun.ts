
function run(gen: () => IterableIterator<Promise<any>>): void {
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
                // 怎么做？
                result = g.throw(e);
                next();
            } catch (error) {
                console.log("Generator外捕获错误：", error);
            }
        });
    }

    next();
}

export = run;
