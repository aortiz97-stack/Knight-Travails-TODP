const Board = (() => {
  const initialize = () => {
    const finalBoard = [];
    let rowNum = 0;
    for (let i = 0; i < 8; i += 1) {
      const row = [];
      let colNum = 0;
      for (let j = 0; j < 8; j += 1) {
        const coords = [];
        coords.push(rowNum);
        coords.push(colNum);
        row.push(coords);
        colNum += 1;
      }
      finalBoard.push(row);
      rowNum += 1;
    }
    return finalBoard;
  };

  const getAllReachableNeighbors = (coords) => {
    const row = coords[0];
    const col = coords[1];
    const reachableNeighbors = [];

    if (row + 2 <= 7) {
      if (col + 1 <= 7) {
        reachableNeighbors.push([row + 2, col + 1]);
      }
      if (col - 1 >= 0) {
        reachableNeighbors.push([row + 2, col - 1]);
      }
    }
    if (row + 1 <= 7) {
      if (col + 1 <= 7) {
        reachableNeighbors.push([row + 1, col + 1]);
      }
      if (col - 1 >= 0) {
        reachableNeighbors.push([row + 1, col - 1]);
      }
    }
    if (row - 1 >= 0) {
      if (col + 1 <= 7) {
        reachableNeighbors.push([row - 1, col + 1]);
      }
      if (col - 1 >= 0) {
        reachableNeighbors.push([row - 1, col - 1]);
      }
    }
    if (row - 2 >= 0) {
      if (col + 1 <= 7) {
        reachableNeighbors.push([row - 2, col + 1]);
      }
      if (col - 1 >= 0) {
        reachableNeighbors.push([row - 2, col - 1]);
      }
    }
    return reachableNeighbors;
  };

  const board = initialize();
  const getBoard = () => board;

  return { board };
})();

export default Board;
