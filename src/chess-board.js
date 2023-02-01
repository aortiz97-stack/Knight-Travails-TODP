import Node from './node';

const Board = (() => {
  let head = Node([0, 0]);

  const getHead = () => head;
  const setHead = (newHeadData) => {
    head = Node(newHeadData);
  };

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
      if (JSON.stringify(data) === JSON.stringify(retrievedNode.data)) {
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
      if (col + 2 <= 7) {
        reachableNeighbors.push([row + 1, col + 2]);
      }
      if (col - 2 >= 0) {
        reachableNeighbors.push([row + 1, col - 2]);
      }
    }
    if (row - 1 >= 0) {
      if (col + 2 <= 7) {
        reachableNeighbors.push([row - 1, col + 2]);
      }
      if (col - 2 >= 0) {
        reachableNeighbors.push([row - 1, col - 2]);
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

  const getPath = (targetNode, finalArr = []) => {
    const node = targetNode;
    finalArr.unshift(node.data);
    if (node.parent === null) {
      return finalArr;
    }
    return getPath(node.parent, finalArr);
  };

  const bfs = (targetNodeData, queue = [getHead()], ancestors = []) => {
    if (queue.length === 0) return getPath(retrieveNode(targetNodeData));
    const dequeuedNode = queue.shift();
    if (JSON.stringify(dequeuedNode.data) === JSON.stringify(targetNodeData)) {
      return getPath(retrieveNode(targetNodeData));
    }
    ancestors.push(dequeuedNode);

    const neighborCoords = getAllReachableNeighbors(dequeuedNode.data);
    for (let i = 0; i < neighborCoords.length; i += 1) {
      const neighborNode = retrieveNode(neighborCoords[i]);
      if (!ancestors.includes(neighborNode)) {
        for (let j = 1; j < 9; j += 1) {
          if (dequeuedNode[`c${j}`] === null) {
            dequeuedNode[`c${j}`] = neighborNode;
          }
        }
        if (neighborNode !== null) {
          neighborNode.parent = dequeuedNode;
        }
        queue.push(neighborNode);
      }
    }
    return bfs(targetNodeData, queue, ancestors);
  };

  return {
    getHead, setHead, bfs,
  };
})();

export default Board;
