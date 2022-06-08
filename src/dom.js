import { game } from "./game";
import { markups } from "./markups";
import Player from "./player";
import { helpers } from "./helpers";
const dom = (() => {
  const player = new Player("Elvinas");
  const computer = new Player("AI");
  const main = document.querySelector("main");
  let player1Board;
  let guessesArray = [];
  let player2Board;

  const init = () => {
    for (let i = 0; i < 100; i++) {
      guessesArray.push(i);
    }
    game.init(player, computer);
    displayBoards();
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
      console.log(e.target);
      if (!e.target.classList.contains("hit")) {
        game.computer.gameBoard.receiveAttack(e.target.dataset.index);
        displayBoards();
        setTimeout(() => {
          game.player.gameBoard.receiveAttack(
            helpers.randomGuess(guessesArray)
          );
          displayBoards();
        }, 200);
      }
    });
  };

  return { init };
})();
export { dom };
