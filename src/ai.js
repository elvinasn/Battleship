const AI = (() => {
  const FilterUnSunkCells = (array, enemy) =>
    array.filter((cell) => {
      if (enemy.gameBoard.isShip(cell)) {
        const currShip = enemy.gameBoard.ships.find((ship) =>
          ship.location.includes(cell)
        );
        return !currShip.isSunk();
      }
    });

  const DetectShips = (unsunkCells) => {
    const detected = unsunkCells.filter(
      (cell, index, array) =>
        (array.includes(cell + 1) && cell % 10 !== 9) ||
        (array.includes(cell - 1) && cell % 10 !== 0) ||
        (array.includes(cell + 10) && cell + 10 < 100) ||
        (array.includes(cell - 10) && cell - 10 > 0)
    );
    return detected;
  };

  const AttackDetectedShip = (detectedShips, emptyCells) => {
    const axis = detectedShips[1] - detectedShips[0] === 1 ? "x" : "y";
    const availableShots = [];

    if (axis === "x") {
      if (detectedShips[0] % 10 !== 0) {
        availableShots.push(detectedShips[0] - 1);
      }
      const rightSide = detectedShips.find(
        (cell, index, array) => !array.includes(cell + 1)
      );
      if (
        Math.floor(detectedShips[0] / 10) === Math.floor((rightSide + 1) / 10)
      ) {
        availableShots.push(rightSide + 1);
      }
    } else {
      const above = detectedShips[0] - 10;
      if (above > 0) {
        availableShots.push(above);
      }
      const below = detectedShips.find(
        (cell, index, array) => !array.includes(cell + 10)
      );
      if (below + 10 < 100) {
        availableShots.push(below + 10);
      }
    }

    const filteredAvailableShots = availableShots.filter((shot) =>
      emptyCells.includes(shot)
    );
    if (filteredAvailableShots.length > 0) {
      return filteredAvailableShots[
        Math.floor(Math.random() * filteredAvailableShots.length)
      ];
    }
  };

  const AttackSoloHit = (hitCells, emptyCells) => {
    const firstShot = hitCells[0];
    let availableShots = [];

    const leftShot = hitCells[0] - 1;
    if (Math.floor(firstShot / 10) === Math.floor(leftShot / 10)) {
      availableShots.push(leftShot);
    }

    const rightShot = hitCells[0] + 1;
    if (Math.floor(firstShot / 10) === Math.floor(rightShot / 10)) {
      availableShots.push(rightShot);
    }

    const aboveShot = firstShot - 10;
    if (aboveShot > 0) {
      availableShots.push(aboveShot);
    }

    const belowShot = firstShot + 10;
    if (belowShot < 100) {
      availableShots.push(belowShot);
    }

    availableShots = availableShots.filter((shot) => emptyCells.includes(shot));
    if (availableShots.length > 0) {
      return availableShots[Math.floor(Math.random() * availableShots.length)];
    }
  };

  const AttackRandom = (emptyCells, hitCells) => {
    let badShots = [];
    hitCells.forEach((cell) => {
      badShots.push(cell + 1);
      badShots.push(cell - 1);
      badShots.push(cell + 10);
      badShots.push(cell - 10);
    });
    badShots = badShots.filter(
      (cell, index, array) => array.indexOf(cell) === index
    );
    const availableShots = emptyCells.filter(
      (cell) => !badShots.includes(cell)
    );
    if (availableShots.length > 0) {
      return availableShots[Math.floor(Math.random() * availableShots.length)];
    }
  };

  const Attack = (enemy) => {
    const emptyCells = [];
    const hitCells = [];
    enemy.gameBoard.board.forEach((hit, index) =>
      hit ? hitCells.push(index) : emptyCells.push(index)
    );

    const unsunkCells = FilterUnSunkCells(hitCells, enemy);
    const detectedShips = DetectShips(unsunkCells);

    if (detectedShips.length > 0) {
      const attack = AttackDetectedShip(detectedShips, emptyCells);
      if (attack) return attack;
    }
    if (hitCells.length > 0) {
      const attack = AttackSoloHit(unsunkCells, emptyCells);
      if (attack) return attack;
    }

    const attack = AttackRandom(emptyCells, hitCells);
    if (attack) return attack;
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  return { Attack };
})();
export { AI };
