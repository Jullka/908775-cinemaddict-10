const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};


export {getRandomIntegerNumber, getRandomArrayItem};
