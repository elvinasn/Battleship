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
  var modalContainer = document.querySelector("#modal-container");
  var player1Board;
  var guessesArray = [];
  var player2Board;

  var init = function init() {
    for (var i = 0; i < 100; i++) {
      guessesArray.push(i);
    }

    _game__WEBPACK_IMPORTED_MODULE_0__.game.init(player, computer);
    displayGameModes();
  };

  var displayBoards = function displayBoards() {
    main.innerHTML = "";
    main.insertAdjacentHTML("afterbegin", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(_game__WEBPACK_IMPORTED_MODULE_0__.game.player.gameBoard, "YOUR BOARD", "PLAYER1", true));
    main.insertAdjacentHTML("beforeEnd", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(_game__WEBPACK_IMPORTED_MODULE_0__.game.computer.gameBoard, "COMPUTERS'S BOARD", "PLAYER2", false));
    player1Board = document.getElementById("PLAYER1");
    player2Board = document.getElementById("PLAYER2");
    player2Board.addEventListener("click", function (e) {
      if (!e.target.classList.contains("hit") && e.target.classList.contains("gameboard_cell")) {
        _game__WEBPACK_IMPORTED_MODULE_0__.game.computer.gameBoard.receiveAttack(Number(e.target.dataset.index));
        displayBoards();

        if (_game__WEBPACK_IMPORTED_MODULE_0__.game.computer.gameBoard.isAllSunk()) {
          gameEndModal();
        }

        var random = _helpers__WEBPACK_IMPORTED_MODULE_3__.helpers.randomGuess(guessesArray);
        guessesArray = guessesArray.filter(function (x) {
          return x !== random;
        });
        _game__WEBPACK_IMPORTED_MODULE_0__.game.player.gameBoard.receiveAttack(random);

        if (_game__WEBPACK_IMPORTED_MODULE_0__.game.player.gameBoard.isAllSunk()) {
          gameEndModal();
        }

        displayBoards();
      }
    });
  };

  var displayGameModes = function displayGameModes() {
    main.innerHTML = "";
    var wrapper = document.createElement("div");
    wrapper.classList.add("gamemodes__wrapper");
    var header = document.createElement("p");
    header.textContent = "SELECT GAME MODE";
    wrapper.appendChild(header);
    var btn1 = document.createElement("button");
    btn1.textContent = "PLAYER VS AI";
    wrapper.appendChild(btn1);
    btn1.addEventListener("click", function () {});
    var btn2 = document.createElement("button");
    btn2.textContent = "PLAYER VS PLAYER";
    btn2.disabled = true;
    wrapper.appendChild(btn2);
    main.appendChild(wrapper);
  };

  var displayPlayerVSAIForm = function displayPlayerVSAIForm() {};

  var gameEndModal = function gameEndModal() {
    modalContainer.classList.add("show-modal");
    var modal = document.createElement("div");
    modal.classList.add("modal");
    var header = document.createElement("p");
    header.textContent = "".concat(_game__WEBPACK_IMPORTED_MODULE_0__.game.computer.gameBoard.isAllSunk() ? _game__WEBPACK_IMPORTED_MODULE_0__.game.player.name : _game__WEBPACK_IMPORTED_MODULE_0__.game.computer.name, " has won!");
    modal.appendChild(header);
    var btn = document.createElement("button");
    btn.textContent = "Play again";
    btn.addEventListener("click", function () {
      init();
      modalContainer.classList.remove("show-modal");
      modalContainer.innerHTML = "";
    });
    modal.appendChild(btn);
    modalContainer.appendChild(modal);
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
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ "./src/gameBoard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ship */ "./src/ship.js");




var game = function () {
  var player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]("Elvinas");
  var computer = new _player__WEBPACK_IMPORTED_MODULE_0__["default"]("AI");

  var init = function init() {
    player.gameBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_1__["default"]();
    computer.gameBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_1__["default"]();
    player.gameBoard.placeShip(2, new _ship__WEBPACK_IMPORTED_MODULE_2__["default"]("Carrier"), "y", 5);
    player.gameBoard.placeShip(15, new _ship__WEBPACK_IMPORTED_MODULE_2__["default"]("Battleship"), "x", 4);
    player.gameBoard.placeShip(23, new _ship__WEBPACK_IMPORTED_MODULE_2__["default"]("Cruiser"), "x", 3);
    player.gameBoard.placeShip(45, new _ship__WEBPACK_IMPORTED_MODULE_2__["default"]("Submarine"), "x", 3);
    player.gameBoard.placeShip(65, new _ship__WEBPACK_IMPORTED_MODULE_2__["default"]("Destroyer"), "x", 2);
    computer.gameBoard.placeShip(65, new _ship__WEBPACK_IMPORTED_MODULE_2__["default"]("Destroyer"), "x", 2);
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
    return random;
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-color: #0c0a3e;\n  color: #eee;\n  font-family: \"Roboto\", sans-serif;\n  min-height: 100vh;\n  max-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n  max-width: 100vw;\n}\nheader,\nfooter {\n  height: 80px;\n  background-color: #383663;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  gap: 20px;\n  width: 100%;\n}\nmain {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n  align-items: center;\n  height: calc(100vh - 160px);\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.gameboard_container {\n  width: 600px;\n  height: 600px;\n}\n.gameboard_line {\n  width: 100%;\n  display: flex;\n  height: 10%;\n  border-collapse: collapse;\n}\n.gameboard_cell {\n  background-color: white;\n  height: 100%;\n  width: 100%;\n  border: 1px solid black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship {\n  background: green;\n}\n.hit::after {\n  position: absolute;\n  content: \"\";\n  background-color: red;\n  width: 15px;\n  height: 15px;\n  border-radius: 8px;\n  pointer-events: none;\n}\n.enemy-ship-hit {\n  background-color: rgb(65, 20, 20);\n}\nfooter {\n  margin-top: auto;\n}\nfooter > a > img:hover {\n  filter: opacity(0.7);\n}\n.modal__container {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s ease;\n}\n.show-modal {\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.modal {\n  background-color: #fff;\n  width: 600px;\n  max-width: 100%;\n  padding: 15px;\n  border-radius: 5px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  z-index: 1;\n}\n.gamemodes__wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AACA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;AACA;EACE,yBAAyB;EACzB,WAAW;EACX,iCAAiC;EACjC,iBAAiB;EACjB,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;EACjB,gBAAgB;AAClB;AACA;;EAEE,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,eAAe;EACf,SAAS;EACT,WAAW;AACb;AACA;EACE,aAAa;EACb,SAAS;EACT,uBAAuB;EACvB,mBAAmB;EACnB,2BAA2B;AAC7B;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;EACT,eAAe;AACjB;AACA;EACE,YAAY;EACZ,aAAa;AACf;AACA;EACE,WAAW;EACX,aAAa;EACb,WAAW;EACX,yBAAyB;AAC3B;AACA;EACE,uBAAuB;EACvB,YAAY;EACZ,WAAW;EACX,uBAAuB;EACvB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,qBAAqB;EACrB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;AACtB;AACA;EACE,iCAAiC;AACnC;AACA;EACE,gBAAgB;AAClB;AACA;EACE,oBAAoB;AACtB;AACA;EACE,oCAAoC;EACpC,eAAe;EACf,UAAU;EACV,MAAM;EACN,OAAO;EACP,YAAY;EACZ,aAAa;EACb,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;EACV,oBAAoB;EACpB,6BAA6B;AAC/B;AACA;EACE,UAAU;EACV,oBAAoB;AACtB;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,eAAe;EACf,aAAa;EACb,kBAAkB;EAClB,wCAAwC;EACxC,kBAAkB;EAClB,UAAU;AACZ;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap\");\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-color: #0c0a3e;\n  color: #eee;\n  font-family: \"Roboto\", sans-serif;\n  min-height: 100vh;\n  max-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n  max-width: 100vw;\n}\nheader,\nfooter {\n  height: 80px;\n  background-color: #383663;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  gap: 20px;\n  width: 100%;\n}\nmain {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n  align-items: center;\n  height: calc(100vh - 160px);\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.gameboard_container {\n  width: 600px;\n  height: 600px;\n}\n.gameboard_line {\n  width: 100%;\n  display: flex;\n  height: 10%;\n  border-collapse: collapse;\n}\n.gameboard_cell {\n  background-color: white;\n  height: 100%;\n  width: 100%;\n  border: 1px solid black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship {\n  background: green;\n}\n.hit::after {\n  position: absolute;\n  content: \"\";\n  background-color: red;\n  width: 15px;\n  height: 15px;\n  border-radius: 8px;\n  pointer-events: none;\n}\n.enemy-ship-hit {\n  background-color: rgb(65, 20, 20);\n}\nfooter {\n  margin-top: auto;\n}\nfooter > a > img:hover {\n  filter: opacity(0.7);\n}\n.modal__container {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s ease;\n}\n.show-modal {\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.modal {\n  background-color: #fff;\n  width: 600px;\n  max-width: 100%;\n  padding: 15px;\n  border-radius: 5px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  z-index: 1;\n}\n.gamemodes__wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDZmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUNBLGtCQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7VUNqQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBRUFsRCwwQ0FBQSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21hcmt1cHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IG1hcmt1cHMgfSBmcm9tIFwiLi9tYXJrdXBzXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgaGVscGVycyB9IGZyb20gXCIuL2hlbHBlcnNcIjtcbmNvbnN0IGRvbSA9ICgoKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoXCJFbHZpbmFzXCIpO1xuICBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJBSVwiKTtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWwtY29udGFpbmVyXCIpO1xuICBsZXQgcGxheWVyMUJvYXJkO1xuICBsZXQgZ3Vlc3Nlc0FycmF5ID0gW107XG4gIGxldCBwbGF5ZXIyQm9hcmQ7XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBndWVzc2VzQXJyYXkucHVzaChpKTtcbiAgICB9XG4gICAgZ2FtZS5pbml0KHBsYXllciwgY29tcHV0ZXIpO1xuICAgIGRpc3BsYXlHYW1lTW9kZXMoKTtcbiAgfTtcbiAgY29uc3QgZGlzcGxheUJvYXJkcyA9ICgpID0+IHtcbiAgICBtYWluLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbWFpbi5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICBcImFmdGVyYmVnaW5cIixcbiAgICAgIG1hcmt1cHMuZ2V0R2FtZWJvYXJkKGdhbWUucGxheWVyLmdhbWVCb2FyZCwgXCJZT1VSIEJPQVJEXCIsIFwiUExBWUVSMVwiLCB0cnVlKVxuICAgICk7XG4gICAgbWFpbi5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICBcImJlZm9yZUVuZFwiLFxuICAgICAgbWFya3Vwcy5nZXRHYW1lYm9hcmQoXG4gICAgICAgIGdhbWUuY29tcHV0ZXIuZ2FtZUJvYXJkLFxuICAgICAgICBcIkNPTVBVVEVSUydTIEJPQVJEXCIsXG4gICAgICAgIFwiUExBWUVSMlwiLFxuICAgICAgICBmYWxzZVxuICAgICAgKVxuICAgICk7XG4gICAgcGxheWVyMUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJQTEFZRVIxXCIpO1xuICAgIHBsYXllcjJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUExBWUVSMlwiKTtcbiAgICBwbGF5ZXIyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgICFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikgJiZcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2FtZWJvYXJkX2NlbGxcIilcbiAgICAgICkge1xuICAgICAgICBnYW1lLmNvbXB1dGVyLmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmluZGV4KSk7XG4gICAgICAgIGRpc3BsYXlCb2FyZHMoKTtcbiAgICAgICAgaWYgKGdhbWUuY29tcHV0ZXIuZ2FtZUJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICAgICAgZ2FtZUVuZE1vZGFsKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcmFuZG9tID0gaGVscGVycy5yYW5kb21HdWVzcyhndWVzc2VzQXJyYXkpO1xuICAgICAgICBndWVzc2VzQXJyYXkgPSBndWVzc2VzQXJyYXkuZmlsdGVyKCh4KSA9PiB4ICE9PSByYW5kb20pO1xuICAgICAgICBnYW1lLnBsYXllci5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhyYW5kb20pO1xuXG4gICAgICAgIGlmIChnYW1lLnBsYXllci5nYW1lQm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICAgICAgICBnYW1lRW5kTW9kYWwoKTtcbiAgICAgICAgfVxuICAgICAgICBkaXNwbGF5Qm9hcmRzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheUdhbWVNb2RlcyA9ICgpID0+IHtcbiAgICBtYWluLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiZ2FtZW1vZGVzX193cmFwcGVyXCIpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IFwiU0VMRUNUIEdBTUUgTU9ERVwiO1xuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcblxuICAgIGNvbnN0IGJ0bjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bjEudGV4dENvbnRlbnQgPSBcIlBMQVlFUiBWUyBBSVwiO1xuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoYnRuMSk7XG4gICAgYnRuMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge30pO1xuICAgIGNvbnN0IGJ0bjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bjIudGV4dENvbnRlbnQgPSBcIlBMQVlFUiBWUyBQTEFZRVJcIjtcbiAgICBidG4yLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGJ0bjIpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQod3JhcHBlcik7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVBsYXllclZTQUlGb3JtID0gKCkgPT4ge307XG4gIGNvbnN0IGdhbWVFbmRNb2RhbCA9ICgpID0+IHtcbiAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwic2hvdy1tb2RhbFwiKTtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsXCIpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGAke1xuICAgICAgZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQuaXNBbGxTdW5rKClcbiAgICAgICAgPyBnYW1lLnBsYXllci5uYW1lXG4gICAgICAgIDogZ2FtZS5jb21wdXRlci5uYW1lXG4gICAgfSBoYXMgd29uIWA7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiUGxheSBhZ2FpblwiO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaW5pdCgpO1xuICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcInNob3ctbW9kYWxcIik7XG4gICAgICBtb2RhbENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgIH0pO1xuICAgIG1vZGFsLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgbW9kYWxDb250YWluZXIuYXBwZW5kQ2hpbGQobW9kYWwpO1xuICB9O1xuXG4gIHJldHVybiB7IGluaXQgfTtcbn0pKCk7XG5leHBvcnQgeyBkb20gfTtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVCb2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuY29uc3QgZ2FtZSA9ICgoKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoXCJFbHZpbmFzXCIpO1xuICBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJBSVwiKTtcbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBwbGF5ZXIuZ2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICAgIGNvbXB1dGVyLmdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICBwbGF5ZXIuZ2FtZUJvYXJkLnBsYWNlU2hpcCgyLCBuZXcgU2hpcChcIkNhcnJpZXJcIiksIFwieVwiLCA1KTtcbiAgICBwbGF5ZXIuZ2FtZUJvYXJkLnBsYWNlU2hpcCgxNSwgbmV3IFNoaXAoXCJCYXR0bGVzaGlwXCIpLCBcInhcIiwgNCk7XG4gICAgcGxheWVyLmdhbWVCb2FyZC5wbGFjZVNoaXAoMjMsIG5ldyBTaGlwKFwiQ3J1aXNlclwiKSwgXCJ4XCIsIDMpO1xuICAgIHBsYXllci5nYW1lQm9hcmQucGxhY2VTaGlwKDQ1LCBuZXcgU2hpcChcIlN1Ym1hcmluZVwiKSwgXCJ4XCIsIDMpO1xuICAgIHBsYXllci5nYW1lQm9hcmQucGxhY2VTaGlwKDY1LCBuZXcgU2hpcChcIkRlc3Ryb3llclwiKSwgXCJ4XCIsIDIpO1xuXG4gICAgY29tcHV0ZXIuZ2FtZUJvYXJkLnBsYWNlU2hpcCg2NSwgbmV3IFNoaXAoXCJEZXN0cm95ZXJcIiksIFwieFwiLCAyKTtcbiAgfTtcbiAgcmV0dXJuIHsgaW5pdCwgcGxheWVyLCBjb21wdXRlciB9O1xufSkoKTtcbmV4cG9ydCB7IGdhbWUgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgdGhpcy5ib2FyZC5wdXNoKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwbGFjZVNoaXAoY29vcmQsIHNoaXAsIGF4aXMsIGxlbmd0aCkge1xuICAgIGxldCB0ZW1wID0gY29vcmQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgc2hpcC5sb2NhdGlvbi5wdXNoKHRlbXApO1xuICAgICAgdGVtcCArPSBheGlzLnRvTG93ZXJDYXNlKCkgPT09IFwieFwiID8gMSA6IDEwO1xuICAgIH1cbiAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3JkKSB7XG4gICAgdGhpcy5ib2FyZFtjb29yZF0gPSB0cnVlO1xuICAgIGlmICh0aGlzLmlzU2hpcChjb29yZCkpIHtcbiAgICAgIHRoaXMuaGl0U2hpcChjb29yZCk7XG4gICAgfVxuICB9XG5cbiAgaXNTaGlwKGNvb3JkKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hpcHMuc29tZSgoeCkgPT4geC5sb2NhdGlvbi5pbmNsdWRlcyhjb29yZCkpO1xuICB9XG5cbiAgaGl0U2hpcChjb29yZCkge1xuICAgIHRoaXMuc2hpcHMuZmluZCgoeCkgPT4geC5sb2NhdGlvbi5pbmNsdWRlcyhjb29yZCkpLmhpdHMucHVzaChjb29yZCk7XG4gIH1cblxuICBpc0FsbFN1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hpcHMuZXZlcnkoKHgpID0+IHguaXNTdW5rKCkpO1xuICB9XG5cbiAgZ2V0U2hpcHNDb29yZHMoKSB7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgaWYgKHRoaXMuaXNTaGlwKGkpKSBhcnIucHVzaChpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGNoZWNrSWZDb2xsaWRlZChjb29yZCwgYXhpcywgbGVuZ3RoKSB7XG4gICAgbGV0IHRlbXBDb29yZCA9IGNvb3JkO1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyci5wdXNoKHRlbXBDb29yZCk7XG4gICAgICB0ZW1wQ29vcmQgKz0gYXhpcy50b0xvd2VyQ2FzZSgpID09PSBcInhcIiA/IDEgOiAxMDtcbiAgICB9XG4gICAgcmV0dXJuIGFyci5zb21lKCh4KSA9PlxuICAgICAgdGhpcy5zaGlwcy5zb21lKChzaGlwKSA9PiBzaGlwLmxvY2F0aW9uLmluY2x1ZGVzKHgpKVxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiY29uc3QgaGVscGVycyA9ICgoKSA9PiB7XG4gIGNvbnN0IHJhbmRvbUd1ZXNzID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IHJhbmRvbSA9IGFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCldO1xuICAgIHJldHVybiByYW5kb207XG4gIH07XG5cbiAgcmV0dXJuIHsgcmFuZG9tR3Vlc3MgfTtcbn0pKCk7XG5leHBvcnQgeyBoZWxwZXJzIH07XG4iLCJjb25zdCBtYXJrdXBzID0gKCgpID0+IHtcbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoZ2FtZWJvYXJkLCBoZWFkZXIsIGlkLCB0b1NlZVNoaXBzKSA9PiB7XG4gICAgbGV0IHNoaXBzQXJyYXkgPSBbXTtcbiAgICBjb3VudGVyID0gMDtcbiAgICBjb25zdCBnYW1lQm9hcmRDZWxscyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBnYW1lYm9hcmQuYm9hcmQubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEwKSB7XG4gICAgICBnYW1lQm9hcmRDZWxscy5wdXNoKGdhbWVib2FyZC5ib2FyZC5zbGljZShpLCBpICsgMTApKTtcbiAgICB9XG4gICAgc2hpcHNBcnJheSA9IGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkcygpO1xuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj48aDI+JHtoZWFkZXJ9PC9oMj48ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2NvbnRhaW5lclwiIGlkPVwiJHtpZH1cIj4ke2dhbWVCb2FyZENlbGxzXG4gICAgICAubWFwKChsaW5lKSA9PiBnYW1lYm9hcmRMaW5lTWFya3VwKGxpbmUsIHNoaXBzQXJyYXksIHRvU2VlU2hpcHMpKVxuICAgICAgLmpvaW4oXCJcIil9PC9kaXY+PC9kaXY+YDtcbiAgfTtcbiAgY29uc3QgZ2FtZWJvYXJkTGluZU1hcmt1cCA9IChsaW5lLCBzaGlwc0FycmF5LCB0b1NlZVNoaXBzKSA9PlxuICAgIGA8ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2xpbmVcIj4ke2xpbmVcbiAgICAgIC5tYXAoXG4gICAgICAgIChjZWxsKSA9PlxuICAgICAgICAgIGAke2dhbWVib2FyZENlbGxNYXJrdXAoXG4gICAgICAgICAgICBzaGlwc0FycmF5LmluY2x1ZGVzKGNvdW50ZXIpLFxuICAgICAgICAgICAgY2VsbCxcbiAgICAgICAgICAgIHRvU2VlU2hpcHNcbiAgICAgICAgICApfWBcbiAgICAgIClcbiAgICAgIC5qb2luKFwiXCIpfTwvZGl2PmA7XG5cbiAgY29uc3QgZ2FtZWJvYXJkQ2VsbE1hcmt1cCA9IChzaGlwLCBoaXQsIHRvU2VlU2hpcHMpID0+IHtcbiAgICBjb3VudGVyICs9IDE7XG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2NlbGwgJHtzaGlwICYmIHRvU2VlU2hpcHMgPyBcInNoaXBcIiA6IFwiXCJ9ICR7XG4gICAgICBoaXQgPyBcImhpdFwiIDogXCJcIlxuICAgIH0gJHshdG9TZWVTaGlwcyAmJiBzaGlwICYmIGhpdCA/IFwiZW5lbXktc2hpcC1oaXRcIiA6IFwiXCJ9XCIgZGF0YS1pbmRleD1cIiR7XG4gICAgICBjb3VudGVyIC0gMVxuICAgIH1cIj48L2Rpdj5gO1xuICB9O1xuXG4gIHJldHVybiB7IGdldEdhbWVib2FyZCB9O1xufSkoKTtcbmV4cG9ydCB7IG1hcmt1cHMgfTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIGF0dGFjayhlbmVteSwgbG9jYXRpb24pIHtcbiAgICBlbmVteS5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhsb2NhdGlvbik7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBsb2NhdGlvbiA9IFtdKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBoaXQoaW5kZXgpIHtcbiAgICB0aGlzLmhpdHMucHVzaChpbmRleCk7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRpb24uZXZlcnkoKGNlbGwpID0+IHRoaXMuaGl0cy5pbmNsdWRlcyhjZWxsKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvOndnaHRANDAwOzcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYzBhM2U7XFxuICBjb2xvcjogI2VlZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgc2Fucy1zZXJpZjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG59XFxuaGVhZGVyLFxcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGdhcDogMjBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxNjBweCk7XFxufVxcbi53cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuLmdhbWVib2FyZF9jb250YWluZXIge1xcbiAgd2lkdGg6IDYwMHB4O1xcbiAgaGVpZ2h0OiA2MDBweDtcXG59XFxuLmdhbWVib2FyZF9saW5lIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG59XFxuLmdhbWVib2FyZF9jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGdyZWVuO1xcbn1cXG4uaGl0OjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbi5lbmVteS1zaGlwLWhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNjUsIDIwLCAyMCk7XFxufVxcbmZvb3RlciB7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbn1cXG5mb290ZXIgPiBhID4gaW1nOmhvdmVyIHtcXG4gIGZpbHRlcjogb3BhY2l0eSgwLjcpO1xcbn1cXG4ubW9kYWxfX2NvbnRhaW5lciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgb3BhY2l0eTogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2U7XFxufVxcbi5zaG93LW1vZGFsIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBwb2ludGVyLWV2ZW50czogYXV0bztcXG59XFxuXFxuLm1vZGFsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB3aWR0aDogNjAwcHg7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi5nYW1lbW9kZXNfX3dyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDMwcHg7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQ0E7RUFDRSxVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLFdBQVc7RUFDWCxpQ0FBaUM7RUFDakMsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsZ0JBQWdCO0FBQ2xCO0FBQ0E7O0VBRUUsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsU0FBUztFQUNULFdBQVc7QUFDYjtBQUNBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7RUFDVCx1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLDJCQUEyQjtBQUM3QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsU0FBUztFQUNULGVBQWU7QUFDakI7QUFDQTtFQUNFLFlBQVk7RUFDWixhQUFhO0FBQ2Y7QUFDQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2IsV0FBVztFQUNYLHlCQUF5QjtBQUMzQjtBQUNBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixXQUFXO0VBQ1gsdUJBQXVCO0VBQ3ZCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSxpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gscUJBQXFCO0VBQ3JCLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0UsaUNBQWlDO0FBQ25DO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0Usb0NBQW9DO0VBQ3BDLGVBQWU7RUFDZixVQUFVO0VBQ1YsTUFBTTtFQUNOLE9BQU87RUFDUCxZQUFZO0VBQ1osYUFBYTtFQUNiLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFVBQVU7RUFDVixvQkFBb0I7RUFDcEIsNkJBQTZCO0FBQy9CO0FBQ0E7RUFDRSxVQUFVO0VBQ1Ysb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixlQUFlO0VBQ2YsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQix3Q0FBd0M7RUFDeEMsa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0FBQ1hcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoXFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvOndnaHRANDAwOzcwMCZkaXNwbGF5PXN3YXBcXFwiKTtcXG4qIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYzBhM2U7XFxuICBjb2xvcjogI2VlZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgc2Fucy1zZXJpZjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG59XFxuaGVhZGVyLFxcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGdhcDogMjBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxNjBweCk7XFxufVxcbi53cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuLmdhbWVib2FyZF9jb250YWluZXIge1xcbiAgd2lkdGg6IDYwMHB4O1xcbiAgaGVpZ2h0OiA2MDBweDtcXG59XFxuLmdhbWVib2FyZF9saW5lIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG59XFxuLmdhbWVib2FyZF9jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGdyZWVuO1xcbn1cXG4uaGl0OjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbi5lbmVteS1zaGlwLWhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNjUsIDIwLCAyMCk7XFxufVxcbmZvb3RlciB7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbn1cXG5mb290ZXIgPiBhID4gaW1nOmhvdmVyIHtcXG4gIGZpbHRlcjogb3BhY2l0eSgwLjcpO1xcbn1cXG4ubW9kYWxfX2NvbnRhaW5lciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgb3BhY2l0eTogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2U7XFxufVxcbi5zaG93LW1vZGFsIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBwb2ludGVyLWV2ZW50czogYXV0bztcXG59XFxuXFxuLm1vZGFsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB3aWR0aDogNjAwcHg7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi5nYW1lbW9kZXNfX3dyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDMwcHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn0iLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29uc3RydWN0b3IsIFwicHJvdG90eXBlXCIsIHtcbiAgICB3cml0YWJsZTogZmFsc2VcbiAgfSk7XG4gIHJldHVybiBDb25zdHJ1Y3Rvcjtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IHsgZG9tIH0gZnJvbSBcIi4vZG9tXCI7XG5cbmRvbS5pbml0KCk7XG4iXSwibmFtZXMiOlsiZ2FtZSIsIm1hcmt1cHMiLCJQbGF5ZXIiLCJoZWxwZXJzIiwiZG9tIiwicGxheWVyIiwiY29tcHV0ZXIiLCJtYWluIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibW9kYWxDb250YWluZXIiLCJwbGF5ZXIxQm9hcmQiLCJndWVzc2VzQXJyYXkiLCJwbGF5ZXIyQm9hcmQiLCJpbml0IiwiaSIsInB1c2giLCJkaXNwbGF5R2FtZU1vZGVzIiwiZGlzcGxheUJvYXJkcyIsImlubmVySFRNTCIsImluc2VydEFkamFjZW50SFRNTCIsImdldEdhbWVib2FyZCIsImdhbWVCb2FyZCIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlY2VpdmVBdHRhY2siLCJOdW1iZXIiLCJkYXRhc2V0IiwiaW5kZXgiLCJpc0FsbFN1bmsiLCJnYW1lRW5kTW9kYWwiLCJyYW5kb20iLCJyYW5kb21HdWVzcyIsImZpbHRlciIsIngiLCJ3cmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsImhlYWRlciIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJidG4xIiwiYnRuMiIsImRpc2FibGVkIiwiZGlzcGxheVBsYXllclZTQUlGb3JtIiwibW9kYWwiLCJuYW1lIiwiYnRuIiwicmVtb3ZlIiwiR2FtZWJvYXJkIiwiU2hpcCIsInBsYWNlU2hpcCIsImJvYXJkIiwic2hpcHMiLCJjb29yZCIsInNoaXAiLCJheGlzIiwibGVuZ3RoIiwidGVtcCIsImxvY2F0aW9uIiwidG9Mb3dlckNhc2UiLCJpc1NoaXAiLCJoaXRTaGlwIiwic29tZSIsImluY2x1ZGVzIiwiZmluZCIsImhpdHMiLCJldmVyeSIsImlzU3VuayIsImFyciIsInRlbXBDb29yZCIsImFycmF5IiwiTWF0aCIsImZsb29yIiwiY291bnRlciIsImdhbWVib2FyZCIsImlkIiwidG9TZWVTaGlwcyIsInNoaXBzQXJyYXkiLCJnYW1lQm9hcmRDZWxscyIsImxlbiIsInNsaWNlIiwiZ2V0U2hpcHNDb29yZHMiLCJtYXAiLCJsaW5lIiwiZ2FtZWJvYXJkTGluZU1hcmt1cCIsImpvaW4iLCJjZWxsIiwiZ2FtZWJvYXJkQ2VsbE1hcmt1cCIsImhpdCIsImVuZW15Il0sInNvdXJjZVJvb3QiOiIifQ==