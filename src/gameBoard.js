/* eslint-disable no-plusplus */

class Gameboard {
  constructor() {
    this.board = [];
    this.ships = [];
    for (let i = 0; i < 100; i++) {
      this.board.push(false);
    }
  }

  placeShip(coord, ship, axis, length) {
    let temp = coord;
    for (let i = 0; i < length; i++) {
      ship.location.push(temp);
      temp += axis.toLowerCase() === "x" ? 1 : 10;
    }
    this.ships.push(ship);
  }

  receiveAttack(coord) {
    this.board[coord] = true;
    if (this.isShip(coord)) {
      this.hitShip(coord);
    }
  }

  isShip(coord) {
    return this.ships.some((x) => x.location.includes(coord));
  }

  hitShip(coord) {
    this.ships.find((x) => x.location.includes(coord)).hits.push(coord);
  }

  isAllSunk() {
    return this.ships.every((x) => x.isSunk());
  }

  getShipsCoords() {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      if (this.isShip(i)) arr.push(i);
    }
    return arr;
  }

  checkIfCollided(coord, axis, length) {
    let tempCoord = coord;
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(tempCoord);
      tempCoord += axis.toLowerCase() === "x" ? 1 : 10;
    }
    return arr.some((x) =>
      this.ships.some((ship) => ship.location.includes(x))
    );
  }

  checkIfMultipleLines(coordArray, axis) {
    if (axis === "x") {
      const res = Math.floor(coordArray[0] / 10);
      return !(
        coordArray.length ===
        coordArray.filter((x) => Math.floor(x / 10) === res).length
      );
    }
    if (axis === "y") {
      const res = coordArray[0] % 10;
      return !(
        coordArray.length === coordArray.filter((x) => x % 10 === res).length &&
        !coordArray.some((x) => x > 100)
      );
    }
  }
}

export default Gameboard;
