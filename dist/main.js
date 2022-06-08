/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dom": () => (/* binding */ dom)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");
/* harmony import */ var _markups__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./markups */ "./src/markups.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");





var dom = function () {
  var player = new _player__WEBPACK_IMPORTED_MODULE_2__["default"]("Elvinas");
  var computer = new _player__WEBPACK_IMPORTED_MODULE_2__["default"]("AI");
  var main = document.querySelector("main");
  var player1Board;
  var guessesArray = [];
  var player2Board;

  var init = function init() {
    for (var i = 0; i < 100; i++) {
      guessesArray.push(i);
    }

    _game__WEBPACK_IMPORTED_MODULE_0__.game.init(player, computer);
    displayBoards();
  };

  var displayBoards = function displayBoards() {
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(_game__WEBPACK_IMPORTED_MODULE_0__.game.player.gameBoard, "YOUR BOARD", "PLAYER1", true));
    main.insertAdjacentHTML("beforeEnd", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(_game__WEBPACK_IMPORTED_MODULE_0__.game.computer.gameBoard, "COMPUTERS'S BOARD", "PLAYER2", false));
    player1Board = document.getElementById("PLAYER1");
    player2Board = document.getElementById("PLAYER2");
    player2Board.addEventListener("click", function (e) {
      console.log(e.target);

      if (!e.target.classList.contains("hit")) {
        _game__WEBPACK_IMPORTED_MODULE_0__.game.computer.gameBoard.receiveAttack(e.target.dataset.index);
        displayBoards();
        setTimeout(function () {
          _game__WEBPACK_IMPORTED_MODULE_0__.game.player.gameBoard.receiveAttack(_helpers__WEBPACK_IMPORTED_MODULE_3__.helpers.randomGuess(guessesArray));
          displayBoards();
        }, 200);
      }
    });
  };

  return {
    init: init
  };
}();



/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "game": () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");



var game = function () {
  var player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]("Elvinas");
  var computer = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]("AI");

  var init = function init() {
    player.gameBoard.placeShip(2, new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]("Carrier"), "y", 5);
    player.gameBoard.placeShip(15, new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]("Battleship"), "x", 4);
    player.gameBoard.placeShip(23, new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]("Cruiser"), "x", 3);
    player.gameBoard.placeShip(45, new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]("Submarine"), "x", 3);
    player.gameBoard.placeShip(65, new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]("Destroyer"), "x", 2);
    computer.gameBoard.placeShip(2, new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]("Carrier"), "x", 5);
    computer.gameBoard.placeShip(15, new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]("Battleship"), "x", 4);
    computer.gameBoard.placeShip(23, new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]("Cruiser"), "x", 3);
    computer.gameBoard.placeShip(45, new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]("Submarine"), "x", 3);
    computer.gameBoard.placeShip(65, new _ship__WEBPACK_IMPORTED_MODULE_1__["default"]("Destroyer"), "x", 2);
  };

  return {
    init: init,
    player: player,
    computer: computer
  };
}();



/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");



/* eslint-disable no-plusplus */
var Gameboard = /*#__PURE__*/function () {
  function Gameboard() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Gameboard);

    this.board = [];
    this.ships = [];

    for (var i = 0; i < 100; i++) {
      this.board.push(false);
    }
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Gameboard, [{
    key: "placeShip",
    value: function placeShip(coord, ship, axis, length) {
      var temp = coord;

      for (var i = 0; i < length; i++) {
        ship.location.push(temp);
        temp += axis.toLowerCase() === "x" ? 1 : 10;
      }

      this.ships.push(ship);
    }
  }, {
    key: "receiveAttack",
    value: function receiveAttack(coord) {
      this.board[coord] = true;

      if (this.isShip(coord)) {
        this.hitShip(coord);
      }
    }
  }, {
    key: "isShip",
    value: function isShip(coord) {
      return this.ships.some(function (x) {
        return x.location.includes(coord);
      });
    }
  }, {
    key: "hitShip",
    value: function hitShip(coord) {
      this.ships.find(function (x) {
        return x.location.includes(coord);
      }).hits.push(coord);
    }
  }, {
    key: "isAllSunk",
    value: function isAllSunk() {
      return this.ships.every(function (x) {
        return x.isSunk();
      });
    }
  }, {
    key: "getShipsCoords",
    value: function getShipsCoords() {
      var arr = [];

      for (var i = 0; i < 100; i++) {
        if (this.isShip(i)) arr.push(i);
      }

      return arr;
    }
  }, {
    key: "checkIfCollided",
    value: function checkIfCollided(coord, axis, length) {
      var _this = this;

      var tempCoord = coord;
      var arr = [];

      for (var i = 0; i < length; i++) {
        arr.push(tempCoord);
        tempCoord += axis.toLowerCase() === "x" ? 1 : 10;
      }

      return arr.some(function (x) {
        return _this.ships.some(function (ship) {
          return ship.location.includes(x);
        });
      });
    }
  }]);

  return Gameboard;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "helpers": () => (/* binding */ helpers)
