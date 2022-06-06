import Gameboard from "./gameBoard";
class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new Gameboard();
  }

  attack(enemy, location) {
    enemy.gameBoard.receiveAttack(location);
  }
}
export default Player;
