import Gameboard from "./gameBoard";
import Ship from "./ship";

describe("gameboard tests", () => {
  let gameBoard;
  beforeEach(() => {
    gameBoard = new Gameboard();
  });

  it("every coord is false after constructor", () => {
    expect(gameBoard.board.every((x) => x === false)).toBe(true);
  });

  it("places single ship on x axis", () => {
    const ship = new Ship("Carrier");
    gameBoard.placeShip(0, ship, "x", 2);
    expect(gameBoard.ships[0]).toBe(ship);
    expect(gameBoard.ships[0].location).toStrictEqual([0, 1]);
  });

  it("places single ship on y axis", () => {
    const ship = new Ship("Carrier");
    gameBoard.placeShip(0, ship, "y", 2);
    expect(gameBoard.ships[0]).toBe(ship);
    expect(gameBoard.ships[0].location).toStrictEqual([0, 10]);
  });

  it("places multiple ships", () => {
    const ship = new Ship("Carrier");
    gameBoard.placeShip(0, ship, "y", 2);

    const ship2 = new Ship("Battleship");
    gameBoard.placeShip(12, ship2, "x", 2);

    expect(gameBoard.ships.includes(ship)).toBe(true);
    expect(gameBoard.ships.includes(ship2)).toBe(true);
  });

  it("receives attack", () => {
    gameBoard.receiveAttack(2);
    expect(gameBoard.board[2]).toBe(true);
  });

  it("isShipHit returns false if the shot missed", () => {
    gameBoard.receiveAttack(2);
    expect(gameBoard.isShipHit(2)).toBe(false);
  });

  it("isShipHit returns true if the shot hit", () => {
    const ship = new Ship("Carrier");
    gameBoard.placeShip(0, ship, "x", 3);
    gameBoard.receiveAttack(2);
    expect(gameBoard.isShipHit(2)).toBe(true);
  });

  it("isAllSunk returns false if at least one ship is not sunk", () => {
    const ship = new Ship("Carrier");
    gameBoard.placeShip(0, ship, "x", 3);
    gameBoard.receiveAttack(2);
    expect(gameBoard.isAllSunk()).toBe(false);
  });
  it("isAllSunk returns true if all ships are sunk", () => {
    const ship = new Ship("Carrier");
    gameBoard.placeShip(0, ship, "x", 3);
    gameBoard.receiveAttack(0);
    gameBoard.receiveAttack(1);
    gameBoard.receiveAttack(2);
    expect(gameBoard.isAllSunk()).toBe(true);
  });

  it("checkIfCollided returns false if new coord does not collide with existing", () => {
    const ship = new Ship("Carrier");
    gameBoard.placeShip(0, ship, "x", 3);
    expect(gameBoard.checkIfCollided(5, "y", 2)).toBe(false);
  });
  it("checkIfCollided returns true if new coord does collide with existing", () => {
    const ship = new Ship("Carrier");
    gameBoard.placeShip(0, ship, "x", 3);
    expect(gameBoard.checkIfCollided(0, "y", 2)).toBe(true);
  });
});
