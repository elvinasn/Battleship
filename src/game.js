import Player from "./player";
import Gameboard from "./gameBoard";
import Ship from "./ship";
const game = (() => {
  const player = new Player("Elvinas");
  const computer = new Player("AI");
  const init = () => {
    player.gameBoard = new Gameboard();
    computer.gameBoard = new Gameboard();
    player.gameBoard.placeShip(2, new Ship("Carrier"), "y", 5);
    player.gameBoard.placeShip(15, new Ship("Battleship"), "x", 4);
    player.gameBoard.placeShip(23, new Ship("Cruiser"), "x", 3);
    player.gameBoard.placeShip(45, new Ship("Submarine"), "x", 3);
    player.gameBoard.placeShip(65, new Ship("Destroyer"), "x", 2);

    computer.gameBoard.placeShip(65, new Ship("Destroyer"), "x", 2);
  };
  return { init, player, computer };
})();
export { game };
