function run(gen) {
    var g = gen();

    function next(err, data) {
        var result = g.next(data);
        if(result.done) return;
        result.value(next);
    }

    next();
}

module.exports = run;
