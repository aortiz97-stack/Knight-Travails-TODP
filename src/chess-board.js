import mergeSort from './merge-sort';

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

  const connect = (stack = [getHead()], ancestors = []) => {
    function getStackData() {
      const stackData = [];
      for (let i = 0; i < stack.length; i += 1) {
        stackData.push(stack[i].data);
      }
      return stackData;
    }
    let stackData;
    let ancestorList = ancestors;
    if (stack.length === 0) return getHead();

    const currRoot = stack.pop();
    ancestorList.push(JSON.stringify(currRoot.data));

    const allReachableCoords = getAllReachableNeighbors(currRoot.data);
    const retrievedNodes = [];
    for (let i = 0; i < allReachableCoords.length; i += 1) {
      const retrievedNode = Node(allReachableCoords[i]);
      retrievedNodes.push(retrievedNode);
    }

    if (allInAncestorList(ancestorList, retrievedNodes)) {
      ancestorList = [JSON.stringify(getHead().data)];
      stackData = getStackData();
      console.log(`stackData when ancestorList is reset: ${stackData}`);
      return connect(stack, ancestorList);
    }

    let currChildNum = 1;
    for (let i = 0; i < retrievedNodes.length; i += 1) {
      if (!ancestorList.includes(JSON.stringify(retrievedNodes[i].data))) {
        while (currRoot[`c${currChildNum}`] !== null) {
          currChildNum += 1;
        }
        currRoot[`c${currChildNum}`] = retrievedNodes[i];
        stack.push(retrievedNodes[i]);
        stackData = getStackData();
        console.log(`stackData after pushing retrieved node to put in child ${currChildNum} of ${currRoot.data}: ${stackData}`);
        //return connect(stack, ancestorList);
      }
    }
    stackData = getStackData();
    console.log(`stackData after final return: ${stackData}`);
    return connect(stack, ancestorList);
  };

  connect();

  return { getHead, retrieveNode, getNodeList };
})();

export default Board;
