import Board from './chess-board';

const Knight = (initPos) => {
  let position = initPos;
  Board.setHead(initPos);

  const getPosition = () => position;
  const knightMoves = (newPosit) => {
    const pathArr = Board.bfs(newPosit);
    let str = `You made it in ${pathArr.length - 1} moves! Here's your path: \n\n`;
    for (let i = 0; i < pathArr.length; i += 1) {
      let arrow = '=>';
      if (i === pathArr.length - 1) {
        arrow = '\n';
      }
      str += `${pathArr[i]} ${arrow} `;
    }
    console.log(str);
    position = newPosit;
    Board.setHead(newPosit);
  };

  return { getPosition, knightMoves };
};

export default Knight;
