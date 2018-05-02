/**
 * JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。
 * 在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，
 * 将其替换成一个只接受回调函数作为参数的单参数函数。
 * 任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的ES6 Thunk 函数转换器
 * 
 * Thunk 函数有什么用？回答是以前确实没什么用，
 * 但是 ES6 有了 Generator 函数，Thunk 函数现在可以用于 Generator 函数的自动流程管理。
 * 
 * @see http://es6.ruanyifeng.com/?search=x&x=0&y=0#docs/generator-async
 * @param {Function} fn 需要Thunk的函数
 */
/* eslint "semi": ["error","never"] */
var Thunk = (fn) => (...args) => (callback) => fn.call(this, ...args, callback)

/**
 * @module Thunk
 */
module.exports = Thunk

