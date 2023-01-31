const Node = (coords) => {
  const data = coords;
  const prev = null;
  const next = null;
  const initialized = false;
  return {
    data, prev, next, initialized,
  };
};

export { Node };

const Board = (() => {
  const head = Node([3, 3]);
  head.initialized = true;

  const getHead = () => head;

  const getAllNodes = () => {
    const allNodes = [];
    let rowNum = 0;
    for (let i = 0; i < 8; i += 1) {
      let colNum = 0;
      for (let j = 0; j < 8; j += 1) {
        const coords = [];
        coords.push(rowNum);
        coords.push(colNum);
        allNodes.push(Node(coords));
        colNum += 1;
      }
      rowNum += 1;
    }
    return allNodes;
  };

  const nodeList = getAllNodes();
  const getNodeList = () => nodeList;

  const retrieveNode = (data) => {
    for (let i = 0; i < getNodeList().length; i += 1) {
      const retrievedNode = getNodeList()[i];
      console.log(`retrivedNode ${retrievedNode.data}`);
      console.log(`compare data: ${data}`);
      if (JSON.stringify(data) === JSON.stringify(retrievedNode.data)) {
        retrievedNode.initialized = true;
        return retrievedNode;
      }
    }
    return null;
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

  const areAllInitialized = () => {
    for (let i = 0; i < getNodeList().length; i += 1) {
      if (!getNodeList()[i].initialized) return false;
    }
    return true;
  };

  const connect = ((queue = [getHead()]) => {
    if (areAllInitialized()) return getHead();

    const node = queue.shift();
    const neighbors = getAllReachableNeighbors(node.data);
    for (let i = 0; i < neighbors.length; i += 1) {
      const neighborNode = retrieveNode(neighbors[i]);
      console.log(`NEIGHBOR NODE: ${neighborNode}`);
      node.next = neighborNode;
      neighborNode.prev = node;
      queue.push(neighborNode);
    }
    return connect(queue);
  })();

  return { getHead, retrieveNode };
})();

export default Board;
