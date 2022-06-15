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

  const putRandomShips = (player) => {
    player.gameBoard.ships = [];
    const axles = ["x", "y"];
    let currAxis = "x";
    let randomNum;
    let array = [];
    startingShips.forEach((ship) => {
      while (
        array.length === 0 ||
        player.gameBoard.checkIfCollided(array) ||
        player.gameBoard.checkIfMultipleLines(array, currAxis)
      ) {
        array = [];
        currAxis = axles[Math.floor(Math.random() * axles.length)];
        randomNum = Math.floor(Math.random() * 100);
        for (
          let i = randomNum;
          i < randomNum + (currAxis === "y" ? ship.length * 10 : ship.length);
          currAxis === "y" ? (i += 10) : i++
        ) {
          array.push(i);
        }
      }
      player.gameBoard.placeShip(
        randomNum,
        new Ship(ship.name),
        currAxis,
        ship.length
      );
    });
  };

  const init = () => {
    player.gameBoard = new Gameboard();
    computer.gameBoard = new Gameboard();
    putRandomShips(computer);
  };

  return { init, player, computer, startingShips, putRandomShips };
})();
export { game };
