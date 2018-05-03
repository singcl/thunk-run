function run(gen) {
    var g = gen();
    var result = g.next();

    function next() {

        console.log(result);
        if (result.done) return;

        result.value.then(function (v) {
            result = g.next(v);
            next();
        }).catch(function (e) {
            try {
                result = g.throw(e);
                next();
            } catch (error) {
                console.log('Generator外捕获错误：', error);
            }
        });
    }

    next();
}

module.exports = run;