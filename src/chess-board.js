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

  const board = initialize();

  return { board };
})();

export default Board;