/* harmony export */ });
var helpers = function () {
  var randomGuess = function randomGuess(array) {
    var random = array[Math.floor(Math.random() * array.length)];
    return array.splice(random, 1);
  };

  return {
    randomGuess: randomGuess
  };
}();



/***/ }),

/***/ "./src/markups.js":
/*!************************!*\
  !*** ./src/markups.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "markups": () => (/* binding */ markups)
/* harmony export */ });
var markups = function () {
  var counter = 0;

  var getGameboard = function getGameboard(gameboard, header, id, toSeeShips) {
    var shipsArray = [];
    counter = 0;
    var gameBoardCells = [];

    for (var i = 0, len = gameboard.board.length; i < len; i += 10) {
      gameBoardCells.push(gameboard.board.slice(i, i + 10));
    }

    shipsArray = gameboard.getShipsCoords();
    return "<div class=\"wrapper\"><h2>".concat(header, "</h2><div class=\"gameboard_container\" id=\"").concat(id, "\">").concat(gameBoardCells.map(function (line) {
      return gameboardLineMarkup(line, shipsArray, toSeeShips);
    }).join(""), "</div></div>");
  };

  var gameboardLineMarkup = function gameboardLineMarkup(line, shipsArray, toSeeShips) {
    return "<div class=\"gameboard_line\">".concat(line.map(function (cell) {
      return "".concat(gameboardCellMarkup(shipsArray.includes(counter), cell, toSeeShips));
    }).join(""), "</div>");
  };

  var gameboardCellMarkup = function gameboardCellMarkup(ship, hit, toSeeShips) {
    counter += 1;
    return "<div class=\"gameboard_cell ".concat(ship && toSeeShips ? "ship" : "", " ").concat(hit ? "hit" : "", " ").concat(!toSeeShips && ship && hit ? "enemy-ship-hit" : "", "\" data-index=\"").concat(counter - 1, "\"></div>");
  };

  return {
    getGameboard: getGameboard
  };
}();



/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");




var Player = /*#__PURE__*/function () {
  function Player(name) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Player);

    this.name = name;
    this.gameBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_2__["default"]();
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Player, [{
    key: "attack",
    value: function attack(enemy, location) {
      enemy.gameBoard.receiveAttack(location);
    }
  }]);

  return Player;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");



