const Node = (coords) => {
  const data = coords;
  const prev = null;
  const next = null;
  const parent = null;
  const c1 = null;
  const c2 = null;
  const c3 = null;
  const c4 = null;
  const c5 = null;
  const c6 = null;
  const c7 = null;
  const c8 = null;

  return {
    data, prev, next, c1, c2, c3, c4, c5, c6, c7, c8, parent,
  };
};

export { Node };

const Board = (() => {
  const head = Node([0, 0]);

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

  function allInAncestorList(alist, retrievedNodeList) {
    for (let i = 0; i < retrievedNodeList.length; i += 1) {
      if (!alist.includes(JSON.stringify(retrievedNodeList[i].data))) {
        return false;
      }
    }
    return true;
  }

  const getPath = (targetNode, finalArr = []) => {
    console.log(`bon voyage`);
    const node = targetNode;
    finalArr.unshift(node.data);
    if (node.parent === null) {
      return finalArr;
    }
    console.log(`finalArr ${finalArr}`);
    return getPath(node.parent, finalArr);
  };

  const bfs = (targetNodeData, queue = [getHead()], ancestors = []) => {
    function getQueueData() {
      const queueData = [];
      for (let i = 0; i < queue.length; i += 1) {
        queueData.push(queue[i].data);
      }
      return queueData;
    }
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
    const dataArr = getQueueData();
    console.log(`queue: ${dataArr}`);

    function getAncestorData() {
      const finalAncs = [];
      for (let i = 0; i < ancestors.length; i += 1) {
        finalAncs.push(ancestors[i].data);
      }
      return finalAncs;
    }
    console.log(`ancestors: ${getAncestorData()}`);
    return bfs(targetNodeData, queue, ancestors);
  };

  return {
    getHead, retrieveNode, getNodeList, bfs,
  };
})();

export default Board;
