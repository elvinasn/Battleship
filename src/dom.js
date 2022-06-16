import { game } from "./game";
import { markups } from "./markups";
import Player from "./player";
import { AI } from "./ai";
import Ship from "./ship";
const dom = (() => {
  const player = new Player("Elvinas");
  const computer = new Player("AI");
  const main = document.querySelector("main");
  const modalContainer = document.querySelector("#modal-container");
  const goToMain = document.createElement("button");
  goToMain.classList.add("main-btn");
  goToMain.textContent = "GO TO MAIN SCREEN";
  goToMain.addEventListener("click", () => {
    init();
  });
  let player1Board;
  let player2Board;

  const init = () => {
    game.init(player, computer);
    displayGameModes();
  };
  const displayBoards = () => {
    main.innerHTML = "";

    main.appendChild(goToMain);
    const gameboards = document.createElement("div");
    gameboards.classList.add("gameboards");
    gameboards.insertAdjacentHTML(
      "afterbegin",
      markups.getGameboard(
        game.player.gameBoard,
        `${game.player.name} board`,
        "PLAYER1",
        true
      )
    );
    gameboards.insertAdjacentHTML(
      "beforeEnd",
      markups.getGameboard(
        game.computer.gameBoard,
        `${game.computer.name} board`,
        "PLAYER2",
        false
      )
    );
    main.appendChild(gameboards);
    player1Board = document.getElementById("PLAYER1");
    player2Board = document.getElementById("PLAYER2");
    player2Board.classList.add("cursor-pointer");
    player2Board.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("hit") &&
        e.target.classList.contains("gameboard_cell")
      ) {
        game.computer.gameBoard.receiveAttack(Number(e.target.dataset.index));
        displayBoards();
        if (game.computer.gameBoard.isAllSunk()) {
          gameEndModal();
          return;
        }

        let attack = AI.Attack(game.player);
        game.player.gameBoard.receiveAttack(attack);
        if (game.player.gameBoard.isAllSunk()) {
          gameEndModal();
        }
        displayBoards();
      }
    });
  };

  const displayGameModes = () => {
    main.innerHTML = "";
    const wrapper = document.createElement("div");
    wrapper.classList.add("gamemodes__wrapper");
    const header = document.createElement("p");
    header.textContent = "SELECT GAME MODE";
    wrapper.appendChild(header);

    const btn1 = document.createElement("button");
    btn1.textContent = "PLAYER VS AI";
    btn1.classList.add("btn");
    btn1.classList.add("btn-primary");

    wrapper.appendChild(btn1);
    btn1.addEventListener("click", () => {
      displayPlayerVSAIForm();
    });
    const btn2 = document.createElement("button");
    btn2.textContent = "PLAYER VS PLAYER";
    btn2.disabled = true;
    wrapper.appendChild(btn2);
    main.appendChild(wrapper);
  };

  const displayRandomOrCustom = () => {
    main.innerHTML = "";
    main.appendChild(goToMain);

    const btn1 = document.createElement("button");
    const para = document.createElement("p");
    para.classList.add("para");
    para.textContent = "HOW DO YOU WANT TO PLACE SHIPS?";
    btn1.textContent = "RANDOM";
    btn1.classList.add("main-btn");
    btn1.addEventListener("click", () => {
      displayRandomShipPlacing(game.player);
    });
    const btn2 = document.createElement("button");
    btn2.textContent = "CUSTOM";
    btn2.classList.add("main-btn");
    btn2.addEventListener("click", () => {
      displayCustomShipPlacing(game.player, 0);
    });
    main.appendChild(para);
    main.appendChild(btn1);
    main.appendChild(btn2);
  };

  const displayPlayerVSAIForm = () => {
    main.innerHTML = "";
    main.appendChild(goToMain);
    const wrapper = document.createElement("div");
    wrapper.classList.add("form__wrapper");

    const form = document.createElement("form");

    const label = document.createElement("label");
    label.textContent = "ENTER YOUR NAME:";
    label.setAttribute("for", "name");

    const input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.id = "name";

    const btn = document.createElement("button");
    btn.textContent = "START";
    if (input.value === "") {
      btn.disabled = true;
    }
    input.addEventListener("input", () => {
      if (input.value !== "") {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }
    });
    btn.addEventListener("click", () => {
      game.player.name = input.value;
      displayRandomOrCustom();
    });
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(btn);
    wrapper.appendChild(form);
    main.appendChild(wrapper);
  };

  const displayRandomShipPlacing = (player) => {
    main.innerHTML = "";
    main.appendChild(goToMain);

    const div = document.createElement("div");
    div.classList.add("buttons__wrapper");

    const start = document.createElement("button");
    start.textContent = "START";
    start.classList.add("main-btn");
    div.appendChild(start);
    start.addEventListener("click", () => {
      displayBoards();
    });

    const randomize = document.createElement("button");
    randomize.textContent = "RANDOMIZE";
    randomize.classList.add("main-btn");
    randomize.addEventListener("click", () => {
      displayRandomShipPlacing(player);
    });
    div.appendChild(randomize);
    main.appendChild(div);

    game.putRandomShips(player);
    const ships = game.startingShips;
    main.insertAdjacentHTML(
      "beforeend",
      markups.getGameboard(
        player.gameBoard,
        `${player.name} board`,
        "PLAYER1",
        true
      )
    );
  };

  const displayCustomShipPlacing = (player, index) => {
    main.innerHTML = "";
    main.appendChild(goToMain);

    const ships = game.startingShips;
    main.insertAdjacentHTML(
      "beforeend",
      markups.getGameboard(
        player.gameBoard,
        `${player.name} board`,
        "PLAYER1",
        true
      )
    );
    const gameboard = document.querySelector(".gameboard_container");

    if (index >= game.startingShips.length) {
      const btn = document.createElement("button");
      btn.classList.add("main-btn");
      btn.textContent = "START";
      main.insertBefore(btn, gameboard.parentElement);
      btn.addEventListener("click", () => {
        displayBoards();
      });

      gameboard.classList.remove("cursor-pointer");
    } else {
      let hoverArray = [];
      let className;
      let ableToPlace;
      let axis;
      let curr = ships[index];
      const infoText = document.createElement("p");
      infoText.textContent = `Place your ${curr.name}`;
      const div = document.createElement("div");
      div.classList.add("infoText__wrapper");
      div.appendChild(infoText);

      const label = document.createElement("label");
      label.classList.add("toggle");

      const input = document.createElement("input");
      input.setAttribute("type", "checkbox");

      const span = document.createElement("span");
      span.classList.add("labels");
      span.setAttribute("data-on", "Y");
      span.setAttribute("data-off", "X");

      label.appendChild(input);
      label.appendChild(span);
      div.appendChild(label);
      main.insertBefore(div, gameboard.parentElement);
      gameboard.classList.add("cursor-pointer");
      gameboard.addEventListener("mouseover", (e) => {
        hoverArray = [];
        axis = input.checked ? "y" : "x";
        for (
          let i = Number(e.target.dataset.index);
          i <
          Number(e.target.dataset.index) +
            (input.checked ? curr.length * 10 : curr.length);
          input.checked ? (i += 10) : i++
        ) {
          hoverArray.push(i);
        }
        ableToPlace =
          !player.gameBoard.checkIfCollided(hoverArray) &&
          !player.gameBoard.checkIfMultipleLines(hoverArray, axis);
        className = ableToPlace ? "placeship" : "colliding";

        hoverArray.forEach((el) => {
          const query = document.querySelector(`[data-index='${el}']`);
          if (query !== null) {
            query.classList.add(className);
          }
        });
      });
      let cells = document.querySelectorAll(".gameboard_cell");
      cells = Array.from(cells);
      cells.forEach((cell) =>
        cell.addEventListener("mouseleave", (e) => {
          hoverArray.forEach((el) => {
            const query = document.querySelector(`[data-index='${el}']`);
            if (query !== null) {
              query.classList.remove(className);
            }
          });
        })
      );
      gameboard.addEventListener("click", (e) => {
        if (ableToPlace && e.target.classList.contains("gameboard_cell")) {
          player.gameBoard.placeShip(
            Number(e.target.dataset.index),
            new Ship(curr.name),
            axis,
            curr.length
          );
          displayCustomShipPlacing(player, index + 1);
        }
      });
    }
  };
  const gameEndModal = () => {
    modalContainer.classList.add("show-modal");
    const modal = document.createElement("div");
    modal.classList.add("modal");
    const header = document.createElement("p");
    header.classList.add("modal__header");
    header.textContent = `${
      game.computer.gameBoard.isAllSunk()
        ? game.player.name
        : game.computer.name
    } has won!`;
    modal.appendChild(header);
    const btn = document.createElement("button");
    btn.textContent = "PLAY AGAIN";
    btn.classList.add("main-btn");
    btn.addEventListener("click", () => {
      game.init(player, computer);
      displayRandomOrCustom();
      modalContainer.classList.remove("show-modal");
      modalContainer.innerHTML = "";
    });
    modal.appendChild(btn);
    modalContainer.appendChild(modal);
  };

  return { init };
})();
export { dom };
