import Board from './chess-board';

let start = Board.getHead();

const family = [];
while (start !== null) {
  console.log(start);
  start = start.c1;
}
