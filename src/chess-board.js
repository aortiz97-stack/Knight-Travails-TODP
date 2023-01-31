const Node = (coords) => {
  const data = coords;
  const prev = null;
  const next = null;
  return {
    data, prev, next,
  };
};

export { Node };

const Board = (() => {
  const head = Node([3, 3]);

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

  let nodeList = getAllNodes();
  const getNodeList = () => nodeList;
  const setNodeList = (newNodeList) => { nodeList = newNodeList; }; 

  const retrieveNode = (data) => {
    for (let i = 0; i < getNodeList().length; i += 1) {
      const retrievedNode = getNodeList()[i];
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

  const connect = (stack = [getHead()], visited = [], prevNode = null) => {
    if (stack.length === 0) return visited;
    const popped = stack.pop();
    const unstackedNode = retrieveNode(popped.data);
    if (unstackedNode.prev !== null && unstackedNode.next !== null) {
      return visited;
    }
    if (prevNode !== null) {
      const prevNodeFromList = retrieveNode(prevNode.data);
      prevNodeFromList.next = unstackedNode;
      unstackedNode.prev = prevNodeFromList;
    }
    visited.push(unstackedNode);
    const allNodeNeighbors = getAllReachableNeighbors(unstackedNode.data);
    for (let i = 0; i < allNodeNeighbors.length; i += 1) {
      const neighborNode = retrieveNode(allNodeNeighbors[i]);
      if (!visited.includes(neighborNode)) {
        stack.push(neighborNode);
      }
    }
    return connect(stack, visited, unstackedNode);
  };

  setNodeList(connect());

  return { getHead, retrieveNode, getNodeList };
})();

export default Board;