var Ship = /*#__PURE__*/function () {
  function Ship(name) {
    var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Ship);

    this.name = name;
    this.location = location;
    this.hits = [];
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Ship, [{
    key: "hit",
    value: function hit(index) {
      this.hits.push(index);
    }
  }, {
    key: "isSunk",
    value: function isSunk() {
      var _this = this;

      return this.location.every(function (cell) {
        return _this.hits.includes(cell);
      });
    }
  }]);

  return Ship;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-color: #0c0a3e;\n  color: #eee;\n  font-family: \"Roboto\", sans-serif;\n  min-height: 100vh;\n  max-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n  max-width: 100vw;\n}\nheader,\nfooter {\n  height: 80px;\n  background-color: #383663;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  gap: 20px;\n  width: 100%;\n}\nmain {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n  align-items: center;\n  height: calc(100vh - 160px);\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.gameboard_container {\n  width: 600px;\n  height: 600px;\n}\n.gameboard_line {\n  width: 100%;\n  display: flex;\n  height: 10%;\n  border-collapse: collapse;\n}\n.gameboard_cell {\n  background-color: white;\n  height: 100%;\n  width: 100%;\n  border: 1px solid black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship {\n  background: green;\n}\n.hit::after {\n  position: absolute;\n  content: \"\";\n  background-color: red;\n  width: 15px;\n  height: 15px;\n  border-radius: 8px;\n  pointer-events: none;\n}\n.enemy-ship-hit {\n  background-color: rgb(65, 20, 20);\n}\nfooter {\n  margin-top: auto;\n}\nfooter > a > img:hover {\n  filter: opacity(0.7);\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AACA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;AACA;EACE,yBAAyB;EACzB,WAAW;EACX,iCAAiC;EACjC,iBAAiB;EACjB,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;EACjB,gBAAgB;AAClB;AACA;;EAEE,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,eAAe;EACf,SAAS;EACT,WAAW;AACb;AACA;EACE,aAAa;EACb,SAAS;EACT,uBAAuB;EACvB,mBAAmB;EACnB,2BAA2B;AAC7B;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;EACT,eAAe;AACjB;AACA;EACE,YAAY;EACZ,aAAa;AACf;AACA;EACE,WAAW;EACX,aAAa;EACb,WAAW;EACX,yBAAyB;AAC3B;AACA;EACE,uBAAuB;EACvB,YAAY;EACZ,WAAW;EACX,uBAAuB;EACvB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,qBAAqB;EACrB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;AACtB;AACA;EACE,iCAAiC;AACnC;AACA;EACE,gBAAgB;AAClB;AACA;EACE,oBAAoB;AACtB","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap\");\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-color: #0c0a3e;\n  color: #eee;\n  font-family: \"Roboto\", sans-serif;\n  min-height: 100vh;\n  max-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n  max-width: 100vw;\n}\nheader,\nfooter {\n  height: 80px;\n  background-color: #383663;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  gap: 20px;\n  width: 100%;\n}\nmain {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n  align-items: center;\n  height: calc(100vh - 160px);\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.gameboard_container {\n  width: 600px;\n  height: 600px;\n}\n.gameboard_line {\n  width: 100%;\n  display: flex;\n  height: 10%;\n  border-collapse: collapse;\n}\n.gameboard_cell {\n  background-color: white;\n  height: 100%;\n  width: 100%;\n  border: 1px solid black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship {\n  background: green;\n}\n.hit::after {\n  position: absolute;\n  content: \"\";\n  background-color: red;\n  width: 15px;\n  height: 15px;\n  border-radius: 8px;\n  pointer-events: none;\n}\n.enemy-ship-hit {\n  background-color: rgb(65, 20, 20);\n}\nfooter {\n  margin-top: auto;\n}\nfooter > a > img:hover {\n  filter: opacity(0.7);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");


