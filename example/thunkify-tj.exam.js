var fs = require('fs')
var path = require('path')
var thunkify = require('thunkify')

var filePath = path.resolve(__dirname, '../package.json')
var callback = function (err, data) {
    if (err) throw err
    console.log(data)
}

var readFileThunkify = thunkify(fs.readFile)
readFileThunkify(filePath, 'utf8')(callback)
