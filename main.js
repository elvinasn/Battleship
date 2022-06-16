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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-color: #0c0a3e;\n  color: #eee;\n  font-family: \"Roboto\", sans-serif;\n  min-height: 100vh;\n  max-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n  max-width: 100vw;\n}\nheader,\nfooter {\n  height: 80px;\n  background-color: #383663;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  gap: 20px;\n  width: 100%;\n}\nmain {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n  align-items: center;\n  height: calc(100vh - 160px);\n  flex-direction: column;\n}\n.gameboards {\n  display: flex;\n  gap: 20px;\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.gameboard_container {\n  width: 550px;\n  height: 550px;\n}\n.gameboard_line {\n  width: 100%;\n  display: flex;\n  height: 10%;\n  border-collapse: collapse;\n}\n.gameboard_cell {\n  background-color: white;\n  height: 100%;\n  width: 100%;\n  border: 1px solid black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship,\n.placeship {\n  background: green;\n}\n.colliding {\n  background: rgb(187, 59, 59);\n}\n.hit::after {\n  position: absolute;\n  content: \"\";\n  background-color: red;\n  width: 15px;\n  height: 15px;\n  border-radius: 8px;\n  pointer-events: none;\n}\n.enemy-ship-hit {\n  background-color: rgb(65, 20, 20);\n}\nfooter {\n  margin-top: auto;\n}\nfooter > a > img:hover {\n  filter: opacity(0.7);\n}\n.modal__container {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s ease;\n}\n.show-modal {\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.modal {\n  background-color: #fff;\n  width: 600px;\n  max-width: 100%;\n  padding: 15px;\n  border-radius: 5px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  z-index: 1;\n}\n.gamemodes__wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n}\n.gamemodes__wrapper > p,\n.para {\n  font-size: 2.5rem;\n  font-weight: 700;\n}\n\n.gamemodes__wrapper > button {\n  padding: 20px;\n  font-weight: 700;\n  font-size: 2rem;\n}\nbutton:hover:not(:disabled) {\n  opacity: 0.8;\n}\nbutton {\n  border: none;\n  color: #eee;\n  background-color: #383663;\n  cursor: pointer;\n  border: 1px solid #eee;\n  transition: 0.3s ease;\n  border-radius: 15px;\n}\nbutton:disabled {\n  cursor: not-allowed;\n  background-color: gray;\n}\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\nform > label {\n  font-size: 2rem;\n  font-weight: 700;\n}\nform > input {\n  font-size: 2rem;\n}\nform > button {\n  padding: 10px 20px;\n  font-size: 1.5rem;\n  font-weight: 700;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n\n.main-btn {\n  font-size: 1.25rem;\n  font-weight: 700;\n  padding: 10px 20px;\n  min-width: 200px;\n}\n\n.infoText__wrapper {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  justify-content: center;\n}\n\n.infoText__wrapper > p {\n  font-size: 1.25rem;\n  font-weight: 700;\n}\n\n.buttons__wrapper {\n  display: flex;\n  gap: 10px;\n}\n.toggle {\n  --width: 80px;\n  --height: calc(var(--width) / 3);\n\n  position: relative;\n  display: inline-block;\n  width: var(--width);\n  height: 30px;\n  color: white;\n  background-color: #383663;\n  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);\n  cursor: pointer;\n}\n\n.toggle input {\n  display: none;\n}\n\n.toggle .labels {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  font-size: 16px;\n  transition: all 0.4s ease-in-out;\n  overflow: hidden;\n}\n\n.toggle .labels::after {\n  content: attr(data-off);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle .labels::before {\n  content: attr(data-on);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: calc(var(--width) * -1);\n  height: 100%;\n  width: 100%;\n  text-align: center;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle input:checked ~ .labels::after {\n  transform: translateX(var(--width));\n}\n\n.toggle input:checked ~ .labels::before {\n  transform: translateX(var(--width));\n}\n.modal__header {\n  color: #0c0a3e;\n  font-size: 2rem;\n  font-weight: 700;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AACA;EACE,UAAU;EACV,SAAS;EACT,sBAAsB;AACxB;AACA;EACE,yBAAyB;EACzB,WAAW;EACX,iCAAiC;EACjC,iBAAiB;EACjB,gBAAgB;EAChB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,iBAAiB;EACjB,gBAAgB;AAClB;AACA;;EAEE,YAAY;EACZ,yBAAyB;EACzB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,eAAe;EACf,SAAS;EACT,WAAW;AACb;AACA;EACE,aAAa;EACb,SAAS;EACT,uBAAuB;EACvB,mBAAmB;EACnB,2BAA2B;EAC3B,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,SAAS;AACX;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;EACT,eAAe;AACjB;AACA;EACE,YAAY;EACZ,aAAa;AACf;AACA;EACE,WAAW;EACX,aAAa;EACb,WAAW;EACX,yBAAyB;AAC3B;AACA;EACE,uBAAuB;EACvB,YAAY;EACZ,WAAW;EACX,uBAAuB;EACvB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;AACA;;EAEE,iBAAiB;AACnB;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,kBAAkB;EAClB,WAAW;EACX,qBAAqB;EACrB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;AACtB;AACA;EACE,iCAAiC;AACnC;AACA;EACE,gBAAgB;AAClB;AACA;EACE,oBAAoB;AACtB;AACA;EACE,oCAAoC;EACpC,eAAe;EACf,UAAU;EACV,MAAM;EACN,OAAO;EACP,YAAY;EACZ,aAAa;EACb,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,UAAU;EACV,oBAAoB;EACpB,6BAA6B;AAC/B;AACA;EACE,UAAU;EACV,oBAAoB;AACtB;;AAEA;EACE,sBAAsB;EACtB,YAAY;EACZ,eAAe;EACf,aAAa;EACb,kBAAkB;EAClB,wCAAwC;EACxC,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,SAAS;EACT,UAAU;AACZ;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;AACA;;EAEE,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,eAAe;AACjB;AACA;EACE,YAAY;AACd;AACA;EACE,YAAY;EACZ,WAAW;EACX,yBAAyB;EACzB,eAAe;EACf,sBAAsB;EACtB,qBAAqB;EACrB,mBAAmB;AACrB;AACA;EACE,mBAAmB;EACnB,sBAAsB;AACxB;AACA;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,SAAS;AACX;AACA;EACE,eAAe;EACf,gBAAgB;AAClB;AACA;EACE,eAAe;AACjB;AACA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;AAClB;AACA;EACE,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,SAAS;EACT,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,SAAS;AACX;AACA;EACE,aAAa;EACb,gCAAgC;;EAEhC,kBAAkB;EAClB,qBAAqB;EACrB,mBAAmB;EACnB,YAAY;EACZ,YAAY;EACZ,yBAAyB;EACzB,0CAA0C;EAC1C,eAAe;AACjB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,WAAW;EACX,YAAY;EACZ,eAAe;EACf,gCAAgC;EAChC,gBAAgB;AAClB;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,MAAM;EACN,OAAO;EACP,YAAY;EACZ,WAAW;EACX,gCAAgC;AAClC;;AAEA;EACE,sBAAsB;EACtB,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,MAAM;EACN,6BAA6B;EAC7B,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,gCAAgC;AAClC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,mCAAmC;AACrC;AACA;EACE,cAAc;EACd,eAAe;EACf,gBAAgB;AAClB","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap\");\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  background-color: #0c0a3e;\n  color: #eee;\n  font-family: \"Roboto\", sans-serif;\n  min-height: 100vh;\n  max-width: 100vw;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  min-height: 100vh;\n  max-width: 100vw;\n}\nheader,\nfooter {\n  height: 80px;\n  background-color: #383663;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 18px;\n  gap: 20px;\n  width: 100%;\n}\nmain {\n  display: flex;\n  gap: 10px;\n  justify-content: center;\n  align-items: center;\n  height: calc(100vh - 160px);\n  flex-direction: column;\n}\n.gameboards {\n  display: flex;\n  gap: 20px;\n}\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 20px;\n  font-size: 20px;\n}\n.gameboard_container {\n  width: 550px;\n  height: 550px;\n}\n.gameboard_line {\n  width: 100%;\n  display: flex;\n  height: 10%;\n  border-collapse: collapse;\n}\n.gameboard_cell {\n  background-color: white;\n  height: 100%;\n  width: 100%;\n  border: 1px solid black;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.ship,\n.placeship {\n  background: green;\n}\n.colliding {\n  background: rgb(187, 59, 59);\n}\n.hit::after {\n  position: absolute;\n  content: \"\";\n  background-color: red;\n  width: 15px;\n  height: 15px;\n  border-radius: 8px;\n  pointer-events: none;\n}\n.enemy-ship-hit {\n  background-color: rgb(65, 20, 20);\n}\nfooter {\n  margin-top: auto;\n}\nfooter > a > img:hover {\n  filter: opacity(0.7);\n}\n.modal__container {\n  background-color: rgba(0, 0, 0, 0.3);\n  position: fixed;\n  z-index: 1;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.3s ease;\n}\n.show-modal {\n  opacity: 1;\n  pointer-events: auto;\n}\n\n.modal {\n  background-color: #fff;\n  width: 600px;\n  max-width: 100%;\n  padding: 15px;\n  border-radius: 5px;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  z-index: 1;\n}\n.gamemodes__wrapper {\n  display: flex;\n  flex-direction: column;\n  gap: 30px;\n}\n.gamemodes__wrapper > p,\n.para {\n  font-size: 2.5rem;\n  font-weight: 700;\n}\n\n.gamemodes__wrapper > button {\n  padding: 20px;\n  font-weight: 700;\n  font-size: 2rem;\n}\nbutton:hover:not(:disabled) {\n  opacity: 0.8;\n}\nbutton {\n  border: none;\n  color: #eee;\n  background-color: #383663;\n  cursor: pointer;\n  border: 1px solid #eee;\n  transition: 0.3s ease;\n  border-radius: 15px;\n}\nbutton:disabled {\n  cursor: not-allowed;\n  background-color: gray;\n}\nform {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n}\nform > label {\n  font-size: 2rem;\n  font-weight: 700;\n}\nform > input {\n  font-size: 2rem;\n}\nform > button {\n  padding: 10px 20px;\n  font-size: 1.5rem;\n  font-weight: 700;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n\n.main-btn {\n  font-size: 1.25rem;\n  font-weight: 700;\n  padding: 10px 20px;\n  min-width: 200px;\n}\n\n.infoText__wrapper {\n  display: flex;\n  gap: 20px;\n  align-items: center;\n  justify-content: center;\n}\n\n.infoText__wrapper > p {\n  font-size: 1.25rem;\n  font-weight: 700;\n}\n\n.buttons__wrapper {\n  display: flex;\n  gap: 10px;\n}\n.toggle {\n  --width: 80px;\n  --height: calc(var(--width) / 3);\n\n  position: relative;\n  display: inline-block;\n  width: var(--width);\n  height: 30px;\n  color: white;\n  background-color: #383663;\n  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);\n  cursor: pointer;\n}\n\n.toggle input {\n  display: none;\n}\n\n.toggle .labels {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  font-size: 16px;\n  transition: all 0.4s ease-in-out;\n  overflow: hidden;\n}\n\n.toggle .labels::after {\n  content: attr(data-off);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle .labels::before {\n  content: attr(data-on);\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  top: 0;\n  left: calc(var(--width) * -1);\n  height: 100%;\n  width: 100%;\n  text-align: center;\n  transition: all 0.4s ease-in-out;\n}\n\n.toggle input:checked ~ .labels::after {\n  transform: translateX(var(--width));\n}\n\n.toggle input:checked ~ .labels::before {\n  transform: translateX(var(--width));\n}\n.modal__header {\n  color: #0c0a3e;\n  font-size: 2rem;\n  font-weight: 700;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksYUFBYSxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxVQUFVLEtBQUssS0FBSyxVQUFVLFlBQVksV0FBVyxLQUFLLE1BQU0sWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxLQUFLLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxhQUFhLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLEtBQUssS0FBSyxVQUFVLFlBQVksTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLE1BQU0sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxLQUFLLEtBQUssVUFBVSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVks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QUNBO0FBRUFDLDBDQUFBLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2FpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVCb2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21hcmt1cHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQUkgPSAoKCkgPT4ge1xuICBjb25zdCBGaWx0ZXJVblN1bmtDZWxscyA9IChhcnJheSwgZW5lbXkpID0+XG4gICAgYXJyYXkuZmlsdGVyKChjZWxsKSA9PiB7XG4gICAgICBpZiAoZW5lbXkuZ2FtZUJvYXJkLmlzU2hpcChjZWxsKSkge1xuICAgICAgICBjb25zdCBjdXJyU2hpcCA9IGVuZW15LmdhbWVCb2FyZC5zaGlwcy5maW5kKChzaGlwKSA9PlxuICAgICAgICAgIHNoaXAubG9jYXRpb24uaW5jbHVkZXMoY2VsbClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuICFjdXJyU2hpcC5pc1N1bmsoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICBjb25zdCBEZXRlY3RTaGlwcyA9ICh1bnN1bmtDZWxscykgPT4ge1xuICAgIGNvbnN0IGRldGVjdGVkID0gdW5zdW5rQ2VsbHMuZmlsdGVyKFxuICAgICAgKGNlbGwsIGluZGV4LCBhcnJheSkgPT5cbiAgICAgICAgKGFycmF5LmluY2x1ZGVzKGNlbGwgKyAxKSAmJiBjZWxsICUgMTAgIT09IDkpIHx8XG4gICAgICAgIChhcnJheS5pbmNsdWRlcyhjZWxsIC0gMSkgJiYgY2VsbCAlIDEwICE9PSAwKSB8fFxuICAgICAgICAoYXJyYXkuaW5jbHVkZXMoY2VsbCArIDEwKSAmJiBjZWxsICsgMTAgPCAxMDApIHx8XG4gICAgICAgIChhcnJheS5pbmNsdWRlcyhjZWxsIC0gMTApICYmIGNlbGwgLSAxMCA+IDApXG4gICAgKTtcbiAgICByZXR1cm4gZGV0ZWN0ZWQ7XG4gIH07XG5cbiAgY29uc3QgQXR0YWNrRGV0ZWN0ZWRTaGlwID0gKGRldGVjdGVkU2hpcHMsIGVtcHR5Q2VsbHMpID0+IHtcbiAgICBjb25zdCBheGlzID0gZGV0ZWN0ZWRTaGlwc1sxXSAtIGRldGVjdGVkU2hpcHNbMF0gPT09IDEgPyBcInhcIiA6IFwieVwiO1xuICAgIGNvbnN0IGF2YWlsYWJsZVNob3RzID0gW107XG5cbiAgICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgIGlmIChkZXRlY3RlZFNoaXBzWzBdICUgMTAgIT09IDApIHtcbiAgICAgICAgYXZhaWxhYmxlU2hvdHMucHVzaChkZXRlY3RlZFNoaXBzWzBdIC0gMSk7XG4gICAgICB9XG4gICAgICBjb25zdCByaWdodFNpZGUgPSBkZXRlY3RlZFNoaXBzLmZpbmQoXG4gICAgICAgIChjZWxsLCBpbmRleCwgYXJyYXkpID0+ICFhcnJheS5pbmNsdWRlcyhjZWxsICsgMSlcbiAgICAgICk7XG4gICAgICBpZiAoXG4gICAgICAgIE1hdGguZmxvb3IoZGV0ZWN0ZWRTaGlwc1swXSAvIDEwKSA9PT0gTWF0aC5mbG9vcigocmlnaHRTaWRlICsgMSkgLyAxMClcbiAgICAgICkge1xuICAgICAgICBhdmFpbGFibGVTaG90cy5wdXNoKHJpZ2h0U2lkZSArIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBhYm92ZSA9IGRldGVjdGVkU2hpcHNbMF0gLSAxMDtcbiAgICAgIGlmIChhYm92ZSA+IDApIHtcbiAgICAgICAgYXZhaWxhYmxlU2hvdHMucHVzaChhYm92ZSk7XG4gICAgICB9XG4gICAgICBjb25zdCBiZWxvdyA9IGRldGVjdGVkU2hpcHMuZmluZChcbiAgICAgICAgKGNlbGwsIGluZGV4LCBhcnJheSkgPT4gIWFycmF5LmluY2x1ZGVzKGNlbGwgKyAxMClcbiAgICAgICk7XG4gICAgICBpZiAoYmVsb3cgKyAxMCA8IDEwMCkge1xuICAgICAgICBhdmFpbGFibGVTaG90cy5wdXNoKGJlbG93ICsgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGZpbHRlcmVkQXZhaWxhYmxlU2hvdHMgPSBhdmFpbGFibGVTaG90cy5maWx0ZXIoKHNob3QpID0+XG4gICAgICBlbXB0eUNlbGxzLmluY2x1ZGVzKHNob3QpXG4gICAgKTtcbiAgICBpZiAoZmlsdGVyZWRBdmFpbGFibGVTaG90cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gZmlsdGVyZWRBdmFpbGFibGVTaG90c1tcbiAgICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmlsdGVyZWRBdmFpbGFibGVTaG90cy5sZW5ndGgpXG4gICAgICBdO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBBdHRhY2tTb2xvSGl0ID0gKGhpdENlbGxzLCBlbXB0eUNlbGxzKSA9PiB7XG4gICAgY29uc3QgZmlyc3RTaG90ID0gaGl0Q2VsbHNbMF07XG4gICAgbGV0IGF2YWlsYWJsZVNob3RzID0gW107XG5cbiAgICBjb25zdCBsZWZ0U2hvdCA9IGhpdENlbGxzWzBdIC0gMTtcbiAgICBpZiAoTWF0aC5mbG9vcihmaXJzdFNob3QgLyAxMCkgPT09IE1hdGguZmxvb3IobGVmdFNob3QgLyAxMCkpIHtcbiAgICAgIGF2YWlsYWJsZVNob3RzLnB1c2gobGVmdFNob3QpO1xuICAgIH1cblxuICAgIGNvbnN0IHJpZ2h0U2hvdCA9IGhpdENlbGxzWzBdICsgMTtcbiAgICBpZiAoTWF0aC5mbG9vcihmaXJzdFNob3QgLyAxMCkgPT09IE1hdGguZmxvb3IocmlnaHRTaG90IC8gMTApKSB7XG4gICAgICBhdmFpbGFibGVTaG90cy5wdXNoKHJpZ2h0U2hvdCk7XG4gICAgfVxuXG4gICAgY29uc3QgYWJvdmVTaG90ID0gZmlyc3RTaG90IC0gMTA7XG4gICAgaWYgKGFib3ZlU2hvdCA+IDApIHtcbiAgICAgIGF2YWlsYWJsZVNob3RzLnB1c2goYWJvdmVTaG90KTtcbiAgICB9XG5cbiAgICBjb25zdCBiZWxvd1Nob3QgPSBmaXJzdFNob3QgKyAxMDtcbiAgICBpZiAoYmVsb3dTaG90IDwgMTAwKSB7XG4gICAgICBhdmFpbGFibGVTaG90cy5wdXNoKGJlbG93U2hvdCk7XG4gICAgfVxuXG4gICAgYXZhaWxhYmxlU2hvdHMgPSBhdmFpbGFibGVTaG90cy5maWx0ZXIoKHNob3QpID0+IGVtcHR5Q2VsbHMuaW5jbHVkZXMoc2hvdCkpO1xuICAgIGlmIChhdmFpbGFibGVTaG90cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gYXZhaWxhYmxlU2hvdHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlU2hvdHMubGVuZ3RoKV07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IEF0dGFja1JhbmRvbSA9IChlbXB0eUNlbGxzLCBoaXRDZWxscykgPT4ge1xuICAgIGxldCBiYWRTaG90cyA9IFtdO1xuICAgIGhpdENlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGJhZFNob3RzLnB1c2goY2VsbCArIDEpO1xuICAgICAgYmFkU2hvdHMucHVzaChjZWxsIC0gMSk7XG4gICAgICBiYWRTaG90cy5wdXNoKGNlbGwgKyAxMCk7XG4gICAgICBiYWRTaG90cy5wdXNoKGNlbGwgLSAxMCk7XG4gICAgfSk7XG4gICAgYmFkU2hvdHMgPSBiYWRTaG90cy5maWx0ZXIoXG4gICAgICAoY2VsbCwgaW5kZXgsIGFycmF5KSA9PiBhcnJheS5pbmRleE9mKGNlbGwpID09PSBpbmRleFxuICAgICk7XG4gICAgY29uc3QgYXZhaWxhYmxlU2hvdHMgPSBlbXB0eUNlbGxzLmZpbHRlcihcbiAgICAgIChjZWxsKSA9PiAhYmFkU2hvdHMuaW5jbHVkZXMoY2VsbClcbiAgICApO1xuICAgIGlmIChhdmFpbGFibGVTaG90cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gYXZhaWxhYmxlU2hvdHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlU2hvdHMubGVuZ3RoKV07XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IEF0dGFjayA9IChlbmVteSkgPT4ge1xuICAgIGNvbnN0IGVtcHR5Q2VsbHMgPSBbXTtcbiAgICBjb25zdCBoaXRDZWxscyA9IFtdO1xuICAgIGVuZW15LmdhbWVCb2FyZC5ib2FyZC5mb3JFYWNoKChoaXQsIGluZGV4KSA9PlxuICAgICAgaGl0ID8gaGl0Q2VsbHMucHVzaChpbmRleCkgOiBlbXB0eUNlbGxzLnB1c2goaW5kZXgpXG4gICAgKTtcblxuICAgIGNvbnN0IHVuc3Vua0NlbGxzID0gRmlsdGVyVW5TdW5rQ2VsbHMoaGl0Q2VsbHMsIGVuZW15KTtcbiAgICBjb25zdCBkZXRlY3RlZFNoaXBzID0gRGV0ZWN0U2hpcHModW5zdW5rQ2VsbHMpO1xuXG4gICAgaWYgKGRldGVjdGVkU2hpcHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYXR0YWNrID0gQXR0YWNrRGV0ZWN0ZWRTaGlwKGRldGVjdGVkU2hpcHMsIGVtcHR5Q2VsbHMpO1xuICAgICAgaWYgKGF0dGFjaykgcmV0dXJuIGF0dGFjaztcbiAgICB9XG4gICAgaWYgKGhpdENlbGxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGF0dGFjayA9IEF0dGFja1NvbG9IaXQodW5zdW5rQ2VsbHMsIGVtcHR5Q2VsbHMpO1xuICAgICAgaWYgKGF0dGFjaykgcmV0dXJuIGF0dGFjaztcbiAgICB9XG5cbiAgICBjb25zdCBhdHRhY2sgPSBBdHRhY2tSYW5kb20oZW1wdHlDZWxscywgaGl0Q2VsbHMpO1xuICAgIGlmIChhdHRhY2spIHJldHVybiBhdHRhY2s7XG4gICAgcmV0dXJuIGVtcHR5Q2VsbHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZW1wdHlDZWxscy5sZW5ndGgpXTtcbiAgfTtcblxuICByZXR1cm4geyBBdHRhY2sgfTtcbn0pKCk7XG5leHBvcnQgeyBBSSB9O1xuIiwiaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcbmltcG9ydCB7IG1hcmt1cHMgfSBmcm9tIFwiLi9tYXJrdXBzXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgQUkgfSBmcm9tIFwiLi9haVwiO1xuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuY29uc3QgZG9tID0gKCgpID0+IHtcbiAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihcIkVsdmluYXNcIik7XG4gIGNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcihcIkFJXCIpO1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1haW5cIik7XG4gIGNvbnN0IG1vZGFsQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbC1jb250YWluZXJcIik7XG4gIGNvbnN0IGdvVG9NYWluID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgZ29Ub01haW4uY2xhc3NMaXN0LmFkZChcIm1haW4tYnRuXCIpO1xuICBnb1RvTWFpbi50ZXh0Q29udGVudCA9IFwiR08gVE8gTUFJTiBTQ1JFRU5cIjtcbiAgZ29Ub01haW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpbml0KCk7XG4gIH0pO1xuICBsZXQgcGxheWVyMUJvYXJkO1xuICBsZXQgcGxheWVyMkJvYXJkO1xuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgZ2FtZS5pbml0KHBsYXllciwgY29tcHV0ZXIpO1xuICAgIGRpc3BsYXlHYW1lTW9kZXMoKTtcbiAgfTtcbiAgY29uc3QgZGlzcGxheUJvYXJkcyA9ICgpID0+IHtcbiAgICBtYWluLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICBtYWluLmFwcGVuZENoaWxkKGdvVG9NYWluKTtcbiAgICBjb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBnYW1lYm9hcmRzLmNsYXNzTGlzdC5hZGQoXCJnYW1lYm9hcmRzXCIpO1xuICAgIGdhbWVib2FyZHMuaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgXCJhZnRlcmJlZ2luXCIsXG4gICAgICBtYXJrdXBzLmdldEdhbWVib2FyZChcbiAgICAgICAgZ2FtZS5wbGF5ZXIuZ2FtZUJvYXJkLFxuICAgICAgICBgJHtnYW1lLnBsYXllci5uYW1lfSBib2FyZGAsXG4gICAgICAgIFwiUExBWUVSMVwiLFxuICAgICAgICB0cnVlXG4gICAgICApXG4gICAgKTtcbiAgICBnYW1lYm9hcmRzLmluc2VydEFkamFjZW50SFRNTChcbiAgICAgIFwiYmVmb3JlRW5kXCIsXG4gICAgICBtYXJrdXBzLmdldEdhbWVib2FyZChcbiAgICAgICAgZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQsXG4gICAgICAgIGAke2dhbWUuY29tcHV0ZXIubmFtZX0gYm9hcmRgLFxuICAgICAgICBcIlBMQVlFUjJcIixcbiAgICAgICAgZmFsc2VcbiAgICAgIClcbiAgICApO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoZ2FtZWJvYXJkcyk7XG4gICAgcGxheWVyMUJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJQTEFZRVIxXCIpO1xuICAgIHBsYXllcjJCb2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiUExBWUVSMlwiKTtcbiAgICBwbGF5ZXIyQm9hcmQuY2xhc3NMaXN0LmFkZChcImN1cnNvci1wb2ludGVyXCIpO1xuICAgIHBsYXllcjJCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSAmJlxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJnYW1lYm9hcmRfY2VsbFwiKVxuICAgICAgKSB7XG4gICAgICAgIGdhbWUuY29tcHV0ZXIuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpKTtcbiAgICAgICAgZGlzcGxheUJvYXJkcygpO1xuICAgICAgICBpZiAoZ2FtZS5jb21wdXRlci5nYW1lQm9hcmQuaXNBbGxTdW5rKCkpIHtcbiAgICAgICAgICBnYW1lRW5kTW9kYWwoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYXR0YWNrID0gQUkuQXR0YWNrKGdhbWUucGxheWVyKTtcbiAgICAgICAgZ2FtZS5wbGF5ZXIuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2soYXR0YWNrKTtcbiAgICAgICAgaWYgKGdhbWUucGxheWVyLmdhbWVCb2FyZC5pc0FsbFN1bmsoKSkge1xuICAgICAgICAgIGdhbWVFbmRNb2RhbCgpO1xuICAgICAgICB9XG4gICAgICAgIGRpc3BsYXlCb2FyZHMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5R2FtZU1vZGVzID0gKCkgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJnYW1lbW9kZXNfX3dyYXBwZXJcIik7XG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgaGVhZGVyLnRleHRDb250ZW50ID0gXCJTRUxFQ1QgR0FNRSBNT0RFXCI7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuXG4gICAgY29uc3QgYnRuMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuMS50ZXh0Q29udGVudCA9IFwiUExBWUVSIFZTIEFJXCI7XG4gICAgYnRuMS5jbGFzc0xpc3QuYWRkKFwiYnRuXCIpO1xuICAgIGJ0bjEuY2xhc3NMaXN0LmFkZChcImJ0bi1wcmltYXJ5XCIpO1xuXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChidG4xKTtcbiAgICBidG4xLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBkaXNwbGF5UGxheWVyVlNBSUZvcm0oKTtcbiAgICB9KTtcbiAgICBjb25zdCBidG4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4yLnRleHRDb250ZW50ID0gXCJQTEFZRVIgVlMgUExBWUVSXCI7XG4gICAgYnRuMi5kaXNhYmxlZCA9IHRydWU7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChidG4yKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlSYW5kb21PckN1c3RvbSA9ICgpID0+IHtcbiAgICBtYWluLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChnb1RvTWFpbik7XG5cbiAgICBjb25zdCBidG4xID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBjb25zdCBwYXJhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgcGFyYS5jbGFzc0xpc3QuYWRkKFwicGFyYVwiKTtcbiAgICBwYXJhLnRleHRDb250ZW50ID0gXCJIT1cgRE8gWU9VIFdBTlQgVE8gUExBQ0UgU0hJUFM/XCI7XG4gICAgYnRuMS50ZXh0Q29udGVudCA9IFwiUkFORE9NXCI7XG4gICAgYnRuMS5jbGFzc0xpc3QuYWRkKFwibWFpbi1idG5cIik7XG4gICAgYnRuMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZGlzcGxheVJhbmRvbVNoaXBQbGFjaW5nKGdhbWUucGxheWVyKTtcbiAgICB9KTtcbiAgICBjb25zdCBidG4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4yLnRleHRDb250ZW50ID0gXCJDVVNUT01cIjtcbiAgICBidG4yLmNsYXNzTGlzdC5hZGQoXCJtYWluLWJ0blwiKTtcbiAgICBidG4yLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBkaXNwbGF5Q3VzdG9tU2hpcFBsYWNpbmcoZ2FtZS5wbGF5ZXIsIDApO1xuICAgIH0pO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQocGFyYSk7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChidG4xKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGJ0bjIpO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlQbGF5ZXJWU0FJRm9ybSA9ICgpID0+IHtcbiAgICBtYWluLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChnb1RvTWFpbik7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiZm9ybV9fd3JhcHBlclwiKTtcblxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKTtcblxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gXCJFTlRFUiBZT1VSIE5BTUU6XCI7XG4gICAgbGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwibmFtZVwiKTtcblxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnR5cGUgPSBcInRleHRcIjtcbiAgICBpbnB1dC5uYW1lID0gXCJuYW1lXCI7XG4gICAgaW5wdXQuaWQgPSBcIm5hbWVcIjtcblxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgYnRuLnRleHRDb250ZW50ID0gXCJTVEFSVFwiO1xuICAgIGlmIChpbnB1dC52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcbiAgICAgIGlmIChpbnB1dC52YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBnYW1lLnBsYXllci5uYW1lID0gaW5wdXQudmFsdWU7XG4gICAgICBkaXNwbGF5UmFuZG9tT3JDdXN0b20oKTtcbiAgICB9KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGlucHV0KTtcbiAgICBmb3JtLmFwcGVuZENoaWxkKGJ0bik7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChmb3JtKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BsYXlSYW5kb21TaGlwUGxhY2luZyA9IChwbGF5ZXIpID0+IHtcbiAgICBtYWluLmlubmVySFRNTCA9IFwiXCI7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChnb1RvTWFpbik7XG5cbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9uc19fd3JhcHBlclwiKTtcblxuICAgIGNvbnN0IHN0YXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBzdGFydC50ZXh0Q29udGVudCA9IFwiU1RBUlRcIjtcbiAgICBzdGFydC5jbGFzc0xpc3QuYWRkKFwibWFpbi1idG5cIik7XG4gICAgZGl2LmFwcGVuZENoaWxkKHN0YXJ0KTtcbiAgICBzdGFydC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZGlzcGxheUJvYXJkcygpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmFuZG9taXplID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICByYW5kb21pemUudGV4dENvbnRlbnQgPSBcIlJBTkRPTUlaRVwiO1xuICAgIHJhbmRvbWl6ZS5jbGFzc0xpc3QuYWRkKFwibWFpbi1idG5cIik7XG4gICAgcmFuZG9taXplLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBkaXNwbGF5UmFuZG9tU2hpcFBsYWNpbmcocGxheWVyKTtcbiAgICB9KTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQocmFuZG9taXplKTtcbiAgICBtYWluLmFwcGVuZENoaWxkKGRpdik7XG5cbiAgICBnYW1lLnB1dFJhbmRvbVNoaXBzKHBsYXllcik7XG4gICAgY29uc3Qgc2hpcHMgPSBnYW1lLnN0YXJ0aW5nU2hpcHM7XG4gICAgbWFpbi5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICBcImJlZm9yZWVuZFwiLFxuICAgICAgbWFya3Vwcy5nZXRHYW1lYm9hcmQoXG4gICAgICAgIHBsYXllci5nYW1lQm9hcmQsXG4gICAgICAgIGAke3BsYXllci5uYW1lfSBib2FyZGAsXG4gICAgICAgIFwiUExBWUVSMVwiLFxuICAgICAgICB0cnVlXG4gICAgICApXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBkaXNwbGF5Q3VzdG9tU2hpcFBsYWNpbmcgPSAocGxheWVyLCBpbmRleCkgPT4ge1xuICAgIG1haW4uaW5uZXJIVE1MID0gXCJcIjtcbiAgICBtYWluLmFwcGVuZENoaWxkKGdvVG9NYWluKTtcblxuICAgIGNvbnN0IHNoaXBzID0gZ2FtZS5zdGFydGluZ1NoaXBzO1xuICAgIG1haW4uaW5zZXJ0QWRqYWNlbnRIVE1MKFxuICAgICAgXCJiZWZvcmVlbmRcIixcbiAgICAgIG1hcmt1cHMuZ2V0R2FtZWJvYXJkKFxuICAgICAgICBwbGF5ZXIuZ2FtZUJvYXJkLFxuICAgICAgICBgJHtwbGF5ZXIubmFtZX0gYm9hcmRgLFxuICAgICAgICBcIlBMQVlFUjFcIixcbiAgICAgICAgdHJ1ZVxuICAgICAgKVxuICAgICk7XG4gICAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRfY29udGFpbmVyXCIpO1xuXG4gICAgaWYgKGluZGV4ID49IGdhbWUuc3RhcnRpbmdTaGlwcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICBidG4uY2xhc3NMaXN0LmFkZChcIm1haW4tYnRuXCIpO1xuICAgICAgYnRuLnRleHRDb250ZW50ID0gXCJTVEFSVFwiO1xuICAgICAgbWFpbi5pbnNlcnRCZWZvcmUoYnRuLCBnYW1lYm9hcmQucGFyZW50RWxlbWVudCk7XG4gICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgZGlzcGxheUJvYXJkcygpO1xuICAgICAgfSk7XG5cbiAgICAgIGdhbWVib2FyZC5jbGFzc0xpc3QucmVtb3ZlKFwiY3Vyc29yLXBvaW50ZXJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBob3ZlckFycmF5ID0gW107XG4gICAgICBsZXQgY2xhc3NOYW1lO1xuICAgICAgbGV0IGFibGVUb1BsYWNlO1xuICAgICAgbGV0IGF4aXM7XG4gICAgICBsZXQgY3VyciA9IHNoaXBzW2luZGV4XTtcbiAgICAgIGNvbnN0IGluZm9UZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICBpbmZvVGV4dC50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7Y3Vyci5uYW1lfWA7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJpbmZvVGV4dF9fd3JhcHBlclwiKTtcbiAgICAgIGRpdi5hcHBlbmRDaGlsZChpbmZvVGV4dCk7XG5cbiAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgbGFiZWwuY2xhc3NMaXN0LmFkZChcInRvZ2dsZVwiKTtcblxuICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG5cbiAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZChcImxhYmVsc1wiKTtcbiAgICAgIHNwYW4uc2V0QXR0cmlidXRlKFwiZGF0YS1vblwiLCBcIllcIik7XG4gICAgICBzcGFuLnNldEF0dHJpYnV0ZShcImRhdGEtb2ZmXCIsIFwiWFwiKTtcblxuICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgbGFiZWwuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgICBkaXYuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgICAgbWFpbi5pbnNlcnRCZWZvcmUoZGl2LCBnYW1lYm9hcmQucGFyZW50RWxlbWVudCk7XG4gICAgICBnYW1lYm9hcmQuY2xhc3NMaXN0LmFkZChcImN1cnNvci1wb2ludGVyXCIpO1xuICAgICAgZ2FtZWJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgaG92ZXJBcnJheSA9IFtdO1xuICAgICAgICBheGlzID0gaW5wdXQuY2hlY2tlZCA/IFwieVwiIDogXCJ4XCI7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pbmRleCk7XG4gICAgICAgICAgaSA8XG4gICAgICAgICAgTnVtYmVyKGUudGFyZ2V0LmRhdGFzZXQuaW5kZXgpICtcbiAgICAgICAgICAgIChpbnB1dC5jaGVja2VkID8gY3Vyci5sZW5ndGggKiAxMCA6IGN1cnIubGVuZ3RoKTtcbiAgICAgICAgICBpbnB1dC5jaGVja2VkID8gKGkgKz0gMTApIDogaSsrXG4gICAgICAgICkge1xuICAgICAgICAgIGhvdmVyQXJyYXkucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBhYmxlVG9QbGFjZSA9XG4gICAgICAgICAgIXBsYXllci5nYW1lQm9hcmQuY2hlY2tJZkNvbGxpZGVkKGhvdmVyQXJyYXkpICYmXG4gICAgICAgICAgIXBsYXllci5nYW1lQm9hcmQuY2hlY2tJZk11bHRpcGxlTGluZXMoaG92ZXJBcnJheSwgYXhpcyk7XG4gICAgICAgIGNsYXNzTmFtZSA9IGFibGVUb1BsYWNlID8gXCJwbGFjZXNoaXBcIiA6IFwiY29sbGlkaW5nXCI7XG5cbiAgICAgICAgaG92ZXJBcnJheS5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaW5kZXg9JyR7ZWx9J11gKTtcbiAgICAgICAgICBpZiAocXVlcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHF1ZXJ5LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBsZXQgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdhbWVib2FyZF9jZWxsXCIpO1xuICAgICAgY2VsbHMgPSBBcnJheS5mcm9tKGNlbGxzKTtcbiAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+XG4gICAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGUpID0+IHtcbiAgICAgICAgICBob3ZlckFycmF5LmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWluZGV4PScke2VsfSddYCk7XG4gICAgICAgICAgICBpZiAocXVlcnkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgcXVlcnkuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIGdhbWVib2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgaWYgKGFibGVUb1BsYWNlICYmIGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImdhbWVib2FyZF9jZWxsXCIpKSB7XG4gICAgICAgICAgcGxheWVyLmdhbWVCb2FyZC5wbGFjZVNoaXAoXG4gICAgICAgICAgICBOdW1iZXIoZS50YXJnZXQuZGF0YXNldC5pbmRleCksXG4gICAgICAgICAgICBuZXcgU2hpcChjdXJyLm5hbWUpLFxuICAgICAgICAgICAgYXhpcyxcbiAgICAgICAgICAgIGN1cnIubGVuZ3RoXG4gICAgICAgICAgKTtcbiAgICAgICAgICBkaXNwbGF5Q3VzdG9tU2hpcFBsYWNpbmcocGxheWVyLCBpbmRleCArIDEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGdhbWVFbmRNb2RhbCA9ICgpID0+IHtcbiAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwic2hvdy1tb2RhbFwiKTtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbW9kYWwuY2xhc3NMaXN0LmFkZChcIm1vZGFsXCIpO1xuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKFwibW9kYWxfX2hlYWRlclwiKTtcbiAgICBoZWFkZXIudGV4dENvbnRlbnQgPSBgJHtcbiAgICAgIGdhbWUuY29tcHV0ZXIuZ2FtZUJvYXJkLmlzQWxsU3VuaygpXG4gICAgICAgID8gZ2FtZS5wbGF5ZXIubmFtZVxuICAgICAgICA6IGdhbWUuY29tcHV0ZXIubmFtZVxuICAgIH0gaGFzIHdvbiFgO1xuICAgIG1vZGFsLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBidG4udGV4dENvbnRlbnQgPSBcIlBMQVkgQUdBSU5cIjtcbiAgICBidG4uY2xhc3NMaXN0LmFkZChcIm1haW4tYnRuXCIpO1xuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZ2FtZS5pbml0KHBsYXllciwgY29tcHV0ZXIpO1xuICAgICAgZGlzcGxheVJhbmRvbU9yQ3VzdG9tKCk7XG4gICAgICBtb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwic2hvdy1tb2RhbFwiKTtcbiAgICAgIG1vZGFsQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgfSk7XG4gICAgbW9kYWwuYXBwZW5kQ2hpbGQoYnRuKTtcbiAgICBtb2RhbENvbnRhaW5lci5hcHBlbmRDaGlsZChtb2RhbCk7XG4gIH07XG5cbiAgcmV0dXJuIHsgaW5pdCB9O1xufSkoKTtcbmV4cG9ydCB7IGRvbSB9O1xuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZUJvYXJkXCI7XG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5jb25zdCBnYW1lID0gKCgpID0+IHtcbiAgY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihcIkVsdmluYXNcIik7XG4gIGNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcihcIkFJXCIpO1xuICBjb25zdCBzdGFydGluZ1NoaXBzID0gW1xuICAgIHsgbmFtZTogXCJDYXJyaWVyXCIsIGxlbmd0aDogNSB9LFxuICAgIHsgbmFtZTogXCJCYXR0bGVzaGlwXCIsIGxlbmd0aDogNCB9LFxuICAgIHsgbmFtZTogXCJDcnVpc2VyXCIsIGxlbmd0aDogMyB9LFxuICAgIHsgbmFtZTogXCJTdWJtYXJpbmVcIiwgbGVuZ3RoOiAzIH0sXG4gICAgeyBuYW1lOiBcIkRlc3Ryb3llclwiLCBsZW5ndGg6IDIgfSxcbiAgXTtcblxuICBjb25zdCBwdXRSYW5kb21TaGlwcyA9IChwbGF5ZXIpID0+IHtcbiAgICBwbGF5ZXIuZ2FtZUJvYXJkLnNoaXBzID0gW107XG4gICAgY29uc3QgYXhsZXMgPSBbXCJ4XCIsIFwieVwiXTtcbiAgICBsZXQgY3VyckF4aXMgPSBcInhcIjtcbiAgICBsZXQgcmFuZG9tTnVtO1xuICAgIGxldCBhcnJheSA9IFtdO1xuICAgIHN0YXJ0aW5nU2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgd2hpbGUgKFxuICAgICAgICBhcnJheS5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgcGxheWVyLmdhbWVCb2FyZC5jaGVja0lmQ29sbGlkZWQoYXJyYXkpIHx8XG4gICAgICAgIHBsYXllci5nYW1lQm9hcmQuY2hlY2tJZk11bHRpcGxlTGluZXMoYXJyYXksIGN1cnJBeGlzKVxuICAgICAgKSB7XG4gICAgICAgIGFycmF5ID0gW107XG4gICAgICAgIGN1cnJBeGlzID0gYXhsZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXhsZXMubGVuZ3RoKV07XG4gICAgICAgIHJhbmRvbU51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCk7XG4gICAgICAgIGZvciAoXG4gICAgICAgICAgbGV0IGkgPSByYW5kb21OdW07XG4gICAgICAgICAgaSA8IHJhbmRvbU51bSArIChjdXJyQXhpcyA9PT0gXCJ5XCIgPyBzaGlwLmxlbmd0aCAqIDEwIDogc2hpcC5sZW5ndGgpO1xuICAgICAgICAgIGN1cnJBeGlzID09PSBcInlcIiA/IChpICs9IDEwKSA6IGkrK1xuICAgICAgICApIHtcbiAgICAgICAgICBhcnJheS5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBwbGF5ZXIuZ2FtZUJvYXJkLnBsYWNlU2hpcChcbiAgICAgICAgcmFuZG9tTnVtLFxuICAgICAgICBuZXcgU2hpcChzaGlwLm5hbWUpLFxuICAgICAgICBjdXJyQXhpcyxcbiAgICAgICAgc2hpcC5sZW5ndGhcbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBwbGF5ZXIuZ2FtZUJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuICAgIGNvbXB1dGVyLmdhbWVCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICBwdXRSYW5kb21TaGlwcyhjb21wdXRlcik7XG4gIH07XG5cbiAgcmV0dXJuIHsgaW5pdCwgcGxheWVyLCBjb21wdXRlciwgc3RhcnRpbmdTaGlwcywgcHV0UmFuZG9tU2hpcHMgfTtcbn0pKCk7XG5leHBvcnQgeyBnYW1lIH07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wbHVzcGx1cyAqL1xuXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvYXJkID0gW107XG4gICAgdGhpcy5zaGlwcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIHRoaXMuYm9hcmQucHVzaChmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgcGxhY2VTaGlwKGNvb3JkLCBzaGlwLCBheGlzLCBsZW5ndGgpIHtcbiAgICBsZXQgdGVtcCA9IGNvb3JkO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIHNoaXAubG9jYXRpb24ucHVzaCh0ZW1wKTtcbiAgICAgIHRlbXAgKz0gYXhpcy50b0xvd2VyQ2FzZSgpID09PSBcInhcIiA/IDEgOiAxMDtcbiAgICB9XG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhjb29yZCkge1xuICAgIHRoaXMuYm9hcmRbY29vcmRdID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5pc1NoaXAoY29vcmQpKSB7XG4gICAgICB0aGlzLmhpdFNoaXAoY29vcmQpO1xuICAgIH1cbiAgfVxuXG4gIGlzU2hpcChjb29yZCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBzLnNvbWUoKHgpID0+IHgubG9jYXRpb24uaW5jbHVkZXMoY29vcmQpKTtcbiAgfVxuXG4gIGhpdFNoaXAoY29vcmQpIHtcbiAgICB0aGlzLnNoaXBzLmZpbmQoKHgpID0+IHgubG9jYXRpb24uaW5jbHVkZXMoY29vcmQpKS5oaXRzLnB1c2goY29vcmQpO1xuICB9XG5cbiAgaXNBbGxTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBzLmV2ZXJ5KCh4KSA9PiB4LmlzU3VuaygpKTtcbiAgfVxuXG4gIGdldFNoaXBzQ29vcmRzKCkge1xuICAgIGNvbnN0IGFyciA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLmlzU2hpcChpKSkgYXJyLnB1c2goaSk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBjaGVja0lmQ29sbGlkZWQoY29vcmRBcnJheSkge1xuICAgIHJldHVybiBjb29yZEFycmF5LnNvbWUoKHgpID0+XG4gICAgICB0aGlzLnNoaXBzLnNvbWUoKHNoaXApID0+IHNoaXAubG9jYXRpb24uaW5jbHVkZXMoeCkpXG4gICAgKTtcbiAgfVxuXG4gIGNoZWNrSWZNdWx0aXBsZUxpbmVzKGNvb3JkQXJyYXksIGF4aXMpIHtcbiAgICBpZiAoYXhpcyA9PT0gXCJ4XCIpIHtcbiAgICAgIGNvbnN0IHJlcyA9IE1hdGguZmxvb3IoY29vcmRBcnJheVswXSAvIDEwKTtcbiAgICAgIHJldHVybiAhKFxuICAgICAgICBjb29yZEFycmF5Lmxlbmd0aCA9PT1cbiAgICAgICAgY29vcmRBcnJheS5maWx0ZXIoKHgpID0+IE1hdGguZmxvb3IoeCAvIDEwKSA9PT0gcmVzKS5sZW5ndGhcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChheGlzID09PSBcInlcIikge1xuICAgICAgY29uc3QgcmVzID0gY29vcmRBcnJheVswXSAlIDEwO1xuICAgICAgcmV0dXJuICEoXG4gICAgICAgIGNvb3JkQXJyYXkubGVuZ3RoID09PSBjb29yZEFycmF5LmZpbHRlcigoeCkgPT4geCAlIDEwID09PSByZXMpLmxlbmd0aCAmJlxuICAgICAgICAhY29vcmRBcnJheS5zb21lKCh4KSA9PiB4ID4gMTAwKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiY29uc3QgbWFya3VwcyA9ICgoKSA9PiB7XG4gIGxldCBjb3VudGVyID0gMDtcbiAgY29uc3QgZ2V0R2FtZWJvYXJkID0gKGdhbWVib2FyZCwgaGVhZGVyLCBpZCwgdG9TZWVTaGlwcykgPT4ge1xuICAgIGxldCBzaGlwc0FycmF5ID0gW107XG4gICAgY291bnRlciA9IDA7XG4gICAgY29uc3QgZ2FtZUJvYXJkQ2VsbHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZ2FtZWJvYXJkLmJvYXJkLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxMCkge1xuICAgICAgZ2FtZUJvYXJkQ2VsbHMucHVzaChnYW1lYm9hcmQuYm9hcmQuc2xpY2UoaSwgaSArIDEwKSk7XG4gICAgfVxuICAgIHNoaXBzQXJyYXkgPSBnYW1lYm9hcmQuZ2V0U2hpcHNDb29yZHMoKTtcbiAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJ3cmFwcGVyXCI+PGgyPiR7aGVhZGVyfTwvaDI+PGRpdiBjbGFzcz1cImdhbWVib2FyZF9jb250YWluZXJcIiBpZD1cIiR7aWR9XCI+JHtnYW1lQm9hcmRDZWxsc1xuICAgICAgLm1hcCgobGluZSkgPT4gZ2FtZWJvYXJkTGluZU1hcmt1cChsaW5lLCBzaGlwc0FycmF5LCB0b1NlZVNoaXBzKSlcbiAgICAgIC5qb2luKFwiXCIpfTwvZGl2PjwvZGl2PmA7XG4gIH07XG4gIGNvbnN0IGdhbWVib2FyZExpbmVNYXJrdXAgPSAobGluZSwgc2hpcHNBcnJheSwgdG9TZWVTaGlwcykgPT5cbiAgICBgPGRpdiBjbGFzcz1cImdhbWVib2FyZF9saW5lXCI+JHtsaW5lXG4gICAgICAubWFwKFxuICAgICAgICAoY2VsbCkgPT5cbiAgICAgICAgICBgJHtnYW1lYm9hcmRDZWxsTWFya3VwKFxuICAgICAgICAgICAgc2hpcHNBcnJheS5pbmNsdWRlcyhjb3VudGVyKSxcbiAgICAgICAgICAgIGNlbGwsXG4gICAgICAgICAgICB0b1NlZVNoaXBzXG4gICAgICAgICAgKX1gXG4gICAgICApXG4gICAgICAuam9pbihcIlwiKX08L2Rpdj5gO1xuXG4gIGNvbnN0IGdhbWVib2FyZENlbGxNYXJrdXAgPSAoc2hpcCwgaGl0LCB0b1NlZVNoaXBzKSA9PiB7XG4gICAgY291bnRlciArPSAxO1xuICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImdhbWVib2FyZF9jZWxsICR7c2hpcCAmJiB0b1NlZVNoaXBzID8gXCJzaGlwXCIgOiBcIlwifSAke1xuICAgICAgaGl0ID8gXCJoaXRcIiA6IFwiXCJcbiAgICB9ICR7IXRvU2VlU2hpcHMgJiYgc2hpcCAmJiBoaXQgPyBcImVuZW15LXNoaXAtaGl0XCIgOiBcIlwifVwiIGRhdGEtaW5kZXg9XCIke1xuICAgICAgY291bnRlciAtIDFcbiAgICB9XCI+PC9kaXY+YDtcbiAgfTtcblxuICByZXR1cm4geyBnZXRHYW1lYm9hcmQgfTtcbn0pKCk7XG5leHBvcnQgeyBtYXJrdXBzIH07XG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVCb2FyZFwiO1xuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5nYW1lQm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG4gIH1cblxuICBhdHRhY2soZW5lbXksIGxvY2F0aW9uKSB7XG4gICAgZW5lbXkuZ2FtZUJvYXJkLnJlY2VpdmVBdHRhY2sobG9jYXRpb24pO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJjbGFzcyBTaGlwIHtcbiAgY29uc3RydWN0b3IobmFtZSwgbG9jYXRpb24gPSBbXSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uO1xuICAgIHRoaXMuaGl0cyA9IFtdO1xuICB9XG5cbiAgaGl0KGluZGV4KSB7XG4gICAgdGhpcy5oaXRzLnB1c2goaW5kZXgpO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLmxvY2F0aW9uLmV2ZXJ5KChjZWxsKSA9PiB0aGlzLmhpdHMuaW5jbHVkZXMoY2VsbCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVJvYm90bzp3Z2h0QDQwMDs3MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICBwYWRkaW5nOiAwO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMGMwYTNlO1xcbiAgY29sb3I6ICNlZWU7XFxuICBmb250LWZhbWlseTogXFxcIlJvYm90b1xcXCIsIHNhbnMtc2VyaWY7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIG1heC13aWR0aDogMTAwdnc7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXG4gIG1heC13aWR0aDogMTAwdnc7XFxufVxcbmhlYWRlcixcXG5mb290ZXIge1xcbiAgaGVpZ2h0OiA4MHB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM4MzY2MztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBnYXA6IDIwcHg7XFxuICB3aWR0aDogMTAwJTtcXG59XFxubWFpbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxMHB4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTYwcHgpO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG59XFxuLmdhbWVib2FyZHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMjBweDtcXG59XFxuLndyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAyMHB4O1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbn1cXG4uZ2FtZWJvYXJkX2NvbnRhaW5lciB7XFxuICB3aWR0aDogNTUwcHg7XFxuICBoZWlnaHQ6IDU1MHB4O1xcbn1cXG4uZ2FtZWJvYXJkX2xpbmUge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgaGVpZ2h0OiAxMCU7XFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcbn1cXG4uZ2FtZWJvYXJkX2NlbGwge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuLnNoaXAsXFxuLnBsYWNlc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBncmVlbjtcXG59XFxuLmNvbGxpZGluZyB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTg3LCA1OSwgNTkpO1xcbn1cXG4uaGl0OjphZnRlciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG4gIHdpZHRoOiAxNXB4O1xcbiAgaGVpZ2h0OiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbi5lbmVteS1zaGlwLWhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNjUsIDIwLCAyMCk7XFxufVxcbmZvb3RlciB7XFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcbn1cXG5mb290ZXIgPiBhID4gaW1nOmhvdmVyIHtcXG4gIGZpbHRlcjogb3BhY2l0eSgwLjcpO1xcbn1cXG4ubW9kYWxfX2NvbnRhaW5lciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiAxO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDB2dztcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgb3BhY2l0eTogMDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjNzIGVhc2U7XFxufVxcbi5zaG93LW1vZGFsIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBwb2ludGVyLWV2ZW50czogYXV0bztcXG59XFxuXFxuLm1vZGFsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICB3aWR0aDogNjAwcHg7XFxuICBtYXgtd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAxNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAxMHB4O1xcbiAgei1pbmRleDogMTtcXG59XFxuLmdhbWVtb2Rlc19fd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMzBweDtcXG59XFxuLmdhbWVtb2Rlc19fd3JhcHBlciA+IHAsXFxuLnBhcmEge1xcbiAgZm9udC1zaXplOiAyLjVyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5cXG4uZ2FtZW1vZGVzX193cmFwcGVyID4gYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5idXR0b246aG92ZXI6bm90KDpkaXNhYmxlZCkge1xcbiAgb3BhY2l0eTogMC44O1xcbn1cXG5idXR0b24ge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgY29sb3I6ICNlZWU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2VlZTtcXG4gIHRyYW5zaXRpb246IDAuM3MgZWFzZTtcXG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XFxufVxcbmJ1dHRvbjpkaXNhYmxlZCB7XFxuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXG59XFxuZm9ybSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDEwcHg7XFxufVxcbmZvcm0gPiBsYWJlbCB7XFxuICBmb250LXNpemU6IDJyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5mb3JtID4gaW5wdXQge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbn1cXG5mb3JtID4gYnV0dG9uIHtcXG4gIHBhZGRpbmc6IDEwcHggMjBweDtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuLmN1cnNvci1wb2ludGVyIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLm1haW4tYnRuIHtcXG4gIGZvbnQtc2l6ZTogMS4yNXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICBtaW4td2lkdGg6IDIwMHB4O1xcbn1cXG5cXG4uaW5mb1RleHRfX3dyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMjBweDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuLmluZm9UZXh0X193cmFwcGVyID4gcCB7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5cXG4uYnV0dG9uc19fd3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG4udG9nZ2xlIHtcXG4gIC0td2lkdGg6IDgwcHg7XFxuICAtLWhlaWdodDogY2FsYyh2YXIoLS13aWR0aCkgLyAzKTtcXG5cXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHdpZHRoOiB2YXIoLS13aWR0aCk7XFxuICBoZWlnaHQ6IDMwcHg7XFxuICBjb2xvcjogd2hpdGU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzgzNjYzO1xcbiAgYm94LXNoYWRvdzogMHB4IDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4udG9nZ2xlIGlucHV0IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi50b2dnbGUgLmxhYmVscyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlLWluLW91dDtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbi50b2dnbGUgLmxhYmVsczo6YWZ0ZXIge1xcbiAgY29udGVudDogYXR0cihkYXRhLW9mZik7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi50b2dnbGUgLmxhYmVsczo6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1vbik7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogY2FsYyh2YXIoLS13aWR0aCkgKiAtMSk7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4udG9nZ2xlIGlucHV0OmNoZWNrZWQgfiAubGFiZWxzOjphZnRlciB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgodmFyKC0td2lkdGgpKTtcXG59XFxuXFxuLnRvZ2dsZSBpbnB1dDpjaGVja2VkIH4gLmxhYmVsczo6YmVmb3JlIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCh2YXIoLS13aWR0aCkpO1xcbn1cXG4ubW9kYWxfX2hlYWRlciB7XFxuICBjb2xvcjogIzBjMGEzZTtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQ0E7RUFDRSxVQUFVO0VBQ1YsU0FBUztFQUNULHNC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Q0E7RUFDRSxhQUFhO0VBQ2IsZ0NBQWdDOztFQUVoQyxrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osWUFBWTtFQUNaLHlCQUF5QjtFQUN6QiwwQ0FBMEM7RUFDMUMsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0VBQ1osZUFBZTtFQUNmLGdDQUFnQztFQUNoQyxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLE1BQU07RUFDTixPQUFPO0VBQ1AsWUFBWTtFQUNaLFdBQVc7RUFDWCxnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLE1BQU07RUFDTiw2QkFBNkI7RUFDN0IsWUFBWTtFQUNaLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDO0FBQ0E7RUFDRSxjQUFjO0VBQ2QsZUFBZTtFQUNmLGdCQUFnQjtBQUNsQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybChcXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Sb2JvdG86d2dodEA0MDA7NzAwJmRpc3BsYXk9c3dhcFxcXCIpO1xcbioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzBjMGEzZTtcXG4gIGNvbG9yOiAjZWVlO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJSb2JvdG9cXFwiLCBzYW5zLXNlcmlmO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBtYXgtd2lkdGg6IDEwMHZ3O1xcbn1cXG5oZWFkZXIsXFxuZm9vdGVyIHtcXG4gIGhlaWdodDogODBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzODM2NjM7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgZ2FwOiAyMHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxufVxcbm1haW4ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMTBweDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDE2MHB4KTtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxufVxcbi5nYW1lYm9hcmRzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxufVxcbi53cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG59XFxuLmdhbWVib2FyZF9jb250YWluZXIge1xcbiAgd2lkdGg6IDU1MHB4O1xcbiAgaGVpZ2h0OiA1NTBweDtcXG59XFxuLmdhbWVib2FyZF9saW5lIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogMTAlO1xcbiAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXG59XFxuLmdhbWVib2FyZF9jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcbi5zaGlwLFxcbi5wbGFjZXNoaXAge1xcbiAgYmFja2dyb3VuZDogZ3JlZW47XFxufVxcbi5jb2xsaWRpbmcge1xcbiAgYmFja2dyb3VuZDogcmdiKDE4NywgNTksIDU5KTtcXG59XFxuLmhpdDo6YWZ0ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XFxuICB3aWR0aDogMTVweDtcXG4gIGhlaWdodDogMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG4uZW5lbXktc2hpcC1oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDY1LCAyMCwgMjApO1xcbn1cXG5mb290ZXIge1xcbiAgbWFyZ2luLXRvcDogYXV0bztcXG59XFxuZm9vdGVyID4gYSA+IGltZzpob3ZlciB7XFxuICBmaWx0ZXI6IG9wYWNpdHkoMC43KTtcXG59XFxuLm1vZGFsX19jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgei1pbmRleDogMTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIG9wYWNpdHk6IDA7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcyBlYXNlO1xcbn1cXG4uc2hvdy1tb2RhbCB7XFxuICBvcGFjaXR5OiAxO1xcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XFxufVxcblxcbi5tb2RhbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgd2lkdGg6IDYwMHB4O1xcbiAgbWF4LXdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMTVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMik7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMTBweDtcXG4gIHotaW5kZXg6IDE7XFxufVxcbi5nYW1lbW9kZXNfX3dyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDMwcHg7XFxufVxcbi5nYW1lbW9kZXNfX3dyYXBwZXIgPiBwLFxcbi5wYXJhIHtcXG4gIGZvbnQtc2l6ZTogMi41cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuXFxuLmdhbWVtb2Rlc19fd3JhcHBlciA+IGJ1dHRvbiB7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuYnV0dG9uOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcXG4gIG9wYWNpdHk6IDAuODtcXG59XFxuYnV0dG9uIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGNvbG9yOiAjZWVlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM4MzY2MztcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNlZWU7XFxuICB0cmFuc2l0aW9uOiAwLjNzIGVhc2U7XFxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xcbn1cXG5idXR0b246ZGlzYWJsZWQge1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxufVxcbmZvcm0ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAxMHB4O1xcbn1cXG5mb3JtID4gbGFiZWwge1xcbiAgZm9udC1zaXplOiAycmVtO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuZm9ybSA+IGlucHV0IHtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuZm9ybSA+IGJ1dHRvbiB7XFxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XFxufVxcbi5jdXJzb3ItcG9pbnRlciB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5tYWluLWJ0biB7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgcGFkZGluZzogMTBweCAyMHB4O1xcbiAgbWluLXdpZHRoOiAyMDBweDtcXG59XFxuXFxuLmluZm9UZXh0X193cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDIwcHg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5pbmZvVGV4dF9fd3JhcHBlciA+IHAge1xcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xcbiAgZm9udC13ZWlnaHQ6IDcwMDtcXG59XFxuXFxuLmJ1dHRvbnNfX3dyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMTBweDtcXG59XFxuLnRvZ2dsZSB7XFxuICAtLXdpZHRoOiA4MHB4O1xcbiAgLS1oZWlnaHQ6IGNhbGModmFyKC0td2lkdGgpIC8gMyk7XFxuXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB3aWR0aDogdmFyKC0td2lkdGgpO1xcbiAgaGVpZ2h0OiAzMHB4O1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM4MzY2MztcXG4gIGJveC1zaGFkb3c6IDBweCAxcHggM3B4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnRvZ2dsZSBpbnB1dCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4udG9nZ2xlIC5sYWJlbHMge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuNHMgZWFzZS1pbi1vdXQ7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbn1cXG5cXG4udG9nZ2xlIC5sYWJlbHM6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IGF0dHIoZGF0YS1vZmYpO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTAwJTtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjRzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4udG9nZ2xlIC5sYWJlbHM6OmJlZm9yZSB7XFxuICBjb250ZW50OiBhdHRyKGRhdGEtb24pO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IGNhbGModmFyKC0td2lkdGgpICogLTEpO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC40cyBlYXNlLWluLW91dDtcXG59XFxuXFxuLnRvZ2dsZSBpbnB1dDpjaGVja2VkIH4gLmxhYmVsczo6YWZ0ZXIge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKHZhcigtLXdpZHRoKSk7XFxufVxcblxcbi50b2dnbGUgaW5wdXQ6Y2hlY2tlZCB+IC5sYWJlbHM6OmJlZm9yZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgodmFyKC0td2lkdGgpKTtcXG59XFxuLm1vZGFsX19oZWFkZXIge1xcbiAgY29sb3I6ICMwYzBhM2U7XFxuICBmb250LXNpemU6IDJyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbnN0cnVjdG9yLCBcInByb3RvdHlwZVwiLCB7XG4gICAgd3JpdGFibGU6IGZhbHNlXG4gIH0pO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcbmltcG9ydCB7IGRvbSB9IGZyb20gXCIuL2RvbVwiO1xuXG5kb20uaW5pdCgpO1xuIl0sIm5hbWVzIjpbIkFJIiwiRmlsdGVyVW5TdW5rQ2VsbHMiLCJhcnJheSIsImVuZW15IiwiZmlsdGVyIiwiY2VsbCIsImdhbWVCb2FyZCIsImlzU2hpcCIsImN1cnJTaGlwIiwic2hpcHMiLCJmaW5kIiwic2hpcCIsImxvY2F0aW9uIiwiaW5jbHVkZXMiLCJpc1N1bmsiLCJEZXRlY3RTaGlwcyIsInVuc3Vua0NlbGxzIiwiZGV0ZWN0ZWQiLCJpbmRleCIsIkF0dGFja0RldGVjdGVkU2hpcCIsImRldGVjdGVkU2hpcHMiLCJlbXB0eUNlbGxzIiwiYXhpcyIsImF2YWlsYWJsZVNob3RzIiwicHVzaCIsInJpZ2h0U2lkZSIsIk1hdGgiLCJmbG9vciIsImFib3ZlIiwiYmVsb3ciLCJmaWx0ZXJlZEF2YWlsYWJsZVNob3RzIiwic2hvdCIsImxlbmd0aCIsInJhbmRvbSIsIkF0dGFja1NvbG9IaXQiLCJoaXRDZWxscyIsImZpcnN0U2hvdCIsImxlZnRTaG90IiwicmlnaHRTaG90IiwiYWJvdmVTaG90IiwiYmVsb3dTaG90IiwiQXR0YWNrUmFuZG9tIiwiYmFkU2hvdHMiLCJmb3JFYWNoIiwiaW5kZXhPZiIsIkF0dGFjayIsImJvYXJkIiwiaGl0IiwiYXR0YWNrIiwiZ2FtZSIsIm1hcmt1cHMiLCJQbGF5ZXIiLCJTaGlwIiwiZG9tIiwicGxheWVyIiwiY29tcHV0ZXIiLCJtYWluIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibW9kYWxDb250YWluZXIiLCJnb1RvTWFpbiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0ZXh0Q29udGVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0IiwicGxheWVyMUJvYXJkIiwicGxheWVyMkJvYXJkIiwiZGlzcGxheUdhbWVNb2RlcyIsImRpc3BsYXlCb2FyZHMiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsImdhbWVib2FyZHMiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJnZXRHYW1lYm9hcmQiLCJuYW1lIiwiZ2V0RWxlbWVudEJ5SWQiLCJlIiwidGFyZ2V0IiwiY29udGFpbnMiLCJyZWNlaXZlQXR0YWNrIiwiTnVtYmVyIiwiZGF0YXNldCIsImlzQWxsU3VuayIsImdhbWVFbmRNb2RhbCIsIndyYXBwZXIiLCJoZWFkZXIiLCJidG4xIiwiZGlzcGxheVBsYXllclZTQUlGb3JtIiwiYnRuMiIsImRpc2FibGVkIiwiZGlzcGxheVJhbmRvbU9yQ3VzdG9tIiwicGFyYSIsImRpc3BsYXlSYW5kb21TaGlwUGxhY2luZyIsImRpc3BsYXlDdXN0b21TaGlwUGxhY2luZyIsImZvcm0iLCJsYWJlbCIsInNldEF0dHJpYnV0ZSIsImlucHV0IiwidHlwZSIsImlkIiwiYnRuIiwidmFsdWUiLCJkaXYiLCJzdGFydCIsInJhbmRvbWl6ZSIsInB1dFJhbmRvbVNoaXBzIiwic3RhcnRpbmdTaGlwcyIsImdhbWVib2FyZCIsImluc2VydEJlZm9yZSIsInBhcmVudEVsZW1lbnQiLCJyZW1vdmUiLCJob3ZlckFycmF5IiwiY2xhc3NOYW1lIiwiYWJsZVRvUGxhY2UiLCJjdXJyIiwiaW5mb1RleHQiLCJzcGFuIiwiY2hlY2tlZCIsImkiLCJjaGVja0lmQ29sbGlkZWQiLCJjaGVja0lmTXVsdGlwbGVMaW5lcyIsImVsIiwicXVlcnkiLCJjZWxscyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJBcnJheSIsImZyb20iLCJwbGFjZVNoaXAiLCJtb2RhbCIsIkdhbWVib2FyZCIsImF4bGVzIiwiY3VyckF4aXMiLCJyYW5kb21OdW0iLCJjb29yZCIsInRlbXAiLCJ0b0xvd2VyQ2FzZSIsImhpdFNoaXAiLCJzb21lIiwieCIsImhpdHMiLCJldmVyeSIsImFyciIsImNvb3JkQXJyYXkiLCJyZXMiLCJjb3VudGVyIiwidG9TZWVTaGlwcyIsInNoaXBzQXJyYXkiLCJnYW1lQm9hcmRDZWxscyIsImxlbiIsInNsaWNlIiwiZ2V0U2hpcHNDb29yZHMiLCJtYXAiLCJsaW5lIiwiZ2FtZWJvYXJkTGluZU1hcmt1cCIsImpvaW4iLCJnYW1lYm9hcmRDZWxsTWFya3VwIl0sInNvdXJjZVJvb3QiOiIifQ==