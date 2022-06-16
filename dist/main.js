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
  goToMain.classList.add("main-btn");
  goToMain.textContent = "GO TO MAIN SCREEN";
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
    main.appendChild(goToMain);
    var gameboards = document.createElement("div");
    gameboards.classList.add("gameboards");
    gameboards.insertAdjacentHTML("afterbegin", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(_game__WEBPACK_IMPORTED_MODULE_0__.game.player.gameBoard, "".concat(_game__WEBPACK_IMPORTED_MODULE_0__.game.player.name, " board"), "PLAYER1", true));
    gameboards.insertAdjacentHTML("beforeEnd", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(_game__WEBPACK_IMPORTED_MODULE_0__.game.computer.gameBoard, "".concat(_game__WEBPACK_IMPORTED_MODULE_0__.game.computer.name, " board"), "PLAYER2", false));
    main.appendChild(gameboards);
    player1Board = document.getElementById("PLAYER1");
    player2Board = document.getElementById("PLAYER2");
    player2Board.classList.add("cursor-pointer");
    player2Board.addEventListener("click", function (e) {
      if (!e.target.classList.contains("hit") && e.target.classList.contains("gameboard_cell")) {
        _game__WEBPACK_IMPORTED_MODULE_0__.game.computer.gameBoard.receiveAttack(Number(e.target.dataset.index));
        displayBoards();

        if (_game__WEBPACK_IMPORTED_MODULE_0__.game.computer.gameBoard.isAllSunk()) {
          gameEndModal();
          return;
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
    btn1.classList.add("btn");
    btn1.classList.add("btn-primary");
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
    var para = document.createElement("p");
    para.classList.add("para");
    para.textContent = "HOW DO YOU WANT TO PLACE SHIPS?";
    btn1.textContent = "RANDOM";
    btn1.classList.add("main-btn");
    btn1.addEventListener("click", function () {
      displayRandomShipPlacing(_game__WEBPACK_IMPORTED_MODULE_0__.game.player);
    });
    var btn2 = document.createElement("button");
    btn2.textContent = "CUSTOM";
    btn2.classList.add("main-btn");
    btn2.addEventListener("click", function () {
      displayCustomShipPlacing(_game__WEBPACK_IMPORTED_MODULE_0__.game.player, 0);
    });
    main.appendChild(para);
    main.appendChild(btn1);
    main.appendChild(btn2);
  };

  var displayPlayerVSAIForm = function displayPlayerVSAIForm() {
    main.innerHTML = "";
    main.appendChild(goToMain);
    var wrapper = document.createElement("div");
    wrapper.classList.add("form__wrapper");
    var form = document.createElement("form");
    var label = document.createElement("label");
    label.textContent = "ENTER YOUR NAME:";
    label.setAttribute("for", "name");
    var input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.id = "name";
    var btn = document.createElement("button");
    btn.textContent = "START";

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
    wrapper.appendChild(form);
    main.appendChild(wrapper);
  };

  var displayRandomShipPlacing = function displayRandomShipPlacing(player) {
    main.innerHTML = "";
    main.appendChild(goToMain);
    var div = document.createElement("div");
    div.classList.add("buttons__wrapper");
    var start = document.createElement("button");
    start.textContent = "START";
    start.classList.add("main-btn");
    div.appendChild(start);
    start.addEventListener("click", function () {
      displayBoards();
    });
    var randomize = document.createElement("button");
    randomize.textContent = "RANDOMIZE";
    randomize.classList.add("main-btn");
    randomize.addEventListener("click", function () {
      displayRandomShipPlacing(player);
    });
    div.appendChild(randomize);
    main.appendChild(div);
    _game__WEBPACK_IMPORTED_MODULE_0__.game.putRandomShips(player);
    var ships = _game__WEBPACK_IMPORTED_MODULE_0__.game.startingShips;
    main.insertAdjacentHTML("beforeend", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(player.gameBoard, "".concat(player.name, " board"), "PLAYER1", true));
  };

  var displayCustomShipPlacing = function displayCustomShipPlacing(player, index) {
    main.innerHTML = "";
    main.appendChild(goToMain);
    var ships = _game__WEBPACK_IMPORTED_MODULE_0__.game.startingShips;
    main.insertAdjacentHTML("beforeend", _markups__WEBPACK_IMPORTED_MODULE_1__.markups.getGameboard(player.gameBoard, "".concat(player.name, " board"), "PLAYER1", true));
    var gameboard = document.querySelector(".gameboard_container");

    if (index >= _game__WEBPACK_IMPORTED_MODULE_0__.game.startingShips.length) {
      var btn = document.createElement("button");
      btn.classList.add("main-btn");
      btn.textContent = "START";
      main.insertBefore(btn, gameboard.parentElement);
      btn.addEventListener("click", function () {
        displayBoards();
      });
      gameboard.classList.remove("cursor-pointer");
    } else {
      var hoverArray = [];
      var className;
      var ableToPlace;
      var axis;
      var curr = ships[index];
      var infoText = document.createElement("p");
      infoText.textContent = "Place your ".concat(curr.name);
      var div = document.createElement("div");
      div.classList.add("infoText__wrapper");
      div.appendChild(infoText);
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
      div.appendChild(label);
      main.insertBefore(div, gameboard.parentElement);
      gameboard.classList.add("cursor-pointer");
      gameboard.addEventListener("mouseover", function (e) {
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
      gameboard.addEventListener("click", function (e) {
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
    header.classList.add("modal__header");
    header.textContent = "".concat(_game__WEBPACK_IMPORTED_MODULE_0__.game.computer.gameBoard.isAllSunk() ? _game__WEBPACK_IMPORTED_MODULE_0__.game.player.name : _game__WEBPACK_IMPORTED_MODULE_0__.game.computer.name, " has won!");
    modal.appendChild(header);
    var btn = document.createElement("button");
    btn.textContent = "PLAY AGAIN";
    btn.classList.add("main-btn");
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-color: #0c0a3e;\n  color: #eee;\n  font-family: \"Roboto\", sans-serif;\n  min-height: 100vh;\n  max-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n  max-width: 100vw;\n}\nheader,\nfooter {\n  height: 80px;\n  background-color: #383663;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  gap: 20px;\n  width: 100%;\n}\nmain {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n  align-items: center;\n  min-height: calc(100vh - 160px);\n  flex-direction: column;\n  padding-top: 20px;\n  padding-bottom: 20px;\n}\n.gameboards {\n  display: flex;\n  gap: 20px;\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.gameboard_container {\n  width: 550px;\n  height: 550px;\n}\n.gameboard_line {\n  width: 100%;\n  display: flex;\n  height: 10%;\n  border-collapse: collapse;\n}\n.gameboard_cell {\n  background-color: white;\n  height: 100%;\n  width: 100%;\n  border: 1px solid black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship,\n.placeship {\n  background: green;\n}\n.colliding {\n  background: rgb(187, 59, 59);\n}\n.hit::after {\n  position: absolute;\n  content: \"\";\n  background-color: red;\n  width: 15px;\n  height: 15px;\n  border-radius: 8px;\n  pointer-events: none;\n}\n.enemy-ship-hit {\n  background-color: rgb(65, 20, 20);\n}\nfooter {\n  margin-top: auto;\n}\nfooter > a > img:hover {\n  filter: opacity(0.7);\n}\n.modal__container {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s ease;\n}\n.show-modal {\n  opacity: 1;\n  pointer-events: auto;\n}\n.para {\n  text-align: center;\n}\n.modal {\n  background-color: #fff;\n  width: 600px;\n  max-width: 100%;\n  padding: 15px;\n  border-radius: 5px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  z-index: 1;\n}\n.gamemodes__wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n}\n.gamemodes__wrapper > p,\n.para {\n  font-size: 2.5rem;\n  font-weight: 700;\n}\n\n.gamemodes__wrapper > button {\n  padding: 20px;\n  font-weight: 700;\n  font-size: 2rem;\n}\nbutton:hover:not(:disabled) {\n  opacity: 0.8;\n}\nbutton {\n  border: none;\n  color: #eee;\n  background-color: #383663;\n  cursor: pointer;\n  border: 1px solid #eee;\n  transition: 0.3s ease;\n  border-radius: 15px;\n}\nbutton:disabled {\n  cursor: not-allowed;\n  background-color: gray;\n}\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\nform > label {\n  font-size: 2rem;\n  font-weight: 700;\n}\nform > input {\n  font-size: 2rem;\n}\nform > button {\n  padding: 10px 20px;\n  font-size: 1.5rem;\n  font-weight: 700;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n\n.main-btn {\n  font-size: 1.25rem;\n  font-weight: 700;\n  padding: 10px 20px;\n  min-width: 200px;\n}\n\n.infoText__wrapper {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  justify-content: center;\n}\n\n.infoText__wrapper > p {\n  font-size: 1.25rem;\n  font-weight: 700;\n}\n\n.buttons__wrapper {\n  display: flex;\n  gap: 10px;\n}\n.toggle {\n  --width: 80px;\n  --height: calc(var(--width) / 3);\n\n  position: relative;\n  display: inline-block;\n  width: var(--width);\n  height: 30px;\n  color: white;\n  background-color: #383663;\n  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);\n  cursor: pointer;\n}\n\n.toggle input {\n  display: none;\n}\n\n.toggle .labels {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  font-size: 16px;\n  transition: all 0.4s ease-in-out;\n  overflow: hidden;\n}\n\n.toggle .labels::after {\n  content: attr(data-off);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle .labels::before {\n  content: attr(data-on);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: calc(var(--width) * -1);\n  height: 100%;\n  width: 100%;\n  text-align: center;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle input:checked ~ .labels::after {\n  transform: translateX(var(--width));\n}\n\n.toggle input:checked ~ .labels::before {\n  transform: translateX(var(--width));\n}\n.modal__header {\n  color: #0c0a3e;\n  font-size: 2rem;\n  font-weight: 700;\n}\n@media all and (max-width: 1200px) {\n  .gameboards {\n    flex-direction: column;\n  }\n}\n@media all and (max-width: 800px) {\n  h1,\n  h2 {\n    font-size: 1.25rem;\n  }\n\n  header,\n  footer {\n    height: 50px;\n  }\n  main {\n    padding-top: 20px;\n    min-height: calc(100vh - 100px);\n  }\n}\n@media all and (max-width: 580px) {\n  .gamemodes__wrapper > p {\n    font-size: 2rem;\n  }\n  .gamemodes__wrapper > button,\n  .modal__header,\n  form > input,\n  .gamemodes__wrapper > button,\n  form > label,\n  .para {\n    font-size: 1.5rem;\n  }\n  .main-btn,\n  .infoText__wrapper > p {\n    font-size: 1rem;\n  }\n  .main-btn {\n    min-width: 150px;\n  }\n  .gameboard_container {\n    width: 90vw;\n    height: 90vw;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AACA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;AACA;EACE,yBAAyB;EACzB,WAAW;EACX,iCAAiC;EACjC,iBAAiB;EACjB,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;EACjB,gBAAgB;AAClB;AACA;;EAEE,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,eAAe;EACf,SAAS;EACT,WAAW;AACb;AACA;EACE,aAAa;EACb,SAAS;EACT,uBAAuB;EACvB,mBAAmB;EACnB,+BAA+B;EAC/B,sBAAsB;EACtB,iBAAiB;EACjB,oBAAoB;AACtB;AACA;EACE,aAAa;EACb,SAAS;AACX;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;EACT,eAAe;AACjB;AACA;EACE,YAAY;EACZ,aAAa;AACf;AACA;EACE,WAAW;EACX,aAAa;EACb,WAAW;EACX,yBAAyB;AAC3B;AACA;EACE,uBAAuB;EACvB,YAAY;EACZ,WAAW;EACX,uBAAuB;EACvB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;AACA;;EAEE,iBAAiB;AACnB;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,qBAAqB;EACrB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;AACtB;AACA;EACE,iCAAiC;AACnC;AACA;EACE,gBAAgB;AAClB;AACA;EACE,oBAAoB;AACtB;AACA;EACE,oCAAoC;EACpC,eAAe;EACf,UAAU;EACV,MAAM;EACN,OAAO;EACP,YAAY;EACZ,aAAa;EACb,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;EACV,oBAAoB;EACpB,6BAA6B;AAC/B;AACA;EACE,UAAU;EACV,oBAAoB;AACtB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,sBAAsB;EACtB,YAAY;EACZ,eAAe;EACf,aAAa;EACb,kBAAkB;EAClB,wCAAwC;EACxC,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,SAAS;EACT,UAAU;AACZ;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;AACA;;EAEE,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,eAAe;AACjB;AACA;EACE,YAAY;AACd;AACA;EACE,YAAY;EACZ,WAAW;EACX,yBAAyB;EACzB,eAAe;EACf,sBAAsB;EACtB,qBAAqB;EACrB,mBAAmB;AACrB;AACA;EACE,mBAAmB;EACnB,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;AACX;AACA;EACE,eAAe;EACf,gBAAgB;AAClB;AACA;EACE,eAAe;AACjB;AACA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;AAClB;AACA;EACE,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,SAAS;AACX;AACA;EACE,aAAa;EACb,gCAAgC;;EAEhC,kBAAkB;EAClB,qBAAqB;EACrB,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,yBAAyB;EACzB,0CAA0C;EAC1C,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,eAAe;EACf,gCAAgC;EAChC,gBAAgB;AAClB;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,MAAM;EACN,OAAO;EACP,YAAY;EACZ,WAAW;EACX,gCAAgC;AAClC;;AAEA;EACE,sBAAsB;EACtB,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,MAAM;EACN,6BAA6B;EAC7B,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,gCAAgC;AAClC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,mCAAmC;AACrC;AACA;EACE,cAAc;EACd,eAAe;EACf,gBAAgB;AAClB;AACA;EACE;IACE,sBAAsB;EACxB;AACF;AACA;EACE;;IAEE,kBAAkB;EACpB;;EAEA;;IAEE,YAAY;EACd;EACA;IACE,iBAAiB;IACjB,+BAA+B;EACjC;AACF;AACA;EACE;IACE,eAAe;EACjB;EACA;;;;;;IAME,iBAAiB;EACnB;EACA;;IAEE,eAAe;EACjB;EACA;IACE,gBAAgB;EAClB;EACA;IACE,WAAW;IACX,YAAY;EACd;AACF","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap\");\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-color: #0c0a3e;\n  color: #eee;\n  font-family: \"Roboto\", sans-serif;\n  min-height: 100vh;\n  max-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n  max-width: 100vw;\n}\nheader,\nfooter {\n  height: 80px;\n  background-color: #383663;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  gap: 20px;\n  width: 100%;\n}\nmain {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n  align-items: center;\n  min-height: calc(100vh - 160px);\n  flex-direction: column;\n  padding-top: 20px;\n  padding-bottom: 20px;\n}\n.gameboards {\n  display: flex;\n  gap: 20px;\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.gameboard_container {\n  width: 550px;\n  height: 550px;\n}\n.gameboard_line {\n  width: 100%;\n  display: flex;\n  height: 10%;\n  border-collapse: collapse;\n}\n.gameboard_cell {\n  background-color: white;\n  height: 100%;\n  width: 100%;\n  border: 1px solid black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship,\n.placeship {\n  background: green;\n}\n.colliding {\n  background: rgb(187, 59, 59);\n}\n.hit::after {\n  position: absolute;\n  content: \"\";\n  background-color: red;\n  width: 15px;\n  height: 15px;\n  border-radius: 8px;\n  pointer-events: none;\n}\n.enemy-ship-hit {\n  background-color: rgb(65, 20, 20);\n}\nfooter {\n  margin-top: auto;\n}\nfooter > a > img:hover {\n  filter: opacity(0.7);\n}\n.modal__container {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s ease;\n}\n.show-modal {\n  opacity: 1;\n  pointer-events: auto;\n}\n.para {\n  text-align: center;\n}\n.modal {\n  background-color: #fff;\n  width: 600px;\n  max-width: 100%;\n  padding: 15px;\n  border-radius: 5px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  z-index: 1;\n}\n.gamemodes__wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n}\n.gamemodes__wrapper > p,\n.para {\n  font-size: 2.5rem;\n  font-weight: 700;\n}\n\n.gamemodes__wrapper > button {\n  padding: 20px;\n  font-weight: 700;\n  font-size: 2rem;\n}\nbutton:hover:not(:disabled) {\n  opacity: 0.8;\n}\nbutton {\n  border: none;\n  color: #eee;\n  background-color: #383663;\n  cursor: pointer;\n  border: 1px solid #eee;\n  transition: 0.3s ease;\n  border-radius: 15px;\n}\nbutton:disabled {\n  cursor: not-allowed;\n  background-color: gray;\n}\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\nform > label {\n  font-size: 2rem;\n  font-weight: 700;\n}\nform > input {\n  font-size: 2rem;\n}\nform > button {\n  padding: 10px 20px;\n  font-size: 1.5rem;\n  font-weight: 700;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n\n.main-btn {\n  font-size: 1.25rem;\n  font-weight: 700;\n  padding: 10px 20px;\n  min-width: 200px;\n}\n\n.infoText__wrapper {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  justify-content: center;\n}\n\n.infoText__wrapper > p {\n  font-size: 1.25rem;\n  font-weight: 700;\n}\n\n.buttons__wrapper {\n  display: flex;\n  gap: 10px;\n}\n.toggle {\n  --width: 80px;\n  --height: calc(var(--width) / 3);\n\n  position: relative;\n  display: inline-block;\n  width: var(--width);\n  height: 30px;\n  color: white;\n  background-color: #383663;\n  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);\n  cursor: pointer;\n}\n\n.toggle input {\n  display: none;\n}\n\n.toggle .labels {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  font-size: 16px;\n  transition: all 0.4s ease-in-out;\n  overflow: hidden;\n}\n\n.toggle .labels::after {\n  content: attr(data-off);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle .labels::before {\n  content: attr(data-on);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: calc(var(--width) * -1);\n  height: 100%;\n  width: 100%;\n  text-align: center;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle input:checked ~ .labels::after {\n  transform: translateX(var(--width));\n}\n\n.toggle input:checked ~ .labels::before {\n  transform: translateX(var(--width));\n}\n.modal__header {\n  color: #0c0a3e;\n  font-size: 2rem;\n  font-weight: 700;\n}\n@media all and (max-width: 1200px) {\n  .gameboards {\n    flex-direction: column;\n  }\n}\n@media all and (max-width: 800px) {\n  h1,\n  h2 {\n    font-size: 1.25rem;\n  }\n\n  header,\n  footer {\n    height: 50px;\n  }\n  main {\n    padding-top: 20px;\n    min-height: calc(100vh - 100px);\n  }\n}\n@media all and (max-width: 580px) {\n  .gamemodes__wrapper > p {\n    font-size: 2rem;\n  }\n  .gamemodes__wrapper > button,\n  .modal__header,\n  form > input,\n  .gamemodes__wrapper > button,\n  form > label,\n  .para {\n    font-size: 1.5rem;\n  }\n  .main-btn,\n  .infoText__wrapper > p {\n    font-size: 1rem;\n  }\n  .main-btn {\n    min-width: 150px;\n  }\n  .gameboard_container {\n    width: 90vw;\n    height: 90vw;\n  }\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFdBQVcsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLEtBQUssS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsTUFBTSxLQUFLLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsTUFBTSxNQUFNLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsTUFBTSxLQUFLLFVBQVUsWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxLQUFLLEtBQUssVUFBVSxZQUFZLFdBQVcsS0FBSyxNQUFNLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxLQUFLLEtBQUssVUFBVSxZQUFZLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsS0FBSyxLQUFL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Ozs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUNmZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0pBO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7Ozs7OztVQ2pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFFQUMsMENBQUEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvYWkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbWFya3Vwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBBSSA9ICgoKSA9PiB7XG4gIGNvbnN0IEZpbHRlclVuU3Vua0NlbGxzID0gKGFycmF5LCBlbmVteSkgPT5cbiAgICBhcnJheS5maWx0ZXIoKGNlbGwpID0+IHtcbiAgICAgIGlmIChlbmVteS5nYW1lQm9hcmQuaXNTaGlwKGNlbGwpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJTaGlwID0gZW5lbXkuZ2FtZUJvYXJkLnNoaXBzLmZpbmQoKHNoaXApID0+XG4gICAgICAgICAgc2hpcC5sb2NhdGlvbi5pbmNsdWRlcyhjZWxsKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gIWN1cnJTaGlwLmlzU3VuaygpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIGNvbnN0IERldGVjdFNoaXBzID0gKHVuc3Vua0NlbGxzKSA9PiB7XG4gICAgY29uc3QgZGV0ZWN0ZWQgPSB1bnN1bmtDZWxscy5maWx0ZXIoXG4gICAgICAoY2VsbCwgaW5kZXgsIGFycmF5KSA9PlxuICAgICAgICAoYXJyYXkuaW5jbHVkZXMoY2VsbCArIDEpICYmIGNlbGwgJSAxMCAhPT0gOSkgfHxcbiAgICAgICAgKGFycmF5LmluY2x1ZGVzKGNlbGwgLSAxKSAmJiBjZWxsICUgMTAgIT09IDApIHx8XG4gICAgICAgIChhcnJheS5pbmNsdWRlcyhjZWxsICsgMTApICYmIGNlbGwgKyAxMCA8IDEwMCkgfHxcbiAgICAgICAgKGFycmF5LmluY2x1ZGVzKGNlbGwgLSAxMCkgJiYgY2VsbCAtIDEwID4gMClcbiAgICApO1xuICAgIHJldHVybiBkZXRlY3RlZDtcbiAgfTtcblxuICBjb25zdCBBdHRhY2tEZXRlY3RlZFNoaXAgPSAoZGV0ZWN0ZWRTaGlwcywgZW1wdHlDZWxscykgPT4ge1xuICAgIGNvbnN0IGF4aXMgPSBkZXRlY3RlZFNoaXBzWzFdIC0gZGV0ZWN0ZWRTaGlwc1swXSA9PT0gMSA/IFwieFwiIDogXCJ5XCI7XG4gICAgY29uc3QgYXZhaWxhYmxlU2hvdHMgPSBbXTtcblxuICAgIGlmIChheGlzID09PSBcInhcIikge1xuICAgICAgaWYgKGRldGVjdGVkU2hpcHNbMF0gJSAxMCAhPT0gMCkge1xuICAgICAgICBhdmFpbGFibGVTaG90cy5wdXNoKGRldGVjdGVkU2hpcHNbMF0gLSAxKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJpZ2h0U2lkZSA9IGRldGVjdGVkU2hpcHMuZmluZChcbiAgICAgICAgKGNlbGwsIGluZGV4LCBhcnJheSkgPT4gIWFycmF5LmluY2x1ZGVzKGNlbGwgKyAxKVxuICAgICAgKTtcbiAgICAgIGlmIChcbiAgICAgICAgTWF0aC5mbG9vcihkZXRlY3RlZFNoaXBzWzBdIC8gMTApID09PSBNYXRoLmZsb29yKChyaWdodFNpZGUgKyAxKSAvIDEwKVxuICAgICAgKSB7XG4gICAgICAgIGF2YWlsYWJsZVNob3RzLnB1c2gocmlnaHRTaWRlICsgMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGFib3ZlID0gZGV0ZWN0ZWRTaGlwc1swXSAtIDEwO1xuICAgICAgaWYgKGFib3ZlID4gMCkge1xuICAgICAgICBhdmFpbGFibGVTaG90cy5wdXNoKGFib3ZlKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGJlbG93ID0gZGV0ZWN0ZWRTaGlwcy5maW5kKFxuICAgICAgICAoY2VsbCwgaW5kZXgsIGFycmF5KSA9PiAhYXJyYXkuaW5jbHVkZXMoY2VsbCArIDEwKVxuICAgICAgKTtcbiAgICAgIGlmIChiZWxvdyArIDEwIDwgMTAwKSB7XG4gICAgICAgIGF2YWlsYWJsZVNob3RzLnB1c2goYmVsb3cgKyAxMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZmlsdGVyZWRBdmFpbGFibGVTaG90cyA9IGF2YWlsYWJsZVNob3RzLmZpbHRlcigoc2hvdCkgPT5cbiAgICAgIGVtcHR5Q2VsbHMuaW5jbHVkZXMoc2hvdClcbiAgICApO1xuICAgIGlmIChmaWx0ZXJlZEF2YWlsYWJsZVNob3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBmaWx0ZXJlZEF2YWlsYWJsZVNob3RzW1xuICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmaWx0ZXJlZEF2YWlsYWJsZVNob3RzLmxlbmd0aClcbiAgICAgIF07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IEF0dGFja1NvbG9IaXQgPSAoaGl0Q2VsbHMsIGVtcHR5Q2VsbHMpID0+IHtcbiAgICBjb25zdCBmaXJzdFNob3QgPSBoaXRDZWxsc1swXTtcbiAgICBsZXQgYXZhaWxhYmxlU2hvdHMgPSBbXTtcblxuICAgIGNvbnN0IGxlZnRTaG90ID0gaGl0Q2VsbHNbMF0gLSAxO1xuICAgIGlmIChNYXRoLmZsb29yKGZpcnN0U2hvdCAvIDEwKSA9PT0gTWF0aC5mbG9vcihsZWZ0U2hvdCAvIDEwKSkge1xuICAgICAgYXZhaWxhYmxlU2hvdHMucHVzaChsZWZ0U2hvdCk7XG4gICAgfVxuXG4gICAgY29uc3QgcmlnaHRTaG90ID0gaGl0Q2VsbHNbMF0gKyAxO1xuICAgIGlmIChNYXRoLmZsb29yKGZpcnN0U2hvdCAvIDEwKSA9PT0gTWF0aC5mbG9vcihyaWdodFNob3QgLyAxMCkpIHtcbiAgICAgIGF2YWlsYWJsZVNob3RzLnB1c2gocmlnaHRTaG90KTtcbiAgICB9XG5cbiAgICBjb25zdCBhYm92ZVNob3QgPSBmaXJzdFNob3QgLSAxMDtcbiAgICBpZiAoYWJvdmVTaG90ID4gMCkge1xuICAgICAgYXZhaWxhYmxlU2hvdHMucHVzaChhYm92ZVNob3QpO1xuICAgIH1cblxuICAgIGNvbnN0IGJlbG93U2hvdCA9IGZpcnN0U2hvdCArIDEwO1xuICAgIGlmIChiZWxvd1Nob3QgPCAxMDApIHtcbiAgICAgIGF2YWlsYWJsZVNob3RzLnB1c2goYmVsb3dTaG90KTtcbiAgICB9XG5cbiAgICBhdmFpbGFibGVTaG90cyA9IGF2YWlsYWJsZVNob3RzLmZpbHRlcigoc2hvdCkgPT4gZW1wdHlDZWxscy5pbmNsdWRlcyhzaG90KSk7XG4gICAgaWYgKGF2YWlsYWJsZVNob3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBhdmFpbGFibGVTaG90c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGVTaG90cy5sZW5ndGgpXTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgQXR0YWNrUmFuZG9tID0gKGVtcHR5Q2VsbHMsIGhpdENlbGxzKSA9PiB7XG4gICAgbGV0IGJhZFNob3RzID0gW107XG4gICAgaGl0Q2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgYmFkU2hvdHMucHVzaChjZWxsICsgMSk7XG4gICAgICBiYWRTaG90cy5wdXNoKGNlbGwgLSAxKTtcbiAgICAgIGJhZFNob3RzLnB1c2goY2VsbCArIDEwKTtcbiAgICAgIGJhZFNob3RzLnB1c2goY2VsbCAtIDEwKTtcbiAgICB9KTtcbiAgICBiYWRTaG90cyA9IGJhZFNob3RzLmZpbHRlcihcbiAgICAgIChjZWxsLCBpbmRleCwgYXJyYXkpID0+IGFycmF5LmluZGV4T2YoY2VsbCkgPT09IGluZGV4XG4gICAgKTtcbiAgICBjb25zdCBhdmFpbGFibGVTaG90cyA9IGVtcHR5Q2VsbHMuZmlsdGVyKFxuICAgICAgKGNlbGwpID0+ICFiYWRTaG90cy5pbmNsdWRlcyhjZWxsKVxuICAgICk7XG4gICAgaWYgKGF2YWlsYWJsZVNob3RzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBhdmFpbGFibGVTaG90c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGVTaG90cy5sZW5ndGgpXTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgQXR0YWNrID0gKGVuZW15KSA9PiB7XG4gICAgY29uc3QgZW1wdHlDZWxscyA9IFtdO1xuICAgIGNvbnN0IGhpdENlbGxzID0gW107XG4gICAgZW5lbXkuZ2FtZUJvYXJkLmJvYXJkLmZvckVhY2goKGhpdCwgaW5kZXgpID0+XG4gICAgICBoaXQgPyBoaXRDZWxscy5wdXNoKGluZGV4KSA6IGVtcHR5Q2VsbHMucHVzaChpbmRleClcbiAgICApO1xuXG4gICAgY29uc3QgdW5zdW5rQ2VsbHMgPSBGaWx0ZXJVblN1bmtDZWxscyhoaXRDZWxscywgZW5lbXkpO1xuICAgIGNvbnN0IGRldGVjdGVkU2hpcHMgPSBEZXRlY3RTaGlwcyh1bnN1bmtDZWxscyk7XG5cbiAgICBpZiAoZGV0ZWN0ZWRTaGlwcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBhdHRhY2sgPSBBdHRhY2tEZXRlY3RlZFNoaXAoZGV0ZWN0ZWRTaGlwcywgZW1wdHlDZWxscyk7XG4gICAgICBpZiAoYXR0YWNrKSByZXR1cm4gYXR0YWNrO1xuICAgIH1cbiAgICBpZiAoaGl0Q2VsbHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYXR0YWNrID0gQXR0YWNrU29sb0hpdCh1bnN1bmtDZWxscywgZW1wdHlDZWxscyk7XG4gICAgICBpZiAoYXR0YWNrKSByZXR1cm4gYXR0YWNrO1xuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjayA9IEF0dGFja1JhbmRvbShlbXB0eUNlbGxzLCBoaXRDZWxscyk7XG4gICAgaWYgKGF0dGFjaykgcmV0dXJuIGF0dGFjaztcbiAgICByZXR1cm4gZW1wdHlDZWxsc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBlbXB0eUNlbGxzLmxlbmd0aCldO1xuICB9O1xuXG4gIHJldHVybiB7IEF0dGFjayB9O1xufSkoKTtcbmV4cG9ydCB7IEFJIH07XG4iLCJpbXBvcnQgeyBnYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgbWFya3VwcyB9IGZyb20gXCIuL21hcmt1cHNcIjtcbmltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBBSSB9IGZyb20gXCIuL2FpXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5jb25zdCBkb20gPSAoKCkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiRWx2aW5hc1wiKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiQUlcIik7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWFpblwiKTtcbiAgY29uc3QgbW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsLWNvbnRhaW5lclwiKTtcbiAgY29uc3QgZ29Ub01haW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBnb1RvTWFpbi5jbGFzc0xpc3QuYWRkKFwibWFpbi1idG5cIik7XG4gIGdvVG9NYWluLnRleHRDb250ZW50ID0gXCJHTyBUTyBNQUlOIFNDUkVFTlwiO1xuICBnb1RvTWFpbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGluaXQoKTtcbiAgfSk7XG4gIGxldCBwbGF5ZXIxQm9hcmQ7XG4gIGxldCBwbGF5ZXIyQm9hcmQ7XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBnYW1lLmluaXQocGxheWVyLCBjb21wdXRlcik7XG4gICAgZGlzcGxheUdhbWVNb2RlcygpO1xuICB9O1xuICBjb25zdCBkaXNwbGF5Qm9hcmRzID0gKCkgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcblxuICAgIG1haW4uYXBwZW5kQ2hpbGQoZ29Ub01haW4pO1xuICAgIGNvbnN0IGdhbWVib2FyZHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGdhbWVib2FyZHMuY2xhc3NMaXN0LmFkZChcImdhbWVib2FyZHNcIik7XG4gICAgZ2FtZWJvYXJkcy5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICBcImFmdGVyYmVnaW5cIixcbiAgICAgIG1hcmt1cHMuZ2V0R2FtZWJvYXJkKFxuICAgICAgICBnYW1lLnBsYXllci5nYW1lQm9hcmQsXG4gICAgICAgIGAke2dhbWUucGxheWVyLm5hbWV9IGJvYXJkYCxcbiAgICAgICAgXCJQTEFZRVIxXCIsXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICApO1xuICAgIGdhbWVib2FyZHMuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgXCJiZWZvcmVFbmRcIixcbiAgICAgIG1hcmt1cHMuZ2V0R2FtZWJvYXJkKFxuICAgICAgICBnYW1lLmNvbXB1dGVyLmdhbWVCb2FyZCxcbiAgICAgICAgYCR7Z2FtZS5jb21wdXRlci5uYW1lfSBib2FyZGAsXG4gICAgICAgIFwiUExBWUVSMlwiLFxuICAgICAgICBmYWxzZVxuICAgICAgKVxuICAgICk7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChnYW1lYm9hcmRzKTtcbiAgICBwbGF5ZXIxQm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlBMQVlFUjFcIik7XG4gICAgcGxheWVyMkJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJQTEFZRVIyXCIpO1xuICAgIHBsYXllcjJCb2FyZC5jbGFzc0xpc3QuYWRkKFwiY3Vyc29yLXBvaW50ZXJcIik7XG4gICAgcGxheWVyMkJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICAhZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpICYmXG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImdhbWVib2FyZF9jZWxsXCIpXG4gICAgICApIHtcbiAgICAgICAgZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pbmRleCkpO1xuICAgICAgICBkaXNwbGF5Qm9hcmRzKCk7XG4gICAgICAgIGlmIChnYW1lLmNvbXB1dGVyLmdhbWVCb2FyZC5pc0FsbFN1bmsoKSkge1xuICAgICAgICAgIGdhbWVFbmRNb2RhbCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhdHRhY2sgPSBBSS5BdHRhY2soZ2FtZS5wbGF5ZXIpO1xuICAgICAgICBnYW1lLnBsYXllci5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhhdHRhY2spO1xuICAgICAgICBpZiAoZ2FtZS5wbGF5ZXIuZ2FtZUJvYXJkLmlzQWxsU3VuaygpKSB7XG4gICAgICAgICAgZ2FtZUVuZE1vZGFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgZGlzcGxheUJvYXJkcygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlHYW1lTW9kZXMgPSAoKSA9PiB7XG4gICAgbWFpbi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImdhbWVtb2Rlc19fd3JhcHBlclwiKTtcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIlNFTEVDVCBHQU1FIE1PREVcIjtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGhlYWRlcik7XG5cbiAgICBjb25zdCBidG4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4xLnRleHRDb250ZW50ID0gXCJQTEFZRVIgVlMgQUlcIjtcbiAgICBidG4xLmNsYXNzTGlzdC5hZGQoXCJidG5cIik7XG4gICAgYnRuMS5jbGFzc0xpc3QuYWRkKFwiYnRuLXByaW1hcnlcIik7XG5cbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGJ0bjEpO1xuICAgIGJ0bjEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGRpc3BsYXlQbGF5ZXJWU0FJRm9ybSgpO1xuICAgIH0pO1xuICAgIGNvbnN0IGJ0bjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bjIudGV4dENvbnRlbnQgPSBcIlBMQVlFUiBWUyBQTEFZRVJcIjtcbiAgICBidG4yLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGJ0bjIpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQod3JhcHBlcik7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVJhbmRvbU9yQ3VzdG9tID0gKCkgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBtYWluLmFwcGVuZENoaWxkKGdvVG9NYWluKTtcblxuICAgIGNvbnN0IGJ0bjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGNvbnN0IHBhcmEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBwYXJhLmNsYXNzTGlzdC5hZGQoXCJwYXJhXCIpO1xuICAgIHBhcmEudGV4dENvbnRlbnQgPSBcIkhPVyBETyBZT1UgV0FOVCBUTyBQTEFDRSBTSElQUz9cIjtcbiAgICBidG4xLnRleHRDb250ZW50ID0gXCJSQU5ET01cIjtcbiAgICBidG4xLmNsYXNzTGlzdC5hZGQoXCJtYWluLWJ0blwiKTtcbiAgICBidG4xLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBkaXNwbGF5UmFuZG9tU2hpcFBsYWNpbmcoZ2FtZS5wbGF5ZXIpO1xuICAgIH0pO1xuICAgIGNvbnN0IGJ0bjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bjIudGV4dENvbnRlbnQgPSBcIkNVU1RPTVwiO1xuICAgIGJ0bjIuY2xhc3NMaXN0LmFkZChcIm1haW4tYnRuXCIpO1xuICAgIGJ0bjIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGRpc3BsYXlDdXN0b21TaGlwUGxhY2luZyhnYW1lLnBsYXllciwgMCk7XG4gICAgfSk7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChwYXJhKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGJ0bjEpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoYnRuMik7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVBsYXllclZTQUlGb3JtID0gKCkgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBtYWluLmFwcGVuZENoaWxkKGdvVG9NYWluKTtcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJmb3JtX193cmFwcGVyXCIpO1xuXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpO1xuXG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSBcIkVOVEVSIFlPVVIgTkFNRTpcIjtcbiAgICBsYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJuYW1lXCIpO1xuXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQudHlwZSA9IFwidGV4dFwiO1xuICAgIGlucHV0Lm5hbWUgPSBcIm5hbWVcIjtcbiAgICBpbnB1dC5pZCA9IFwibmFtZVwiO1xuXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4udGV4dENvbnRlbnQgPSBcIlNUQVJUXCI7XG4gICAgaWYgKGlucHV0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCkgPT4ge1xuICAgICAgaWYgKGlucHV0LnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGdhbWUucGxheWVyLm5hbWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIGRpc3BsYXlSYW5kb21PckN1c3RvbSgpO1xuICAgIH0pO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGZvcm0pO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQod3JhcHBlcik7XG4gIH07XG5cbiAgY29uc3QgZGlzcGxheVJhbmRvbVNoaXBQbGFjaW5nID0gKHBsYXllcikgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBtYWluLmFwcGVuZENoaWxkKGdvVG9NYWluKTtcblxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJidXR0b25zX193cmFwcGVyXCIpO1xuXG4gICAgY29uc3Qgc3RhcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHN0YXJ0LnRleHRDb250ZW50ID0gXCJTVEFSVFwiO1xuICAgIHN0YXJ0LmNsYXNzTGlzdC5hZGQoXCJtYWluLWJ0blwiKTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoc3RhcnQpO1xuICAgIHN0YXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBkaXNwbGF5Qm9hcmRzKCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCByYW5kb21pemUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHJhbmRvbWl6ZS50ZXh0Q29udGVudCA9IFwiUkFORE9NSVpFXCI7XG4gICAgcmFuZG9taXplLmNsYXNzTGlzdC5hZGQoXCJtYWluLWJ0blwiKTtcbiAgICByYW5kb21pemUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGRpc3BsYXlSYW5kb21TaGlwUGxhY2luZyhwbGF5ZXIpO1xuICAgIH0pO1xuICAgIGRpdi5hcHBlbmRDaGlsZChyYW5kb21pemUpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoZGl2KTtcblxuICAgIGdhbWUucHV0UmFuZG9tU2hpcHMocGxheWVyKTtcbiAgICBjb25zdCBzaGlwcyA9IGdhbWUuc3RhcnRpbmdTaGlwcztcbiAgICBtYWluLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgIFwiYmVmb3JlZW5kXCIsXG4gICAgICBtYXJrdXBzLmdldEdhbWVib2FyZChcbiAgICAgICAgcGxheWVyLmdhbWVCb2FyZCxcbiAgICAgICAgYCR7cGxheWVyLm5hbWV9IGJvYXJkYCxcbiAgICAgICAgXCJQTEFZRVIxXCIsXG4gICAgICAgIHRydWVcbiAgICAgIClcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlDdXN0b21TaGlwUGxhY2luZyA9IChwbGF5ZXIsIGluZGV4KSA9PiB7XG4gICAgbWFpbi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoZ29Ub01haW4pO1xuXG4gICAgY29uc3Qgc2hpcHMgPSBnYW1lLnN0YXJ0aW5nU2hpcHM7XG4gICAgbWFpbi5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICBcImJlZm9yZWVuZFwiLFxuICAgICAgbWFya3Vwcy5nZXRHYW1lYm9hcmQoXG4gICAgICAgIHBsYXllci5nYW1lQm9hcmQsXG4gICAgICAgIGAke3BsYXllci5uYW1lfSBib2FyZGAsXG4gICAgICAgIFwiUExBWUVSMVwiLFxuICAgICAgICB0cnVlXG4gICAgICApXG4gICAgKTtcbiAgICBjb25zdCBnYW1lYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZF9jb250YWluZXJcIik7XG5cbiAgICBpZiAoaW5kZXggPj0gZ2FtZS5zdGFydGluZ1NoaXBzLmxlbmd0aCkge1xuICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwibWFpbi1idG5cIik7XG4gICAgICBidG4udGV4dENvbnRlbnQgPSBcIlNUQVJUXCI7XG4gICAgICBtYWluLmluc2VydEJlZm9yZShidG4sIGdhbWVib2FyZC5wYXJlbnRFbGVtZW50KTtcbiAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBkaXNwbGF5Qm9hcmRzKCk7XG4gICAgICB9KTtcblxuICAgICAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJzb3ItcG9pbnRlclwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGhvdmVyQXJyYXkgPSBbXTtcbiAgICAgIGxldCBjbGFzc05hbWU7XG4gICAgICBsZXQgYWJsZVRvUGxhY2U7XG4gICAgICBsZXQgYXhpcztcbiAgICAgIGxldCBjdXJyID0gc2hpcHNbaW5kZXhdO1xuICAgICAgY29uc3QgaW5mb1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgIGluZm9UZXh0LnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgJHtjdXJyLm5hbWV9YDtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBkaXYuY2xhc3NMaXN0LmFkZChcImluZm9UZXh0X193cmFwcGVyXCIpO1xuICAgICAgZGl2LmFwcGVuZENoaWxkKGluZm9UZXh0KTtcblxuICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICBsYWJlbC5jbGFzc0xpc3QuYWRkKFwidG9nZ2xlXCIpO1xuXG4gICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgIGlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcblxuICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKFwibGFiZWxzXCIpO1xuICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLW9uXCIsIFwiWVwiKTtcbiAgICAgIHNwYW4uc2V0QXR0cmlidXRlKFwiZGF0YS1vZmZcIiwgXCJYXCIpO1xuXG4gICAgICBsYWJlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG4gICAgICBsYWJlbC5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgICBtYWluLmluc2VydEJlZm9yZShkaXYsIGdhbWVib2FyZC5wYXJlbnRFbGVtZW50KTtcbiAgICAgIGdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKFwiY3Vyc29yLXBvaW50ZXJcIik7XG4gICAgICBnYW1lYm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICBob3ZlckFycmF5ID0gW107XG4gICAgICAgIGF4aXMgPSBpbnB1dC5jaGVja2VkID8gXCJ5XCIgOiBcInhcIjtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmluZGV4KTtcbiAgICAgICAgICBpIDxcbiAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pbmRleCkgK1xuICAgICAgICAgICAgKGlucHV0LmNoZWNrZWQgPyBjdXJyLmxlbmd0aCAqIDEwIDogY3Vyci5sZW5ndGgpO1xuICAgICAgICAgIGlucHV0LmNoZWNrZWQgPyAoaSArPSAxMCkgOiBpKytcbiAgICAgICAgKSB7XG4gICAgICAgICAgaG92ZXJBcnJheS5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIGFibGVUb1BsYWNlID1cbiAgICAgICAgICAhcGxheWVyLmdhbWVCb2FyZC5jaGVja0lmQ29sbGlkZWQoaG92ZXJBcnJheSkgJiZcbiAgICAgICAgICAhcGxheWVyLmdhbWVCb2FyZC5jaGVja0lmTXVsdGlwbGVMaW5lcyhob3ZlckFycmF5LCBheGlzKTtcbiAgICAgICAgY2xhc3NOYW1lID0gYWJsZVRvUGxhY2UgPyBcInBsYWNlc2hpcFwiIDogXCJjb2xsaWRpbmdcIjtcblxuICAgICAgICBob3ZlckFycmF5LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgY29uc3QgcXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pbmRleD0nJHtlbH0nXWApO1xuICAgICAgICAgIGlmIChxdWVyeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcXVlcnkuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGxldCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ2FtZWJvYXJkX2NlbGxcIik7XG4gICAgICBjZWxscyA9IEFycmF5LmZyb20oY2VsbHMpO1xuICAgICAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT5cbiAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoZSkgPT4ge1xuICAgICAgICAgIGhvdmVyQXJyYXkuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaW5kZXg9JyR7ZWx9J11gKTtcbiAgICAgICAgICAgIGlmIChxdWVyeSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBxdWVyeS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgZ2FtZWJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBpZiAoYWJsZVRvUGxhY2UgJiYgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZ2FtZWJvYXJkX2NlbGxcIikpIHtcbiAgICAgICAgICBwbGF5ZXIuZ2FtZUJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgICAgIE51bWJlcihlLnRhcmdldC5kYXRhc2V0LmluZGV4KSxcbiAgICAgICAgICAgIG5ldyBTaGlwKGN1cnIubmFtZSksXG4gICAgICAgICAgICBheGlzLFxuICAgICAgICAgICAgY3Vyci5sZW5ndGhcbiAgICAgICAgICApO1xuICAgICAgICAgIGRpc3BsYXlDdXN0b21TaGlwUGxhY2luZyhwbGF5ZXIsIGluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgZ2FtZUVuZE1vZGFsID0gKCkgPT4ge1xuICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJzaG93LW1vZGFsXCIpO1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwibW9kYWxcIik7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJtb2RhbF9faGVhZGVyXCIpO1xuICAgIGhlYWRlci50ZXh0Q29udGVudCA9IGAke1xuICAgICAgZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQuaXNBbGxTdW5rKClcbiAgICAgICAgPyBnYW1lLnBsYXllci5uYW1lXG4gICAgICAgIDogZ2FtZS5jb21wdXRlci5uYW1lXG4gICAgfSBoYXMgd29uIWA7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIGJ0bi50ZXh0Q29udGVudCA9IFwiUExBWSBBR0FJTlwiO1xuICAgIGJ0bi5jbGFzc0xpc3QuYWRkKFwibWFpbi1idG5cIik7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBnYW1lLmluaXQocGxheWVyLCBjb21wdXRlcik7XG4gICAgICBkaXNwbGF5UmFuZG9tT3JDdXN0b20oKTtcbiAgICAgIG1vZGFsQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93LW1vZGFsXCIpO1xuICAgICAgbW9kYWxDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9KTtcbiAgICBtb2RhbC5hcHBlbmRDaGlsZChidG4pO1xuICAgIG1vZGFsQ29udGFpbmVyLmFwcGVuZENoaWxkKG1vZGFsKTtcbiAgfTtcblxuICByZXR1cm4geyBpbml0IH07XG59KSgpO1xuZXhwb3J0IHsgZG9tIH07XG4iLCJpbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lQm9hcmRcIjtcbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcbmNvbnN0IGdhbWUgPSAoKCkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKFwiRWx2aW5hc1wiKTtcbiAgY29uc3QgY29tcHV0ZXIgPSBuZXcgUGxheWVyKFwiQUlcIik7XG4gIGNvbnN0IHN0YXJ0aW5nU2hpcHMgPSBbXG4gICAgeyBuYW1lOiBcIkNhcnJpZXJcIiwgbGVuZ3RoOiA1IH0sXG4gICAgeyBuYW1lOiBcIkJhdHRsZXNoaXBcIiwgbGVuZ3RoOiA0IH0sXG4gICAgeyBuYW1lOiBcIkNydWlzZXJcIiwgbGVuZ3RoOiAzIH0sXG4gICAgeyBuYW1lOiBcIlN1Ym1hcmluZVwiLCBsZW5ndGg6IDMgfSxcbiAgICB7IG5hbWU6IFwiRGVzdHJveWVyXCIsIGxlbmd0aDogMiB9LFxuICBdO1xuXG4gIGNvbnN0IHB1dFJhbmRvbVNoaXBzID0gKHBsYXllcikgPT4ge1xuICAgIHBsYXllci5nYW1lQm9hcmQuc2hpcHMgPSBbXTtcbiAgICBjb25zdCBheGxlcyA9IFtcInhcIiwgXCJ5XCJdO1xuICAgIGxldCBjdXJyQXhpcyA9IFwieFwiO1xuICAgIGxldCByYW5kb21OdW07XG4gICAgbGV0IGFycmF5ID0gW107XG4gICAgc3RhcnRpbmdTaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICB3aGlsZSAoXG4gICAgICAgIGFycmF5Lmxlbmd0aCA9PT0gMCB8fFxuICAgICAgICBwbGF5ZXIuZ2FtZUJvYXJkLmNoZWNrSWZDb2xsaWRlZChhcnJheSkgfHxcbiAgICAgICAgcGxheWVyLmdhbWVCb2FyZC5jaGVja0lmTXVsdGlwbGVMaW5lcyhhcnJheSwgY3VyckF4aXMpXG4gICAgICApIHtcbiAgICAgICAgYXJyYXkgPSBbXTtcbiAgICAgICAgY3VyckF4aXMgPSBheGxlc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBheGxlcy5sZW5ndGgpXTtcbiAgICAgICAgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwKTtcbiAgICAgICAgZm9yIChcbiAgICAgICAgICBsZXQgaSA9IHJhbmRvbU51bTtcbiAgICAgICAgICBpIDwgcmFuZG9tTnVtICsgKGN1cnJBeGlzID09PSBcInlcIiA/IHNoaXAubGVuZ3RoICogMTAgOiBzaGlwLmxlbmd0aCk7XG4gICAgICAgICAgY3VyckF4aXMgPT09IFwieVwiID8gKGkgKz0gMTApIDogaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGFycmF5LnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHBsYXllci5nYW1lQm9hcmQucGxhY2VTaGlwKFxuICAgICAgICByYW5kb21OdW0sXG4gICAgICAgIG5ldyBTaGlwKHNoaXAubmFtZSksXG4gICAgICAgIGN1cnJBeGlzLFxuICAgICAgICBzaGlwLmxlbmd0aFxuICAgICAgKTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIHBsYXllci5nYW1lQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gICAgY29tcHV0ZXIuZ2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICAgIHB1dFJhbmRvbVNoaXBzKGNvbXB1dGVyKTtcbiAgfTtcblxuICByZXR1cm4geyBpbml0LCBwbGF5ZXIsIGNvbXB1dGVyLCBzdGFydGluZ1NoaXBzLCBwdXRSYW5kb21TaGlwcyB9O1xufSkoKTtcbmV4cG9ydCB7IGdhbWUgfTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXBsdXNwbHVzICovXG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYm9hcmQgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgdGhpcy5ib2FyZC5wdXNoKGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwbGFjZVNoaXAoY29vcmQsIHNoaXAsIGF4aXMsIGxlbmd0aCkge1xuICAgIGxldCB0ZW1wID0gY29vcmQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgc2hpcC5sb2NhdGlvbi5wdXNoKHRlbXApO1xuICAgICAgdGVtcCArPSBheGlzLnRvTG93ZXJDYXNlKCkgPT09IFwieFwiID8gMSA6IDEwO1xuICAgIH1cbiAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKGNvb3JkKSB7XG4gICAgdGhpcy5ib2FyZFtjb29yZF0gPSB0cnVlO1xuICAgIGlmICh0aGlzLmlzU2hpcChjb29yZCkpIHtcbiAgICAgIHRoaXMuaGl0U2hpcChjb29yZCk7XG4gICAgfVxuICB9XG5cbiAgaXNTaGlwKGNvb3JkKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hpcHMuc29tZSgoeCkgPT4geC5sb2NhdGlvbi5pbmNsdWRlcyhjb29yZCkpO1xuICB9XG5cbiAgaGl0U2hpcChjb29yZCkge1xuICAgIHRoaXMuc2hpcHMuZmluZCgoeCkgPT4geC5sb2NhdGlvbi5pbmNsdWRlcyhjb29yZCkpLmhpdHMucHVzaChjb29yZCk7XG4gIH1cblxuICBpc0FsbFN1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hpcHMuZXZlcnkoKHgpID0+IHguaXNTdW5rKCkpO1xuICB9XG5cbiAgZ2V0U2hpcHNDb29yZHMoKSB7XG4gICAgY29uc3QgYXJyID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgaWYgKHRoaXMuaXNTaGlwKGkpKSBhcnIucHVzaChpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGNoZWNrSWZDb2xsaWRlZChjb29yZEFycmF5KSB7XG4gICAgcmV0dXJuIGNvb3JkQXJyYXkuc29tZSgoeCkgPT5cbiAgICAgIHRoaXMuc2hpcHMuc29tZSgoc2hpcCkgPT4gc2hpcC5sb2NhdGlvbi5pbmNsdWRlcyh4KSlcbiAgICApO1xuICB9XG5cbiAgY2hlY2tJZk11bHRpcGxlTGluZXMoY29vcmRBcnJheSwgYXhpcykge1xuICAgIGlmIChheGlzID09PSBcInhcIikge1xuICAgICAgY29uc3QgcmVzID0gTWF0aC5mbG9vcihjb29yZEFycmF5WzBdIC8gMTApO1xuICAgICAgcmV0dXJuICEoXG4gICAgICAgIGNvb3JkQXJyYXkubGVuZ3RoID09PVxuICAgICAgICBjb29yZEFycmF5LmZpbHRlcigoeCkgPT4gTWF0aC5mbG9vcih4IC8gMTApID09PSByZXMpLmxlbmd0aFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGF4aXMgPT09IFwieVwiKSB7XG4gICAgICBjb25zdCByZXMgPSBjb29yZEFycmF5WzBdICUgMTA7XG4gICAgICByZXR1cm4gIShcbiAgICAgICAgY29vcmRBcnJheS5sZW5ndGggPT09IGNvb3JkQXJyYXkuZmlsdGVyKCh4KSA9PiB4ICUgMTAgPT09IHJlcykubGVuZ3RoICYmXG4gICAgICAgICFjb29yZEFycmF5LnNvbWUoKHgpID0+IHggPiAxMDApXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XG4iLCJjb25zdCBtYXJrdXBzID0gKCgpID0+IHtcbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBjb25zdCBnZXRHYW1lYm9hcmQgPSAoZ2FtZWJvYXJkLCBoZWFkZXIsIGlkLCB0b1NlZVNoaXBzKSA9PiB7XG4gICAgbGV0IHNoaXBzQXJyYXkgPSBbXTtcbiAgICBjb3VudGVyID0gMDtcbiAgICBjb25zdCBnYW1lQm9hcmRDZWxscyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBnYW1lYm9hcmQuYm9hcmQubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEwKSB7XG4gICAgICBnYW1lQm9hcmRDZWxscy5wdXNoKGdhbWVib2FyZC5ib2FyZC5zbGljZShpLCBpICsgMTApKTtcbiAgICB9XG4gICAgc2hpcHNBcnJheSA9IGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkcygpO1xuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIndyYXBwZXJcIj48aDI+JHtoZWFkZXJ9PC9oMj48ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2NvbnRhaW5lclwiIGlkPVwiJHtpZH1cIj4ke2dhbWVCb2FyZENlbGxzXG4gICAgICAubWFwKChsaW5lKSA9PiBnYW1lYm9hcmRMaW5lTWFya3VwKGxpbmUsIHNoaXBzQXJyYXksIHRvU2VlU2hpcHMpKVxuICAgICAgLmpvaW4oXCJcIil9PC9kaXY+PC9kaXY+YDtcbiAgfTtcbiAgY29uc3QgZ2FtZWJvYXJkTGluZU1hcmt1cCA9IChsaW5lLCBzaGlwc0FycmF5LCB0b1NlZVNoaXBzKSA9PlxuICAgIGA8ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2xpbmVcIj4ke2xpbmVcbiAgICAgIC5tYXAoXG4gICAgICAgIChjZWxsKSA9PlxuICAgICAgICAgIGAke2dhbWVib2FyZENlbGxNYXJrdXAoXG4gICAgICAgICAgICBzaGlwc0FycmF5LmluY2x1ZGVzKGNvdW50ZXIpLFxuICAgICAgICAgICAgY2VsbCxcbiAgICAgICAgICAgIHRvU2VlU2hpcHNcbiAgICAgICAgICApfWBcbiAgICAgIClcbiAgICAgIC5qb2luKFwiXCIpfTwvZGl2PmA7XG5cbiAgY29uc3QgZ2FtZWJvYXJkQ2VsbE1hcmt1cCA9IChzaGlwLCBoaXQsIHRvU2VlU2hpcHMpID0+IHtcbiAgICBjb3VudGVyICs9IDE7XG4gICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZ2FtZWJvYXJkX2NlbGwgJHtzaGlwICYmIHRvU2VlU2hpcHMgPyBcInNoaXBcIiA6IFwiXCJ9ICR7XG4gICAgICBoaXQgPyBcImhpdFwiIDogXCJcIlxuICAgIH0gJHshdG9TZWVTaGlwcyAmJiBzaGlwICYmIGhpdCA/IFwiZW5lbXktc2hpcC1oaXRcIiA6IFwiXCJ9XCIgZGF0YS1pbmRleD1cIiR7XG4gICAgICBjb3VudGVyIC0gMVxuICAgIH1cIj48L2Rpdj5gO1xuICB9O1xuXG4gIHJldHVybiB7IGdldEdhbWVib2FyZCB9O1xufSkoKTtcbmV4cG9ydCB7IG1hcmt1cHMgfTtcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5jbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIGF0dGFjayhlbmVteSwgbG9jYXRpb24pIHtcbiAgICBlbmVteS5nYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhsb2NhdGlvbik7XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBsb2NhdGlvbiA9IFtdKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb247XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBoaXQoaW5kZXgpIHtcbiAgICB0aGlzLmhpdHMucHVzaChpbmRleCk7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMubG9jYXRpb24uZXZlcnkoKGNlbGwpID0+IHRoaXMuaGl0cy5pbmNsdWRlcyhjZWxsKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9Um9ib3RvOndnaHRANDAwOzcwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIHBhZGRpbmc6IDA7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMwYzBhM2U7XFxuICBjb2xvcjogI2VlZTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUm9ib3RvXFxcIiwgc2Fucy1zZXJpZjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgbWF4LXdpZHRoOiAxMDB2dztcXG59XFxuaGVhZGVyLFxcbmZvb3RlciB7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGdhcDogMjBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDEwcHg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtaW4taGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTYwcHgpO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBhZGRpbmctdG9wOiAyMHB4O1xcbiAgcGFkZGluZy1ib3R0b206IDIwcHg7XFxufVxcbi5nYW1lYm9hcmRzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxufVxcbi53cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuLmdhbWVib2FyZF9jb250YWluZXIge1xcbiAgd2lkdGg6IDU1MHB4O1xcbiAgaGVpZ2h0OiA1NTBweDtcXG59XFxuLmdhbWVib2FyZF9saW5lIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG59XFxuLmdhbWVib2FyZF9jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5zaGlwLFxcbi5wbGFjZXNoaXAge1xcbiAgYmFja2dyb3VuZDogZ3JlZW47XFxufVxcbi5jb2xsaWRpbmcge1xcbiAgYmFja2dyb3VuZDogcmdiKDE4NywgNTksIDU5KTtcXG59XFxuLmhpdDo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICB3aWR0aDogMTVweDtcXG4gIGhlaWdodDogMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG4uZW5lbXktc2hpcC1oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDY1LCAyMCwgMjApO1xcbn1cXG5mb290ZXIge1xcbiAgbWFyZ2luLXRvcDogYXV0bztcXG59XFxuZm9vdGVyID4gYSA+IGltZzpob3ZlciB7XFxuICBmaWx0ZXI6IG9wYWNpdHkoMC43KTtcXG59XFxuLm1vZGFsX19jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgei1pbmRleDogMTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG9wYWNpdHk6IDA7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlO1xcbn1cXG4uc2hvdy1tb2RhbCB7XFxuICBvcGFjaXR5OiAxO1xcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XFxufVxcbi5wYXJhIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuLm1vZGFsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB3aWR0aDogNjAwcHg7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAxMHB4O1xcbiAgei1pbmRleDogMTtcXG59XFxuLmdhbWVtb2Rlc19fd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMzBweDtcXG59XFxuLmdhbWVtb2Rlc19fd3JhcHBlciA+IHAsXFxuLnBhcmEge1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5cXG4uZ2FtZW1vZGVzX193cmFwcGVyID4gYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5idXR0b246aG92ZXI6bm90KDpkaXNhYmxlZCkge1xcbiAgb3BhY2l0eTogMC44O1xcbn1cXG5idXR0b24ge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgY29sb3I6ICNlZWU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2VlZTtcXG4gIHRyYW5zaXRpb246IDAuM3MgZWFzZTtcXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XFxufVxcbmJ1dHRvbjpkaXNhYmxlZCB7XFxuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXG59XFxuZm9ybSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxufVxcbmZvcm0gPiBsYWJlbCB7XFxuICBmb250LXNpemU6IDJyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5mb3JtID4gaW5wdXQge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5mb3JtID4gYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuLmN1cnNvci1wb2ludGVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLm1haW4tYnRuIHtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICBtaW4td2lkdGg6IDIwMHB4O1xcbn1cXG5cXG4uaW5mb1RleHRfX3dyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMjBweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmluZm9UZXh0X193cmFwcGVyID4gcCB7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5cXG4uYnV0dG9uc19fd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG4udG9nZ2xlIHtcXG4gIC0td2lkdGg6IDgwcHg7XFxuICAtLWhlaWdodDogY2FsYyh2YXIoLS13aWR0aCkgLyAzKTtcXG5cXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiB2YXIoLS13aWR0aCk7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBjb2xvcjogd2hpdGU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgYm94LXNoYWRvdzogMHB4IDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4udG9nZ2xlIGlucHV0IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi50b2dnbGUgLmxhYmVscyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlLWluLW91dDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi50b2dnbGUgLmxhYmVsczo6YWZ0ZXIge1xcbiAgY29udGVudDogYXR0cihkYXRhLW9mZik7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi50b2dnbGUgLmxhYmVsczo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1vbik7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogY2FsYyh2YXIoLS13aWR0aCkgKiAtMSk7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4udG9nZ2xlIGlucHV0OmNoZWNrZWQgfiAubGFiZWxzOjphZnRlciB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgodmFyKC0td2lkdGgpKTtcXG59XFxuXFxuLnRvZ2dsZSBpbnB1dDpjaGVja2VkIH4gLmxhYmVsczo6YmVmb3JlIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCh2YXIoLS13aWR0aCkpO1xcbn1cXG4ubW9kYWxfX2hlYWRlciB7XFxuICBjb2xvcjogIzBjMGEzZTtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbkBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6IDEyMDBweCkge1xcbiAgLmdhbWVib2FyZHMge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgfVxcbn1cXG5AbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOiA4MDBweCkge1xcbiAgaDEsXFxuICBoMiB7XFxuICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG4gIH1cXG5cXG4gIGhlYWRlcixcXG4gIGZvb3RlciB7XFxuICAgIGhlaWdodDogNTBweDtcXG4gIH1cXG4gIG1haW4ge1xcbiAgICBwYWRkaW5nLXRvcDogMjBweDtcXG4gICAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIDEwMHB4KTtcXG4gIH1cXG59XFxuQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogNTgwcHgpIHtcXG4gIC5nYW1lbW9kZXNfX3dyYXBwZXIgPiBwIHtcXG4gICAgZm9udC1zaXplOiAycmVtO1xcbiAgfVxcbiAgLmdhbWVtb2Rlc19fd3JhcHBlciA+IGJ1dHRvbixcXG4gIC5tb2RhbF9faGVhZGVyLFxcbiAgZm9ybSA+IGlucHV0LFxcbiAgLmdhbWVtb2Rlc19fd3JhcHBlciA+IGJ1dHRvbixcXG4gIGZvcm0gPiBsYWJlbCxcXG4gIC5wYXJhIHtcXG4gICAgZm9udC1zaXplOiAxLjVyZW07XFxuICB9XFxuICAubWFpbi1idG4sXFxuICAuaW5mb1RleHRfX3dyYXBwZXIgPiBwIHtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgfVxcbiAgLm1haW4tYnRuIHtcXG4gICAgbWluLXdpZHRoOiAxNTBweDtcXG4gIH1cXG4gIC5nYW1lYm9hcmRfY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDkwdnc7XFxuICAgIGhlaWdodDogOTB2dztcXG4gIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFDQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsc0JBQXNCO0FBQ3hCO0FBQ0E7RUFDRSx5QkFBeUI7RUFDekIsV0FBVztFQUNYLGlDQUFpQztFQUNqQyxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLGlCQUFpQjtFQUNqQixnQkFBZ0I7QUFDbEI7QUFDQTs7RUFFRSxZQUFZO0VBQ1oseUJBQXlCO0VBQ3pCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixTQUFTO0VBQ1QsV0FB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Q1AsV0FBVztFQUNYLFlBQVk7RUFDWixlQUFlO0VBQ2YsZ0NBQWdDO0VBQ2hDLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsTUFBTTtFQUNOLE9BQU87RUFDUCxZQUFZO0VBQ1osV0FBVztFQUNYLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLHNCQUFzQjtFQUN0QixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsTUFBTTtFQUNOLDZCQUE2QjtFQUM3QixZQUFZO0VBQ1osV0FBVztFQUNYLGtCQUFrQjtFQUNsQixnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxtQ0FBbUM7QUFDckM7QUFDQTtFQUNFLGNBQWM7RUFDZCxlQUFlO0VBQ2YsZ0JBQWdCO0FBQ2xCO0FBQ0E7RUFDRTtJQUNFLHNCQUFzQjtFQUN4QjtBQUNGO0FBQ0E7RUFDRTs7SUFFRSxrQkFBa0I7RUFDcEI7O0VBRUE7O0lBRUUsWUFBWTtFQUNkO0VBQ0E7SUFDRSxpQkFBaUI7SUFDakIsK0JBQStCO0VBQ2pDO0FBQ0Y7QUFDQTtFQUNFO0lBQ0UsZUFBZTtFQUNqQjtFQUNBOzs7Ozs7SUFNRSxpQkFBaUI7RUFDbkI7RUFDQTs7SUFFRSxlQUFlO0VBQ2pCO0VBQ0E7SUFDRSxnQkFBZ0I7RUFDbEI7RUFDQTtJQUNFLFdBQVc7SUFDWCxZQUFZO0VBQ2Q7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybChcXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG86d2dodEA0MDA7NzAwJmRpc3BsYXk9c3dhcFxcXCIpO1xcbioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBjMGEzZTtcXG4gIGNvbG9yOiAjZWVlO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBzYW5zLXNlcmlmO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbn1cXG5oZWFkZXIsXFxuZm9vdGVyIHtcXG4gIGhlaWdodDogODBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODM2NjM7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZ2FwOiAyMHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMTBweDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG1pbi1oZWlnaHQ6IGNhbGMoMTAwdmggLSAxNjBweCk7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcGFkZGluZy10b3A6IDIwcHg7XFxuICBwYWRkaW5nLWJvdHRvbTogMjBweDtcXG59XFxuLmdhbWVib2FyZHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMjBweDtcXG59XFxuLndyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAyMHB4O1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbn1cXG4uZ2FtZWJvYXJkX2NvbnRhaW5lciB7XFxuICB3aWR0aDogNTUwcHg7XFxuICBoZWlnaHQ6IDU1MHB4O1xcbn1cXG4uZ2FtZWJvYXJkX2xpbmUge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiAxMCU7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbn1cXG4uZ2FtZWJvYXJkX2NlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLnNoaXAsXFxuLnBsYWNlc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBncmVlbjtcXG59XFxuLmNvbGxpZGluZyB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTg3LCA1OSwgNTkpO1xcbn1cXG4uaGl0OjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbi5lbmVteS1zaGlwLWhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNjUsIDIwLCAyMCk7XFxufVxcbmZvb3RlciB7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbn1cXG5mb290ZXIgPiBhID4gaW1nOmhvdmVyIHtcXG4gIGZpbHRlcjogb3BhY2l0eSgwLjcpO1xcbn1cXG4ubW9kYWxfX2NvbnRhaW5lciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgb3BhY2l0eTogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2U7XFxufVxcbi5zaG93LW1vZGFsIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBwb2ludGVyLWV2ZW50czogYXV0bztcXG59XFxuLnBhcmEge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG4ubW9kYWwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIHdpZHRoOiA2MDBweDtcXG4gIG1heC13aWR0aDogMTAwJTtcXG4gIHBhZGRpbmc6IDE1cHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3gtc2hhZG93OiAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxuICB6LWluZGV4OiAxO1xcbn1cXG4uZ2FtZW1vZGVzX193cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAzMHB4O1xcbn1cXG4uZ2FtZW1vZGVzX193cmFwcGVyID4gcCxcXG4ucGFyYSB7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbi5nYW1lbW9kZXNfX3dyYXBwZXIgPiBidXR0b24ge1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBmb250LXNpemU6IDJyZW07XFxufVxcbmJ1dHRvbjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XFxuICBvcGFjaXR5OiAwLjg7XFxufVxcbmJ1dHRvbiB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBjb2xvcjogI2VlZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODM2NjM7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xcbiAgdHJhbnNpdGlvbjogMC4zcyBlYXNlO1xcbiAgYm9yZGVyLXJhZGl1czogMTVweDtcXG59XFxuYnV0dG9uOmRpc2FibGVkIHtcXG4gIGN1cnNvcjogbm90LWFsbG93ZWQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbn1cXG5mb3JtIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG59XFxuZm9ybSA+IGxhYmVsIHtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbmZvcm0gPiBpbnB1dCB7XFxuICBmb250LXNpemU6IDJyZW07XFxufVxcbmZvcm0gPiBidXR0b24ge1xcbiAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG4uY3Vyc29yLXBvaW50ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4ubWFpbi1idG4ge1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gIG1pbi13aWR0aDogMjAwcHg7XFxufVxcblxcbi5pbmZvVGV4dF9fd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAyMHB4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uaW5mb1RleHRfX3dyYXBwZXIgPiBwIHtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblxcbi5idXR0b25zX193cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDEwcHg7XFxufVxcbi50b2dnbGUge1xcbiAgLS13aWR0aDogODBweDtcXG4gIC0taGVpZ2h0OiBjYWxjKHZhcigtLXdpZHRoKSAvIDMpO1xcblxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgd2lkdGg6IHZhcigtLXdpZHRoKTtcXG4gIGhlaWdodDogMzBweDtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODM2NjM7XFxuICBib3gtc2hhZG93OiAwcHggMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi50b2dnbGUgaW5wdXQge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLnRvZ2dsZSAubGFiZWxzIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2UtaW4tb3V0O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuLnRvZ2dsZSAubGFiZWxzOjphZnRlciB7XFxuICBjb250ZW50OiBhdHRyKGRhdGEtb2ZmKTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnRvZ2dsZSAubGFiZWxzOjpiZWZvcmUge1xcbiAgY29udGVudDogYXR0cihkYXRhLW9uKTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiBjYWxjKHZhcigtLXdpZHRoKSAqIC0xKTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi50b2dnbGUgaW5wdXQ6Y2hlY2tlZCB+IC5sYWJlbHM6OmFmdGVyIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCh2YXIoLS13aWR0aCkpO1xcbn1cXG5cXG4udG9nZ2xlIGlucHV0OmNoZWNrZWQgfiAubGFiZWxzOjpiZWZvcmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKHZhcigtLXdpZHRoKSk7XFxufVxcbi5tb2RhbF9faGVhZGVyIHtcXG4gIGNvbG9yOiAjMGMwYTNlO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuQG1lZGlhIGFsbCBhbmQgKG1heC13aWR0aDogMTIwMHB4KSB7XFxuICAuZ2FtZWJvYXJkcyB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB9XFxufVxcbkBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6IDgwMHB4KSB7XFxuICBoMSxcXG4gIGgyIHtcXG4gICAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgfVxcblxcbiAgaGVhZGVyLFxcbiAgZm9vdGVyIHtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgfVxcbiAgbWFpbiB7XFxuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xcbiAgICBtaW4taGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTAwcHgpO1xcbiAgfVxcbn1cXG5AbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOiA1ODBweCkge1xcbiAgLmdhbWVtb2Rlc19fd3JhcHBlciA+IHAge1xcbiAgICBmb250LXNpemU6IDJyZW07XFxuICB9XFxuICAuZ2FtZW1vZGVzX193cmFwcGVyID4gYnV0dG9uLFxcbiAgLm1vZGFsX19oZWFkZXIsXFxuICBmb3JtID4gaW5wdXQsXFxuICAuZ2FtZW1vZGVzX193cmFwcGVyID4gYnV0dG9uLFxcbiAgZm9ybSA+IGxhYmVsLFxcbiAgLnBhcmEge1xcbiAgICBmb250LXNpemU6IDEuNXJlbTtcXG4gIH1cXG4gIC5tYWluLWJ0bixcXG4gIC5pbmZvVGV4dF9fd3JhcHBlciA+IHAge1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICB9XFxuICAubWFpbi1idG4ge1xcbiAgICBtaW4td2lkdGg6IDE1MHB4O1xcbiAgfVxcbiAgLmdhbWVib2FyZF9jb250YWluZXIge1xcbiAgICB3aWR0aDogOTB2dztcXG4gICAgaGVpZ2h0OiA5MHZ3O1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCB7IGRvbSB9IGZyb20gXCIuL2RvbVwiO1xuXG5kb20uaW5pdCgpO1xuIl0sIm5hbWVzIjpbIkFJIiwiRmlsdGVyVW5TdW5rQ2VsbHMiLCJhcnJheSIsImVuZW15IiwiZmlsdGVyIiwiY2VsbCIsImdhbWVCb2FyZCIsImlzU2hpcCIsImN1cnJTaGlwIiwic2hpcHMiLCJmaW5kIiwic2hpcCIsImxvY2F0aW9uIiwiaW5jbHVkZXMiLCJpc1N1bmsiLCJEZXRlY3RTaGlwcyIsInVuc3Vua0NlbGxzIiwiZGV0ZWN0ZWQiLCJpbmRleCIsIkF0dGFja0RldGVjdGVkU2hpcCIsImRldGVjdGVkU2hpcHMiLCJlbXB0eUNlbGxzIiwiYXhpcyIsImF2YWlsYWJsZVNob3RzIiwicHVzaCIsInJpZ2h0U2lkZSIsIk1hdGgiLCJmbG9vciIsImFib3ZlIiwiYmVsb3ciLCJmaWx0ZXJlZEF2YWlsYWJsZVNob3RzIiwic2hvdCIsImxlbmd0aCIsInJhbmRvbSIsIkF0dGFja1NvbG9IaXQiLCJoaXRDZWxscyIsImZpcnN0U2hvdCIsImxlZnRTaG90IiwicmlnaHRTaG90IiwiYWJvdmVTaG90IiwiYmVsb3dTaG90IiwiQXR0YWNrUmFuZG9tIiwiYmFkU2hvdHMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsIkF0dGFjayIsImJvYXJkIiwiaGl0IiwiYXR0YWNrIiwiZ2FtZSIsIm1hcmt1cHMiLCJQbGF5ZXIiLCJTaGlwIiwiZG9tIiwicGxheWVyIiwiY29tcHV0ZXIiLCJtYWluIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibW9kYWxDb250YWluZXIiLCJnb1RvTWFpbiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0ZXh0Q29udGVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0IiwicGxheWVyMUJvYXJkIiwicGxheWVyMkJvYXJkIiwiZGlzcGxheUdhbWVNb2RlcyIsImRpc3BsYXlCb2FyZHMiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsImdhbWVib2FyZHMiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJnZXRHYW1lYm9hcmQiLCJuYW1lIiwiZ2V0RWxlbWVudEJ5SWQiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJyZWNlaXZlQXR0YWNrIiwiTnVtYmVyIiwiZGF0YXNldCIsImlzQWxsU3VuayIsImdhbWVFbmRNb2RhbCIsIndyYXBwZXIiLCJoZWFkZXIiLCJidG4xIiwiZGlzcGxheVBsYXllclZTQUlGb3JtIiwiYnRuMiIsImRpc2FibGVkIiwiZGlzcGxheVJhbmRvbU9yQ3VzdG9tIiwicGFyYSIsImRpc3BsYXlSYW5kb21TaGlwUGxhY2luZyIsImRpc3BsYXlDdXN0b21TaGlwUGxhY2luZyIsImZvcm0iLCJsYWJlbCIsInNldEF0dHJpYnV0ZSIsImlucHV0IiwidHlwZSIsImlkIiwiYnRuIiwidmFsdWUiLCJkaXYiLCJzdGFydCIsInJhbmRvbWl6ZSIsInB1dFJhbmRvbVNoaXBzIiwic3RhcnRpbmdTaGlwcyIsImdhbWVib2FyZCIsImluc2VydEJlZm9yZSIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmUiLCJob3ZlckFycmF5IiwiY2xhc3NOYW1lIiwiYWJsZVRvUGxhY2UiLCJjdXJyIiwiaW5mb1RleHQiLCJzcGFuIiwiY2hlY2tlZCIsImkiLCJjaGVja0lmQ29sbGlkZWQiLCJjaGVja0lmTXVsdGlwbGVMaW5lcyIsImVsIiwicXVlcnkiLCJjZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJBcnJheSIsImZyb20iLCJwbGFjZVNoaXAiLCJtb2RhbCIsIkdhbWVib2FyZCIsImF4bGVzIiwiY3VyckF4aXMiLCJyYW5kb21OdW0iLCJjb29yZCIsInRlbXAiLCJ0b0xvd2VyQ2FzZSIsImhpdFNoaXAiLCJzb21lIiwieCIsImhpdHMiLCJldmVyeSIsImFyciIsImNvb3JkQXJyYXkiLCJyZXMiLCJjb3VudGVyIiwidG9TZWVTaGlwcyIsInNoaXBzQXJyYXkiLCJnYW1lQm9hcmRDZWxscyIsImxlbiIsInNsaWNlIiwiZ2V0U2hpcHNDb29yZHMiLCJtYXAiLCJsaW5lIiwiZ2FtZWJvYXJkTGluZU1hcmt1cCIsImpvaW4iLCJnYW1lYm9hcmRDZWxsTWFya3VwIl0sInNvdXJjZVJvb3QiOiIifQ==