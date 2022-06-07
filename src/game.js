import Player from "./player";
import Ship from "./ship";
const game = (() => {
  const player = new Player("Elvinas");
  const computer = new Player("AI");
  const init = () => {
    player.gameBoard.placeShip(0, new Ship("Carrier"), "x", 5);
    player.gameBoard.placeShip(15, new Ship("Battleship"), "x", 4);
    player.gameBoard.placeShip(23, new Ship("Cruiser"), "x", 3);
    player.gameBoard.placeShip(45, new Ship("Submarine"), "x", 3);
    player.gameBoard.placeShip(65, new Ship("Destroyer"), "x", 2);

    computer.gameBoard.placeShip(0, new Ship("Carrier"), "x", 5);
    computer.gameBoard.placeShip(15, new Ship("Battleship"), "x", 4);
    computer.gameBoard.placeShip(23, new Ship("Cruiser"), "x", 3);
    computer.gameBoard.placeShip(45, new Ship("Submarine"), "x", 3);
    computer.gameBoard.placeShip(65, new Ship("Destroyer"), "x", 2);
  };
  return { init, player, computer };
})();
export { game };
