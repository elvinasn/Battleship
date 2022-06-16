/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ai.js":
/*!*******************!*\
  !*** ./src/ai.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AI": () => (/* binding */ AI)
/* harmony export */ });
var AI = function () {
  var FilterUnSunkCells = function FilterUnSunkCells(array, enemy) {
    return array.filter(function (cell) {
      if (enemy.gameBoard.isShip(cell)) {
        var currShip = enemy.gameBoard.ships.find(function (ship) {
          return ship.location.includes(cell);
        });
        return !currShip.isSunk();
      }
    });
  };

  var DetectShips = function DetectShips(unsunkCells) {
    var detected = unsunkCells.filter(function (cell, index, array) {
      return array.includes(cell + 1) && cell % 10 !== 9 || array.includes(cell - 1) && cell % 10 !== 0 || array.includes(cell + 10) && cell + 10 < 100 || array.includes(cell - 10) && cell - 10 > 0;
    });
    return detected;
  };

  var AttackDetectedShip = function AttackDetectedShip(detectedShips, emptyCells) {
    var axis = detectedShips[1] - detectedShips[0] === 1 ? "x" : "y";
    var availableShots = [];

    if (axis === "x") {
      if (detectedShips[0] % 10 !== 0) {
        availableShots.push(detectedShips[0] - 1);
      }

      var rightSide = detectedShips.find(function (cell, index, array) {
        return !array.includes(cell + 1);
      });

      if (Math.floor(detectedShips[0] / 10) === Math.floor((rightSide + 1) / 10)) {
        availableShots.push(rightSide + 1);
      }
    } else {
      var above = detectedShips[0] - 10;

      if (above > 0) {
        availableShots.push(above);
      }

      var below = detectedShips.find(function (cell, index, array) {
        return !array.includes(cell + 10);
      });

      if (below + 10 < 100) {
        availableShots.push(below + 10);
      }
    }

    var filteredAvailableShots = availableShots.filter(function (shot) {
      return emptyCells.includes(shot);
    });

    if (filteredAvailableShots.length > 0) {
      return filteredAvailableShots[Math.floor(Math.random() * filteredAvailableShots.length)];
    }
  };

  var AttackSoloHit = function AttackSoloHit(hitCells, emptyCells) {
    var firstShot = hitCells[0];
    var availableShots = [];
    var leftShot = hitCells[0] - 1;

    if (Math.floor(firstShot / 10) === Math.floor(leftShot / 10)) {
      availableShots.push(leftShot);
    }

    var rightShot = hitCells[0] + 1;

    if (Math.floor(firstShot / 10) === Math.floor(rightShot / 10)) {
      availableShots.push(rightShot);
    }

    var aboveShot = firstShot - 10;

    if (aboveShot > 0) {
      availableShots.push(aboveShot);
    }

    var belowShot = firstShot + 10;

    if (belowShot < 100) {
      availableShots.push(belowShot);
    }

    availableShots = availableShots.filter(function (shot) {
      return emptyCells.includes(shot);
    });

    if (availableShots.length > 0) {
      return availableShots[Math.floor(Math.random() * availableShots.length)];
    }
  };

  var AttackRandom = function AttackRandom(emptyCells, hitCells) {
    var badShots = [];
    hitCells.forEach(function (cell) {
      badShots.push(cell + 1);
      badShots.push(cell - 1);
      badShots.push(cell + 10);
      badShots.push(cell - 10);
    });
    badShots = badShots.filter(function (cell, index, array) {
      return array.indexOf(cell) === index;
    });
    var availableShots = emptyCells.filter(function (cell) {
      return !badShots.includes(cell);
    });

    if (availableShots.length > 0) {
      return availableShots[Math.floor(Math.random() * availableShots.length)];
    }
  };

  var Attack = function Attack(enemy) {
    var emptyCells = [];
    var hitCells = [];
    enemy.gameBoard.board.forEach(function (hit, index) {
      return hit ? hitCells.push(index) : emptyCells.push(index);
    });
    var unsunkCells = FilterUnSunkCells(hitCells, enemy);
    var detectedShips = DetectShips(unsunkCells);

    if (detectedShips.length > 0) {
      var _attack = AttackDetectedShip(detectedShips, emptyCells);

      if (_attack) return _attack;
    }

    if (hitCells.length > 0) {
      var _attack2 = AttackSoloHit(unsunkCells, emptyCells);

      if (_attack2) return _attack2;
    }

    var attack = AttackRandom(emptyCells, hitCells);
    if (attack) return attack;
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  return {
    Attack: Attack
  };
}();



/***/ }),

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
/* harmony import */ var _ai__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ai */ "./src/ai.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ship */ "./src/ship.js");






