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

  var displayRandomOrCustom = function displayRandomOrCustom() {
    main.innerHTML = "";
    var btn1 = document.createElement("button");
    btn1.textContent = "Random";
    btn1.addEventListener("click", function () {
      displayRandomShipPlacing(_game__WEBPACK_IMPORTED_MODULE_0__.game.player);
    });
    var btn2 = document.createElement("button");
    btn2.textContent = "Custom";
    btn2.addEventListener("click", function () {
      displayCustomShipPlacing(_game__WEBPACK_IMPORTED_MODULE_0__.game.player, 0);
    });
    main.appendChild(btn1);
    main.appendChild(btn2);
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
      displayRandomOrCustom();
    });
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(btn);
    main.appendChild(form);
  };

  var displayRandomShipPlacing = function displayRandomShipPlacing(player) {
    main.innerHTML = "";
    var start = document.createElement("button");
    start.textContent = "Start";
    main.appendChild(start);
    start.addEventListener("click", function () {
      displayBoards();
    });
    var randomize = document.createElement("button");
    randomize.textContent = "Randomize";
    randomize.addEventListener("click", function () {
      displayRandomShipPlacing(player);
    });
    main.appendChild(randomize);
    _game__WEBPACK_IMPORTED_MODULE_0__.game.putRandomShips(player);
    main.classList.add("flex-y");
    var ships = _game__WEBPACK_IMPORTED_MODULE_0__.game.startingShips;
    main.insertAdjacentHTML("beforeend", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(player.gameBoard, "".concat(player.name, " board"), "PLAYER1", true));
  };

  var displayCustomShipPlacing = function displayCustomShipPlacing(player, index) {
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

        ableToPlace = !player.gameBoard.checkIfCollided(hoverArray) && !player.gameBoard.checkIfMultipleLines(hoverArray, axis);
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
          displayCustomShipPlacing(player, index + 1);
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
      displayRandomOrCustom();
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

  var putRandomShips = function putRandomShips(player) {
    player.gameBoard.ships = [];
    var axles = ["x", "y"];
    var currAxis = "x";
    var randomNum;
    var array = [];
    startingShips.forEach(function (ship) {
      while (array.length === 0 || player.gameBoard.checkIfCollided(array) || player.gameBoard.checkIfMultipleLines(array, currAxis)) {
        array = [];
        currAxis = axles[Math.floor(Math.random() * axles.length)];
        randomNum = Math.floor(Math.random() * 100);

        for (var i = randomNum; i < randomNum + (currAxis === "y" ? ship.length * 10 : ship.length); currAxis === "y" ? i += 10 : i++) {
          array.push(i);
        }
      }

      player.gameBoard.placeShip(randomNum, new _ship__WEBPACK_IMPORTED_MODULE_2__["default"](ship.name), currAxis, ship.length);
    });
  };

  var init = function init() {
    player.gameBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_1__["default"]();
    computer.gameBoard = new _gameBoard__WEBPACK_IMPORTED_MODULE_1__["default"]();
    putRandomShips(computer);
  };

  return {
    init: init,
    player: player,
    computer: computer,
    startingShips: startingShips,
    putRandomShips: putRandomShips
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
    value: function checkIfCollided(coordArray) {
      var _this = this;

      return coordArray.some(function (x) {
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
        }).length && !coordArray.some(function (x) {
          return x > 100;
        }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUNmZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0pBO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7Ozs7OztVQ2pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQUMsMENBQUEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tYXJrdXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY2xhc3NDYWxsQ2hlY2suanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jcmVhdGVDbGFzcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgeyBtYXJrdXBzIH0gZnJvbSBcIi4vbWFya3Vwc1wiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IGhlbHBlcnMgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiRWx2aW5hc1wiKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiQUlcIik7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgY29uc3QgbW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsLWNvbnRhaW5lclwiKTtcbiAgbGV0IHBsYXllcjFCb2FyZDtcbiAgbGV0IGd1ZXNzZXNBcnJheSA9IFtdO1xuICBsZXQgcGxheWVyMkJvYXJkO1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgZ3Vlc3Nlc0FycmF5LnB1c2goaSk7XG4gICAgfVxuICAgIGdhbWUuaW5pdChwbGF5ZXIsIGNvbXB1dGVyKTtcbiAgICBkaXNwbGF5R2FtZU1vZGVzKCk7XG4gIH07XG4gIGNvbnN0IGRpc3BsYXlCb2FyZHMgPSAoKSA9PiB7XG4gICAgbWFpbi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIG1haW4uY2xhc3NMaXN0LnJlbW92ZShcImZsZXgteVwiKTtcbiAgICBtYWluLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgIFwiYWZ0ZXJiZWdpblwiLFxuICAgICAgbWFya3Vwcy5nZXRHYW1lYm9hcmQoXG4gICAgICAgIGdhbWUucGxheWVyLmdhbWVCb2FyZCxcbiAgICAgICAgYCR7Z2FtZS5wbGF5ZXIubmFtZX0gYm9hcmRgLFxuICAgICAgICBcIlBMQVlFUjFcIixcbiAgICAgICAgdHJ1ZVxuICAgICAgKVxuICAgICk7XG4gICAgbWFpbi5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICBcImJlZm9yZUVuZFwiLFxuICAgICAgbWFya3Vwcy5nZXRHYW1lYm9hcmQoXG4gICAgICAgIGdhbWUuY29tcHV0ZXIuZ2FtZUJvYXJkLFxuICAgICAgICBgJHtnYW1lLmNvbXB1dGVyLm5hbWV9IGJvYXJkYCxcbiAgICAgICAgXCJQTEFZRVIyXCIsXG4gICAgICAgIGZhbHNlXG4gICAgICApXG4gICAgKTtcbiAgICBwbGF5ZXIxQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlBMQVlFUjFcIik7XG4gICAgcGxheWVyMkJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJQTEFZRVIyXCIpO1xuICAgIHBsYXllcjJCb2FyZC5jbGFzc0xpc3QuYWRkKFwiY3Vyc29yLXBvaW50ZXJcIik7XG4gICAgcGxheWVyMkJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICAhZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpICYmXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImdhbWVib2FyZF9jZWxsXCIpXG4gICAgICApIHtcbiAgICAgICAgZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pbmRleCkpO1xuICAgICAgICBkaXNwbGF5Qm9hcmRzKCk7XG4gICAgICAgIGlmIChnYW1lLmNvbXB1dGVyLmdhbWVCb2FyZC5pc0FsbFN1bmsoKSkge1xuICAgICAgICAgIGdhbWVFbmRNb2RhbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJhbmRvbSA9IGhlbHBlcnMucmFuZG9tR3Vlc3MoZ3Vlc3Nlc0FycmF5KTtcbiAgICAgICAgZ3Vlc3Nlc0FycmF5ID0gZ3Vlc3Nlc0FycmF5LmZpbHRlcigoeCkgPT4geCAhPT0gcmFuZG9tKTtcbiAgICAgICAgZ2FtZS5wbGF5ZXIuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2socmFuZG9tKTtcblxuICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIuZ2FtZUJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICAgICAgZ2FtZUVuZE1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGxheUJvYXJkcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlHYW1lTW9kZXMgPSAoKSA9PiB7XG4gICAgbWFpbi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImdhbWVtb2Rlc19fd3JhcHBlclwiKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIlNFTEVDVCBHQU1FIE1PREVcIjtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICBjb25zdCBidG4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4xLnRleHRDb250ZW50ID0gXCJQTEFZRVIgVlMgQUlcIjtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGJ0bjEpO1xuICAgIGJ0bjEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGRpc3BsYXlQbGF5ZXJWU0FJRm9ybSgpO1xuICAgIH0pO1xuICAgIGNvbnN0IGJ0bjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bjIudGV4dENvbnRlbnQgPSBcIlBMQVlFUiBWUyBQTEFZRVJcIjtcbiAgICBidG4yLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGJ0bjIpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQod3JhcHBlcik7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVJhbmRvbU9yQ3VzdG9tID0gKCkgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBjb25zdCBidG4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4xLnRleHRDb250ZW50ID0gXCJSYW5kb21cIjtcbiAgICBidG4xLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBkaXNwbGF5UmFuZG9tU2hpcFBsYWNpbmcoZ2FtZS5wbGF5ZXIpO1xuICAgIH0pO1xuICAgIGNvbnN0IGJ0bjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bjIudGV4dENvbnRlbnQgPSBcIkN1c3RvbVwiO1xuICAgIGJ0bjIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGRpc3BsYXlDdXN0b21TaGlwUGxhY2luZyhnYW1lLnBsYXllciwgMCk7XG4gICAgfSk7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChidG4xKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGJ0bjIpO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQbGF5ZXJWU0FJRm9ybSA9ICgpID0+IHtcbiAgICBtYWluLmlubmVySFRNTCA9IFwiXCI7XG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuXG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSBcIkVudGVyIHlvdXIgbmFtZTogXCI7XG4gICAgbGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwibmFtZVwiKTtcblxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICBpbnB1dC5uYW1lID0gXCJuYW1lXCI7XG4gICAgaW5wdXQuaWQgPSBcIm5hbWVcIjtcblxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuLnRleHRDb250ZW50ID0gXCJTdGFydFwiO1xuICAgIGlmIChpbnB1dC52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgIGlmIChpbnB1dC52YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBnYW1lLnBsYXllci5uYW1lID0gaW5wdXQudmFsdWU7XG4gICAgICBkaXNwbGF5UmFuZG9tT3JDdXN0b20oKTtcbiAgICB9KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChmb3JtKTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5UmFuZG9tU2hpcFBsYWNpbmcgPSAocGxheWVyKSA9PiB7XG4gICAgbWFpbi5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHN0YXJ0LnRleHRDb250ZW50ID0gXCJTdGFydFwiO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoc3RhcnQpO1xuICAgIHN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBkaXNwbGF5Qm9hcmRzKCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByYW5kb21pemUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHJhbmRvbWl6ZS50ZXh0Q29udGVudCA9IFwiUmFuZG9taXplXCI7XG4gICAgcmFuZG9taXplLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBkaXNwbGF5UmFuZG9tU2hpcFBsYWNpbmcocGxheWVyKTtcbiAgICB9KTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHJhbmRvbWl6ZSk7XG5cbiAgICBnYW1lLnB1dFJhbmRvbVNoaXBzKHBsYXllcik7XG4gICAgbWFpbi5jbGFzc0xpc3QuYWRkKFwiZmxleC15XCIpO1xuICAgIGNvbnN0IHNoaXBzID0gZ2FtZS5zdGFydGluZ1NoaXBzO1xuICAgIG1haW4uaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgXCJiZWZvcmVlbmRcIixcbiAgICAgIG1hcmt1cHMuZ2V0R2FtZWJvYXJkKFxuICAgICAgICBwbGF5ZXIuZ2FtZUJvYXJkLFxuICAgICAgICBgJHtwbGF5ZXIubmFtZX0gYm9hcmRgLFxuICAgICAgICBcIlBMQVlFUjFcIixcbiAgICAgICAgdHJ1ZVxuICAgICAgKVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheUN1c3RvbVNoaXBQbGFjaW5nID0gKHBsYXllciwgaW5kZXgpID0+IHtcbiAgICBtYWluLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbWFpbi5jbGFzc0xpc3QuYWRkKFwiZmxleC15XCIpO1xuICAgIGNvbnN0IHNoaXBzID0gZ2FtZS5zdGFydGluZ1NoaXBzO1xuICAgIG1haW4uaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgXCJiZWZvcmVlbmRcIixcbiAgICAgIG1hcmt1cHMuZ2V0R2FtZWJvYXJkKFxuICAgICAgICBwbGF5ZXIuZ2FtZUJvYXJkLFxuICAgICAgICBgJHtwbGF5ZXIubmFtZX0gYm9hcmRgLFxuICAgICAgICBcIlBMQVlFUjFcIixcbiAgICAgICAgdHJ1ZVxuICAgICAgKVxuICAgICk7XG4gICAgaWYgKGluZGV4ID49IGdhbWUuc3RhcnRpbmdTaGlwcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBidG4udGV4dENvbnRlbnQgPSBcIlN0YXJ0XCI7XG4gICAgICBtYWluLnByZXBlbmQoYnRuKTtcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBkaXNwbGF5Qm9hcmRzKCk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRfY29udGFpbmVyXCIpO1xuICAgICAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJzb3ItcG9pbnRlclwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGhvdmVyQXJyYXkgPSBbXTtcbiAgICAgIGxldCBjbGFzc05hbWU7XG4gICAgICBsZXQgYWJsZVRvUGxhY2U7XG4gICAgICBsZXQgYXhpcztcbiAgICAgIGxldCBjdXJyID0gc2hpcHNbaW5kZXhdO1xuICAgICAgY29uc3QgaW5mb1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIGluZm9UZXh0LnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgJHtjdXJyLm5hbWV9YDtcbiAgICAgIG1haW4ucHJlcGVuZChpbmZvVGV4dCk7XG5cbiAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgbGFiZWwuY2xhc3NMaXN0LmFkZChcInRvZ2dsZVwiKTtcblxuICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG5cbiAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZChcImxhYmVsc1wiKTtcbiAgICAgIHNwYW4uc2V0QXR0cmlidXRlKFwiZGF0YS1vblwiLCBcIllcIik7XG4gICAgICBzcGFuLnNldEF0dHJpYnV0ZShcImRhdGEtb2ZmXCIsIFwiWFwiKTtcblxuICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoc3Bhbik7XG5cbiAgICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkX2NvbnRhaW5lclwiKTtcbiAgICAgIG1haW4uaW5zZXJ0QmVmb3JlKGxhYmVsLCBnYW1lYm9hcmQucGFyZW50RWxlbWVudCk7XG4gICAgICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZChcImN1cnNvci1wb2ludGVyXCIpO1xuICAgICAgZ2FtZWJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgaG92ZXJBcnJheSA9IFtdO1xuICAgICAgICBheGlzID0gaW5wdXQuY2hlY2tlZCA/IFwieVwiIDogXCJ4XCI7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pbmRleCk7XG4gICAgICAgICAgaSA8XG4gICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpICtcbiAgICAgICAgICAgIChpbnB1dC5jaGVja2VkID8gY3Vyci5sZW5ndGggKiAxMCA6IGN1cnIubGVuZ3RoKTtcbiAgICAgICAgICBpbnB1dC5jaGVja2VkID8gKGkgKz0gMTApIDogaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGhvdmVyQXJyYXkucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBhYmxlVG9QbGFjZSA9XG4gICAgICAgICAgIXBsYXllci5nYW1lQm9hcmQuY2hlY2tJZkNvbGxpZGVkKGhvdmVyQXJyYXkpICYmXG4gICAgICAgICAgIXBsYXllci5nYW1lQm9hcmQuY2hlY2tJZk11bHRpcGxlTGluZXMoaG92ZXJBcnJheSwgYXhpcyk7XG4gICAgICAgIGNsYXNzTmFtZSA9IGFibGVUb1BsYWNlID8gXCJwbGFjZXNoaXBcIiA6IFwiY29sbGlkaW5nXCI7XG5cbiAgICAgICAgaG92ZXJBcnJheS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaW5kZXg9JyR7ZWx9J11gKTtcbiAgICAgICAgICBpZiAocXVlcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHF1ZXJ5LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBsZXQgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWVib2FyZF9jZWxsXCIpO1xuICAgICAgY2VsbHMgPSBBcnJheS5mcm9tKGNlbGxzKTtcbiAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGUpID0+IHtcbiAgICAgICAgICBob3ZlckFycmF5LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWluZGV4PScke2VsfSddYCk7XG4gICAgICAgICAgICBpZiAocXVlcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgcXVlcnkuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIGdhbWVib2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGFibGVUb1BsYWNlICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImdhbWVib2FyZF9jZWxsXCIpKSB7XG4gICAgICAgICAgcGxheWVyLmdhbWVCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pbmRleCksXG4gICAgICAgICAgICBuZXcgU2hpcChjdXJyLm5hbWUpLFxuICAgICAgICAgICAgYXhpcyxcbiAgICAgICAgICAgIGN1cnIubGVuZ3RoXG4gICAgICAgICAgKTtcbiAgICAgICAgICBkaXNwbGF5Q3VzdG9tU2hpcFBsYWNpbmcocGxheWVyLCBpbmRleCArIDEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGdhbWVFbmRNb2RhbCA9ICgpID0+IHtcbiAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwic2hvdy1tb2RhbFwiKTtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsXCIpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGAke1xuICAgICAgZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQuaXNBbGxTdW5rKClcbiAgICAgICAgPyBnYW1lLnBsYXllci5uYW1lXG4gICAgICAgIDogZ2FtZS5jb21wdXRlci5uYW1lXG4gICAgfSBoYXMgd29uIWA7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiUGxheSBhZ2FpblwiO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZ2FtZS5pbml0KHBsYXllciwgY29tcHV0ZXIpO1xuICAgICAgZGlzcGxheVJhbmRvbU9yQ3VzdG9tKCk7XG4gICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwic2hvdy1tb2RhbFwiKTtcbiAgICAgIG1vZGFsQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgfSk7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICBtb2RhbENvbnRhaW5lci5hcHBlbmRDaGlsZChtb2RhbCk7XG4gIH07XG5cbiAgcmV0dXJuIHsgaW5pdCB9O1xufSkoKTtcbmV4cG9ydCB7IGRvbSB9O1xuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5jb25zdCBnYW1lID0gKCgpID0+IHtcbiAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihcIkVsdmluYXNcIik7XG4gIGNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcihcIkFJXCIpO1xuICBjb25zdCBzdGFydGluZ1NoaXBzID0gW1xuICAgIHsgbmFtZTogXCJDYXJyaWVyXCIsIGxlbmd0aDogNSB9LFxuICAgIHsgbmFtZTogXCJCYXR0bGVzaGlwXCIsIGxlbmd0aDogNCB9LFxuICAgIHsgbmFtZTogXCJDcnVpc2VyXCIsIGxlbmd0aDogMyB9LFxuICAgIHsgbmFtZTogXCJTdWJtYXJpbmVcIiwgbGVuZ3RoOiAzIH0sXG4gICAgeyBuYW1lOiBcIkRlc3Ryb3llclwiLCBsZW5ndGg6IDIgfSxcbiAgXTtcblxuICBjb25zdCBwdXRSYW5kb21TaGlwcyA9IChwbGF5ZXIpID0+IHtcbiAgICBwbGF5ZXIuZ2FtZUJvYXJkLnNoaXBzID0gW107XG4gICAgY29uc3QgYXhsZXMgPSBbXCJ4XCIsIFwieVwiXTtcbiAgICBsZXQgY3VyckF4aXMgPSBcInhcIjtcbiAgICBsZXQgcmFuZG9tTnVtO1xuICAgIGxldCBhcnJheSA9IFtdO1xuICAgIHN0YXJ0aW5nU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgd2hpbGUgKFxuICAgICAgICBhcnJheS5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgcGxheWVyLmdhbWVCb2FyZC5jaGVja0lmQ29sbGlkZWQoYXJyYXkpIHx8XG4gICAgICAgIHBsYXllci5nYW1lQm9hcmQuY2hlY2tJZk11bHRpcGxlTGluZXMoYXJyYXksIGN1cnJBeGlzKVxuICAgICAgKSB7XG4gICAgICAgIGFycmF5ID0gW107XG4gICAgICAgIGN1cnJBeGlzID0gYXhsZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXhsZXMubGVuZ3RoKV07XG4gICAgICAgIHJhbmRvbU51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSByYW5kb21OdW07XG4gICAgICAgICAgaSA8IHJhbmRvbU51bSArIChjdXJyQXhpcyA9PT0gXCJ5XCIgPyBzaGlwLmxlbmd0aCAqIDEwIDogc2hpcC5sZW5ndGgpO1xuICAgICAgICAgIGN1cnJBeGlzID09PSBcInlcIiA/IChpICs9IDEwKSA6IGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBhcnJheS5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwbGF5ZXIuZ2FtZUJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgcmFuZG9tTnVtLFxuICAgICAgICBuZXcgU2hpcChzaGlwLm5hbWUpLFxuICAgICAgICBjdXJyQXhpcyxcbiAgICAgICAgc2hpcC5sZW5ndGhcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBwbGF5ZXIuZ2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICAgIGNvbXB1dGVyLmdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICBwdXRSYW5kb21TaGlwcyhjb21wdXRlcik7XG4gIH07XG5cbiAgcmV0dXJuIHsgaW5pdCwgcGxheWVyLCBjb21wdXRlciwgc3RhcnRpbmdTaGlwcywgcHV0UmFuZG9tU2hpcHMgfTtcbn0pKCk7XG5leHBvcnQgeyBnYW1lIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvYXJkID0gW107XG4gICAgdGhpcy5zaGlwcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIHRoaXMuYm9hcmQucHVzaChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcGxhY2VTaGlwKGNvb3JkLCBzaGlwLCBheGlzLCBsZW5ndGgpIHtcbiAgICBsZXQgdGVtcCA9IGNvb3JkO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHNoaXAubG9jYXRpb24ucHVzaCh0ZW1wKTtcbiAgICAgIHRlbXAgKz0gYXhpcy50b0xvd2VyQ2FzZSgpID09PSBcInhcIiA/IDEgOiAxMDtcbiAgICB9XG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZCkge1xuICAgIHRoaXMuYm9hcmRbY29vcmRdID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5pc1NoaXAoY29vcmQpKSB7XG4gICAgICB0aGlzLmhpdFNoaXAoY29vcmQpO1xuICAgIH1cbiAgfVxuXG4gIGlzU2hpcChjb29yZCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBzLnNvbWUoKHgpID0+IHgubG9jYXRpb24uaW5jbHVkZXMoY29vcmQpKTtcbiAgfVxuXG4gIGhpdFNoaXAoY29vcmQpIHtcbiAgICB0aGlzLnNoaXBzLmZpbmQoKHgpID0+IHgubG9jYXRpb24uaW5jbHVkZXMoY29vcmQpKS5oaXRzLnB1c2goY29vcmQpO1xuICB9XG5cbiAgaXNBbGxTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBzLmV2ZXJ5KCh4KSA9PiB4LmlzU3VuaygpKTtcbiAgfVxuXG4gIGdldFNoaXBzQ29vcmRzKCkge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmlzU2hpcChpKSkgYXJyLnB1c2goaSk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBjaGVja0lmQ29sbGlkZWQoY29vcmRBcnJheSkge1xuICAgIHJldHVybiBjb29yZEFycmF5LnNvbWUoKHgpID0+XG4gICAgICB0aGlzLnNoaXBzLnNvbWUoKHNoaXApID0+IHNoaXAubG9jYXRpb24uaW5jbHVkZXMoeCkpXG4gICAgKTtcbiAgfVxuXG4gIGNoZWNrSWZNdWx0aXBsZUxpbmVzKGNvb3JkQXJyYXksIGF4aXMpIHtcbiAgICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgIGNvbnN0IHJlcyA9IE1hdGguZmxvb3IoY29vcmRBcnJheVswXSAvIDEwKTtcbiAgICAgIHJldHVybiAhKFxuICAgICAgICBjb29yZEFycmF5Lmxlbmd0aCA9PT1cbiAgICAgICAgY29vcmRBcnJheS5maWx0ZXIoKHgpID0+IE1hdGguZmxvb3IoeCAvIDEwKSA9PT0gcmVzKS5sZW5ndGhcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChheGlzID09PSBcInlcIikge1xuICAgICAgY29uc3QgcmVzID0gY29vcmRBcnJheVswXSAlIDEwO1xuICAgICAgcmV0dXJuICEoXG4gICAgICAgIGNvb3JkQXJyYXkubGVuZ3RoID09PSBjb29yZEFycmF5LmZpbHRlcigoeCkgPT4geCAlIDEwID09PSByZXMpLmxlbmd0aCAmJlxuICAgICAgICAhY29vcmRBcnJheS5zb21lKCh4KSA9PiB4ID4gMTAwKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiY29uc3QgaGVscGVycyA9ICgoKSA9PiB7XG4gIGNvbnN0IHJhbmRvbUd1ZXNzID0gKGFycmF5KSA9PiB7XG4gICAgbGV0IHJhbmRvbSA9IGFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aCldO1xuICAgIHJldHVybiByYW5kb207XG4gIH07XG5cbiAgcmV0dXJuIHsgcmFuZG9tR3Vlc3MgfTtcbn0pKCk7XG5leHBvcnQgeyBoZWxwZXJzIH07XG4iLCJjb25zdCBtYXJrdXBzID0gKCgpID0+IHtcbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoZ2FtZWJvYXJkLCBoZWFkZXIsIGlkLCB0b1NlZVNoaXBzKSA9PiB7XG4gICAgbGV0IHNoaXBzQXJyYXkgPSBbXTtcbiAgICBjb3VudGVyID0gMDtcbiAgICBjb25zdCBnYW1lQm9hcmRDZWxscyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBnYW1lYm9hcmQuYm9hcmQubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEwKSB7XG4gICAgICBnYW1lQm9hcmRDZWxscy5wdXNoKGdhbWVib2FyZC5ib2FyZC5zbGljZShpLCBpICsgMTApKTtcbiAgICB9XG4gICAgc2hpcHNBcnJheSA9IGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkcygpO1xuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj48aDI+JHtoZWFkZXJ9PC9oMj48ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2NvbnRhaW5lclwiIGlkPVwiJHtpZH1cIj4ke2dhbWVCb2FyZENlbGxzXG4gICAgICAubWFwKChsaW5lKSA9PiBnYW1lYm9hcmRMaW5lTWFya3VwKGxpbmUsIHNoaXBzQXJyYXksIHRvU2VlU2hpcHMpKVxuICAgICAgLmpvaW4oXCJcIil9PC9kaXY+PC9kaXY+YDtcbiAgfTtcbiAgY29uc3QgZ2FtZWJvYXJkTGluZU1hcmt1cCA9IChsaW5lLCBzaGlwc0FycmF5LCB0b1NlZVNoaXBzKSA9PlxuICAgIGA8ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2xpbmVcIj4ke2xpbmVcbiAgICAgIC5tYXAoXG4gICAgICAgIChjZWxsKSA9PlxuICAgICAgICAgIGAke2dhbWVib2FyZENlbGxNYXJrdXAoXG4gICAgICAgICAgICBzaGlwc0FycmF5LmluY2x1ZGVzKGNvdW50ZXIpLFxuICAgICAgICAgICAgY2VsbCxcbiAgICAgICAgICAgIHRvU2VlU2hpcHNcbiAgICAgICAgICApfWBcbiAgICAgIClcbiAgICAgIC5qb2luKFwiXCIpfTwvZGl2PmA7XG5cbiAgY29uc3QgZ2FtZWJvYXJkQ2VsbE1hcmt1cCA9IChzaGlwLCBoaXQsIHRvU2VlU2hpcHMpID0+IHtcbiAgICBjb3VudGVyICs9IDE7XG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2NlbGwgJHtzaGlwICYmIHRvU2VlU2hpcHMgPyBcInNoaXBcIiA6IFwiXCJ9ICR7XG4gICAgICBoaXQgPyBcImhpdFwiIDogXCJcIlxuICAgIH0gJHshdG9TZWVTaGlwcyAmJiBzaGlwICYmIGhpdCA/IFwiZW5lbXktc2hpcC1oaXRcIiA6IFwiXCJ9XCIgZGF0YS1pbmRleD1cIiR7XG4gICAgICBjb3VudGVyIC0gMVxuICAgIH1cIj48L2Rpdj5gO1xuICB9O1xuXG4gIHJldHVybiB7IGdldEdhbWVib2FyZCB9O1xufSkoKTtcbmV4cG9ydCB7IG1hcmt1cHMgfTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIGF0dGFjayhlbmVteSwgbG9jYXRpb24pIHtcbiAgICBlbmVteS5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhsb2NhdGlvbik7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBsb2NhdGlvbiA9IFtdKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBoaXQoaW5kZXgpIHtcbiAgICB0aGlzLmhpdHMucHVzaChpbmRleCk7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRpb24uZXZlcnkoKGNlbGwpID0+IHRoaXMuaGl0cy5pbmNsdWRlcyhjZWxsKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvOndnaHRANDAwOzcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYzBhM2U7XFxuICBjb2xvcjogI2VlZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgc2Fucy1zZXJpZjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG59XFxuaGVhZGVyLFxcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGdhcDogMjBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IGNhbGMoMTAwdmggLSAxNjBweCk7XFxufVxcbi53cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuLmdhbWVib2FyZF9jb250YWluZXIge1xcbiAgd2lkdGg6IDYwMHB4O1xcbiAgaGVpZ2h0OiA2MDBweDtcXG59XFxuLmdhbWVib2FyZF9saW5lIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG59XFxuLmdhbWVib2FyZF9jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5zaGlwLFxcbi5wbGFjZXNoaXAge1xcbiAgYmFja2dyb3VuZDogZ3JlZW47XFxufVxcbi5jb2xsaWRpbmcge1xcbiAgYmFja2dyb3VuZDogcmdiKDE4NywgNTksIDU5KTtcXG59XFxuLmhpdDo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICB3aWR0aDogMTVweDtcXG4gIGhlaWdodDogMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG4uZW5lbXktc2hpcC1oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDY1LCAyMCwgMjApO1xcbn1cXG5mb290ZXIge1xcbiAgbWFyZ2luLXRvcDogYXV0bztcXG59XFxuZm9vdGVyID4gYSA+IGltZzpob3ZlciB7XFxuICBmaWx0ZXI6IG9wYWNpdHkoMC43KTtcXG59XFxuLm1vZGFsX19jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgei1pbmRleDogMTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG9wYWNpdHk6IDA7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlO1xcbn1cXG4uc2hvdy1tb2RhbCB7XFxuICBvcGFjaXR5OiAxO1xcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XFxufVxcblxcbi5tb2RhbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgd2lkdGg6IDYwMHB4O1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB6LWluZGV4OiAxO1xcbn1cXG4uZ2FtZW1vZGVzX193cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAzMHB4O1xcbn1cXG5cXG4uZmxleC15IHtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcblxcbi5jdXJzb3ItcG9pbnRlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi50b2dnbGUge1xcbiAgLS13aWR0aDogODBweDtcXG4gIC0taGVpZ2h0OiBjYWxjKHZhcigtLXdpZHRoKSAvIDMpO1xcblxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IHZhcigtLXdpZHRoKTtcXG4gIGhlaWdodDogdmFyKC0taGVpZ2h0KTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODM2NjM7XFxuICBib3gtc2hhZG93OiAwcHggMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi50b2dnbGUgaW5wdXQge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLnRvZ2dsZSAubGFiZWxzIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2UtaW4tb3V0O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLnRvZ2dsZSAubGFiZWxzOjphZnRlciB7XFxuICBjb250ZW50OiBhdHRyKGRhdGEtb2ZmKTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnRvZ2dsZSAubGFiZWxzOjpiZWZvcmUge1xcbiAgY29udGVudDogYXR0cihkYXRhLW9uKTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiBjYWxjKHZhcigtLXdpZHRoKSAqIC0xKTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi50b2dnbGUgaW5wdXQ6Y2hlY2tlZCB+IC5sYWJlbHM6OmFmdGVyIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCh2YXIoLS13aWR0aCkpO1xcbn1cXG5cXG4udG9nZ2xlIGlucHV0OmNoZWNrZWQgfiAubGFiZWxzOjpiZWZvcmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKHZhcigtLXdpZHRoKSk7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQ0E7RUFDRSxVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UseUJBQXlCO0VBQ3pCLFdBQVc7RUFDWCxpQ0FBaUM7RUFDakMsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixpQkFBaUI7RUFDakIsZ0JBQWdCO0FBQ2xCO0FBQ0E7O0VBRUUsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2YsU0FBUztFQUNULFdBQVc7QUFDYjtBQUNBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7RUFDVCx1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLDJCQUEyQjtBQUM3QjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7RUFDbkIsU0FBUztFQUNULGVBQWU7QUFDakI7QUFDQTtFQUNFLFlBQVk7RUFDWixhQUFhO0FBQ2Y7QUFDQTtFQUNFLFdBQVc7RUFDWCxhQUFhO0VBQ2IsV0FBVztFQUNYLHlCQUF5QjtBQUMzQjtBQUNBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixXQUFXO0VBQ1gsdUJBQXVCO0VBQ3ZCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0FBQ3JCO0FBQ0E7O0VBRUUsaUJBQWlCO0FBQ25CO0FBQ0E7RUFDRSw0QkFBNEI7QUFDOUI7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gscUJBQXFCO0VBQ3JCLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0UsaUNBQWlDO0FBQ25DO0FBQ0E7RUFDRSxnQkFBZ0I7QUFDbEI7QUFDQTtFQUNFLG9CQUFvQjtBQUN0QjtBQUNBO0VBQ0Usb0NBQW9DO0VBQ3BDLGVBQWU7RUFDZixVQUFVO0VBQ1YsTUFBTTtFQUNOLE9BQU87RUFDUCxZQUFZO0VBQ1osYUFBYTtFQUNiLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLFVBQVU7RUFDVixvQkFBb0I7RUFDcEIsNkJBQTZCO0FBQy9CO0FBQ0E7RUFDRSxVQUFVO0VBQ1Ysb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLFlBQVk7RUFDWixlQUFlO0VBQ2YsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQix3Q0FBd0M7RUFDeEMsa0JBQWtCO0VBQ2xCLFVBQVU7QUFDWjtBQUNBO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGdDQUFnQzs7RUFFaEMsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixtQkFBbUI7RUFDbkIscUJBQXFCO0VBQ3JCLFlBQVk7RUFDWix5QkFBeUI7RUFDekIsMENBQTBDO0VBQzFDLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsTUFBTTtFQUNOLE9BQU87RUFDUCxXQUFXO0VBQ1gsWUFBWTtFQUNaLGVBQWU7RUFDZixnQ0FBZ0M7RUFDaEMsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixNQUFNO0VBQ04sT0FBTztFQUNQLFlBQVk7RUFDWixXQUFXO0VBQ1gsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixNQUFNO0VBQ04sNkJBQTZCO0VBQzdCLFlBQVk7RUFDWixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQ1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybChcXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG86d2dodEA0MDA7NzAwJmRpc3BsYXk9c3dhcFxcXCIpO1xcbioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBjMGEzZTtcXG4gIGNvbG9yOiAjZWVlO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBzYW5zLXNlcmlmO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbn1cXG5oZWFkZXIsXFxuZm9vdGVyIHtcXG4gIGhlaWdodDogODBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODM2NjM7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZ2FwOiAyMHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMjBweDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDE2MHB4KTtcXG59XFxuLndyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAyMHB4O1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbn1cXG4uZ2FtZWJvYXJkX2NvbnRhaW5lciB7XFxuICB3aWR0aDogNjAwcHg7XFxuICBoZWlnaHQ6IDYwMHB4O1xcbn1cXG4uZ2FtZWJvYXJkX2xpbmUge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiAxMCU7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbn1cXG4uZ2FtZWJvYXJkX2NlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLnNoaXAsXFxuLnBsYWNlc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBncmVlbjtcXG59XFxuLmNvbGxpZGluZyB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTg3LCA1OSwgNTkpO1xcbn1cXG4uaGl0OjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbi5lbmVteS1zaGlwLWhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNjUsIDIwLCAyMCk7XFxufVxcbmZvb3RlciB7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbn1cXG5mb290ZXIgPiBhID4gaW1nOmhvdmVyIHtcXG4gIGZpbHRlcjogb3BhY2l0eSgwLjcpO1xcbn1cXG4ubW9kYWxfX2NvbnRhaW5lciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgb3BhY2l0eTogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2U7XFxufVxcbi5zaG93LW1vZGFsIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBwb2ludGVyLWV2ZW50czogYXV0bztcXG59XFxuXFxuLm1vZGFsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB3aWR0aDogNjAwcHg7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi5nYW1lbW9kZXNfX3dyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDMwcHg7XFxufVxcblxcbi5mbGV4LXkge1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLmN1cnNvci1wb2ludGVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnRvZ2dsZSB7XFxuICAtLXdpZHRoOiA4MHB4O1xcbiAgLS1oZWlnaHQ6IGNhbGModmFyKC0td2lkdGgpIC8gMyk7XFxuXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogdmFyKC0td2lkdGgpO1xcbiAgaGVpZ2h0OiB2YXIoLS1oZWlnaHQpO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM4MzY2MztcXG4gIGJveC1zaGFkb3c6IDBweCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnRvZ2dsZSBpbnB1dCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4udG9nZ2xlIC5sYWJlbHMge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbi1vdXQ7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4udG9nZ2xlIC5sYWJlbHM6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1vZmYpO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4udG9nZ2xlIC5sYWJlbHM6OmJlZm9yZSB7XFxuICBjb250ZW50OiBhdHRyKGRhdGEtb24pO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IGNhbGModmFyKC0td2lkdGgpICogLTEpO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnRvZ2dsZSBpbnB1dDpjaGVja2VkIH4gLmxhYmVsczo6YWZ0ZXIge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKHZhcigtLXdpZHRoKSk7XFxufVxcblxcbi50b2dnbGUgaW5wdXQ6Y2hlY2tlZCB+IC5sYWJlbHM6OmJlZm9yZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgodmFyKC0td2lkdGgpKTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufSIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gIGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwge1xuICAgIHdyaXRhYmxlOiBmYWxzZVxuICB9KTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgeyBkb20gfSBmcm9tIFwiLi9kb21cIjtcblxuZG9tLmluaXQoKTtcbiJdLCJuYW1lcyI6WyJnYW1lIiwibWFya3VwcyIsIlBsYXllciIsImhlbHBlcnMiLCJTaGlwIiwiZG9tIiwicGxheWVyIiwiY29tcHV0ZXIiLCJtYWluIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibW9kYWxDb250YWluZXIiLCJwbGF5ZXIxQm9hcmQiLCJndWVzc2VzQXJyYXkiLCJwbGF5ZXIyQm9hcmQiLCJpbml0IiwiaSIsInB1c2giLCJkaXNwbGF5R2FtZU1vZGVzIiwiZGlzcGxheUJvYXJkcyIsImlubmVySFRNTCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImluc2VydEFkamFjZW50SFRNTCIsImdldEdhbWVib2FyZCIsImdhbWVCb2FyZCIsIm5hbWUiLCJnZXRFbGVtZW50QnlJZCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJyZWNlaXZlQXR0YWNrIiwiTnVtYmVyIiwiZGF0YXNldCIsImluZGV4IiwiaXNBbGxTdW5rIiwiZ2FtZUVuZE1vZGFsIiwicmFuZG9tIiwicmFuZG9tR3Vlc3MiLCJmaWx0ZXIiLCJ4Iiwid3JhcHBlciIsImNyZWF0ZUVsZW1lbnQiLCJoZWFkZXIiLCJ0ZXh0Q29udGVudCIsImFwcGVuZENoaWxkIiwiYnRuMSIsImRpc3BsYXlQbGF5ZXJWU0FJRm9ybSIsImJ0bjIiLCJkaXNhYmxlZCIsImRpc3BsYXlSYW5kb21PckN1c3RvbSIsImRpc3BsYXlSYW5kb21TaGlwUGxhY2luZyIsImRpc3BsYXlDdXN0b21TaGlwUGxhY2luZyIsImZvcm0iLCJsYWJlbCIsInNldEF0dHJpYnV0ZSIsImlucHV0IiwidHlwZSIsImlkIiwiYnRuIiwidmFsdWUiLCJzdGFydCIsInJhbmRvbWl6ZSIsInB1dFJhbmRvbVNoaXBzIiwic2hpcHMiLCJzdGFydGluZ1NoaXBzIiwibGVuZ3RoIiwicHJlcGVuZCIsImdhbWVib2FyZCIsImhvdmVyQXJyYXkiLCJjbGFzc05hbWUiLCJhYmxlVG9QbGFjZSIsImF4aXMiLCJjdXJyIiwiaW5mb1RleHQiLCJzcGFuIiwiaW5zZXJ0QmVmb3JlIiwicGFyZW50RWxlbWVudCIsImNoZWNrZWQiLCJjaGVja0lmQ29sbGlkZWQiLCJjaGVja0lmTXVsdGlwbGVMaW5lcyIsImZvckVhY2giLCJlbCIsInF1ZXJ5IiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQXJyYXkiLCJmcm9tIiwiY2VsbCIsInBsYWNlU2hpcCIsIm1vZGFsIiwiR2FtZWJvYXJkIiwiYXhsZXMiLCJjdXJyQXhpcyIsInJhbmRvbU51bSIsImFycmF5Iiwic2hpcCIsIk1hdGgiLCJmbG9vciIsImJvYXJkIiwiY29vcmQiLCJ0ZW1wIiwibG9jYXRpb24iLCJ0b0xvd2VyQ2FzZSIsImlzU2hpcCIsImhpdFNoaXAiLCJzb21lIiwiaW5jbHVkZXMiLCJmaW5kIiwiaGl0cyIsImV2ZXJ5IiwiaXNTdW5rIiwiYXJyIiwiY29vcmRBcnJheSIsInJlcyIsImNvdW50ZXIiLCJ0b1NlZVNoaXBzIiwic2hpcHNBcnJheSIsImdhbWVCb2FyZENlbGxzIiwibGVuIiwic2xpY2UiLCJnZXRTaGlwc0Nvb3JkcyIsIm1hcCIsImxpbmUiLCJnYW1lYm9hcmRMaW5lTWFya3VwIiwiam9pbiIsImdhbWVib2FyZENlbGxNYXJrdXAiLCJoaXQiLCJlbmVteSJdLCJzb3VyY2VSb290IjoiIn0=