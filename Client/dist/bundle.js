/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ws = new WebSocket('ws://5d351354.ngrok.io');

function sendMessage(ws, type, payload) {
  try {
    if (ws instanceof WebSocket && ws.readyState === ws.OPEN) {
      var message = JSON.stringify(compileMessage(type, payload));
      ws.send(message);
    }
  } catch (e) {
    console.log("send message ERROR: ", e);
  }
}
function compileMessage(type, payload) {
  return { type: type, payload: payload };
}

var pingInterval = null;
var now = Date.now();
function startInterval() {
  pingInterval = setInterval(function () {
    now = Date.now();
    sendMessage(ws, "ping", {
      sent: now
    });
  }, 1000);
}

function pong(timeTaken) {
  console.log("ping: ", timeTaken);
}

var tickRate = Date.now();
function heavy(tick) {
  if (tick) {
    var _now = Date.now();
    console.log("tickRate: ", _now - tickRate);
    tickRate = Date.now();
  }

  for (var i = 0; i < 100; i++) {
    for (var j = 0; j < 100; j++) {
      var y = 0;
      y++;
      var r = "aaaa";
    }
  }
}

ws.onopen = function () {
  ws.onmessage = function (serverMessage) {
    try {
      var message = null;
      try {
        message = JSON.parse(serverMessage.data);
      } catch (e) {
        console.log("message parse ERROR: ", e);
      }
      switch (message.type) {
        case "pong":
          pong(message.payload.timeTaken);break;
        case "heavy":
          heavy(message.payload.tick);break;
        default:
          console.log("message: ", serverMessage);
      }
    } catch (e) {
      console.log("whooops: ", e);
    }
  };

  startInterval();
};

/***/ })
/******/ ]);