import Player from "./player";
import Gameboard from "./gameBoard";
import Ship from "./ship";
const game = (() => {
  const player = new Player("Elvinas");
  const computer = new Player("AI");
  const startingShips = [
    { name: "Carrier", length: 5 },
    { name: "Battleship", length: 4 },
    { name: "Cruiser", length: 3 },
    { name: "Submarine", length: 3 },
    { name: "Destroyer", length: 2 },
  ];
  const init = () => {
    player.gameBoard = new Gameboard();
    computer.gameBoard = new Gameboard();
    computer.gameBoard.placeShip(65, new Ship("Destroyer"), "x", 2);
  };

  return { init, player, computer, startingShips };
})();
export { game };