_dom__WEBPACK_IMPORTED_MODULE_1__.dom.init();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUNmZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0pBO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7Ozs7OztVQ2pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQTlCLDBDQUFBLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9oZWxwZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFya3Vwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgbWFya3VwcyB9IGZyb20gXCIuL21hcmt1cHNcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBoZWxwZXJzIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuY29uc3QgZG9tID0gKCgpID0+IHtcbiAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihcIkVsdmluYXNcIik7XG4gIGNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcihcIkFJXCIpO1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gIGxldCBwbGF5ZXIxQm9hcmQ7XG4gIGxldCBndWVzc2VzQXJyYXkgPSBbXTtcbiAgbGV0IHBsYXllcjJCb2FyZDtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGd1ZXNzZXNBcnJheS5wdXNoKGkpO1xuICAgIH1cbiAgICBnYW1lLmluaXQocGxheWVyLCBjb21wdXRlcik7XG4gICAgZGlzcGxheUJvYXJkcygpO1xuICB9O1xuICBjb25zdCBkaXNwbGF5Qm9hcmRzID0gKCkgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBtYWluLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgIFwiYWZ0ZXJiZWdpblwiLFxuICAgICAgbWFya3Vwcy5nZXRHYW1lYm9hcmQoZ2FtZS5wbGF5ZXIuZ2FtZUJvYXJkLCBcIllPVVIgQk9BUkRcIiwgXCJQTEFZRVIxXCIsIHRydWUpXG4gICAgKTtcbiAgICBtYWluLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgIFwiYmVmb3JlRW5kXCIsXG4gICAgICBtYXJrdXBzLmdldEdhbWVib2FyZChcbiAgICAgICAgZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQsXG4gICAgICAgIFwiQ09NUFVURVJTJ1MgQk9BUkRcIixcbiAgICAgICAgXCJQTEFZRVIyXCIsXG4gICAgICAgIGZhbHNlXG4gICAgICApXG4gICAgKTtcbiAgICBwbGF5ZXIxQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlBMQVlFUjFcIik7XG4gICAgcGxheWVyMkJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJQTEFZRVIyXCIpO1xuICAgIHBsYXllcjJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcbiAgICAgIGlmICghZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpKSB7XG4gICAgICAgIGdhbWUuY29tcHV0ZXIuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soZS50YXJnZXQuZGF0YXNldC5pbmRleCk7XG4gICAgICAgIGRpc3BsYXlCb2FyZHMoKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZ2FtZS5wbGF5ZXIuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soXG4gICAgICAgICAgICBoZWxwZXJzLnJhbmRvbUd1ZXNzKGd1ZXNzZXNBcnJheSlcbiAgICAgICAgICApO1xuICAgICAgICAgIGRpc3BsYXlCb2FyZHMoKTtcbiAgICAgICAgfSwgMjAwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4geyBpbml0IH07XG59KSgpO1xuZXhwb3J0IHsgZG9tIH07XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuY29uc3QgZ2FtZSA9ICgoKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoXCJFbHZpbmFzXCIpO1xuICBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJBSVwiKTtcbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBwbGF5ZXIuZ2FtZUJvYXJkLnBsYWNlU2hpcCgyLCBuZXcgU2hpcChcIkNhcnJpZXJcIiksIFwieVwiLCA1KTtcbiAgICBwbGF5ZXIuZ2FtZUJvYXJkLnBsYWNlU2hpcCgxNSwgbmV3IFNoaXAoXCJCYXR0bGVzaGlwXCIpLCBcInhcIiwgNCk7XG4gICAgcGxheWVyLmdhbWVCb2FyZC5wbGFjZVNoaXAoMjMsIG5ldyBTaGlwKFwiQ3J1aXNlclwiKSwgXCJ4XCIsIDMpO1xuICAgIHBsYXllci5nYW1lQm9hcmQucGxhY2VTaGlwKDQ1LCBuZXcgU2hpcChcIlN1Ym1hcmluZVwiKSwgXCJ4XCIsIDMpO1xuICAgIHBsYXllci5nYW1lQm9hcmQucGxhY2VTaGlwKDY1LCBuZXcgU2hpcChcIkRlc3Ryb3llclwiKSwgXCJ4XCIsIDIpO1xuXG4gICAgY29tcHV0ZXIuZ2FtZUJvYXJkLnBsYWNlU2hpcCgyLCBuZXcgU2hpcChcIkNhcnJpZXJcIiksIFwieFwiLCA1KTtcbiAgICBjb21wdXRlci5nYW1lQm9hcmQucGxhY2VTaGlwKDE1LCBuZXcgU2hpcChcIkJhdHRsZXNoaXBcIiksIFwieFwiLCA0KTtcbiAgICBjb21wdXRlci5nYW1lQm9hcmQucGxhY2VTaGlwKDIzLCBuZXcgU2hpcChcIkNydWlzZXJcIiksIFwieFwiLCAzKTtcbiAgICBjb21wdXRlci5nYW1lQm9hcmQucGxhY2VTaGlwKDQ1LCBuZXcgU2hpcChcIlN1Ym1hcmluZVwiKSwgXCJ4XCIsIDMpO1xuICAgIGNvbXB1dGVyLmdhbWVCb2FyZC5wbGFjZVNoaXAoNjUsIG5ldyBTaGlwKFwiRGVzdHJveWVyXCIpLCBcInhcIiwgMik7XG4gIH07XG4gIHJldHVybiB7IGluaXQsIHBsYXllciwgY29tcHV0ZXIgfTtcbn0pKCk7XG5leHBvcnQgeyBnYW1lIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvYXJkID0gW107XG4gICAgdGhpcy5zaGlwcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIHRoaXMuYm9hcmQucHVzaChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcGxhY2VTaGlwKGNvb3JkLCBzaGlwLCBheGlzLCBsZW5ndGgpIHtcbiAgICBsZXQgdGVtcCA9IGNvb3JkO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHNoaXAubG9jYXRpb24ucHVzaCh0ZW1wKTtcbiAgICAgIHRlbXAgKz0gYXhpcy50b0xvd2VyQ2FzZSgpID09PSBcInhcIiA/IDEgOiAxMDtcbiAgICB9XG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZCkge1xuICAgIHRoaXMuYm9hcmRbY29vcmRdID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5pc1NoaXAoY29vcmQpKSB7XG4gICAgICB0aGlzLmhpdFNoaXAoY29vcmQpO1xuICAgIH1cbiAgfVxuXG4gIGlzU2hpcChjb29yZCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBzLnNvbWUoKHgpID0+IHgubG9jYXRpb24uaW5jbHVkZXMoY29vcmQpKTtcbiAgfVxuXG4gIGhpdFNoaXAoY29vcmQpIHtcbiAgICB0aGlzLnNoaXBzLmZpbmQoKHgpID0+IHgubG9jYXRpb24uaW5jbHVkZXMoY29vcmQpKS5oaXRzLnB1c2goY29vcmQpO1xuICB9XG5cbiAgaXNBbGxTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBzLmV2ZXJ5KCh4KSA9PiB4LmlzU3VuaygpKTtcbiAgfVxuXG4gIGdldFNoaXBzQ29vcmRzKCkge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmlzU2hpcChpKSkgYXJyLnB1c2goaSk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBjaGVja0lmQ29sbGlkZWQoY29vcmQsIGF4aXMsIGxlbmd0aCkge1xuICAgIGxldCB0ZW1wQ29vcmQgPSBjb29yZDtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIucHVzaCh0ZW1wQ29vcmQpO1xuICAgICAgdGVtcENvb3JkICs9IGF4aXMudG9Mb3dlckNhc2UoKSA9PT0gXCJ4XCIgPyAxIDogMTA7XG4gICAgfVxuICAgIHJldHVybiBhcnIuc29tZSgoeCkgPT5cbiAgICAgIHRoaXMuc2hpcHMuc29tZSgoc2hpcCkgPT4gc2hpcC5sb2NhdGlvbi5pbmNsdWRlcyh4KSlcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IGhlbHBlcnMgPSAoKCkgPT4ge1xuICBjb25zdCByYW5kb21HdWVzcyA9IChhcnJheSkgPT4ge1xuICAgIGxldCByYW5kb20gPSBhcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnJheS5sZW5ndGgpXTtcbiAgICByZXR1cm4gYXJyYXkuc3BsaWNlKHJhbmRvbSwgMSk7XG4gIH07XG5cbiAgcmV0dXJuIHsgcmFuZG9tR3Vlc3MgfTtcbn0pKCk7XG5leHBvcnQgeyBoZWxwZXJzIH07XG4iLCJjb25zdCBtYXJrdXBzID0gKCgpID0+IHtcbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoZ2FtZWJvYXJkLCBoZWFkZXIsIGlkLCB0b1NlZVNoaXBzKSA9PiB7XG4gICAgbGV0IHNoaXBzQXJyYXkgPSBbXTtcbiAgICBjb3VudGVyID0gMDtcbiAgICBjb25zdCBnYW1lQm9hcmRDZWxscyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBnYW1lYm9hcmQuYm9hcmQubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEwKSB7XG4gICAgICBnYW1lQm9hcmRDZWxscy5wdXNoKGdhbWVib2FyZC5ib2FyZC5zbGljZShpLCBpICsgMTApKTtcbiAgICB9XG4gICAgc2hpcHNBcnJheSA9IGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkcygpO1xuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj48aDI+JHtoZWFkZXJ9PC9oMj48ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2NvbnRhaW5lclwiIGlkPVwiJHtpZH1cIj4ke2dhbWVCb2FyZENlbGxzXG4gICAgICAubWFwKChsaW5lKSA9PiBnYW1lYm9hcmRMaW5lTWFya3VwKGxpbmUsIHNoaXBzQXJyYXksIHRvU2VlU2hpcHMpKVxuICAgICAgLmpvaW4oXCJcIil9PC9kaXY+PC9kaXY+YDtcbiAgfTtcbiAgY29uc3QgZ2FtZWJvYXJkTGluZU1hcmt1cCA9IChsaW5lLCBzaGlwc0FycmF5LCB0b1NlZVNoaXBzKSA9PlxuICAgIGA8ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2xpbmVcIj4ke2xpbmVcbiAgICAgIC5tYXAoXG4gICAgICAgIChjZWxsKSA9PlxuICAgICAgICAgIGAke2dhbWVib2FyZENlbGxNYXJrdXAoXG4gICAgICAgICAgICBzaGlwc0FycmF5LmluY2x1ZGVzKGNvdW50ZXIpLFxuICAgICAgICAgICAgY2VsbCxcbiAgICAgICAgICAgIHRvU2VlU2hpcHNcbiAgICAgICAgICApfWBcbiAgICAgIClcbiAgICAgIC5qb2luKFwiXCIpfTwvZGl2PmA7XG5cbiAgY29uc3QgZ2FtZWJvYXJkQ2VsbE1hcmt1cCA9IChzaGlwLCBoaXQsIHRvU2VlU2hpcHMpID0+IHtcbiAgICBjb3VudGVyICs9IDE7XG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2NlbGwgJHtzaGlwICYmIHRvU2VlU2hpcHMgPyBcInNoaXBcIiA6IFwiXCJ9ICR7XG4gICAgICBoaXQgPyBcImhpdFwiIDogXCJcIlxuICAgIH0gJHshdG9TZWVTaGlwcyAmJiBzaGlwICYmIGhpdCA/IFwiZW5lbXktc2hpcC1oaXRcIiA6IFwiXCJ9XCIgZGF0YS1pbmRleD1cIiR7XG4gICAgICBjb3VudGVyIC0gMVxuICAgIH1cIj48L2Rpdj5gO1xuICB9O1xuXG4gIHJldHVybiB7IGdldEdhbWVib2FyZCB9O1xufSkoKTtcbmV4cG9ydCB7IG1hcmt1cHMgfTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIGF0dGFjayhlbmVteSwgbG9jYXRpb24pIHtcbiAgICBlbmVteS5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhsb2NhdGlvbik7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBsb2NhdGlvbiA9IFtdKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBoaXQoaW5kZXgpIHtcbiAgICB0aGlzLmhpdHMucHVzaChpbmRleCk7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRpb24uZXZlcnkoKGNlbGwpID0+IHRoaXMuaGl0cy5pbmNsdWRlcyhjZWxsKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvOndnaHRANDAwOzcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYzBhM2U7XFxuICBjb2xvcjogI2VlZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgc2Fucy1zZXJpZjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG59XFxuaGVhZGVyLFxcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGdhcDogMjBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxNjBweCk7XFxufVxcbi53cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuLmdhbWVib2FyZF9jb250YWluZXIge1xcbiAgd2lkdGg6IDYwMHB4O1xcbiAgaGVpZ2h0OiA2MDBweDtcXG59XFxuLmdhbWVib2FyZF9saW5lIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG59XFxuLmdhbWVib2FyZF9jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGdyZWVuO1xcbn1cXG4uaGl0OjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbi5lbmVteS1zaGlwLWhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNjUsIDIwLCAyMCk7XFxufVxcbmZvb3RlciB7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbn1cXG5mb290ZXIgPiBhID4gaW1nOmhvdmVyIHtcXG4gIGZpbHRlcjogb3BhY2l0eSgwLjcpO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUNBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixXQUFXO0VBQ1gsaUNBQWlDO0VBQ2pDLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtBQUNsQjtBQUNBOztFQUVFLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLFNBQVM7RUFDVCxXQUFXO0FBQ2I7QUFDQTtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1QsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQiwyQkFBMkI7QUFDN0I7QUFDQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxZQUFZO0VBQ1osYUFBYTtBQUNmO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLFdBQVc7RUFDWCx5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osV0FBVztFQUNYLHVCQUF1QjtFQUN2QixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLHFCQUFxQjtFQUNyQixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixvQkFBb0I7QUFDdEI7QUFDQTtFQUNFLGlDQUFpQztBQUNuQztBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRSxvQkFBb0I7QUFDdEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoXFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvOndnaHRANDAwOzcwMCZkaXNwbGF5PXN3YXBcXFwiKTtcXG4qIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYzBhM2U7XFxuICBjb2xvcjogI2VlZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgc2Fucy1zZXJpZjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG59XFxuaGVhZGVyLFxcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGdhcDogMjBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxNjBweCk7XFxufVxcbi53cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuLmdhbWVib2FyZF9jb250YWluZXIge1xcbiAgd2lkdGg6IDYwMHB4O1xcbiAgaGVpZ2h0OiA2MDBweDtcXG59XFxuLmdhbWVib2FyZF9saW5lIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG59XFxuLmdhbWVib2FyZF9jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGdyZWVuO1xcbn1cXG4uaGl0OjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbi5lbmVteS1zaGlwLWhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNjUsIDIwLCAyMCk7XFxufVxcbmZvb3RlciB7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbn1cXG5mb290ZXIgPiBhID4gaW1nOmhvdmVyIHtcXG4gIGZpbHRlcjogb3BhY2l0eSgwLjcpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCB7IGRvbSB9IGZyb20gXCIuL2RvbVwiO1xuXG5kb20uaW5pdCgpO1xuIl0sIm5hbWVzIjpbImdhbWUiLCJtYXJrdXBzIiwiUGxheWVyIiwiaGVscGVycyIsImRvbSIsInBsYXllciIsImNvbXB1dGVyIiwibWFpbiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInBsYXllcjFCb2FyZCIsImd1ZXNzZXNBcnJheSIsInBsYXllcjJCb2FyZCIsImluaXQiLCJpIiwicHVzaCIsImRpc3BsYXlCb2FyZHMiLCJpbm5lckhUTUwiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJnZXRHYW1lYm9hcmQiLCJnYW1lQm9hcmQiLCJnZXRFbGVtZW50QnlJZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwiY29uc29sZSIsImxvZyIsInRhcmdldCIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwicmVjZWl2ZUF0dGFjayIsImRhdGFzZXQiLCJpbmRleCIsInNldFRpbWVvdXQiLCJyYW5kb21HdWVzcyIsIlNoaXAiLCJwbGFjZVNoaXAiLCJHYW1lYm9hcmQiLCJib2FyZCIsInNoaXBzIiwiY29vcmQiLCJzaGlwIiwiYXhpcyIsImxlbmd0aCIsInRlbXAiLCJsb2NhdGlvbiIsInRvTG93ZXJDYXNlIiwiaXNTaGlwIiwiaGl0U2hpcCIsInNvbWUiLCJ4IiwiaW5jbHVkZXMiLCJmaW5kIiwiaGl0cyIsImV2ZXJ5IiwiaXNTdW5rIiwiYXJyIiwidGVtcENvb3JkIiwiYXJyYXkiLCJyYW5kb20iLCJNYXRoIiwiZmxvb3IiLCJzcGxpY2UiLCJjb3VudGVyIiwiZ2FtZWJvYXJkIiwiaGVhZGVyIiwiaWQiLCJ0b1NlZVNoaXBzIiwic2hpcHNBcnJheSIsImdhbWVCb2FyZENlbGxzIiwibGVuIiwic2xpY2UiLCJnZXRTaGlwc0Nvb3JkcyIsIm1hcCIsImxpbmUiLCJnYW1lYm9hcmRMaW5lTWFya3VwIiwiam9pbiIsImNlbGwiLCJnYW1lYm9hcmRDZWxsTWFya3VwIiwiaGl0IiwibmFtZSIsImVuZW15Il0sInNvdXJjZVJvb3QiOiIifQ==