const Knight = (initPos) => {
  let position = initPos;
  const getPosition = () => position;
  const moveToNewPosition = (newPosit) => { position = newPosit; };

  return { getPosition, moveToNewPosition };
};