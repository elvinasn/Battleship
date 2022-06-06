import Player from "./player";

describe("Player tests", () => {
  let player;
  let enemy;

  beforeEach(() => {
    player = new Player("Ramam");
    enemy = new Player("aga");
  });

  it("puts name after the constructor", () => {
    expect(player.name).toBe("Ramam");
  });

  it("attacks enemy gameboard", () => {
    player.attack(enemy, 22);
    expect(enemy.gameBoard.board[22]).toBe(true);
  });
});
