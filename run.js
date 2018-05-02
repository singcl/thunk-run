function run(gen) {
    var g = gen();

    function next(err, data) {
        try {
            var result = err ? g.throw(err) : g.next(data);
            console.log(result);
            if(result.done) return;
            result.value(next);
        } catch (error) {
            console.log('Generator外捕获错误：', error);
        }
    }

    next();
}

module.exports = run;
