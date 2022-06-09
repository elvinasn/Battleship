import { game } from "./game";
import { markups } from "./markups";
import Player from "./player";
import { helpers } from "./helpers";
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
    main.insertAdjacentHTML(
      "afterbegin",
      markups.getGameboard(game.player.gameBoard, "YOUR BOARD", "PLAYER1", true)
    );
    main.insertAdjacentHTML(
      "beforeEnd",
      markups.getGameboard(
        game.computer.gameBoard,
        "COMPUTERS'S BOARD",
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
    btn1.addEventListener("click", () => {});
    const btn2 = document.createElement("button");
    btn2.textContent = "PLAYER VS PLAYER";
    btn2.disabled = true;
    wrapper.appendChild(btn2);
    main.appendChild(wrapper);
  };

  const displayPlayerVSAIForm = () => {};
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
      init();
      modalContainer.classList.remove("show-modal");
      modalContainer.innerHTML = "";
    });
    modal.appendChild(btn);
    modalContainer.appendChild(modal);
  };

  return { init };
})();
export { dom };
