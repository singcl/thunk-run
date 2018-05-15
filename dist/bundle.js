(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nconst promisify = __webpack_require__(/*! ./src/promisify */ \"./src/promisify.js\");\r\nconst promisifyRun = __webpack_require__(/*! ./src/promisifyRun */ \"./src/promisifyRun.js\");\r\nconst thunkify = __webpack_require__(/*! ./src/thunkify */ \"./src/thunkify.js\");\r\nconst thunkifyRun = __webpack_require__(/*! ./src/thunkifyRun */ \"./src/thunkifyRun.js\");\r\nmodule.exports = {\r\n    promisify,\r\n    promisifyRun,\r\n    thunkify,\r\n    thunkifyRun,\r\n};\r\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./src/promisify.js":
/*!**************************!*\
  !*** ./src/promisify.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/**\r\n * 基于回调的函数 promise 化\r\n * 用于 Generator 函数的自动流程管理的Promise 函数\r\n *\r\n * @param {Function} fn 需要promisify 的目标函数\r\n */\r\nfunction promisify(fn) {\r\n    return function (...args) {\r\n        const ctx = this;\r\n        return new Promise(function (resolve, reject) {\r\n            // 增加callback 函数参数大于等于3个兼容\r\n            // 当参数大于等于3个时 resolve 的data 是一个数组\r\n            args.push(function (err, ...args2) {\r\n                if (err) {\r\n                    return reject(err);\r\n                }\r\n                if (args2.length > 1) {\r\n                    resolve(args2);\r\n                }\r\n                else {\r\n                    resolve(args2[0]);\r\n                }\r\n            });\r\n            fn.apply(ctx, args);\r\n        });\r\n    };\r\n}\r\nmodule.exports = promisify;\r\n\n\n//# sourceURL=webpack:///./src/promisify.js?");

/***/ }),

/***/ "./src/promisifyRun.js":
/*!*****************************!*\
  !*** ./src/promisifyRun.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nfunction run(gen) {\r\n    const g = gen();\r\n    let result = g.next();\r\n    function next(value) {\r\n        console.log(result);\r\n        if (result.done) {\r\n            return;\r\n        }\r\n        result.value.then(function (v) {\r\n            result = g.next(v);\r\n            next();\r\n        }).catch(function (e) {\r\n            try {\r\n                // 解决throw方法是一个可选方法引起的编译错误： https://github.com/Microsoft/TypeScript/issues/10642\r\n                const methodThrow = g.throw;\r\n                if (methodThrow) { // <-- methodThrow is of type IteratorResult<T>|undefined\r\n                    result = methodThrow(e); // <-- methodThrow is of type IteratorResult<T>\r\n                }\r\n                else {\r\n                    throw e;\r\n                }\r\n                next();\r\n            }\r\n            catch (error) {\r\n                console.log(\"Generator外捕获错误：\", error);\r\n            }\r\n        });\r\n    }\r\n    next();\r\n}\r\nmodule.exports = run;\r\n\n\n//# sourceURL=webpack:///./src/promisifyRun.js?");

/***/ }),

/***/ "./src/thunkify.js":
/*!*************************!*\
  !*** ./src/thunkify.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/// <reference path=\"../typings/index.d.ts\" />\r\n/**\r\n * 专为Generator Function 设计的thunk 函数\r\n * Thunk 函数有什么用？回答是以前确实没什么用\r\n * 但是 ES6 有了 Generator 函数，Thunk 函数现在可以用于 Generator 函数的自动流程管理。\r\n *\r\n * @param {Function} fn 需要thunk 的目标函数\r\n * @see https://github.com/tj/node-thunkify\r\n */\r\nfunction thunk(fn) {\r\n    return function (...args) {\r\n        const ctx = this;\r\n        return function (done) {\r\n            let called;\r\n            args.push(function (...args2) {\r\n                if (called) {\r\n                    return;\r\n                }\r\n                called = true;\r\n                done.apply(null, args2);\r\n            });\r\n            try {\r\n                fn.apply(ctx, args);\r\n            }\r\n            catch (error) {\r\n                done(error);\r\n            }\r\n        };\r\n    };\r\n}\r\nmodule.exports = thunk;\r\n\n\n//# sourceURL=webpack:///./src/thunkify.js?");

/***/ }),

/***/ "./src/thunkifyRun.js":
/*!****************************!*\
  !*** ./src/thunkifyRun.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n/// <reference path=\"../typings/index.d.ts\" />\r\nfunction run(gen) {\r\n    const g = gen();\r\n    function next(err, data) {\r\n        try {\r\n            // 解决throw方法是一个可选方法引起的编译错误： https://github.com/Microsoft/TypeScript/issues/10642\r\n            const methodThrow = g.throw;\r\n            if (methodThrow) {\r\n                const result = err ? methodThrow(err) : g.next(data);\r\n                console.log(result);\r\n                if (result.done) {\r\n                    return;\r\n                }\r\n                result.value(next);\r\n            }\r\n        }\r\n        catch (error) {\r\n            console.log(\"Generator外捕获错误：\", error);\r\n        }\r\n    }\r\n    next();\r\n}\r\nmodule.exports = run;\r\n\n\n//# sourceURL=webpack:///./src/thunkifyRun.js?");

/***/ })

/******/ });
});