import { game } from "./game";
import { markups } from "./markups";
import Player from "./player";
import { helpers } from "./helpers";
import Ship from "./ship";
const dom = (() => {
  const player = new Player("Elvinas");
  const computer = new Player("AI");
  const main = document.querySelector("main");
  const modalContainer = document.querySelector("#modal-container");
  let player1Board;
  let guessesArray = [];
  let player2Board;

  const init = () => {
    for (let i = 0; i < 100; i++) {
      guessesArray.push(i);
    }
    game.init(player, computer);
    displayGameModes();
  };
  const displayBoards = () => {
    main.innerHTML = "";
    main.classList.remove("flex-y");
    main.insertAdjacentHTML(
      "afterbegin",
      markups.getGameboard(
        game.player.gameBoard,
        `${game.player.name} board`,
        "PLAYER1",
        true
      )
    );
    main.insertAdjacentHTML(
      "beforeEnd",
      markups.getGameboard(
        game.computer.gameBoard,
        `${game.computer.name} board`,
        "PLAYER2",
        false
      )
    );
    player1Board = document.getElementById("PLAYER1");
    player2Board = document.getElementById("PLAYER2");
    player2Board.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("hit") &&
        e.target.classList.contains("gameboard_cell")
      ) {
        game.computer.gameBoard.receiveAttack(Number(e.target.dataset.index));
        displayBoards();
        if (game.computer.gameBoard.isAllSunk()) {
          gameEndModal();
        }

        let random = helpers.randomGuess(guessesArray);
        guessesArray = guessesArray.filter((x) => x !== random);
        game.player.gameBoard.receiveAttack(random);

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

  const displayPlayerVSAIForm = () => {
    main.innerHTML = "";
    const form = document.createElement("form");

    const label = document.createElement("label");
    label.textContent = "Enter your name: ";
    label.setAttribute("for", "name");

    const input = document.createElement("input");
    input.type = "text";
    input.name = "name";
    input.id = "name";

    const btn = document.createElement("button");
    btn.textContent = "Start";
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
      displayShipPlacing(game.player, 0);
    });
    form.appendChild(label);
    form.appendChild(input);
    form.appendChild(btn);
    main.appendChild(form);
  };

  const displayShipPlacing = (player, index) => {
    main.innerHTML = "";
    main.classList.add("flex-y");
    const ships = game.startingShips;
    if (index >= game.startingShips.length) {
      const btn = document.createElement("button");
      btn.textContent = "Start";
      btn.addEventListener("click", () => {
        displayBoards();
      });
      main.appendChild(btn);
      main.insertAdjacentHTML(
        "beforeend",
        markups.getGameboard(
          player.gameBoard,
          `${player.name} board`,
          "PLAYER1",
          true
        )
      );
    } else {
      let hoverArray = [];
      let className;
      let ableToPlace;
      console.log(index);
      let curr = ships[index];
      const infoText = document.createElement("p");
      infoText.textContent = `Place your ${curr.name}`;
      main.appendChild(infoText);
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
      gameboard.addEventListener("mouseover", (e) => {
        hoverArray = [];
        for (
          let i = e.target.dataset.index;
          i < Number(e.target.dataset.index) + curr.length;
          i++
        ) {
          hoverArray.push(i);
        }
        ableToPlace =
          !player.gameBoard.checkIfCollided(
            Number(e.target.dataset.index),
            "x",
            curr.length
          ) && !player.gameBoard.checkIfMultipleLines(hoverArray, "x");
        className = ableToPlace ? "placeship" : "colliding";

        hoverArray.forEach((el) => {
          document
            .querySelector(`[data-index='${el}']`)
            .classList.add(className);
        });
      });
      let cells = document.querySelectorAll(".gameboard_cell");
      cells = Array.from(cells);
      cells.forEach((cell) =>
        cell.addEventListener("mouseleave", (e) => {
          hoverArray.forEach((el) => {
            document
              .querySelector(`[data-index='${el}']`)
              .classList.remove(className);
          });
        })
      );
      gameboard.addEventListener("click", (e) => {
        if (ableToPlace) {
          player.gameBoard.placeShip(
            Number(e.target.dataset.index),
            new Ship(curr.name),
            "x",
            curr.length
          );
          displayShipPlacing(player, index + 1);
        }
      });
    }
  };
  const gameEndModal = () => {
    modalContainer.classList.add("show-modal");
    const modal = document.createElement("div");
    modal.classList.add("modal");
    const header = document.createElement("p");
    header.textContent = `${
      game.computer.gameBoard.isAllSunk()
        ? game.player.name
        : game.computer.name
    } has won!`;
    modal.appendChild(header);
    const btn = document.createElement("button");
    btn.textContent = "Play again";
    btn.addEventListener("click", () => {
      game.init(player, computer);
      displayShipPlacing(game.player, 0);
      modalContainer.classList.remove("show-modal");
      modalContainer.innerHTML = "";
    });
    modal.appendChild(btn);
    modalContainer.appendChild(modal);
  };

  return { init };
})();
export { dom };
