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
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ship */ "./src/ship.js");






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
    main.classList.remove("flex-y");
    main.insertAdjacentHTML("afterbegin", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(_game__WEBPACK_IMPORTED_MODULE_0__.game.player.gameBoard, "".concat(_game__WEBPACK_IMPORTED_MODULE_0__.game.player.name, " board"), "PLAYER1", true));
    main.insertAdjacentHTML("beforeEnd", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(_game__WEBPACK_IMPORTED_MODULE_0__.game.computer.gameBoard, "".concat(_game__WEBPACK_IMPORTED_MODULE_0__.game.computer.name, " board"), "PLAYER2", false));
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
    btn1.addEventListener("click", function () {
      displayPlayerVSAIForm();
    });
    var btn2 = document.createElement("button");
    btn2.textContent = "PLAYER VS PLAYER";
    btn2.disabled = true;
    wrapper.appendChild(btn2);
    main.appendChild(wrapper);
  };

  var displayPlayerVSAIForm = function displayPlayerVSAIForm() {
    main.innerHTML = "";
    var form = document.createElement("form");
    var label = document.createElement("label");
    label.textContent = "Enter your name: ";
    label.setAttribute("for", "name");
    var input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.id = "name";
    var btn = document.createElement("button");
    btn.textContent = "Start";

    if (input.value === "") {
      btn.disabled = true;
    }

    input.addEventListener("input", function () {
      if (input.value !== "") {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }
    });
    btn.addEventListener("click", function () {
      _game__WEBPACK_IMPORTED_MODULE_0__.game.player.name = input.value;
      displayShipPlacing(_game__WEBPACK_IMPORTED_MODULE_0__.game.player, 0);
    });
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(btn);
    main.appendChild(form);
  };

  var displayShipPlacing = function displayShipPlacing(player, index) {
    main.innerHTML = "";
    main.classList.add("flex-y");
    var ships = _game__WEBPACK_IMPORTED_MODULE_0__.game.startingShips;

    if (index >= _game__WEBPACK_IMPORTED_MODULE_0__.game.startingShips.length) {
      var btn = document.createElement("button");
      btn.textContent = "Start";
      btn.addEventListener("click", function () {
        displayBoards();
      });
      main.appendChild(btn);
      main.insertAdjacentHTML("beforeend", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(player.gameBoard, "".concat(player.name, " board"), "PLAYER1", true));
    } else {
      var hoverArray = [];
      var className;
      var ableToPlace;
      console.log(index);
      var curr = ships[index];
      var infoText = document.createElement("p");
      infoText.textContent = "Place your ".concat(curr.name);
      main.appendChild(infoText);
      main.insertAdjacentHTML("beforeend", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(player.gameBoard, "".concat(player.name, " board"), "PLAYER1", true));
      var gameboard = document.querySelector(".gameboard_container");
      gameboard.addEventListener("mouseover", function (e) {
        hoverArray = [];

        for (var i = e.target.dataset.index; i < Number(e.target.dataset.index) + curr.length; i++) {
          hoverArray.push(i);
        }

        ableToPlace = !player.gameBoard.checkIfCollided(Number(e.target.dataset.index), "x", curr.length) && !player.gameBoard.checkIfMultipleLines(hoverArray, "x");
        className = ableToPlace ? "placeship" : "colliding";
        hoverArray.forEach(function (el) {
          document.querySelector("[data-index='".concat(el, "']")).classList.add(className);
        });
      });
      var cells = document.querySelectorAll(".gameboard_cell");
      cells = Array.from(cells);
      cells.forEach(function (cell) {
        return cell.addEventListener("mouseleave", function (e) {
          hoverArray.forEach(function (el) {
            document.querySelector("[data-index='".concat(el, "']")).classList.remove(className);
          });
        });
      });
      gameboard.addEventListener("click", function (e) {
        if (ableToPlace) {
          player.gameBoard.placeShip(Number(e.target.dataset.index), new _ship__WEBPACK_IMPORTED_MODULE_4__["default"](curr.name), "x", curr.length);
          displayShipPlacing(player, index + 1);
        }
      });
    }
  };

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
      _game__WEBPACK_IMPORTED_MODULE_0__.game.init(player, computer);
      displayShipPlacing(_game__WEBPACK_IMPORTED_MODULE_0__.game.player, 0);
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
  var startingShips = [{
    name: "Carrier",
    length: 5
  }, {
    name: "Battleship",
    length: 4
  }, {
    name: "Cruiser",
    length: 3
  }, {
    name: "Submarine",
    length: 3
  }, {
    name: "Destroyer",
    length: 2
  }];

  var init = function init() {
    player.gameBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_1__["default"]();
    computer.gameBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_1__["default"]();
    computer.gameBoard.placeShip(65, new _ship__WEBPACK_IMPORTED_MODULE_2__["default"]("Destroyer"), "x", 2);
  };

  return {
    init: init,
    player: player,
    computer: computer,
    startingShips: startingShips
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
  }, {
    key: "checkIfMultipleLines",
    value: function checkIfMultipleLines(coordArray, axis) {
      if (axis === "x") {
        var res = Math.floor(coordArray[0] / 10);
        return !(coordArray.length === coordArray.filter(function (x) {
          return Math.floor(x / 10) === res;
        }).length);
      }

      if (axis === "y") {
        var _res = coordArray[0] % 10;

        return !(coordArray.length === coordArray.filter(function (x) {
          return x % 10 === _res;
        }).length);
      }
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-color: #0c0a3e;\n  color: #eee;\n  font-family: \"Roboto\", sans-serif;\n  min-height: 100vh;\n  max-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n  max-width: 100vw;\n}\nheader,\nfooter {\n  height: 80px;\n  background-color: #383663;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  gap: 20px;\n  width: 100%;\n}\nmain {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n  align-items: center;\n  height: calc(100vh - 160px);\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.gameboard_container {\n  width: 600px;\n  height: 600px;\n}\n.gameboard_line {\n  width: 100%;\n  display: flex;\n  height: 10%;\n  border-collapse: collapse;\n}\n.gameboard_cell {\n  background-color: white;\n  height: 100%;\n  width: 100%;\n  border: 1px solid black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship, .placeship {\n  background: green;\n}\n.colliding {\n  background: rgb(187, 59, 59);\n}\n.hit::after {\n  position: absolute;\n  content: \"\";\n  background-color: red;\n  width: 15px;\n  height: 15px;\n  border-radius: 8px;\n  pointer-events: none;\n}\n.enemy-ship-hit {\n  background-color: rgb(65, 20, 20);\n}\nfooter {\n  margin-top: auto;\n}\nfooter > a > img:hover {\n  filter: opacity(0.7);\n}\n.modal__container {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s ease;\n}\n.show-modal {\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.modal {\n  background-color: #fff;\n  width: 600px;\n  max-width: 100%;\n  padding: 15px;\n  border-radius: 5px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  z-index: 1;\n}\n.gamemodes__wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n}\n\n.flex-y {\n  flex-direction: column;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AACA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;AACA;EACE,yBAAyB;EACzB,WAAW;EACX,iCAAiC;EACjC,iBAAiB;EACjB,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;EACjB,gBAAgB;AAClB;AACA;;EAEE,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,eAAe;EACf,SAAS;EACT,WAAW;AACb;AACA;EACE,aAAa;EACb,SAAS;EACT,uBAAuB;EACvB,mBAAmB;EACnB,2BAA2B;AAC7B;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;EACT,eAAe;AACjB;AACA;EACE,YAAY;EACZ,aAAa;AACf;AACA;EACE,WAAW;EACX,aAAa;EACb,WAAW;EACX,yBAAyB;AAC3B;AACA;EACE,uBAAuB;EACvB,YAAY;EACZ,WAAW;EACX,uBAAuB;EACvB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,qBAAqB;EACrB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;AACtB;AACA;EACE,iCAAiC;AACnC;AACA;EACE,gBAAgB;AAClB;AACA;EACE,oBAAoB;AACtB;AACA;EACE,oCAAoC;EACpC,eAAe;EACf,UAAU;EACV,MAAM;EACN,OAAO;EACP,YAAY;EACZ,aAAa;EACb,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;EACV,oBAAoB;EACpB,6BAA6B;AAC/B;AACA;EACE,UAAU;EACV,oBAAoB;AACtB;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,eAAe;EACf,aAAa;EACb,kBAAkB;EAClB,wCAAwC;EACxC,kBAAkB;EAClB,UAAU;AACZ;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,sBAAsB;AACxB","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap\");\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-color: #0c0a3e;\n  color: #eee;\n  font-family: \"Roboto\", sans-serif;\n  min-height: 100vh;\n  max-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n  max-width: 100vw;\n}\nheader,\nfooter {\n  height: 80px;\n  background-color: #383663;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  gap: 20px;\n  width: 100%;\n}\nmain {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n  align-items: center;\n  height: calc(100vh - 160px);\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.gameboard_container {\n  width: 600px;\n  height: 600px;\n}\n.gameboard_line {\n  width: 100%;\n  display: flex;\n  height: 10%;\n  border-collapse: collapse;\n}\n.gameboard_cell {\n  background-color: white;\n  height: 100%;\n  width: 100%;\n  border: 1px solid black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship, .placeship {\n  background: green;\n}\n.colliding {\n  background: rgb(187, 59, 59);\n}\n.hit::after {\n  position: absolute;\n  content: \"\";\n  background-color: red;\n  width: 15px;\n  height: 15px;\n  border-radius: 8px;\n  pointer-events: none;\n}\n.enemy-ship-hit {\n  background-color: rgb(65, 20, 20);\n}\nfooter {\n  margin-top: auto;\n}\nfooter > a > img:hover {\n  filter: opacity(0.7);\n}\n.modal__container {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s ease;\n}\n.show-modal {\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.modal {\n  background-color: #fff;\n  width: 600px;\n  max-width: 100%;\n  padding: 15px;\n  border-radius: 5px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  z-index: 1;\n}\n.gamemodes__wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n}\n\n.flex-y {\n  flex-direction: column;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1VDakJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQTtBQUVBQywwQ0FBQSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaGVscGVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21hcmt1cHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IG1hcmt1cHMgfSBmcm9tIFwiLi9tYXJrdXBzXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgaGVscGVycyB9IGZyb20gXCIuL2hlbHBlcnNcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcbmNvbnN0IGRvbSA9ICgoKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoXCJFbHZpbmFzXCIpO1xuICBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJBSVwiKTtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluXCIpO1xuICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWwtY29udGFpbmVyXCIpO1xuICBsZXQgcGxheWVyMUJvYXJkO1xuICBsZXQgZ3Vlc3Nlc0FycmF5ID0gW107XG4gIGxldCBwbGF5ZXIyQm9hcmQ7XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBndWVzc2VzQXJyYXkucHVzaChpKTtcbiAgICB9XG4gICAgZ2FtZS5pbml0KHBsYXllciwgY29tcHV0ZXIpO1xuICAgIGRpc3BsYXlHYW1lTW9kZXMoKTtcbiAgfTtcbiAgY29uc3QgZGlzcGxheUJvYXJkcyA9ICgpID0+IHtcbiAgICBtYWluLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbWFpbi5jbGFzc0xpc3QucmVtb3ZlKFwiZmxleC15XCIpO1xuICAgIG1haW4uaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgXCJhZnRlcmJlZ2luXCIsXG4gICAgICBtYXJrdXBzLmdldEdhbWVib2FyZChcbiAgICAgICAgZ2FtZS5wbGF5ZXIuZ2FtZUJvYXJkLFxuICAgICAgICBgJHtnYW1lLnBsYXllci5uYW1lfSBib2FyZGAsXG4gICAgICAgIFwiUExBWUVSMVwiLFxuICAgICAgICB0cnVlXG4gICAgICApXG4gICAgKTtcbiAgICBtYWluLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgIFwiYmVmb3JlRW5kXCIsXG4gICAgICBtYXJrdXBzLmdldEdhbWVib2FyZChcbiAgICAgICAgZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQsXG4gICAgICAgIGAke2dhbWUuY29tcHV0ZXIubmFtZX0gYm9hcmRgLFxuICAgICAgICBcIlBMQVlFUjJcIixcbiAgICAgICAgZmFsc2VcbiAgICAgIClcbiAgICApO1xuICAgIHBsYXllcjFCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUExBWUVSMVwiKTtcbiAgICBwbGF5ZXIyQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlBMQVlFUjJcIik7XG4gICAgcGxheWVyMkJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICAhZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpICYmXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImdhbWVib2FyZF9jZWxsXCIpXG4gICAgICApIHtcbiAgICAgICAgZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pbmRleCkpO1xuICAgICAgICBkaXNwbGF5Qm9hcmRzKCk7XG4gICAgICAgIGlmIChnYW1lLmNvbXB1dGVyLmdhbWVCb2FyZC5pc0FsbFN1bmsoKSkge1xuICAgICAgICAgIGdhbWVFbmRNb2RhbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJhbmRvbSA9IGhlbHBlcnMucmFuZG9tR3Vlc3MoZ3Vlc3Nlc0FycmF5KTtcbiAgICAgICAgZ3Vlc3Nlc0FycmF5ID0gZ3Vlc3Nlc0FycmF5LmZpbHRlcigoeCkgPT4geCAhPT0gcmFuZG9tKTtcbiAgICAgICAgZ2FtZS5wbGF5ZXIuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2socmFuZG9tKTtcblxuICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIuZ2FtZUJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICAgICAgZ2FtZUVuZE1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGxheUJvYXJkcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlHYW1lTW9kZXMgPSAoKSA9PiB7XG4gICAgbWFpbi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImdhbWVtb2Rlc19fd3JhcHBlclwiKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIlNFTEVDVCBHQU1FIE1PREVcIjtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICBjb25zdCBidG4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4xLnRleHRDb250ZW50ID0gXCJQTEFZRVIgVlMgQUlcIjtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGJ0bjEpO1xuICAgIGJ0bjEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGRpc3BsYXlQbGF5ZXJWU0FJRm9ybSgpO1xuICAgIH0pO1xuICAgIGNvbnN0IGJ0bjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bjIudGV4dENvbnRlbnQgPSBcIlBMQVlFUiBWUyBQTEFZRVJcIjtcbiAgICBidG4yLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGJ0bjIpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQod3JhcHBlcik7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVBsYXllclZTQUlGb3JtID0gKCkgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG5cbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBsYWJlbC50ZXh0Q29udGVudCA9IFwiRW50ZXIgeW91ciBuYW1lOiBcIjtcbiAgICBsYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJuYW1lXCIpO1xuXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgIGlucHV0Lm5hbWUgPSBcIm5hbWVcIjtcbiAgICBpbnB1dC5pZCA9IFwibmFtZVwiO1xuXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4udGV4dENvbnRlbnQgPSBcIlN0YXJ0XCI7XG4gICAgaWYgKGlucHV0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgaWYgKGlucHV0LnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGdhbWUucGxheWVyLm5hbWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGRpc3BsYXlTaGlwUGxhY2luZyhnYW1lLnBsYXllciwgMCk7XG4gICAgfSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChidG4pO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoZm9ybSk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVNoaXBQbGFjaW5nID0gKHBsYXllciwgaW5kZXgpID0+IHtcbiAgICBtYWluLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbWFpbi5jbGFzc0xpc3QuYWRkKFwiZmxleC15XCIpO1xuICAgIGNvbnN0IHNoaXBzID0gZ2FtZS5zdGFydGluZ1NoaXBzO1xuICAgIGlmIChpbmRleCA+PSBnYW1lLnN0YXJ0aW5nU2hpcHMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgYnRuLnRleHRDb250ZW50ID0gXCJTdGFydFwiO1xuICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGRpc3BsYXlCb2FyZHMoKTtcbiAgICAgIH0pO1xuICAgICAgbWFpbi5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgbWFpbi5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgICAgIG1hcmt1cHMuZ2V0R2FtZWJvYXJkKFxuICAgICAgICAgIHBsYXllci5nYW1lQm9hcmQsXG4gICAgICAgICAgYCR7cGxheWVyLm5hbWV9IGJvYXJkYCxcbiAgICAgICAgICBcIlBMQVlFUjFcIixcbiAgICAgICAgICB0cnVlXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBob3ZlckFycmF5ID0gW107XG4gICAgICBsZXQgY2xhc3NOYW1lO1xuICAgICAgbGV0IGFibGVUb1BsYWNlO1xuICAgICAgY29uc29sZS5sb2coaW5kZXgpO1xuICAgICAgbGV0IGN1cnIgPSBzaGlwc1tpbmRleF07XG4gICAgICBjb25zdCBpbmZvVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgaW5mb1RleHQudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciAke2N1cnIubmFtZX1gO1xuICAgICAgbWFpbi5hcHBlbmRDaGlsZChpbmZvVGV4dCk7XG4gICAgICBtYWluLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgICAgXCJiZWZvcmVlbmRcIixcbiAgICAgICAgbWFya3Vwcy5nZXRHYW1lYm9hcmQoXG4gICAgICAgICAgcGxheWVyLmdhbWVCb2FyZCxcbiAgICAgICAgICBgJHtwbGF5ZXIubmFtZX0gYm9hcmRgLFxuICAgICAgICAgIFwiUExBWUVSMVwiLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkX2NvbnRhaW5lclwiKTtcbiAgICAgIGdhbWVib2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChlKSA9PiB7XG4gICAgICAgIGhvdmVyQXJyYXkgPSBbXTtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgICAgICAgaSA8IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmluZGV4KSArIGN1cnIubGVuZ3RoO1xuICAgICAgICAgIGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBob3ZlckFycmF5LnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgYWJsZVRvUGxhY2UgPVxuICAgICAgICAgICFwbGF5ZXIuZ2FtZUJvYXJkLmNoZWNrSWZDb2xsaWRlZChcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmluZGV4KSxcbiAgICAgICAgICAgIFwieFwiLFxuICAgICAgICAgICAgY3Vyci5sZW5ndGhcbiAgICAgICAgICApICYmICFwbGF5ZXIuZ2FtZUJvYXJkLmNoZWNrSWZNdWx0aXBsZUxpbmVzKGhvdmVyQXJyYXksIFwieFwiKTtcbiAgICAgICAgY2xhc3NOYW1lID0gYWJsZVRvUGxhY2UgPyBcInBsYWNlc2hpcFwiIDogXCJjb2xsaWRpbmdcIjtcblxuICAgICAgICBob3ZlckFycmF5LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pbmRleD0nJHtlbH0nXWApXG4gICAgICAgICAgICAuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgbGV0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5nYW1lYm9hcmRfY2VsbFwiKTtcbiAgICAgIGNlbGxzID0gQXJyYXkuZnJvbShjZWxscyk7XG4gICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PlxuICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIChlKSA9PiB7XG4gICAgICAgICAgaG92ZXJBcnJheS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWluZGV4PScke2VsfSddYClcbiAgICAgICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICBnYW1lYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGlmIChhYmxlVG9QbGFjZSkge1xuICAgICAgICAgIHBsYXllci5nYW1lQm9hcmQucGxhY2VTaGlwKFxuICAgICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpLFxuICAgICAgICAgICAgbmV3IFNoaXAoY3Vyci5uYW1lKSxcbiAgICAgICAgICAgIFwieFwiLFxuICAgICAgICAgICAgY3Vyci5sZW5ndGhcbiAgICAgICAgICApO1xuICAgICAgICAgIGRpc3BsYXlTaGlwUGxhY2luZyhwbGF5ZXIsIGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgZ2FtZUVuZE1vZGFsID0gKCkgPT4ge1xuICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJzaG93LW1vZGFsXCIpO1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwibW9kYWxcIik7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gYCR7XG4gICAgICBnYW1lLmNvbXB1dGVyLmdhbWVCb2FyZC5pc0FsbFN1bmsoKVxuICAgICAgICA/IGdhbWUucGxheWVyLm5hbWVcbiAgICAgICAgOiBnYW1lLmNvbXB1dGVyLm5hbWVcbiAgICB9IGhhcyB3b24hYDtcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuLnRleHRDb250ZW50ID0gXCJQbGF5IGFnYWluXCI7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBnYW1lLmluaXQocGxheWVyLCBjb21wdXRlcik7XG4gICAgICBkaXNwbGF5U2hpcFBsYWNpbmcoZ2FtZS5wbGF5ZXIsIDApO1xuICAgICAgbW9kYWxDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcInNob3ctbW9kYWxcIik7XG4gICAgICBtb2RhbENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgIH0pO1xuICAgIG1vZGFsLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgbW9kYWxDb250YWluZXIuYXBwZW5kQ2hpbGQobW9kYWwpO1xuICB9O1xuXG4gIHJldHVybiB7IGluaXQgfTtcbn0pKCk7XG5leHBvcnQgeyBkb20gfTtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVCb2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuY29uc3QgZ2FtZSA9ICgoKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoXCJFbHZpbmFzXCIpO1xuICBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJBSVwiKTtcbiAgY29uc3Qgc3RhcnRpbmdTaGlwcyA9IFtcbiAgICB7IG5hbWU6IFwiQ2FycmllclwiLCBsZW5ndGg6IDUgfSxcbiAgICB7IG5hbWU6IFwiQmF0dGxlc2hpcFwiLCBsZW5ndGg6IDQgfSxcbiAgICB7IG5hbWU6IFwiQ3J1aXNlclwiLCBsZW5ndGg6IDMgfSxcbiAgICB7IG5hbWU6IFwiU3VibWFyaW5lXCIsIGxlbmd0aDogMyB9LFxuICAgIHsgbmFtZTogXCJEZXN0cm95ZXJcIiwgbGVuZ3RoOiAyIH0sXG4gIF07XG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgcGxheWVyLmdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICBjb21wdXRlci5nYW1lQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgY29tcHV0ZXIuZ2FtZUJvYXJkLnBsYWNlU2hpcCg2NSwgbmV3IFNoaXAoXCJEZXN0cm95ZXJcIiksIFwieFwiLCAyKTtcbiAgfTtcblxuICByZXR1cm4geyBpbml0LCBwbGF5ZXIsIGNvbXB1dGVyLCBzdGFydGluZ1NoaXBzIH07XG59KSgpO1xuZXhwb3J0IHsgZ2FtZSB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICB0aGlzLmJvYXJkLnB1c2goZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHBsYWNlU2hpcChjb29yZCwgc2hpcCwgYXhpcywgbGVuZ3RoKSB7XG4gICAgbGV0IHRlbXAgPSBjb29yZDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBzaGlwLmxvY2F0aW9uLnB1c2godGVtcCk7XG4gICAgICB0ZW1wICs9IGF4aXMudG9Mb3dlckNhc2UoKSA9PT0gXCJ4XCIgPyAxIDogMTA7XG4gICAgfVxuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmQpIHtcbiAgICB0aGlzLmJvYXJkW2Nvb3JkXSA9IHRydWU7XG4gICAgaWYgKHRoaXMuaXNTaGlwKGNvb3JkKSkge1xuICAgICAgdGhpcy5oaXRTaGlwKGNvb3JkKTtcbiAgICB9XG4gIH1cblxuICBpc1NoaXAoY29vcmQpIHtcbiAgICByZXR1cm4gdGhpcy5zaGlwcy5zb21lKCh4KSA9PiB4LmxvY2F0aW9uLmluY2x1ZGVzKGNvb3JkKSk7XG4gIH1cblxuICBoaXRTaGlwKGNvb3JkKSB7XG4gICAgdGhpcy5zaGlwcy5maW5kKCh4KSA9PiB4LmxvY2F0aW9uLmluY2x1ZGVzKGNvb3JkKSkuaGl0cy5wdXNoKGNvb3JkKTtcbiAgfVxuXG4gIGlzQWxsU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5zaGlwcy5ldmVyeSgoeCkgPT4geC5pc1N1bmsoKSk7XG4gIH1cblxuICBnZXRTaGlwc0Nvb3JkcygpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5pc1NoaXAoaSkpIGFyci5wdXNoKGkpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgY2hlY2tJZkNvbGxpZGVkKGNvb3JkLCBheGlzLCBsZW5ndGgpIHtcbiAgICBsZXQgdGVtcENvb3JkID0gY29vcmQ7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYXJyLnB1c2godGVtcENvb3JkKTtcbiAgICAgIHRlbXBDb29yZCArPSBheGlzLnRvTG93ZXJDYXNlKCkgPT09IFwieFwiID8gMSA6IDEwO1xuICAgIH1cbiAgICByZXR1cm4gYXJyLnNvbWUoKHgpID0+XG4gICAgICB0aGlzLnNoaXBzLnNvbWUoKHNoaXApID0+IHNoaXAubG9jYXRpb24uaW5jbHVkZXMoeCkpXG4gICAgKTtcbiAgfVxuXG4gIGNoZWNrSWZNdWx0aXBsZUxpbmVzKGNvb3JkQXJyYXksIGF4aXMpIHtcbiAgICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgIGNvbnN0IHJlcyA9IE1hdGguZmxvb3IoY29vcmRBcnJheVswXSAvIDEwKTtcbiAgICAgIHJldHVybiAhKFxuICAgICAgICBjb29yZEFycmF5Lmxlbmd0aCA9PT1cbiAgICAgICAgY29vcmRBcnJheS5maWx0ZXIoKHgpID0+IE1hdGguZmxvb3IoeCAvIDEwKSA9PT0gcmVzKS5sZW5ndGhcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChheGlzID09PSBcInlcIikge1xuICAgICAgY29uc3QgcmVzID0gY29vcmRBcnJheVswXSAlIDEwO1xuICAgICAgcmV0dXJuICEoXG4gICAgICAgIGNvb3JkQXJyYXkubGVuZ3RoID09PSBjb29yZEFycmF5LmZpbHRlcigoeCkgPT4geCAlIDEwID09PSByZXMpLmxlbmd0aFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiY29uc3QgaGVscGVycyA9ICgoKSA9PiB7XG4gIGNvbnN0IHJhbmRvbUd1ZXNzID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IHJhbmRvbSA9IGFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCldO1xuICAgIHJldHVybiByYW5kb207XG4gIH07XG5cbiAgcmV0dXJuIHsgcmFuZG9tR3Vlc3MgfTtcbn0pKCk7XG5leHBvcnQgeyBoZWxwZXJzIH07XG4iLCJjb25zdCBtYXJrdXBzID0gKCgpID0+IHtcbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoZ2FtZWJvYXJkLCBoZWFkZXIsIGlkLCB0b1NlZVNoaXBzKSA9PiB7XG4gICAgbGV0IHNoaXBzQXJyYXkgPSBbXTtcbiAgICBjb3VudGVyID0gMDtcbiAgICBjb25zdCBnYW1lQm9hcmRDZWxscyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBnYW1lYm9hcmQuYm9hcmQubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEwKSB7XG4gICAgICBnYW1lQm9hcmRDZWxscy5wdXNoKGdhbWVib2FyZC5ib2FyZC5zbGljZShpLCBpICsgMTApKTtcbiAgICB9XG4gICAgc2hpcHNBcnJheSA9IGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkcygpO1xuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj48aDI+JHtoZWFkZXJ9PC9oMj48ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2NvbnRhaW5lclwiIGlkPVwiJHtpZH1cIj4ke2dhbWVCb2FyZENlbGxzXG4gICAgICAubWFwKChsaW5lKSA9PiBnYW1lYm9hcmRMaW5lTWFya3VwKGxpbmUsIHNoaXBzQXJyYXksIHRvU2VlU2hpcHMpKVxuICAgICAgLmpvaW4oXCJcIil9PC9kaXY+PC9kaXY+YDtcbiAgfTtcbiAgY29uc3QgZ2FtZWJvYXJkTGluZU1hcmt1cCA9IChsaW5lLCBzaGlwc0FycmF5LCB0b1NlZVNoaXBzKSA9PlxuICAgIGA8ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2xpbmVcIj4ke2xpbmVcbiAgICAgIC5tYXAoXG4gICAgICAgIChjZWxsKSA9PlxuICAgICAgICAgIGAke2dhbWVib2FyZENlbGxNYXJrdXAoXG4gICAgICAgICAgICBzaGlwc0FycmF5LmluY2x1ZGVzKGNvdW50ZXIpLFxuICAgICAgICAgICAgY2VsbCxcbiAgICAgICAgICAgIHRvU2VlU2hpcHNcbiAgICAgICAgICApfWBcbiAgICAgIClcbiAgICAgIC5qb2luKFwiXCIpfTwvZGl2PmA7XG5cbiAgY29uc3QgZ2FtZWJvYXJkQ2VsbE1hcmt1cCA9IChzaGlwLCBoaXQsIHRvU2VlU2hpcHMpID0+IHtcbiAgICBjb3VudGVyICs9IDE7XG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2NlbGwgJHtzaGlwICYmIHRvU2VlU2hpcHMgPyBcInNoaXBcIiA6IFwiXCJ9ICR7XG4gICAgICBoaXQgPyBcImhpdFwiIDogXCJcIlxuICAgIH0gJHshdG9TZWVTaGlwcyAmJiBzaGlwICYmIGhpdCA/IFwiZW5lbXktc2hpcC1oaXRcIiA6IFwiXCJ9XCIgZGF0YS1pbmRleD1cIiR7XG4gICAgICBjb3VudGVyIC0gMVxuICAgIH1cIj48L2Rpdj5gO1xuICB9O1xuXG4gIHJldHVybiB7IGdldEdhbWVib2FyZCB9O1xufSkoKTtcbmV4cG9ydCB7IG1hcmt1cHMgfTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIGF0dGFjayhlbmVteSwgbG9jYXRpb24pIHtcbiAgICBlbmVteS5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhsb2NhdGlvbik7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBsb2NhdGlvbiA9IFtdKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBoaXQoaW5kZXgpIHtcbiAgICB0aGlzLmhpdHMucHVzaChpbmRleCk7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRpb24uZXZlcnkoKGNlbGwpID0+IHRoaXMuaGl0cy5pbmNsdWRlcyhjZWxsKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvOndnaHRANDAwOzcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYzBhM2U7XFxuICBjb2xvcjogI2VlZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgc2Fucy1zZXJpZjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG59XFxuaGVhZGVyLFxcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGdhcDogMjBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxNjBweCk7XFxufVxcbi53cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuLmdhbWVib2FyZF9jb250YWluZXIge1xcbiAgd2lkdGg6IDYwMHB4O1xcbiAgaGVpZ2h0OiA2MDBweDtcXG59XFxuLmdhbWVib2FyZF9saW5lIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG59XFxuLmdhbWVib2FyZF9jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5zaGlwLCAucGxhY2VzaGlwIHtcXG4gIGJhY2tncm91bmQ6IGdyZWVuO1xcbn1cXG4uY29sbGlkaW5nIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxODcsIDU5LCA1OSk7XFxufVxcbi5oaXQ6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbiAgd2lkdGg6IDE1cHg7XFxuICBoZWlnaHQ6IDE1cHg7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuLmVuZW15LXNoaXAtaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig2NSwgMjAsIDIwKTtcXG59XFxuZm9vdGVyIHtcXG4gIG1hcmdpbi10b3A6IGF1dG87XFxufVxcbmZvb3RlciA+IGEgPiBpbWc6aG92ZXIge1xcbiAgZmlsdGVyOiBvcGFjaXR5KDAuNyk7XFxufVxcbi5tb2RhbF9fY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHotaW5kZXg6IDE7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBvcGFjaXR5OiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcXG59XFxuLnNob3ctbW9kYWwge1xcbiAgb3BhY2l0eTogMTtcXG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xcbn1cXG5cXG4ubW9kYWwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHdpZHRoOiA2MDBweDtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgei1pbmRleDogMTtcXG59XFxuLmdhbWVtb2Rlc19fd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMzBweDtcXG59XFxuXFxuLmZsZXgteSB7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUNBO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxzQkFBc0I7QUFDeEI7QUFDQTtFQUNFLHlCQUF5QjtFQUN6QixXQUFXO0VBQ1gsaUNBQWlDO0VBQ2pDLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsaUJBQWlCO0VBQ2pCLGdCQUFnQjtBQUNsQjtBQUNBOztFQUVFLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLFNBQVM7RUFDVCxXQUFXO0FBQ2I7QUFDQTtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1QsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQiwyQkFBMkI7QUFDN0I7QUFDQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLFNBQVM7RUFDVCxlQUFlO0FBQ2pCO0FBQ0E7RUFDRSxZQUFZO0VBQ1osYUFBYTtBQUNmO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLFdBQVc7RUFDWCx5QkFBeUI7QUFDM0I7QUFDQTtFQUNFLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osV0FBVztFQUNYLHVCQUF1QjtFQUN2QixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSw0QkFBNEI7QUFDOUI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gscUJBQXFCO0VBQ3JCLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0UsaUNBQWlDO0FBQ25DO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0Usb0NBQW9DO0VBQ3BDLGVBQWU7RUFDZixVQUFVO0VBQ1YsTUFBTTtFQUNOLE9BQU87RUFDUCxZQUFZO0VBQ1osYUFBYTtFQUNiLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFVBQVU7RUFDVixvQkFBb0I7RUFDcEIsNkJBQTZCO0FBQy9CO0FBQ0E7RUFDRSxVQUFVO0VBQ1Ysb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixlQUFlO0VBQ2YsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQix3Q0FBd0M7RUFDeEMsa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoXFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvOndnaHRANDAwOzcwMCZkaXNwbGF5PXN3YXBcXFwiKTtcXG4qIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYzBhM2U7XFxuICBjb2xvcjogI2VlZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgc2Fucy1zZXJpZjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG59XFxuaGVhZGVyLFxcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGdhcDogMjBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxNjBweCk7XFxufVxcbi53cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuLmdhbWVib2FyZF9jb250YWluZXIge1xcbiAgd2lkdGg6IDYwMHB4O1xcbiAgaGVpZ2h0OiA2MDBweDtcXG59XFxuLmdhbWVib2FyZF9saW5lIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG59XFxuLmdhbWVib2FyZF9jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5zaGlwLCAucGxhY2VzaGlwIHtcXG4gIGJhY2tncm91bmQ6IGdyZWVuO1xcbn1cXG4uY29sbGlkaW5nIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxODcsIDU5LCA1OSk7XFxufVxcbi5oaXQ6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbiAgd2lkdGg6IDE1cHg7XFxuICBoZWlnaHQ6IDE1cHg7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuLmVuZW15LXNoaXAtaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig2NSwgMjAsIDIwKTtcXG59XFxuZm9vdGVyIHtcXG4gIG1hcmdpbi10b3A6IGF1dG87XFxufVxcbmZvb3RlciA+IGEgPiBpbWc6aG92ZXIge1xcbiAgZmlsdGVyOiBvcGFjaXR5KDAuNyk7XFxufVxcbi5tb2RhbF9fY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHotaW5kZXg6IDE7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBvcGFjaXR5OiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcXG59XFxuLnNob3ctbW9kYWwge1xcbiAgb3BhY2l0eTogMTtcXG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xcbn1cXG5cXG4ubW9kYWwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHdpZHRoOiA2MDBweDtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgei1pbmRleDogMTtcXG59XFxuLmdhbWVtb2Rlc19fd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMzBweDtcXG59XFxuXFxuLmZsZXgteSB7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCB7IGRvbSB9IGZyb20gXCIuL2RvbVwiO1xuXG5kb20uaW5pdCgpO1xuIl0sIm5hbWVzIjpbImdhbWUiLCJtYXJrdXBzIiwiUGxheWVyIiwiaGVscGVycyIsIlNoaXAiLCJkb20iLCJwbGF5ZXIiLCJjb21wdXRlciIsIm1haW4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJtb2RhbENvbnRhaW5lciIsInBsYXllcjFCb2FyZCIsImd1ZXNzZXNBcnJheSIsInBsYXllcjJCb2FyZCIsImluaXQiLCJpIiwicHVzaCIsImRpc3BsYXlHYW1lTW9kZXMiLCJkaXNwbGF5Qm9hcmRzIiwiaW5uZXJIVE1MIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZ2V0R2FtZWJvYXJkIiwiZ2FtZUJvYXJkIiwibmFtZSIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsInJlY2VpdmVBdHRhY2siLCJOdW1iZXIiLCJkYXRhc2V0IiwiaW5kZXgiLCJpc0FsbFN1bmsiLCJnYW1lRW5kTW9kYWwiLCJyYW5kb20iLCJyYW5kb21HdWVzcyIsImZpbHRlciIsIngiLCJ3cmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsImFkZCIsImhlYWRlciIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJidG4xIiwiZGlzcGxheVBsYXllclZTQUlGb3JtIiwiYnRuMiIsImRpc2FibGVkIiwiZm9ybSIsImxhYmVsIiwic2V0QXR0cmlidXRlIiwiaW5wdXQiLCJ0eXBlIiwiaWQiLCJidG4iLCJ2YWx1ZSIsImRpc3BsYXlTaGlwUGxhY2luZyIsInNoaXBzIiwic3RhcnRpbmdTaGlwcyIsImxlbmd0aCIsImhvdmVyQXJyYXkiLCJjbGFzc05hbWUiLCJhYmxlVG9QbGFjZSIsImNvbnNvbGUiLCJsb2ciLCJjdXJyIiwiaW5mb1RleHQiLCJnYW1lYm9hcmQiLCJjaGVja0lmQ29sbGlkZWQiLCJjaGVja0lmTXVsdGlwbGVMaW5lcyIsImZvckVhY2giLCJlbCIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwiZnJvbSIsImNlbGwiLCJwbGFjZVNoaXAiLCJtb2RhbCIsIkdhbWVib2FyZCIsImJvYXJkIiwiY29vcmQiLCJzaGlwIiwiYXhpcyIsInRlbXAiLCJsb2NhdGlvbiIsInRvTG93ZXJDYXNlIiwiaXNTaGlwIiwiaGl0U2hpcCIsInNvbWUiLCJpbmNsdWRlcyIsImZpbmQiLCJoaXRzIiwiZXZlcnkiLCJpc1N1bmsiLCJhcnIiLCJ0ZW1wQ29vcmQiLCJjb29yZEFycmF5IiwicmVzIiwiTWF0aCIsImZsb29yIiwiYXJyYXkiLCJjb3VudGVyIiwidG9TZWVTaGlwcyIsInNoaXBzQXJyYXkiLCJnYW1lQm9hcmRDZWxscyIsImxlbiIsInNsaWNlIiwiZ2V0U2hpcHNDb29yZHMiLCJtYXAiLCJsaW5lIiwiZ2FtZWJvYXJkTGluZU1hcmt1cCIsImpvaW4iLCJnYW1lYm9hcmRDZWxsTWFya3VwIiwiaGl0IiwiZW5lbXkiXSwic291cmNlUm9vdCI6IiJ9