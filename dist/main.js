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
    player2Board.classList.add("cursor-pointer");
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
    main.insertAdjacentHTML("beforeend", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(player.gameBoard, "".concat(player.name, " board"), "PLAYER1", true));

    if (index >= _game__WEBPACK_IMPORTED_MODULE_0__.game.startingShips.length) {
      var btn = document.createElement("button");
      btn.textContent = "Start";
      main.prepend(btn);
      btn.addEventListener("click", function () {
        displayBoards();
      });
      var gameboard = document.querySelector(".gameboard_container");
      gameboard.classList.remove("cursor-pointer");
    } else {
      var hoverArray = [];
      var className;
      var ableToPlace;
      var axis;
      var curr = ships[index];
      var infoText = document.createElement("p");
      infoText.textContent = "Place your ".concat(curr.name);
      main.prepend(infoText);
      var label = document.createElement("label");
      label.classList.add("toggle");
      var input = document.createElement("input");
      input.setAttribute("type", "checkbox");
      var span = document.createElement("span");
      span.classList.add("labels");
      span.setAttribute("data-on", "Y");
      span.setAttribute("data-off", "X");
      label.appendChild(input);
      label.appendChild(span);

      var _gameboard = document.querySelector(".gameboard_container");

      main.insertBefore(label, _gameboard.parentElement);

      _gameboard.classList.add("cursor-pointer");

      _gameboard.addEventListener("mouseover", function (e) {
        hoverArray = [];
        axis = input.checked ? "y" : "x";

        for (var i = Number(e.target.dataset.index); i < Number(e.target.dataset.index) + (input.checked ? curr.length * 10 : curr.length); input.checked ? i += 10 : i++) {
          hoverArray.push(i);
        }

        ableToPlace = !player.gameBoard.checkIfCollided(Number(e.target.dataset.index), axis, curr.length) && !player.gameBoard.checkIfMultipleLines(hoverArray, axis);
        className = ableToPlace ? "placeship" : "colliding";
        hoverArray.forEach(function (el) {
          var query = document.querySelector("[data-index='".concat(el, "']"));

          if (query !== null) {
            query.classList.add(className);
          }
        });
      });

      var cells = document.querySelectorAll(".gameboard_cell");
      cells = Array.from(cells);
      cells.forEach(function (cell) {
        return cell.addEventListener("mouseleave", function (e) {
          hoverArray.forEach(function (el) {
            var query = document.querySelector("[data-index='".concat(el, "']"));

            if (query !== null) {
              query.classList.remove(className);
            }
          });
        });
      });

      _gameboard.addEventListener("click", function (e) {
        if (ableToPlace && e.target.classList.contains("gameboard_cell")) {
          player.gameBoard.placeShip(Number(e.target.dataset.index), new _ship__WEBPACK_IMPORTED_MODULE_4__["default"](curr.name), axis, curr.length);
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
        return coordArray.some(function (x) {
          return x > 100;
        });
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-color: #0c0a3e;\n  color: #eee;\n  font-family: \"Roboto\", sans-serif;\n  min-height: 100vh;\n  max-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n  max-width: 100vw;\n}\nheader,\nfooter {\n  height: 80px;\n  background-color: #383663;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  gap: 20px;\n  width: 100%;\n}\nmain {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n  align-items: center;\n  height: calc(100vh - 160px);\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.gameboard_container {\n  width: 600px;\n  height: 600px;\n}\n.gameboard_line {\n  width: 100%;\n  display: flex;\n  height: 10%;\n  border-collapse: collapse;\n}\n.gameboard_cell {\n  background-color: white;\n  height: 100%;\n  width: 100%;\n  border: 1px solid black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship,\n.placeship {\n  background: green;\n}\n.colliding {\n  background: rgb(187, 59, 59);\n}\n.hit::after {\n  position: absolute;\n  content: \"\";\n  background-color: red;\n  width: 15px;\n  height: 15px;\n  border-radius: 8px;\n  pointer-events: none;\n}\n.enemy-ship-hit {\n  background-color: rgb(65, 20, 20);\n}\nfooter {\n  margin-top: auto;\n}\nfooter > a > img:hover {\n  filter: opacity(0.7);\n}\n.modal__container {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s ease;\n}\n.show-modal {\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.modal {\n  background-color: #fff;\n  width: 600px;\n  max-width: 100%;\n  padding: 15px;\n  border-radius: 5px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  z-index: 1;\n}\n.gamemodes__wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n}\n\n.flex-y {\n  flex-direction: column;\n}\n\n.cursor-pointer {\n  cursor: pointer;\n}\n\n.toggle {\n  --width: 80px;\n  --height: calc(var(--width) / 3);\n\n  position: relative;\n  display: inline-block;\n  width: var(--width);\n  height: var(--height);\n  color: white;\n  background-color: #383663;\n  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);\n  cursor: pointer;\n}\n\n.toggle input {\n  display: none;\n}\n\n.toggle .labels {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  font-size: 16px;\n  transition: all 0.4s ease-in-out;\n  overflow: hidden;\n}\n\n.toggle .labels::after {\n  content: attr(data-off);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle .labels::before {\n  content: attr(data-on);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: calc(var(--width) * -1);\n  height: 100%;\n  width: 100%;\n  text-align: center;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle input:checked ~ .labels::after {\n  transform: translateX(var(--width));\n}\n\n.toggle input:checked ~ .labels::before {\n  transform: translateX(var(--width));\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AACA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;AACA;EACE,yBAAyB;EACzB,WAAW;EACX,iCAAiC;EACjC,iBAAiB;EACjB,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;EACjB,gBAAgB;AAClB;AACA;;EAEE,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,eAAe;EACf,SAAS;EACT,WAAW;AACb;AACA;EACE,aAAa;EACb,SAAS;EACT,uBAAuB;EACvB,mBAAmB;EACnB,2BAA2B;AAC7B;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;EACT,eAAe;AACjB;AACA;EACE,YAAY;EACZ,aAAa;AACf;AACA;EACE,WAAW;EACX,aAAa;EACb,WAAW;EACX,yBAAyB;AAC3B;AACA;EACE,uBAAuB;EACvB,YAAY;EACZ,WAAW;EACX,uBAAuB;EACvB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;AACA;;EAEE,iBAAiB;AACnB;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,qBAAqB;EACrB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;AACtB;AACA;EACE,iCAAiC;AACnC;AACA;EACE,gBAAgB;AAClB;AACA;EACE,oBAAoB;AACtB;AACA;EACE,oCAAoC;EACpC,eAAe;EACf,UAAU;EACV,MAAM;EACN,OAAO;EACP,YAAY;EACZ,aAAa;EACb,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;EACV,oBAAoB;EACpB,6BAA6B;AAC/B;AACA;EACE,UAAU;EACV,oBAAoB;AACtB;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,eAAe;EACf,aAAa;EACb,kBAAkB;EAClB,wCAAwC;EACxC,kBAAkB;EAClB,UAAU;AACZ;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,gCAAgC;;EAEhC,kBAAkB;EAClB,qBAAqB;EACrB,mBAAmB;EACnB,qBAAqB;EACrB,YAAY;EACZ,yBAAyB;EACzB,0CAA0C;EAC1C,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,eAAe;EACf,gCAAgC;EAChC,gBAAgB;AAClB;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,MAAM;EACN,OAAO;EACP,YAAY;EACZ,WAAW;EACX,gCAAgC;AAClC;;AAEA;EACE,sBAAsB;EACtB,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,MAAM;EACN,6BAA6B;EAC7B,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,gCAAgC;AAClC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,mCAAmC;AACrC","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap\");\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-color: #0c0a3e;\n  color: #eee;\n  font-family: \"Roboto\", sans-serif;\n  min-height: 100vh;\n  max-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n  max-width: 100vw;\n}\nheader,\nfooter {\n  height: 80px;\n  background-color: #383663;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  gap: 20px;\n  width: 100%;\n}\nmain {\n  display: flex;\n  gap: 20px;\n  justify-content: center;\n  align-items: center;\n  height: calc(100vh - 160px);\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.gameboard_container {\n  width: 600px;\n  height: 600px;\n}\n.gameboard_line {\n  width: 100%;\n  display: flex;\n  height: 10%;\n  border-collapse: collapse;\n}\n.gameboard_cell {\n  background-color: white;\n  height: 100%;\n  width: 100%;\n  border: 1px solid black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship,\n.placeship {\n  background: green;\n}\n.colliding {\n  background: rgb(187, 59, 59);\n}\n.hit::after {\n  position: absolute;\n  content: \"\";\n  background-color: red;\n  width: 15px;\n  height: 15px;\n  border-radius: 8px;\n  pointer-events: none;\n}\n.enemy-ship-hit {\n  background-color: rgb(65, 20, 20);\n}\nfooter {\n  margin-top: auto;\n}\nfooter > a > img:hover {\n  filter: opacity(0.7);\n}\n.modal__container {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s ease;\n}\n.show-modal {\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.modal {\n  background-color: #fff;\n  width: 600px;\n  max-width: 100%;\n  padding: 15px;\n  border-radius: 5px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  z-index: 1;\n}\n.gamemodes__wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n}\n\n.flex-y {\n  flex-direction: column;\n}\n\n.cursor-pointer {\n  cursor: pointer;\n}\n\n.toggle {\n  --width: 80px;\n  --height: calc(var(--width) / 3);\n\n  position: relative;\n  display: inline-block;\n  width: var(--width);\n  height: var(--height);\n  color: white;\n  background-color: #383663;\n  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);\n  cursor: pointer;\n}\n\n.toggle input {\n  display: none;\n}\n\n.toggle .labels {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  font-size: 16px;\n  transition: all 0.4s ease-in-out;\n  overflow: hidden;\n}\n\n.toggle .labels::after {\n  content: attr(data-off);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle .labels::before {\n  content: attr(data-on);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: calc(var(--width) * -1);\n  height: 100%;\n  width: 100%;\n  text-align: center;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle input:checked ~ .labels::after {\n  transform: translateX(var(--width));\n}\n\n.toggle input:checked ~ .labels::before {\n  transform: translateX(var(--width));\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FDZmU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNKQTtBQUNBLGtCQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7VUNqQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBRUFDLDBDQUFBLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lQm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9oZWxwZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFya3Vwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgbWFya3VwcyB9IGZyb20gXCIuL21hcmt1cHNcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBoZWxwZXJzIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuY29uc3QgZG9tID0gKCgpID0+IHtcbiAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihcIkVsdmluYXNcIik7XG4gIGNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcihcIkFJXCIpO1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gIGNvbnN0IG1vZGFsQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbC1jb250YWluZXJcIik7XG4gIGxldCBwbGF5ZXIxQm9hcmQ7XG4gIGxldCBndWVzc2VzQXJyYXkgPSBbXTtcbiAgbGV0IHBsYXllcjJCb2FyZDtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGd1ZXNzZXNBcnJheS5wdXNoKGkpO1xuICAgIH1cbiAgICBnYW1lLmluaXQocGxheWVyLCBjb21wdXRlcik7XG4gICAgZGlzcGxheUdhbWVNb2RlcygpO1xuICB9O1xuICBjb25zdCBkaXNwbGF5Qm9hcmRzID0gKCkgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBtYWluLmNsYXNzTGlzdC5yZW1vdmUoXCJmbGV4LXlcIik7XG4gICAgbWFpbi5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICBcImFmdGVyYmVnaW5cIixcbiAgICAgIG1hcmt1cHMuZ2V0R2FtZWJvYXJkKFxuICAgICAgICBnYW1lLnBsYXllci5nYW1lQm9hcmQsXG4gICAgICAgIGAke2dhbWUucGxheWVyLm5hbWV9IGJvYXJkYCxcbiAgICAgICAgXCJQTEFZRVIxXCIsXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICApO1xuICAgIG1haW4uaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgXCJiZWZvcmVFbmRcIixcbiAgICAgIG1hcmt1cHMuZ2V0R2FtZWJvYXJkKFxuICAgICAgICBnYW1lLmNvbXB1dGVyLmdhbWVCb2FyZCxcbiAgICAgICAgYCR7Z2FtZS5jb21wdXRlci5uYW1lfSBib2FyZGAsXG4gICAgICAgIFwiUExBWUVSMlwiLFxuICAgICAgICBmYWxzZVxuICAgICAgKVxuICAgICk7XG4gICAgcGxheWVyMUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJQTEFZRVIxXCIpO1xuICAgIHBsYXllcjJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUExBWUVSMlwiKTtcbiAgICBwbGF5ZXIyQm9hcmQuY2xhc3NMaXN0LmFkZChcImN1cnNvci1wb2ludGVyXCIpO1xuICAgIHBsYXllcjJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSAmJlxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJnYW1lYm9hcmRfY2VsbFwiKVxuICAgICAgKSB7XG4gICAgICAgIGdhbWUuY29tcHV0ZXIuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpKTtcbiAgICAgICAgZGlzcGxheUJvYXJkcygpO1xuICAgICAgICBpZiAoZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICAgICAgICBnYW1lRW5kTW9kYWwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByYW5kb20gPSBoZWxwZXJzLnJhbmRvbUd1ZXNzKGd1ZXNzZXNBcnJheSk7XG4gICAgICAgIGd1ZXNzZXNBcnJheSA9IGd1ZXNzZXNBcnJheS5maWx0ZXIoKHgpID0+IHggIT09IHJhbmRvbSk7XG4gICAgICAgIGdhbWUucGxheWVyLmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKHJhbmRvbSk7XG5cbiAgICAgICAgaWYgKGdhbWUucGxheWVyLmdhbWVCb2FyZC5pc0FsbFN1bmsoKSkge1xuICAgICAgICAgIGdhbWVFbmRNb2RhbCgpO1xuICAgICAgICB9XG4gICAgICAgIGRpc3BsYXlCb2FyZHMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5R2FtZU1vZGVzID0gKCkgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJnYW1lbW9kZXNfX3dyYXBwZXJcIik7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJTRUxFQ1QgR0FNRSBNT0RFXCI7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgY29uc3QgYnRuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuMS50ZXh0Q29udGVudCA9IFwiUExBWUVSIFZTIEFJXCI7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChidG4xKTtcbiAgICBidG4xLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBkaXNwbGF5UGxheWVyVlNBSUZvcm0oKTtcbiAgICB9KTtcbiAgICBjb25zdCBidG4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4yLnRleHRDb250ZW50ID0gXCJQTEFZRVIgVlMgUExBWUVSXCI7XG4gICAgYnRuMi5kaXNhYmxlZCA9IHRydWU7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChidG4yKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQbGF5ZXJWU0FJRm9ybSA9ICgpID0+IHtcbiAgICBtYWluLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuXG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSBcIkVudGVyIHlvdXIgbmFtZTogXCI7XG4gICAgbGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwibmFtZVwiKTtcblxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICBpbnB1dC5uYW1lID0gXCJuYW1lXCI7XG4gICAgaW5wdXQuaWQgPSBcIm5hbWVcIjtcblxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuLnRleHRDb250ZW50ID0gXCJTdGFydFwiO1xuICAgIGlmIChpbnB1dC52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgIGlmIChpbnB1dC52YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBnYW1lLnBsYXllci5uYW1lID0gaW5wdXQudmFsdWU7XG4gICAgICBkaXNwbGF5U2hpcFBsYWNpbmcoZ2FtZS5wbGF5ZXIsIDApO1xuICAgIH0pO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGZvcm0pO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlTaGlwUGxhY2luZyA9IChwbGF5ZXIsIGluZGV4KSA9PiB7XG4gICAgbWFpbi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIG1haW4uY2xhc3NMaXN0LmFkZChcImZsZXgteVwiKTtcbiAgICBjb25zdCBzaGlwcyA9IGdhbWUuc3RhcnRpbmdTaGlwcztcbiAgICBtYWluLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgICBtYXJrdXBzLmdldEdhbWVib2FyZChcbiAgICAgICAgcGxheWVyLmdhbWVCb2FyZCxcbiAgICAgICAgYCR7cGxheWVyLm5hbWV9IGJvYXJkYCxcbiAgICAgICAgXCJQTEFZRVIxXCIsXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICApO1xuICAgIGlmIChpbmRleCA+PSBnYW1lLnN0YXJ0aW5nU2hpcHMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgYnRuLnRleHRDb250ZW50ID0gXCJTdGFydFwiO1xuICAgICAgbWFpbi5wcmVwZW5kKGJ0bik7XG4gICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgZGlzcGxheUJvYXJkcygpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkX2NvbnRhaW5lclwiKTtcbiAgICAgIGdhbWVib2FyZC5jbGFzc0xpc3QucmVtb3ZlKFwiY3Vyc29yLXBvaW50ZXJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBob3ZlckFycmF5ID0gW107XG4gICAgICBsZXQgY2xhc3NOYW1lO1xuICAgICAgbGV0IGFibGVUb1BsYWNlO1xuICAgICAgbGV0IGF4aXM7XG4gICAgICBsZXQgY3VyciA9IHNoaXBzW2luZGV4XTtcbiAgICAgIGNvbnN0IGluZm9UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBpbmZvVGV4dC50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7Y3Vyci5uYW1lfWA7XG4gICAgICBtYWluLnByZXBlbmQoaW5mb1RleHQpO1xuXG4gICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgIGxhYmVsLmNsYXNzTGlzdC5hZGQoXCJ0b2dnbGVcIik7XG5cbiAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuXG4gICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoXCJsYWJlbHNcIik7XG4gICAgICBzcGFuLnNldEF0dHJpYnV0ZShcImRhdGEtb25cIiwgXCJZXCIpO1xuICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLW9mZlwiLCBcIlhcIik7XG5cbiAgICAgIGxhYmVsLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICAgIGxhYmVsLmFwcGVuZENoaWxkKHNwYW4pO1xuXG4gICAgICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZF9jb250YWluZXJcIik7XG4gICAgICBtYWluLmluc2VydEJlZm9yZShsYWJlbCwgZ2FtZWJvYXJkLnBhcmVudEVsZW1lbnQpO1xuICAgICAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoXCJjdXJzb3ItcG9pbnRlclwiKTtcbiAgICAgIGdhbWVib2FyZC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIChlKSA9PiB7XG4gICAgICAgIGhvdmVyQXJyYXkgPSBbXTtcbiAgICAgICAgYXhpcyA9IGlucHV0LmNoZWNrZWQgPyBcInlcIiA6IFwieFwiO1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpO1xuICAgICAgICAgIGkgPFxuICAgICAgICAgIE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmluZGV4KSArXG4gICAgICAgICAgICAoaW5wdXQuY2hlY2tlZCA/IGN1cnIubGVuZ3RoICogMTAgOiBjdXJyLmxlbmd0aCk7XG4gICAgICAgICAgaW5wdXQuY2hlY2tlZCA/IChpICs9IDEwKSA6IGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBob3ZlckFycmF5LnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgYWJsZVRvUGxhY2UgPVxuICAgICAgICAgICFwbGF5ZXIuZ2FtZUJvYXJkLmNoZWNrSWZDb2xsaWRlZChcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmluZGV4KSxcbiAgICAgICAgICAgIGF4aXMsXG4gICAgICAgICAgICBjdXJyLmxlbmd0aFxuICAgICAgICAgICkgJiYgIXBsYXllci5nYW1lQm9hcmQuY2hlY2tJZk11bHRpcGxlTGluZXMoaG92ZXJBcnJheSwgYXhpcyk7XG4gICAgICAgIGNsYXNzTmFtZSA9IGFibGVUb1BsYWNlID8gXCJwbGFjZXNoaXBcIiA6IFwiY29sbGlkaW5nXCI7XG5cbiAgICAgICAgaG92ZXJBcnJheS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaW5kZXg9JyR7ZWx9J11gKTtcbiAgICAgICAgICBpZiAocXVlcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHF1ZXJ5LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBsZXQgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWVib2FyZF9jZWxsXCIpO1xuICAgICAgY2VsbHMgPSBBcnJheS5mcm9tKGNlbGxzKTtcbiAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGUpID0+IHtcbiAgICAgICAgICBob3ZlckFycmF5LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWluZGV4PScke2VsfSddYCk7XG4gICAgICAgICAgICBpZiAocXVlcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgcXVlcnkuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIGdhbWVib2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGFibGVUb1BsYWNlICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImdhbWVib2FyZF9jZWxsXCIpKSB7XG4gICAgICAgICAgcGxheWVyLmdhbWVCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pbmRleCksXG4gICAgICAgICAgICBuZXcgU2hpcChjdXJyLm5hbWUpLFxuICAgICAgICAgICAgYXhpcyxcbiAgICAgICAgICAgIGN1cnIubGVuZ3RoXG4gICAgICAgICAgKTtcbiAgICAgICAgICBkaXNwbGF5U2hpcFBsYWNpbmcocGxheWVyLCBpbmRleCArIDEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGdhbWVFbmRNb2RhbCA9ICgpID0+IHtcbiAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwic2hvdy1tb2RhbFwiKTtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsXCIpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGAke1xuICAgICAgZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQuaXNBbGxTdW5rKClcbiAgICAgICAgPyBnYW1lLnBsYXllci5uYW1lXG4gICAgICAgIDogZ2FtZS5jb21wdXRlci5uYW1lXG4gICAgfSBoYXMgd29uIWA7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiUGxheSBhZ2FpblwiO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZ2FtZS5pbml0KHBsYXllciwgY29tcHV0ZXIpO1xuICAgICAgZGlzcGxheVNoaXBQbGFjaW5nKGdhbWUucGxheWVyLCAwKTtcbiAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93LW1vZGFsXCIpO1xuICAgICAgbW9kYWxDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9KTtcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChidG4pO1xuICAgIG1vZGFsQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vZGFsKTtcbiAgfTtcblxuICByZXR1cm4geyBpbml0IH07XG59KSgpO1xuZXhwb3J0IHsgZG9tIH07XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lQm9hcmRcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcbmNvbnN0IGdhbWUgPSAoKCkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiRWx2aW5hc1wiKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiQUlcIik7XG4gIGNvbnN0IHN0YXJ0aW5nU2hpcHMgPSBbXG4gICAgeyBuYW1lOiBcIkNhcnJpZXJcIiwgbGVuZ3RoOiA1IH0sXG4gICAgeyBuYW1lOiBcIkJhdHRsZXNoaXBcIiwgbGVuZ3RoOiA0IH0sXG4gICAgeyBuYW1lOiBcIkNydWlzZXJcIiwgbGVuZ3RoOiAzIH0sXG4gICAgeyBuYW1lOiBcIlN1Ym1hcmluZVwiLCBsZW5ndGg6IDMgfSxcbiAgICB7IG5hbWU6IFwiRGVzdHJveWVyXCIsIGxlbmd0aDogMiB9LFxuICBdO1xuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIHBsYXllci5nYW1lQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgY29tcHV0ZXIuZ2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICAgIGNvbXB1dGVyLmdhbWVCb2FyZC5wbGFjZVNoaXAoNjUsIG5ldyBTaGlwKFwiRGVzdHJveWVyXCIpLCBcInhcIiwgMik7XG4gIH07XG5cbiAgcmV0dXJuIHsgaW5pdCwgcGxheWVyLCBjb21wdXRlciwgc3RhcnRpbmdTaGlwcyB9O1xufSkoKTtcbmV4cG9ydCB7IGdhbWUgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgdGhpcy5ib2FyZC5wdXNoKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwbGFjZVNoaXAoY29vcmQsIHNoaXAsIGF4aXMsIGxlbmd0aCkge1xuICAgIGxldCB0ZW1wID0gY29vcmQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgc2hpcC5sb2NhdGlvbi5wdXNoKHRlbXApO1xuICAgICAgdGVtcCArPSBheGlzLnRvTG93ZXJDYXNlKCkgPT09IFwieFwiID8gMSA6IDEwO1xuICAgIH1cbiAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3JkKSB7XG4gICAgdGhpcy5ib2FyZFtjb29yZF0gPSB0cnVlO1xuICAgIGlmICh0aGlzLmlzU2hpcChjb29yZCkpIHtcbiAgICAgIHRoaXMuaGl0U2hpcChjb29yZCk7XG4gICAgfVxuICB9XG5cbiAgaXNTaGlwKGNvb3JkKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hpcHMuc29tZSgoeCkgPT4geC5sb2NhdGlvbi5pbmNsdWRlcyhjb29yZCkpO1xuICB9XG5cbiAgaGl0U2hpcChjb29yZCkge1xuICAgIHRoaXMuc2hpcHMuZmluZCgoeCkgPT4geC5sb2NhdGlvbi5pbmNsdWRlcyhjb29yZCkpLmhpdHMucHVzaChjb29yZCk7XG4gIH1cblxuICBpc0FsbFN1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hpcHMuZXZlcnkoKHgpID0+IHguaXNTdW5rKCkpO1xuICB9XG5cbiAgZ2V0U2hpcHNDb29yZHMoKSB7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgaWYgKHRoaXMuaXNTaGlwKGkpKSBhcnIucHVzaChpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGNoZWNrSWZDb2xsaWRlZChjb29yZCwgYXhpcywgbGVuZ3RoKSB7XG4gICAgbGV0IHRlbXBDb29yZCA9IGNvb3JkO1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyci5wdXNoKHRlbXBDb29yZCk7XG4gICAgICB0ZW1wQ29vcmQgKz0gYXhpcy50b0xvd2VyQ2FzZSgpID09PSBcInhcIiA/IDEgOiAxMDtcbiAgICB9XG4gICAgcmV0dXJuIGFyci5zb21lKCh4KSA9PlxuICAgICAgdGhpcy5zaGlwcy5zb21lKChzaGlwKSA9PiBzaGlwLmxvY2F0aW9uLmluY2x1ZGVzKHgpKVxuICAgICk7XG4gIH1cblxuICBjaGVja0lmTXVsdGlwbGVMaW5lcyhjb29yZEFycmF5LCBheGlzKSB7XG4gICAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgICBjb25zdCByZXMgPSBNYXRoLmZsb29yKGNvb3JkQXJyYXlbMF0gLyAxMCk7XG4gICAgICByZXR1cm4gIShcbiAgICAgICAgY29vcmRBcnJheS5sZW5ndGggPT09XG4gICAgICAgIGNvb3JkQXJyYXkuZmlsdGVyKCh4KSA9PiBNYXRoLmZsb29yKHggLyAxMCkgPT09IHJlcykubGVuZ3RoXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICAgIHJldHVybiBjb29yZEFycmF5LnNvbWUoKHgpID0+IHggPiAxMDApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJjb25zdCBoZWxwZXJzID0gKCgpID0+IHtcbiAgY29uc3QgcmFuZG9tR3Vlc3MgPSAoYXJyYXkpID0+IHtcbiAgICBsZXQgcmFuZG9tID0gYXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoKV07XG4gICAgcmV0dXJuIHJhbmRvbTtcbiAgfTtcblxuICByZXR1cm4geyByYW5kb21HdWVzcyB9O1xufSkoKTtcbmV4cG9ydCB7IGhlbHBlcnMgfTtcbiIsImNvbnN0IG1hcmt1cHMgPSAoKCkgPT4ge1xuICBsZXQgY291bnRlciA9IDA7XG4gIGNvbnN0IGdldEdhbWVib2FyZCA9IChnYW1lYm9hcmQsIGhlYWRlciwgaWQsIHRvU2VlU2hpcHMpID0+IHtcbiAgICBsZXQgc2hpcHNBcnJheSA9IFtdO1xuICAgIGNvdW50ZXIgPSAwO1xuICAgIGNvbnN0IGdhbWVCb2FyZENlbGxzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGdhbWVib2FyZC5ib2FyZC5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMTApIHtcbiAgICAgIGdhbWVCb2FyZENlbGxzLnB1c2goZ2FtZWJvYXJkLmJvYXJkLnNsaWNlKGksIGkgKyAxMCkpO1xuICAgIH1cbiAgICBzaGlwc0FycmF5ID0gZ2FtZWJvYXJkLmdldFNoaXBzQ29vcmRzKCk7XG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwid3JhcHBlclwiPjxoMj4ke2hlYWRlcn08L2gyPjxkaXYgY2xhc3M9XCJnYW1lYm9hcmRfY29udGFpbmVyXCIgaWQ9XCIke2lkfVwiPiR7Z2FtZUJvYXJkQ2VsbHNcbiAgICAgIC5tYXAoKGxpbmUpID0+IGdhbWVib2FyZExpbmVNYXJrdXAobGluZSwgc2hpcHNBcnJheSwgdG9TZWVTaGlwcykpXG4gICAgICAuam9pbihcIlwiKX08L2Rpdj48L2Rpdj5gO1xuICB9O1xuICBjb25zdCBnYW1lYm9hcmRMaW5lTWFya3VwID0gKGxpbmUsIHNoaXBzQXJyYXksIHRvU2VlU2hpcHMpID0+XG4gICAgYDxkaXYgY2xhc3M9XCJnYW1lYm9hcmRfbGluZVwiPiR7bGluZVxuICAgICAgLm1hcChcbiAgICAgICAgKGNlbGwpID0+XG4gICAgICAgICAgYCR7Z2FtZWJvYXJkQ2VsbE1hcmt1cChcbiAgICAgICAgICAgIHNoaXBzQXJyYXkuaW5jbHVkZXMoY291bnRlciksXG4gICAgICAgICAgICBjZWxsLFxuICAgICAgICAgICAgdG9TZWVTaGlwc1xuICAgICAgICAgICl9YFxuICAgICAgKVxuICAgICAgLmpvaW4oXCJcIil9PC9kaXY+YDtcblxuICBjb25zdCBnYW1lYm9hcmRDZWxsTWFya3VwID0gKHNoaXAsIGhpdCwgdG9TZWVTaGlwcykgPT4ge1xuICAgIGNvdW50ZXIgKz0gMTtcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJnYW1lYm9hcmRfY2VsbCAke3NoaXAgJiYgdG9TZWVTaGlwcyA/IFwic2hpcFwiIDogXCJcIn0gJHtcbiAgICAgIGhpdCA/IFwiaGl0XCIgOiBcIlwiXG4gICAgfSAkeyF0b1NlZVNoaXBzICYmIHNoaXAgJiYgaGl0ID8gXCJlbmVteS1zaGlwLWhpdFwiIDogXCJcIn1cIiBkYXRhLWluZGV4PVwiJHtcbiAgICAgIGNvdW50ZXIgLSAxXG4gICAgfVwiPjwvZGl2PmA7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0R2FtZWJvYXJkIH07XG59KSgpO1xuZXhwb3J0IHsgbWFya3VwcyB9O1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lQm9hcmRcIjtcbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZ2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICB9XG5cbiAgYXR0YWNrKGVuZW15LCBsb2NhdGlvbikge1xuICAgIGVuZW15LmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKGxvY2F0aW9uKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGxvY2F0aW9uID0gW10pIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICB0aGlzLmhpdHMgPSBbXTtcbiAgfVxuXG4gIGhpdChpbmRleCkge1xuICAgIHRoaXMuaGl0cy5wdXNoKGluZGV4KTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdGlvbi5ldmVyeSgoY2VsbCkgPT4gdGhpcy5oaXRzLmluY2x1ZGVzKGNlbGwpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG86d2dodEA0MDA7NzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBjMGEzZTtcXG4gIGNvbG9yOiAjZWVlO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBzYW5zLXNlcmlmO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbn1cXG5oZWFkZXIsXFxuZm9vdGVyIHtcXG4gIGhlaWdodDogODBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODM2NjM7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZ2FwOiAyMHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMjBweDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDE2MHB4KTtcXG59XFxuLndyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAyMHB4O1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbn1cXG4uZ2FtZWJvYXJkX2NvbnRhaW5lciB7XFxuICB3aWR0aDogNjAwcHg7XFxuICBoZWlnaHQ6IDYwMHB4O1xcbn1cXG4uZ2FtZWJvYXJkX2xpbmUge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiAxMCU7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbn1cXG4uZ2FtZWJvYXJkX2NlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLnNoaXAsXFxuLnBsYWNlc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBncmVlbjtcXG59XFxuLmNvbGxpZGluZyB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTg3LCA1OSwgNTkpO1xcbn1cXG4uaGl0OjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbi5lbmVteS1zaGlwLWhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNjUsIDIwLCAyMCk7XFxufVxcbmZvb3RlciB7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbn1cXG5mb290ZXIgPiBhID4gaW1nOmhvdmVyIHtcXG4gIGZpbHRlcjogb3BhY2l0eSgwLjcpO1xcbn1cXG4ubW9kYWxfX2NvbnRhaW5lciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgb3BhY2l0eTogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2U7XFxufVxcbi5zaG93LW1vZGFsIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBwb2ludGVyLWV2ZW50czogYXV0bztcXG59XFxuXFxuLm1vZGFsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB3aWR0aDogNjAwcHg7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi5nYW1lbW9kZXNfX3dyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDMwcHg7XFxufVxcblxcbi5mbGV4LXkge1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLmN1cnNvci1wb2ludGVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnRvZ2dsZSB7XFxuICAtLXdpZHRoOiA4MHB4O1xcbiAgLS1oZWlnaHQ6IGNhbGModmFyKC0td2lkdGgpIC8gMyk7XFxuXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogdmFyKC0td2lkdGgpO1xcbiAgaGVpZ2h0OiB2YXIoLS1oZWlnaHQpO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM4MzY2MztcXG4gIGJveC1zaGFkb3c6IDBweCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnRvZ2dsZSBpbnB1dCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4udG9nZ2xlIC5sYWJlbHMge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbi1vdXQ7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4udG9nZ2xlIC5sYWJlbHM6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1vZmYpO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4udG9nZ2xlIC5sYWJlbHM6OmJlZm9yZSB7XFxuICBjb250ZW50OiBhdHRyKGRhdGEtb24pO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IGNhbGModmFyKC0td2lkdGgpICogLTEpO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnRvZ2dsZSBpbnB1dDpjaGVja2VkIH4gLmxhYmVsczo6YWZ0ZXIge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKHZhcigtLXdpZHRoKSk7XFxufVxcblxcbi50b2dnbGUgaW5wdXQ6Y2hlY2tlZCB+IC5sYWJlbHM6OmJlZm9yZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgodmFyKC0td2lkdGgpKTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFDQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsV0FBVztFQUNYLGlDQUFpQztFQUNqQyxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixnQkFBZ0I7QUFDbEI7QUFDQTs7RUFFRSxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixTQUFTO0VBQ1QsV0FBVztBQUNiO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsU0FBUztFQUNULHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsMkJBQTJCO0FBQzdCO0FBQ0E7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixTQUFTO0VBQ1QsZUFBZTtBQUNqQjtBQUNBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7QUFDZjtBQUNBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixXQUFXO0VBQ1gseUJBQXlCO0FBQzNCO0FBQ0E7RUFDRSx1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLFdBQVc7RUFDWCx1QkFBdUI7RUFDdkIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7QUFDQTs7RUFFRSxpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLDRCQUE0QjtBQUM5QjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxxQkFBcUI7RUFDckIsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsb0JBQW9CO0FBQ3RCO0FBQ0E7RUFDRSxpQ0FBaUM7QUFDbkM7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0Usb0JBQW9CO0FBQ3RCO0FBQ0E7RUFDRSxvQ0FBb0M7RUFDcEMsZUFBZTtFQUNmLFVBQVU7RUFDVixNQUFNO0VBQ04sT0FBTztFQUNQLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsVUFBVTtFQUNWLG9CQUFvQjtFQUNwQiw2QkFBNkI7QUFDL0I7QUFDQTtFQUNFLFVBQVU7RUFDVixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGVBQWU7RUFDZixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLHdDQUF3QztFQUN4QyxrQkFBa0I7RUFDbEIsVUFBVTtBQUNaO0FBQ0E7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZ0NBQWdDOztFQUVoQyxrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QiwwQ0FBMEM7RUFDMUMsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0VBQ1osZUFBZTtFQUNmLGdDQUFnQztFQUNoQyxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLE1BQU07RUFDTixPQUFPO0VBQ1AsWUFBWTtFQUNaLFdBQVc7RUFDWCxnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLE1BQU07RUFDTiw2QkFBNkI7RUFDN0IsWUFBWTtFQUNaLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKFxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bzp3Z2h0QDQwMDs3MDAmZGlzcGxheT1zd2FwXFxcIik7XFxuKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGMwYTNlO1xcbiAgY29sb3I6ICNlZWU7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIHNhbnMtc2VyaWY7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIG1heC13aWR0aDogMTAwdnc7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIG1heC13aWR0aDogMTAwdnc7XFxufVxcbmhlYWRlcixcXG5mb290ZXIge1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM4MzY2MztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBnYXA6IDIwcHg7XFxuICB3aWR0aDogMTAwJTtcXG59XFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAyMHB4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTYwcHgpO1xcbn1cXG4ud3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDIwcHg7XFxuICBmb250LXNpemU6IDIwcHg7XFxufVxcbi5nYW1lYm9hcmRfY29udGFpbmVyIHtcXG4gIHdpZHRoOiA2MDBweDtcXG4gIGhlaWdodDogNjAwcHg7XFxufVxcbi5nYW1lYm9hcmRfbGluZSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDEwJTtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxufVxcbi5nYW1lYm9hcmRfY2VsbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4uc2hpcCxcXG4ucGxhY2VzaGlwIHtcXG4gIGJhY2tncm91bmQ6IGdyZWVuO1xcbn1cXG4uY29sbGlkaW5nIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxODcsIDU5LCA1OSk7XFxufVxcbi5oaXQ6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbiAgd2lkdGg6IDE1cHg7XFxuICBoZWlnaHQ6IDE1cHg7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuLmVuZW15LXNoaXAtaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig2NSwgMjAsIDIwKTtcXG59XFxuZm9vdGVyIHtcXG4gIG1hcmdpbi10b3A6IGF1dG87XFxufVxcbmZvb3RlciA+IGEgPiBpbWc6aG92ZXIge1xcbiAgZmlsdGVyOiBvcGFjaXR5KDAuNyk7XFxufVxcbi5tb2RhbF9fY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHotaW5kZXg6IDE7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBvcGFjaXR5OiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcXG59XFxuLnNob3ctbW9kYWwge1xcbiAgb3BhY2l0eTogMTtcXG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xcbn1cXG5cXG4ubW9kYWwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHdpZHRoOiA2MDBweDtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgei1pbmRleDogMTtcXG59XFxuLmdhbWVtb2Rlc19fd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMzBweDtcXG59XFxuXFxuLmZsZXgteSB7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uY3Vyc29yLXBvaW50ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4udG9nZ2xlIHtcXG4gIC0td2lkdGg6IDgwcHg7XFxuICAtLWhlaWdodDogY2FsYyh2YXIoLS13aWR0aCkgLyAzKTtcXG5cXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiB2YXIoLS13aWR0aCk7XFxuICBoZWlnaHQ6IHZhcigtLWhlaWdodCk7XFxuICBjb2xvcjogd2hpdGU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgYm94LXNoYWRvdzogMHB4IDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4udG9nZ2xlIGlucHV0IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi50b2dnbGUgLmxhYmVscyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlLWluLW91dDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi50b2dnbGUgLmxhYmVsczo6YWZ0ZXIge1xcbiAgY29udGVudDogYXR0cihkYXRhLW9mZik7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi50b2dnbGUgLmxhYmVsczo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1vbik7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogY2FsYyh2YXIoLS13aWR0aCkgKiAtMSk7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4udG9nZ2xlIGlucHV0OmNoZWNrZWQgfiAubGFiZWxzOjphZnRlciB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgodmFyKC0td2lkdGgpKTtcXG59XFxuXFxuLnRvZ2dsZSBpbnB1dDpjaGVja2VkIH4gLmxhYmVsczo6YmVmb3JlIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCh2YXIoLS13aWR0aCkpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCB7IGRvbSB9IGZyb20gXCIuL2RvbVwiO1xuXG5kb20uaW5pdCgpO1xuIl0sIm5hbWVzIjpbImdhbWUiLCJtYXJrdXBzIiwiUGxheWVyIiwiaGVscGVycyIsIlNoaXAiLCJkb20iLCJwbGF5ZXIiLCJjb21wdXRlciIsIm1haW4iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJtb2RhbENvbnRhaW5lciIsInBsYXllcjFCb2FyZCIsImd1ZXNzZXNBcnJheSIsInBsYXllcjJCb2FyZCIsImluaXQiLCJpIiwicHVzaCIsImRpc3BsYXlHYW1lTW9kZXMiLCJkaXNwbGF5Qm9hcmRzIiwiaW5uZXJIVE1MIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZ2V0R2FtZWJvYXJkIiwiZ2FtZUJvYXJkIiwibmFtZSIsImdldEVsZW1lbnRCeUlkIiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsInJlY2VpdmVBdHRhY2siLCJOdW1iZXIiLCJkYXRhc2V0IiwiaW5kZXgiLCJpc0FsbFN1bmsiLCJnYW1lRW5kTW9kYWwiLCJyYW5kb20iLCJyYW5kb21HdWVzcyIsImZpbHRlciIsIngiLCJ3cmFwcGVyIiwiY3JlYXRlRWxlbWVudCIsImhlYWRlciIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJidG4xIiwiZGlzcGxheVBsYXllclZTQUlGb3JtIiwiYnRuMiIsImRpc2FibGVkIiwiZm9ybSIsImxhYmVsIiwic2V0QXR0cmlidXRlIiwiaW5wdXQiLCJ0eXBlIiwiaWQiLCJidG4iLCJ2YWx1ZSIsImRpc3BsYXlTaGlwUGxhY2luZyIsInNoaXBzIiwic3RhcnRpbmdTaGlwcyIsImxlbmd0aCIsInByZXBlbmQiLCJnYW1lYm9hcmQiLCJob3ZlckFycmF5IiwiY2xhc3NOYW1lIiwiYWJsZVRvUGxhY2UiLCJheGlzIiwiY3VyciIsImluZm9UZXh0Iiwic3BhbiIsImluc2VydEJlZm9yZSIsInBhcmVudEVsZW1lbnQiLCJjaGVja2VkIiwiY2hlY2tJZkNvbGxpZGVkIiwiY2hlY2tJZk11bHRpcGxlTGluZXMiLCJmb3JFYWNoIiwiZWwiLCJxdWVyeSIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwiZnJvbSIsImNlbGwiLCJwbGFjZVNoaXAiLCJtb2RhbCIsIkdhbWVib2FyZCIsImJvYXJkIiwiY29vcmQiLCJzaGlwIiwidGVtcCIsImxvY2F0aW9uIiwidG9Mb3dlckNhc2UiLCJpc1NoaXAiLCJoaXRTaGlwIiwic29tZSIsImluY2x1ZGVzIiwiZmluZCIsImhpdHMiLCJldmVyeSIsImlzU3VuayIsImFyciIsInRlbXBDb29yZCIsImNvb3JkQXJyYXkiLCJyZXMiLCJNYXRoIiwiZmxvb3IiLCJhcnJheSIsImNvdW50ZXIiLCJ0b1NlZVNoaXBzIiwic2hpcHNBcnJheSIsImdhbWVCb2FyZENlbGxzIiwibGVuIiwic2xpY2UiLCJnZXRTaGlwc0Nvb3JkcyIsIm1hcCIsImxpbmUiLCJnYW1lYm9hcmRMaW5lTWFya3VwIiwiam9pbiIsImdhbWVib2FyZENlbGxNYXJrdXAiLCJoaXQiLCJlbmVteSJdLCJzb3VyY2VSb290IjoiIn0=