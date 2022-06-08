const markups = (() => {
  let counter = 0;
  const getGameboard = (gameboard, header, id, toSeeShips) => {
    let shipsArray = [];
    counter = 0;
    const gameBoardCells = [];
    for (let i = 0, len = gameboard.board.length; i < len; i += 10) {
      gameBoardCells.push(gameboard.board.slice(i, i + 10));
    }
    shipsArray = gameboard.getShipsCoords();
    return `<div class="wrapper"><h2>${header}</h2><div class="gameboard_container" id="${id}">${gameBoardCells
      .map((line) => gameboardLineMarkup(line, shipsArray, toSeeShips))
      .join("")}</div></div>`;
  };
  const gameboardLineMarkup = (line, shipsArray, toSeeShips) =>
    `<div class="gameboard_line">${line
      .map(
        (cell) =>
          `${gameboardCellMarkup(
            shipsArray.includes(counter),
            cell,
            toSeeShips
          )}`
      )
      .join("")}</div>`;

  const gameboardCellMarkup = (ship, hit, toSeeShips) => {
    counter += 1;
    return `<div class="gameboard_cell ${ship && toSeeShips ? "ship" : ""} ${
      hit ? "hit" : ""
    } ${!toSeeShips && ship && hit ? "enemy-ship-hit" : ""}" data-index="${
      counter - 1
    }"></div>`;
  };

  return { getGameboard };
})();
export { markups };
