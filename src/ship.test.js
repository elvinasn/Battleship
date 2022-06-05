import Ship from "./ship";

describe("ship tests", () => {
  let ship;
  beforeEach(() => {
    ship = new Ship("Carrier", [0, 1, 2, 3]);
  });

  it("constructor assigns name and a location to a ship", () => {
    expect(ship.name).toBe("Carrier");
    expect(ship.location).toStrictEqual([0, 1, 2, 3]);
  });
  it("ships hit array is empty after constructor", () => {
    expect(ship.hits).toStrictEqual([]);
  });
  it("works with a single hit", () => {
    ship.hit(1);
    expect(ship.hits).toStrictEqual([1]);
  });
  it("works with multiple hits", () => {
    ship.hit(1);
    ship.hit(2);
    expect(ship.hits).toStrictEqual([1, 2]);
  });
  it("isSunk returns false, when ship is not sunk", () => {
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isSunk()).toBe(false);
  });
  it("isSunk returns true, when ship is sunk", () => {
    ship.hit(0);
    ship.hit(1);
    ship.hit(2);
    ship.hit(3);
    expect(ship.isSunk()).toBe(true);
  });
});
