const markups = (() => {
  let counter = 0;
  const getGameboard = (gameboard, toSeeShips) => {
    let shipsArray = [];
    counter = 0;
    const gameBoardCells = [];
    for (let i = 0; i < 10; i++) {
      gameBoardCells.push(gameboard.board.slice(i, i + 10));
    }
    if (toSeeShips) shipsArray = gameboard.getShipsCoords();

    return `<div class="gameboard_container">${gameBoardCells
      .map((line) => gameboardLineMarkup(line, gameboard, shipsArray))
      .join("")}</div>`;
  };
  const gameboardLineMarkup = (line, gameboard, shipsArray) =>
    `<div class="gameboard_line">${line
      .map(
        (cell) => `${gameboardCellMarkup(shipsArray.includes(counter), cell)}`
      )
      .join("")}</div>`;

  const gameboardCellMarkup = (ship, hit) => {
    counter++;
    return `<div class="gameboard_cell ${ship ? "ship" : ""} ${
      hit ? "hit" : ""
    }" data-index="${counter - 1}"></div>`;
  };

  return { getGameboard };
})();
export { markups };