var dom = function () {
  var player = new _player__WEBPACK_IMPORTED_MODULE_2__["default"]("Elvinas");
  var computer = new _player__WEBPACK_IMPORTED_MODULE_2__["default"]("AI");
  var main = document.querySelector("main");
  var modalContainer = document.querySelector("#modal-container");
  var goToMain = document.createElement("button");
  goToMain.textContent = "Go back to main screen";
  goToMain.addEventListener("click", function () {
    init();
  });
  var player1Board;
  var player2Board;

  var init = function init() {
    _game__WEBPACK_IMPORTED_MODULE_0__.game.init(player, computer);
    displayGameModes();
  };

  var displayBoards = function displayBoards() {
    main.innerHTML = "";
    main.classList.remove("flex-y");
    main.appendChild(goToMain);
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

        var attack = _ai__WEBPACK_IMPORTED_MODULE_3__.AI.Attack(_game__WEBPACK_IMPORTED_MODULE_0__.game.player);
        _game__WEBPACK_IMPORTED_MODULE_0__.game.player.gameBoard.receiveAttack(attack);

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
    main.appendChild(goToMain);
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
    main.appendChild(goToMain);
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
    main.appendChild(goToMain);
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
    main.appendChild(goToMain);
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
    modal.appendChild(goToMain);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztVQ2pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQUMsMENBQUEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYWkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFya3Vwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBSSA9ICgoKSA9PiB7XG4gIGNvbnN0IEZpbHRlclVuU3Vua0NlbGxzID0gKGFycmF5LCBlbmVteSkgPT5cbiAgICBhcnJheS5maWx0ZXIoKGNlbGwpID0+IHtcbiAgICAgIGlmIChlbmVteS5nYW1lQm9hcmQuaXNTaGlwKGNlbGwpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJTaGlwID0gZW5lbXkuZ2FtZUJvYXJkLnNoaXBzLmZpbmQoKHNoaXApID0+XG4gICAgICAgICAgc2hpcC5sb2NhdGlvbi5pbmNsdWRlcyhjZWxsKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gIWN1cnJTaGlwLmlzU3VuaygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIGNvbnN0IERldGVjdFNoaXBzID0gKHVuc3Vua0NlbGxzKSA9PiB7XG4gICAgY29uc3QgZGV0ZWN0ZWQgPSB1bnN1bmtDZWxscy5maWx0ZXIoXG4gICAgICAoY2VsbCwgaW5kZXgsIGFycmF5KSA9PlxuICAgICAgICAoYXJyYXkuaW5jbHVkZXMoY2VsbCArIDEpICYmIGNlbGwgJSAxMCAhPT0gOSkgfHxcbiAgICAgICAgKGFycmF5LmluY2x1ZGVzKGNlbGwgLSAxKSAmJiBjZWxsICUgMTAgIT09IDApIHx8XG4gICAgICAgIChhcnJheS5pbmNsdWRlcyhjZWxsICsgMTApICYmIGNlbGwgKyAxMCA8IDEwMCkgfHxcbiAgICAgICAgKGFycmF5LmluY2x1ZGVzKGNlbGwgLSAxMCkgJiYgY2VsbCAtIDEwID4gMClcbiAgICApO1xuICAgIHJldHVybiBkZXRlY3RlZDtcbiAgfTtcblxuICBjb25zdCBBdHRhY2tEZXRlY3RlZFNoaXAgPSAoZGV0ZWN0ZWRTaGlwcywgZW1wdHlDZWxscykgPT4ge1xuICAgIGNvbnN0IGF4aXMgPSBkZXRlY3RlZFNoaXBzWzFdIC0gZGV0ZWN0ZWRTaGlwc1swXSA9PT0gMSA/IFwieFwiIDogXCJ5XCI7XG4gICAgY29uc3QgYXZhaWxhYmxlU2hvdHMgPSBbXTtcblxuICAgIGlmIChheGlzID09PSBcInhcIikge1xuICAgICAgaWYgKGRldGVjdGVkU2hpcHNbMF0gJSAxMCAhPT0gMCkge1xuICAgICAgICBhdmFpbGFibGVTaG90cy5wdXNoKGRldGVjdGVkU2hpcHNbMF0gLSAxKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJpZ2h0U2lkZSA9IGRldGVjdGVkU2hpcHMuZmluZChcbiAgICAgICAgKGNlbGwsIGluZGV4LCBhcnJheSkgPT4gIWFycmF5LmluY2x1ZGVzKGNlbGwgKyAxKVxuICAgICAgKTtcbiAgICAgIGlmIChcbiAgICAgICAgTWF0aC5mbG9vcihkZXRlY3RlZFNoaXBzWzBdIC8gMTApID09PSBNYXRoLmZsb29yKChyaWdodFNpZGUgKyAxKSAvIDEwKVxuICAgICAgKSB7XG4gICAgICAgIGF2YWlsYWJsZVNob3RzLnB1c2gocmlnaHRTaWRlICsgMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGFib3ZlID0gZGV0ZWN0ZWRTaGlwc1swXSAtIDEwO1xuICAgICAgaWYgKGFib3ZlID4gMCkge1xuICAgICAgICBhdmFpbGFibGVTaG90cy5wdXNoKGFib3ZlKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGJlbG93ID0gZGV0ZWN0ZWRTaGlwcy5maW5kKFxuICAgICAgICAoY2VsbCwgaW5kZXgsIGFycmF5KSA9PiAhYXJyYXkuaW5jbHVkZXMoY2VsbCArIDEwKVxuICAgICAgKTtcbiAgICAgIGlmIChiZWxvdyArIDEwIDwgMTAwKSB7XG4gICAgICAgIGF2YWlsYWJsZVNob3RzLnB1c2goYmVsb3cgKyAxMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZmlsdGVyZWRBdmFpbGFibGVTaG90cyA9IGF2YWlsYWJsZVNob3RzLmZpbHRlcigoc2hvdCkgPT5cbiAgICAgIGVtcHR5Q2VsbHMuaW5jbHVkZXMoc2hvdClcbiAgICApO1xuICAgIGlmIChmaWx0ZXJlZEF2YWlsYWJsZVNob3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBmaWx0ZXJlZEF2YWlsYWJsZVNob3RzW1xuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmaWx0ZXJlZEF2YWlsYWJsZVNob3RzLmxlbmd0aClcbiAgICAgIF07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IEF0dGFja1NvbG9IaXQgPSAoaGl0Q2VsbHMsIGVtcHR5Q2VsbHMpID0+IHtcbiAgICBjb25zdCBmaXJzdFNob3QgPSBoaXRDZWxsc1swXTtcbiAgICBsZXQgYXZhaWxhYmxlU2hvdHMgPSBbXTtcblxuICAgIGNvbnN0IGxlZnRTaG90ID0gaGl0Q2VsbHNbMF0gLSAxO1xuICAgIGlmIChNYXRoLmZsb29yKGZpcnN0U2hvdCAvIDEwKSA9PT0gTWF0aC5mbG9vcihsZWZ0U2hvdCAvIDEwKSkge1xuICAgICAgYXZhaWxhYmxlU2hvdHMucHVzaChsZWZ0U2hvdCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmlnaHRTaG90ID0gaGl0Q2VsbHNbMF0gKyAxO1xuICAgIGlmIChNYXRoLmZsb29yKGZpcnN0U2hvdCAvIDEwKSA9PT0gTWF0aC5mbG9vcihyaWdodFNob3QgLyAxMCkpIHtcbiAgICAgIGF2YWlsYWJsZVNob3RzLnB1c2gocmlnaHRTaG90KTtcbiAgICB9XG5cbiAgICBjb25zdCBhYm92ZVNob3QgPSBmaXJzdFNob3QgLSAxMDtcbiAgICBpZiAoYWJvdmVTaG90ID4gMCkge1xuICAgICAgYXZhaWxhYmxlU2hvdHMucHVzaChhYm92ZVNob3QpO1xuICAgIH1cblxuICAgIGNvbnN0IGJlbG93U2hvdCA9IGZpcnN0U2hvdCArIDEwO1xuICAgIGlmIChiZWxvd1Nob3QgPCAxMDApIHtcbiAgICAgIGF2YWlsYWJsZVNob3RzLnB1c2goYmVsb3dTaG90KTtcbiAgICB9XG5cbiAgICBhdmFpbGFibGVTaG90cyA9IGF2YWlsYWJsZVNob3RzLmZpbHRlcigoc2hvdCkgPT4gZW1wdHlDZWxscy5pbmNsdWRlcyhzaG90KSk7XG4gICAgaWYgKGF2YWlsYWJsZVNob3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBhdmFpbGFibGVTaG90c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGVTaG90cy5sZW5ndGgpXTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgQXR0YWNrUmFuZG9tID0gKGVtcHR5Q2VsbHMsIGhpdENlbGxzKSA9PiB7XG4gICAgbGV0IGJhZFNob3RzID0gW107XG4gICAgaGl0Q2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgYmFkU2hvdHMucHVzaChjZWxsICsgMSk7XG4gICAgICBiYWRTaG90cy5wdXNoKGNlbGwgLSAxKTtcbiAgICAgIGJhZFNob3RzLnB1c2goY2VsbCArIDEwKTtcbiAgICAgIGJhZFNob3RzLnB1c2goY2VsbCAtIDEwKTtcbiAgICB9KTtcbiAgICBiYWRTaG90cyA9IGJhZFNob3RzLmZpbHRlcihcbiAgICAgIChjZWxsLCBpbmRleCwgYXJyYXkpID0+IGFycmF5LmluZGV4T2YoY2VsbCkgPT09IGluZGV4XG4gICAgKTtcbiAgICBjb25zdCBhdmFpbGFibGVTaG90cyA9IGVtcHR5Q2VsbHMuZmlsdGVyKFxuICAgICAgKGNlbGwpID0+ICFiYWRTaG90cy5pbmNsdWRlcyhjZWxsKVxuICAgICk7XG4gICAgaWYgKGF2YWlsYWJsZVNob3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBhdmFpbGFibGVTaG90c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGVTaG90cy5sZW5ndGgpXTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgQXR0YWNrID0gKGVuZW15KSA9PiB7XG4gICAgY29uc3QgZW1wdHlDZWxscyA9IFtdO1xuICAgIGNvbnN0IGhpdENlbGxzID0gW107XG4gICAgZW5lbXkuZ2FtZUJvYXJkLmJvYXJkLmZvckVhY2goKGhpdCwgaW5kZXgpID0+XG4gICAgICBoaXQgPyBoaXRDZWxscy5wdXNoKGluZGV4KSA6IGVtcHR5Q2VsbHMucHVzaChpbmRleClcbiAgICApO1xuXG4gICAgY29uc3QgdW5zdW5rQ2VsbHMgPSBGaWx0ZXJVblN1bmtDZWxscyhoaXRDZWxscywgZW5lbXkpO1xuICAgIGNvbnN0IGRldGVjdGVkU2hpcHMgPSBEZXRlY3RTaGlwcyh1bnN1bmtDZWxscyk7XG5cbiAgICBpZiAoZGV0ZWN0ZWRTaGlwcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBhdHRhY2sgPSBBdHRhY2tEZXRlY3RlZFNoaXAoZGV0ZWN0ZWRTaGlwcywgZW1wdHlDZWxscyk7XG4gICAgICBpZiAoYXR0YWNrKSByZXR1cm4gYXR0YWNrO1xuICAgIH1cbiAgICBpZiAoaGl0Q2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYXR0YWNrID0gQXR0YWNrU29sb0hpdCh1bnN1bmtDZWxscywgZW1wdHlDZWxscyk7XG4gICAgICBpZiAoYXR0YWNrKSByZXR1cm4gYXR0YWNrO1xuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjayA9IEF0dGFja1JhbmRvbShlbXB0eUNlbGxzLCBoaXRDZWxscyk7XG4gICAgaWYgKGF0dGFjaykgcmV0dXJuIGF0dGFjaztcbiAgICByZXR1cm4gZW1wdHlDZWxsc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbXB0eUNlbGxzLmxlbmd0aCldO1xuICB9O1xuXG4gIHJldHVybiB7IEF0dGFjayB9O1xufSkoKTtcbmV4cG9ydCB7IEFJIH07XG4iLCJpbXBvcnQgeyBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgbWFya3VwcyB9IGZyb20gXCIuL21hcmt1cHNcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBBSSB9IGZyb20gXCIuL2FpXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiRWx2aW5hc1wiKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiQUlcIik7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgY29uc3QgbW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsLWNvbnRhaW5lclwiKTtcbiAgY29uc3QgZ29Ub01haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBnb1RvTWFpbi50ZXh0Q29udGVudCA9IFwiR28gYmFjayB0byBtYWluIHNjcmVlblwiO1xuICBnb1RvTWFpbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGluaXQoKTtcbiAgfSk7XG4gIGxldCBwbGF5ZXIxQm9hcmQ7XG4gIGxldCBwbGF5ZXIyQm9hcmQ7XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBnYW1lLmluaXQocGxheWVyLCBjb21wdXRlcik7XG4gICAgZGlzcGxheUdhbWVNb2RlcygpO1xuICB9O1xuICBjb25zdCBkaXNwbGF5Qm9hcmRzID0gKCkgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBtYWluLmNsYXNzTGlzdC5yZW1vdmUoXCJmbGV4LXlcIik7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChnb1RvTWFpbik7XG4gICAgbWFpbi5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICBcImFmdGVyYmVnaW5cIixcbiAgICAgIG1hcmt1cHMuZ2V0R2FtZWJvYXJkKFxuICAgICAgICBnYW1lLnBsYXllci5nYW1lQm9hcmQsXG4gICAgICAgIGAke2dhbWUucGxheWVyLm5hbWV9IGJvYXJkYCxcbiAgICAgICAgXCJQTEFZRVIxXCIsXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICApO1xuICAgIG1haW4uaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgXCJiZWZvcmVFbmRcIixcbiAgICAgIG1hcmt1cHMuZ2V0R2FtZWJvYXJkKFxuICAgICAgICBnYW1lLmNvbXB1dGVyLmdhbWVCb2FyZCxcbiAgICAgICAgYCR7Z2FtZS5jb21wdXRlci5uYW1lfSBib2FyZGAsXG4gICAgICAgIFwiUExBWUVSMlwiLFxuICAgICAgICBmYWxzZVxuICAgICAgKVxuICAgICk7XG4gICAgcGxheWVyMUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJQTEFZRVIxXCIpO1xuICAgIHBsYXllcjJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUExBWUVSMlwiKTtcbiAgICBwbGF5ZXIyQm9hcmQuY2xhc3NMaXN0LmFkZChcImN1cnNvci1wb2ludGVyXCIpO1xuICAgIHBsYXllcjJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSAmJlxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJnYW1lYm9hcmRfY2VsbFwiKVxuICAgICAgKSB7XG4gICAgICAgIGdhbWUuY29tcHV0ZXIuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpKTtcbiAgICAgICAgZGlzcGxheUJvYXJkcygpO1xuICAgICAgICBpZiAoZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICAgICAgICBnYW1lRW5kTW9kYWwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhdHRhY2sgPSBBSS5BdHRhY2soZ2FtZS5wbGF5ZXIpO1xuICAgICAgICBnYW1lLnBsYXllci5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhhdHRhY2spO1xuICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIuZ2FtZUJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICAgICAgZ2FtZUVuZE1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGxheUJvYXJkcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlHYW1lTW9kZXMgPSAoKSA9PiB7XG4gICAgbWFpbi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImdhbWVtb2Rlc19fd3JhcHBlclwiKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIlNFTEVDVCBHQU1FIE1PREVcIjtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICBjb25zdCBidG4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4xLnRleHRDb250ZW50ID0gXCJQTEFZRVIgVlMgQUlcIjtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGJ0bjEpO1xuICAgIGJ0bjEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGRpc3BsYXlQbGF5ZXJWU0FJRm9ybSgpO1xuICAgIH0pO1xuICAgIGNvbnN0IGJ0bjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bjIudGV4dENvbnRlbnQgPSBcIlBMQVlFUiBWUyBQTEFZRVJcIjtcbiAgICBidG4yLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGJ0bjIpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQod3JhcHBlcik7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVJhbmRvbU9yQ3VzdG9tID0gKCkgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBtYWluLmFwcGVuZENoaWxkKGdvVG9NYWluKTtcblxuICAgIGNvbnN0IGJ0bjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bjEudGV4dENvbnRlbnQgPSBcIlJhbmRvbVwiO1xuICAgIGJ0bjEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGRpc3BsYXlSYW5kb21TaGlwUGxhY2luZyhnYW1lLnBsYXllcik7XG4gICAgfSk7XG4gICAgY29uc3QgYnRuMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuMi50ZXh0Q29udGVudCA9IFwiQ3VzdG9tXCI7XG4gICAgYnRuMi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZGlzcGxheUN1c3RvbVNoaXBQbGFjaW5nKGdhbWUucGxheWVyLCAwKTtcbiAgICB9KTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGJ0bjEpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoYnRuMik7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVBsYXllclZTQUlGb3JtID0gKCkgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBtYWluLmFwcGVuZENoaWxkKGdvVG9NYWluKTtcblxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcblxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gXCJFbnRlciB5b3VyIG5hbWU6IFwiO1xuICAgIGxhYmVsLnNldEF0dHJpYnV0ZShcImZvclwiLCBcIm5hbWVcIik7XG5cbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBpbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG4gICAgaW5wdXQubmFtZSA9IFwibmFtZVwiO1xuICAgIGlucHV0LmlkID0gXCJuYW1lXCI7XG5cbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiU3RhcnRcIjtcbiAgICBpZiAoaW5wdXQudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCAoKSA9PiB7XG4gICAgICBpZiAoaW5wdXQudmFsdWUgIT09IFwiXCIpIHtcbiAgICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZ2FtZS5wbGF5ZXIubmFtZSA9IGlucHV0LnZhbHVlO1xuICAgICAgZGlzcGxheVJhbmRvbU9yQ3VzdG9tKCk7XG4gICAgfSk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChidG4pO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoZm9ybSk7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVJhbmRvbVNoaXBQbGFjaW5nID0gKHBsYXllcikgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBtYWluLmFwcGVuZENoaWxkKGdvVG9NYWluKTtcblxuICAgIGNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBzdGFydC50ZXh0Q29udGVudCA9IFwiU3RhcnRcIjtcbiAgICBtYWluLmFwcGVuZENoaWxkKHN0YXJ0KTtcbiAgICBzdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZGlzcGxheUJvYXJkcygpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmFuZG9taXplID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICByYW5kb21pemUudGV4dENvbnRlbnQgPSBcIlJhbmRvbWl6ZVwiO1xuICAgIHJhbmRvbWl6ZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZGlzcGxheVJhbmRvbVNoaXBQbGFjaW5nKHBsYXllcik7XG4gICAgfSk7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChyYW5kb21pemUpO1xuXG4gICAgZ2FtZS5wdXRSYW5kb21TaGlwcyhwbGF5ZXIpO1xuICAgIG1haW4uY2xhc3NMaXN0LmFkZChcImZsZXgteVwiKTtcbiAgICBjb25zdCBzaGlwcyA9IGdhbWUuc3RhcnRpbmdTaGlwcztcbiAgICBtYWluLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgICBtYXJrdXBzLmdldEdhbWVib2FyZChcbiAgICAgICAgcGxheWVyLmdhbWVCb2FyZCxcbiAgICAgICAgYCR7cGxheWVyLm5hbWV9IGJvYXJkYCxcbiAgICAgICAgXCJQTEFZRVIxXCIsXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlDdXN0b21TaGlwUGxhY2luZyA9IChwbGF5ZXIsIGluZGV4KSA9PiB7XG4gICAgbWFpbi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoZ29Ub01haW4pO1xuXG4gICAgbWFpbi5jbGFzc0xpc3QuYWRkKFwiZmxleC15XCIpO1xuICAgIGNvbnN0IHNoaXBzID0gZ2FtZS5zdGFydGluZ1NoaXBzO1xuICAgIG1haW4uaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgXCJiZWZvcmVlbmRcIixcbiAgICAgIG1hcmt1cHMuZ2V0R2FtZWJvYXJkKFxuICAgICAgICBwbGF5ZXIuZ2FtZUJvYXJkLFxuICAgICAgICBgJHtwbGF5ZXIubmFtZX0gYm9hcmRgLFxuICAgICAgICBcIlBMQVlFUjFcIixcbiAgICAgICAgdHJ1ZVxuICAgICAgKVxuICAgICk7XG4gICAgaWYgKGluZGV4ID49IGdhbWUuc3RhcnRpbmdTaGlwcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBidG4udGV4dENvbnRlbnQgPSBcIlN0YXJ0XCI7XG4gICAgICBtYWluLnByZXBlbmQoYnRuKTtcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBkaXNwbGF5Qm9hcmRzKCk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRfY29udGFpbmVyXCIpO1xuICAgICAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJzb3ItcG9pbnRlclwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGhvdmVyQXJyYXkgPSBbXTtcbiAgICAgIGxldCBjbGFzc05hbWU7XG4gICAgICBsZXQgYWJsZVRvUGxhY2U7XG4gICAgICBsZXQgYXhpcztcbiAgICAgIGxldCBjdXJyID0gc2hpcHNbaW5kZXhdO1xuICAgICAgY29uc3QgaW5mb1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIGluZm9UZXh0LnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgJHtjdXJyLm5hbWV9YDtcbiAgICAgIG1haW4ucHJlcGVuZChpbmZvVGV4dCk7XG5cbiAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgbGFiZWwuY2xhc3NMaXN0LmFkZChcInRvZ2dsZVwiKTtcblxuICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG5cbiAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZChcImxhYmVsc1wiKTtcbiAgICAgIHNwYW4uc2V0QXR0cmlidXRlKFwiZGF0YS1vblwiLCBcIllcIik7XG4gICAgICBzcGFuLnNldEF0dHJpYnV0ZShcImRhdGEtb2ZmXCIsIFwiWFwiKTtcblxuICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoc3Bhbik7XG5cbiAgICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkX2NvbnRhaW5lclwiKTtcbiAgICAgIG1haW4uaW5zZXJ0QmVmb3JlKGxhYmVsLCBnYW1lYm9hcmQucGFyZW50RWxlbWVudCk7XG4gICAgICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZChcImN1cnNvci1wb2ludGVyXCIpO1xuICAgICAgZ2FtZWJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgaG92ZXJBcnJheSA9IFtdO1xuICAgICAgICBheGlzID0gaW5wdXQuY2hlY2tlZCA/IFwieVwiIDogXCJ4XCI7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pbmRleCk7XG4gICAgICAgICAgaSA8XG4gICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpICtcbiAgICAgICAgICAgIChpbnB1dC5jaGVja2VkID8gY3Vyci5sZW5ndGggKiAxMCA6IGN1cnIubGVuZ3RoKTtcbiAgICAgICAgICBpbnB1dC5jaGVja2VkID8gKGkgKz0gMTApIDogaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGhvdmVyQXJyYXkucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBhYmxlVG9QbGFjZSA9XG4gICAgICAgICAgIXBsYXllci5nYW1lQm9hcmQuY2hlY2tJZkNvbGxpZGVkKGhvdmVyQXJyYXkpICYmXG4gICAgICAgICAgIXBsYXllci5nYW1lQm9hcmQuY2hlY2tJZk11bHRpcGxlTGluZXMoaG92ZXJBcnJheSwgYXhpcyk7XG4gICAgICAgIGNsYXNzTmFtZSA9IGFibGVUb1BsYWNlID8gXCJwbGFjZXNoaXBcIiA6IFwiY29sbGlkaW5nXCI7XG5cbiAgICAgICAgaG92ZXJBcnJheS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaW5kZXg9JyR7ZWx9J11gKTtcbiAgICAgICAgICBpZiAocXVlcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHF1ZXJ5LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBsZXQgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWVib2FyZF9jZWxsXCIpO1xuICAgICAgY2VsbHMgPSBBcnJheS5mcm9tKGNlbGxzKTtcbiAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGUpID0+IHtcbiAgICAgICAgICBob3ZlckFycmF5LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWluZGV4PScke2VsfSddYCk7XG4gICAgICAgICAgICBpZiAocXVlcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgcXVlcnkuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIGdhbWVib2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGFibGVUb1BsYWNlICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImdhbWVib2FyZF9jZWxsXCIpKSB7XG4gICAgICAgICAgcGxheWVyLmdhbWVCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pbmRleCksXG4gICAgICAgICAgICBuZXcgU2hpcChjdXJyLm5hbWUpLFxuICAgICAgICAgICAgYXhpcyxcbiAgICAgICAgICAgIGN1cnIubGVuZ3RoXG4gICAgICAgICAgKTtcbiAgICAgICAgICBkaXNwbGF5Q3VzdG9tU2hpcFBsYWNpbmcocGxheWVyLCBpbmRleCArIDEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGdhbWVFbmRNb2RhbCA9ICgpID0+IHtcbiAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwic2hvdy1tb2RhbFwiKTtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsXCIpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGAke1xuICAgICAgZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQuaXNBbGxTdW5rKClcbiAgICAgICAgPyBnYW1lLnBsYXllci5uYW1lXG4gICAgICAgIDogZ2FtZS5jb21wdXRlci5uYW1lXG4gICAgfSBoYXMgd29uIWA7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiUGxheSBhZ2FpblwiO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZ2FtZS5pbml0KHBsYXllciwgY29tcHV0ZXIpO1xuICAgICAgZGlzcGxheVJhbmRvbU9yQ3VzdG9tKCk7XG4gICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwic2hvdy1tb2RhbFwiKTtcbiAgICAgIG1vZGFsQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgfSk7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChnb1RvTWFpbik7XG4gICAgbW9kYWxDb250YWluZXIuYXBwZW5kQ2hpbGQobW9kYWwpO1xuICB9O1xuXG4gIHJldHVybiB7IGluaXQgfTtcbn0pKCk7XG5leHBvcnQgeyBkb20gfTtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVCb2FyZFwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuY29uc3QgZ2FtZSA9ICgoKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoXCJFbHZpbmFzXCIpO1xuICBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoXCJBSVwiKTtcbiAgY29uc3Qgc3RhcnRpbmdTaGlwcyA9IFtcbiAgICB7IG5hbWU6IFwiQ2FycmllclwiLCBsZW5ndGg6IDUgfSxcbiAgICB7IG5hbWU6IFwiQmF0dGxlc2hpcFwiLCBsZW5ndGg6IDQgfSxcbiAgICB7IG5hbWU6IFwiQ3J1aXNlclwiLCBsZW5ndGg6IDMgfSxcbiAgICB7IG5hbWU6IFwiU3VibWFyaW5lXCIsIGxlbmd0aDogMyB9LFxuICAgIHsgbmFtZTogXCJEZXN0cm95ZXJcIiwgbGVuZ3RoOiAyIH0sXG4gIF07XG5cbiAgY29uc3QgcHV0UmFuZG9tU2hpcHMgPSAocGxheWVyKSA9PiB7XG4gICAgcGxheWVyLmdhbWVCb2FyZC5zaGlwcyA9IFtdO1xuICAgIGNvbnN0IGF4bGVzID0gW1wieFwiLCBcInlcIl07XG4gICAgbGV0IGN1cnJBeGlzID0gXCJ4XCI7XG4gICAgbGV0IHJhbmRvbU51bTtcbiAgICBsZXQgYXJyYXkgPSBbXTtcbiAgICBzdGFydGluZ1NoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHdoaWxlIChcbiAgICAgICAgYXJyYXkubGVuZ3RoID09PSAwIHx8XG4gICAgICAgIHBsYXllci5nYW1lQm9hcmQuY2hlY2tJZkNvbGxpZGVkKGFycmF5KSB8fFxuICAgICAgICBwbGF5ZXIuZ2FtZUJvYXJkLmNoZWNrSWZNdWx0aXBsZUxpbmVzKGFycmF5LCBjdXJyQXhpcylcbiAgICAgICkge1xuICAgICAgICBhcnJheSA9IFtdO1xuICAgICAgICBjdXJyQXhpcyA9IGF4bGVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGF4bGVzLmxlbmd0aCldO1xuICAgICAgICByYW5kb21OdW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApO1xuICAgICAgICBmb3IgKFxuICAgICAgICAgIGxldCBpID0gcmFuZG9tTnVtO1xuICAgICAgICAgIGkgPCByYW5kb21OdW0gKyAoY3VyckF4aXMgPT09IFwieVwiID8gc2hpcC5sZW5ndGggKiAxMCA6IHNoaXAubGVuZ3RoKTtcbiAgICAgICAgICBjdXJyQXhpcyA9PT0gXCJ5XCIgPyAoaSArPSAxMCkgOiBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgYXJyYXkucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcGxheWVyLmdhbWVCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAgIHJhbmRvbU51bSxcbiAgICAgICAgbmV3IFNoaXAoc2hpcC5uYW1lKSxcbiAgICAgICAgY3VyckF4aXMsXG4gICAgICAgIHNoaXAubGVuZ3RoXG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgcGxheWVyLmdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICBjb21wdXRlci5nYW1lQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgcHV0UmFuZG9tU2hpcHMoY29tcHV0ZXIpO1xuICB9O1xuXG4gIHJldHVybiB7IGluaXQsIHBsYXllciwgY29tcHV0ZXIsIHN0YXJ0aW5nU2hpcHMsIHB1dFJhbmRvbVNoaXBzIH07XG59KSgpO1xuZXhwb3J0IHsgZ2FtZSB9O1xuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tcGx1c3BsdXMgKi9cblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICB0aGlzLmJvYXJkLnB1c2goZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIHBsYWNlU2hpcChjb29yZCwgc2hpcCwgYXhpcywgbGVuZ3RoKSB7XG4gICAgbGV0IHRlbXAgPSBjb29yZDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBzaGlwLmxvY2F0aW9uLnB1c2godGVtcCk7XG4gICAgICB0ZW1wICs9IGF4aXMudG9Mb3dlckNhc2UoKSA9PT0gXCJ4XCIgPyAxIDogMTA7XG4gICAgfVxuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgfVxuXG4gIHJlY2VpdmVBdHRhY2soY29vcmQpIHtcbiAgICB0aGlzLmJvYXJkW2Nvb3JkXSA9IHRydWU7XG4gICAgaWYgKHRoaXMuaXNTaGlwKGNvb3JkKSkge1xuICAgICAgdGhpcy5oaXRTaGlwKGNvb3JkKTtcbiAgICB9XG4gIH1cblxuICBpc1NoaXAoY29vcmQpIHtcbiAgICByZXR1cm4gdGhpcy5zaGlwcy5zb21lKCh4KSA9PiB4LmxvY2F0aW9uLmluY2x1ZGVzKGNvb3JkKSk7XG4gIH1cblxuICBoaXRTaGlwKGNvb3JkKSB7XG4gICAgdGhpcy5zaGlwcy5maW5kKCh4KSA9PiB4LmxvY2F0aW9uLmluY2x1ZGVzKGNvb3JkKSkuaGl0cy5wdXNoKGNvb3JkKTtcbiAgfVxuXG4gIGlzQWxsU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5zaGlwcy5ldmVyeSgoeCkgPT4geC5pc1N1bmsoKSk7XG4gIH1cblxuICBnZXRTaGlwc0Nvb3JkcygpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICBpZiAodGhpcy5pc1NoaXAoaSkpIGFyci5wdXNoKGkpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgY2hlY2tJZkNvbGxpZGVkKGNvb3JkQXJyYXkpIHtcbiAgICByZXR1cm4gY29vcmRBcnJheS5zb21lKCh4KSA9PlxuICAgICAgdGhpcy5zaGlwcy5zb21lKChzaGlwKSA9PiBzaGlwLmxvY2F0aW9uLmluY2x1ZGVzKHgpKVxuICAgICk7XG4gIH1cblxuICBjaGVja0lmTXVsdGlwbGVMaW5lcyhjb29yZEFycmF5LCBheGlzKSB7XG4gICAgaWYgKGF4aXMgPT09IFwieFwiKSB7XG4gICAgICBjb25zdCByZXMgPSBNYXRoLmZsb29yKGNvb3JkQXJyYXlbMF0gLyAxMCk7XG4gICAgICByZXR1cm4gIShcbiAgICAgICAgY29vcmRBcnJheS5sZW5ndGggPT09XG4gICAgICAgIGNvb3JkQXJyYXkuZmlsdGVyKCh4KSA9PiBNYXRoLmZsb29yKHggLyAxMCkgPT09IHJlcykubGVuZ3RoXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoYXhpcyA9PT0gXCJ5XCIpIHtcbiAgICAgIGNvbnN0IHJlcyA9IGNvb3JkQXJyYXlbMF0gJSAxMDtcbiAgICAgIHJldHVybiAhKFxuICAgICAgICBjb29yZEFycmF5Lmxlbmd0aCA9PT0gY29vcmRBcnJheS5maWx0ZXIoKHgpID0+IHggJSAxMCA9PT0gcmVzKS5sZW5ndGggJiZcbiAgICAgICAgIWNvb3JkQXJyYXkuc29tZSgoeCkgPT4geCA+IDEwMClcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcbiIsImNvbnN0IG1hcmt1cHMgPSAoKCkgPT4ge1xuICBsZXQgY291bnRlciA9IDA7XG4gIGNvbnN0IGdldEdhbWVib2FyZCA9IChnYW1lYm9hcmQsIGhlYWRlciwgaWQsIHRvU2VlU2hpcHMpID0+IHtcbiAgICBsZXQgc2hpcHNBcnJheSA9IFtdO1xuICAgIGNvdW50ZXIgPSAwO1xuICAgIGNvbnN0IGdhbWVCb2FyZENlbGxzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGdhbWVib2FyZC5ib2FyZC5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMTApIHtcbiAgICAgIGdhbWVCb2FyZENlbGxzLnB1c2goZ2FtZWJvYXJkLmJvYXJkLnNsaWNlKGksIGkgKyAxMCkpO1xuICAgIH1cbiAgICBzaGlwc0FycmF5ID0gZ2FtZWJvYXJkLmdldFNoaXBzQ29vcmRzKCk7XG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwid3JhcHBlclwiPjxoMj4ke2hlYWRlcn08L2gyPjxkaXYgY2xhc3M9XCJnYW1lYm9hcmRfY29udGFpbmVyXCIgaWQ9XCIke2lkfVwiPiR7Z2FtZUJvYXJkQ2VsbHNcbiAgICAgIC5tYXAoKGxpbmUpID0+IGdhbWVib2FyZExpbmVNYXJrdXAobGluZSwgc2hpcHNBcnJheSwgdG9TZWVTaGlwcykpXG4gICAgICAuam9pbihcIlwiKX08L2Rpdj48L2Rpdj5gO1xuICB9O1xuICBjb25zdCBnYW1lYm9hcmRMaW5lTWFya3VwID0gKGxpbmUsIHNoaXBzQXJyYXksIHRvU2VlU2hpcHMpID0+XG4gICAgYDxkaXYgY2xhc3M9XCJnYW1lYm9hcmRfbGluZVwiPiR7bGluZVxuICAgICAgLm1hcChcbiAgICAgICAgKGNlbGwpID0+XG4gICAgICAgICAgYCR7Z2FtZWJvYXJkQ2VsbE1hcmt1cChcbiAgICAgICAgICAgIHNoaXBzQXJyYXkuaW5jbHVkZXMoY291bnRlciksXG4gICAgICAgICAgICBjZWxsLFxuICAgICAgICAgICAgdG9TZWVTaGlwc1xuICAgICAgICAgICl9YFxuICAgICAgKVxuICAgICAgLmpvaW4oXCJcIil9PC9kaXY+YDtcblxuICBjb25zdCBnYW1lYm9hcmRDZWxsTWFya3VwID0gKHNoaXAsIGhpdCwgdG9TZWVTaGlwcykgPT4ge1xuICAgIGNvdW50ZXIgKz0gMTtcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJnYW1lYm9hcmRfY2VsbCAke3NoaXAgJiYgdG9TZWVTaGlwcyA/IFwic2hpcFwiIDogXCJcIn0gJHtcbiAgICAgIGhpdCA/IFwiaGl0XCIgOiBcIlwiXG4gICAgfSAkeyF0b1NlZVNoaXBzICYmIHNoaXAgJiYgaGl0ID8gXCJlbmVteS1zaGlwLWhpdFwiIDogXCJcIn1cIiBkYXRhLWluZGV4PVwiJHtcbiAgICAgIGNvdW50ZXIgLSAxXG4gICAgfVwiPjwvZGl2PmA7XG4gIH07XG5cbiAgcmV0dXJuIHsgZ2V0R2FtZWJvYXJkIH07XG59KSgpO1xuZXhwb3J0IHsgbWFya3VwcyB9O1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lQm9hcmRcIjtcbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZ2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICB9XG5cbiAgYXR0YWNrKGVuZW15LCBsb2NhdGlvbikge1xuICAgIGVuZW15LmdhbWVCb2FyZC5yZWNlaXZlQXR0YWNrKGxvY2F0aW9uKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKG5hbWUsIGxvY2F0aW9uID0gW10pIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICB0aGlzLmhpdHMgPSBbXTtcbiAgfVxuXG4gIGhpdChpbmRleCkge1xuICAgIHRoaXMuaGl0cy5wdXNoKGluZGV4KTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdGlvbi5ldmVyeSgoY2VsbCkgPT4gdGhpcy5oaXRzLmluY2x1ZGVzKGNlbGwpKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG86d2dodEA0MDA7NzAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBjMGEzZTtcXG4gIGNvbG9yOiAjZWVlO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBzYW5zLXNlcmlmO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbn1cXG5oZWFkZXIsXFxuZm9vdGVyIHtcXG4gIGhlaWdodDogODBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODM2NjM7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZ2FwOiAyMHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMjBweDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDE2MHB4KTtcXG59XFxuLndyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAyMHB4O1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbn1cXG4uZ2FtZWJvYXJkX2NvbnRhaW5lciB7XFxuICB3aWR0aDogNjAwcHg7XFxuICBoZWlnaHQ6IDYwMHB4O1xcbn1cXG4uZ2FtZWJvYXJkX2xpbmUge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiAxMCU7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbn1cXG4uZ2FtZWJvYXJkX2NlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLnNoaXAsXFxuLnBsYWNlc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBncmVlbjtcXG59XFxuLmNvbGxpZGluZyB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTg3LCA1OSwgNTkpO1xcbn1cXG4uaGl0OjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbi5lbmVteS1zaGlwLWhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNjUsIDIwLCAyMCk7XFxufVxcbmZvb3RlciB7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbn1cXG5mb290ZXIgPiBhID4gaW1nOmhvdmVyIHtcXG4gIGZpbHRlcjogb3BhY2l0eSgwLjcpO1xcbn1cXG4ubW9kYWxfX2NvbnRhaW5lciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgb3BhY2l0eTogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2U7XFxufVxcbi5zaG93LW1vZGFsIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBwb2ludGVyLWV2ZW50czogYXV0bztcXG59XFxuXFxuLm1vZGFsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB3aWR0aDogNjAwcHg7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi5nYW1lbW9kZXNfX3dyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDMwcHg7XFxufVxcblxcbi5mbGV4LXkge1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuXFxuLmN1cnNvci1wb2ludGVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnRvZ2dsZSB7XFxuICAtLXdpZHRoOiA4MHB4O1xcbiAgLS1oZWlnaHQ6IGNhbGModmFyKC0td2lkdGgpIC8gMyk7XFxuXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogdmFyKC0td2lkdGgpO1xcbiAgaGVpZ2h0OiB2YXIoLS1oZWlnaHQpO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM4MzY2MztcXG4gIGJveC1zaGFkb3c6IDBweCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnRvZ2dsZSBpbnB1dCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4udG9nZ2xlIC5sYWJlbHMge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbi1vdXQ7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4udG9nZ2xlIC5sYWJlbHM6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1vZmYpO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4udG9nZ2xlIC5sYWJlbHM6OmJlZm9yZSB7XFxuICBjb250ZW50OiBhdHRyKGRhdGEtb24pO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IGNhbGModmFyKC0td2lkdGgpICogLTEpO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnRvZ2dsZSBpbnB1dDpjaGVja2VkIH4gLmxhYmVsczo6YWZ0ZXIge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKHZhcigtLXdpZHRoKSk7XFxufVxcblxcbi50b2dnbGUgaW5wdXQ6Y2hlY2tlZCB+IC5sYWJlbHM6OmJlZm9yZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgodmFyKC0td2lkdGgpKTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFDQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsV0FBVztFQUNYLGlDQUFpQztFQUNqQyxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixnQkFBZ0I7QUFDbEI7QUFDQTs7RUFFRSxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixTQUFTO0VBQ1QsV0FBVztBQUNiO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsU0FBUztFQUNULHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsMkJBQTJCO0FBQzdCO0FBQ0E7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixTQUFTO0VBQ1QsZUFBZTtBQUNqQjtBQUNBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7QUFDZjtBQUNBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixXQUFXO0VBQ1gseUJBQXlCO0FBQzNCO0FBQ0E7RUFDRSx1QkFBdUI7RUFDdkIsWUFBWTtFQUNaLFdBQVc7RUFDWCx1QkFBdUI7RUFDdkIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7QUFDckI7QUFDQTs7RUFFRSxpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLDRCQUE0QjtBQUM5QjtBQUNBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxxQkFBcUI7RUFDckIsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsb0JBQW9CO0FBQ3RCO0FBQ0E7RUFDRSxpQ0FBaUM7QUFDbkM7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUNBO0VBQ0Usb0JBQW9CO0FBQ3RCO0FBQ0E7RUFDRSxvQ0FBb0M7RUFDcEMsZUFBZTtFQUNmLFVBQVU7RUFDVixNQUFNO0VBQ04sT0FBTztFQUNQLFlBQVk7RUFDWixhQUFhO0VBQ2IsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsVUFBVTtFQUNWLG9CQUFvQjtFQUNwQiw2QkFBNkI7QUFDL0I7QUFDQTtFQUNFLFVBQVU7RUFDVixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGVBQWU7RUFDZixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLHdDQUF3QztFQUN4QyxrQkFBa0I7RUFDbEIsVUFBVTtBQUNaO0FBQ0E7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZ0NBQWdDOztFQUVoQyxrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixxQkFBcUI7RUFDckIsWUFBWTtFQUNaLHlCQUF5QjtFQUN6QiwwQ0FBMEM7RUFDMUMsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0VBQ1osZUFBZTtFQUNmLGdDQUFnQztFQUNoQyxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLE1BQU07RUFDTixPQUFPO0VBQ1AsWUFBWTtFQUNaLFdBQVc7RUFDWCxnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLE1BQU07RUFDTiw2QkFBNkI7RUFDN0IsWUFBWTtFQUNaLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKFxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bzp3Z2h0QDQwMDs3MDAmZGlzcGxheT1zd2FwXFxcIik7XFxuKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGMwYTNlO1xcbiAgY29sb3I6ICNlZWU7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIHNhbnMtc2VyaWY7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIG1heC13aWR0aDogMTAwdnc7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIG1heC13aWR0aDogMTAwdnc7XFxufVxcbmhlYWRlcixcXG5mb290ZXIge1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM4MzY2MztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBnYXA6IDIwcHg7XFxuICB3aWR0aDogMTAwJTtcXG59XFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAyMHB4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTYwcHgpO1xcbn1cXG4ud3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDIwcHg7XFxuICBmb250LXNpemU6IDIwcHg7XFxufVxcbi5nYW1lYm9hcmRfY29udGFpbmVyIHtcXG4gIHdpZHRoOiA2MDBweDtcXG4gIGhlaWdodDogNjAwcHg7XFxufVxcbi5nYW1lYm9hcmRfbGluZSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBoZWlnaHQ6IDEwJTtcXG4gIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxufVxcbi5nYW1lYm9hcmRfY2VsbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG4uc2hpcCxcXG4ucGxhY2VzaGlwIHtcXG4gIGJhY2tncm91bmQ6IGdyZWVuO1xcbn1cXG4uY29sbGlkaW5nIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxODcsIDU5LCA1OSk7XFxufVxcbi5oaXQ6OmFmdGVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbiAgd2lkdGg6IDE1cHg7XFxuICBoZWlnaHQ6IDE1cHg7XFxuICBib3JkZXItcmFkaXVzOiA4cHg7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG59XFxuLmVuZW15LXNoaXAtaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig2NSwgMjAsIDIwKTtcXG59XFxuZm9vdGVyIHtcXG4gIG1hcmdpbi10b3A6IGF1dG87XFxufVxcbmZvb3RlciA+IGEgPiBpbWc6aG92ZXIge1xcbiAgZmlsdGVyOiBvcGFjaXR5KDAuNyk7XFxufVxcbi5tb2RhbF9fY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHotaW5kZXg6IDE7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMHZ3O1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBvcGFjaXR5OiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcXG59XFxuLnNob3ctbW9kYWwge1xcbiAgb3BhY2l0eTogMTtcXG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xcbn1cXG5cXG4ubW9kYWwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHdpZHRoOiA2MDBweDtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgei1pbmRleDogMTtcXG59XFxuLmdhbWVtb2Rlc19fd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMzBweDtcXG59XFxuXFxuLmZsZXgteSB7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbn1cXG5cXG4uY3Vyc29yLXBvaW50ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4udG9nZ2xlIHtcXG4gIC0td2lkdGg6IDgwcHg7XFxuICAtLWhlaWdodDogY2FsYyh2YXIoLS13aWR0aCkgLyAzKTtcXG5cXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiB2YXIoLS13aWR0aCk7XFxuICBoZWlnaHQ6IHZhcigtLWhlaWdodCk7XFxuICBjb2xvcjogd2hpdGU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgYm94LXNoYWRvdzogMHB4IDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4udG9nZ2xlIGlucHV0IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi50b2dnbGUgLmxhYmVscyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlLWluLW91dDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi50b2dnbGUgLmxhYmVsczo6YWZ0ZXIge1xcbiAgY29udGVudDogYXR0cihkYXRhLW9mZik7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi50b2dnbGUgLmxhYmVsczo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1vbik7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogY2FsYyh2YXIoLS13aWR0aCkgKiAtMSk7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4udG9nZ2xlIGlucHV0OmNoZWNrZWQgfiAubGFiZWxzOjphZnRlciB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgodmFyKC0td2lkdGgpKTtcXG59XFxuXFxuLnRvZ2dsZSBpbnB1dDpjaGVja2VkIH4gLmxhYmVsczo6YmVmb3JlIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCh2YXIoLS13aWR0aCkpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCB7IGRvbSB9IGZyb20gXCIuL2RvbVwiO1xuXG5kb20uaW5pdCgpO1xuIl0sIm5hbWVzIjpbIkFJIiwiRmlsdGVyVW5TdW5rQ2VsbHMiLCJhcnJheSIsImVuZW15IiwiZmlsdGVyIiwiY2VsbCIsImdhbWVCb2FyZCIsImlzU2hpcCIsImN1cnJTaGlwIiwic2hpcHMiLCJmaW5kIiwic2hpcCIsImxvY2F0aW9uIiwiaW5jbHVkZXMiLCJpc1N1bmsiLCJEZXRlY3RTaGlwcyIsInVuc3Vua0NlbGxzIiwiZGV0ZWN0ZWQiLCJpbmRleCIsIkF0dGFja0RldGVjdGVkU2hpcCIsImRldGVjdGVkU2hpcHMiLCJlbXB0eUNlbGxzIiwiYXhpcyIsImF2YWlsYWJsZVNob3RzIiwicHVzaCIsInJpZ2h0U2lkZSIsIk1hdGgiLCJmbG9vciIsImFib3ZlIiwiYmVsb3ciLCJmaWx0ZXJlZEF2YWlsYWJsZVNob3RzIiwic2hvdCIsImxlbmd0aCIsInJhbmRvbSIsIkF0dGFja1NvbG9IaXQiLCJoaXRDZWxscyIsImZpcnN0U2hvdCIsImxlZnRTaG90IiwicmlnaHRTaG90IiwiYWJvdmVTaG90IiwiYmVsb3dTaG90IiwiQXR0YWNrUmFuZG9tIiwiYmFkU2hvdHMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsIkF0dGFjayIsImJvYXJkIiwiaGl0IiwiYXR0YWNrIiwiZ2FtZSIsIm1hcmt1cHMiLCJQbGF5ZXIiLCJTaGlwIiwiZG9tIiwicGxheWVyIiwiY29tcHV0ZXIiLCJtYWluIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibW9kYWxDb250YWluZXIiLCJnb1RvTWFpbiIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0IiwicGxheWVyMUJvYXJkIiwicGxheWVyMkJvYXJkIiwiZGlzcGxheUdhbWVNb2RlcyIsImRpc3BsYXlCb2FyZHMiLCJpbm5lckhUTUwiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhcHBlbmRDaGlsZCIsImluc2VydEFkamFjZW50SFRNTCIsImdldEdhbWVib2FyZCIsIm5hbWUiLCJnZXRFbGVtZW50QnlJZCIsImFkZCIsImUiLCJ0YXJnZXQiLCJjb250YWlucyIsInJlY2VpdmVBdHRhY2siLCJOdW1iZXIiLCJkYXRhc2V0IiwiaXNBbGxTdW5rIiwiZ2FtZUVuZE1vZGFsIiwid3JhcHBlciIsImhlYWRlciIsImJ0bjEiLCJkaXNwbGF5UGxheWVyVlNBSUZvcm0iLCJidG4yIiwiZGlzYWJsZWQiLCJkaXNwbGF5UmFuZG9tT3JDdXN0b20iLCJkaXNwbGF5UmFuZG9tU2hpcFBsYWNpbmciLCJkaXNwbGF5Q3VzdG9tU2hpcFBsYWNpbmciLCJmb3JtIiwibGFiZWwiLCJzZXRBdHRyaWJ1dGUiLCJpbnB1dCIsInR5cGUiLCJpZCIsImJ0biIsInZhbHVlIiwic3RhcnQiLCJyYW5kb21pemUiLCJwdXRSYW5kb21TaGlwcyIsInN0YXJ0aW5nU2hpcHMiLCJwcmVwZW5kIiwiZ2FtZWJvYXJkIiwiaG92ZXJBcnJheSIsImNsYXNzTmFtZSIsImFibGVUb1BsYWNlIiwiY3VyciIsImluZm9UZXh0Iiwic3BhbiIsImluc2VydEJlZm9yZSIsInBhcmVudEVsZW1lbnQiLCJjaGVja2VkIiwiaSIsImNoZWNrSWZDb2xsaWRlZCIsImNoZWNrSWZNdWx0aXBsZUxpbmVzIiwiZWwiLCJxdWVyeSIsImNlbGxzIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwiZnJvbSIsInBsYWNlU2hpcCIsIm1vZGFsIiwiR2FtZWJvYXJkIiwiYXhsZXMiLCJjdXJyQXhpcyIsInJhbmRvbU51bSIsImNvb3JkIiwidGVtcCIsInRvTG93ZXJDYXNlIiwiaGl0U2hpcCIsInNvbWUiLCJ4IiwiaGl0cyIsImV2ZXJ5IiwiYXJyIiwiY29vcmRBcnJheSIsInJlcyIsImNvdW50ZXIiLCJ0b1NlZVNoaXBzIiwic2hpcHNBcnJheSIsImdhbWVCb2FyZENlbGxzIiwibGVuIiwic2xpY2UiLCJnZXRTaGlwc0Nvb3JkcyIsIm1hcCIsImxpbmUiLCJnYW1lYm9hcmRMaW5lTWFya3VwIiwiam9pbiIsImdhbWVib2FyZENlbGxNYXJrdXAiXSwic291cmNlUm9vdCI6IiJ9