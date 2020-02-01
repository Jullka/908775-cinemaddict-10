import {getRandomIntegerNumber, getRandomArrayItem} from '../utils.js';

const Texts = [
  `Lorem ipsum dolor sit amet consectetur`,
  `adipisicing elit. Quo repellat quae enim aliquid provident.`,
  `Facilis dicta, dolore vitae ducimus`,
  `omnis cupiditate et nesciunt eius quisquam cum reiciendis tempore maxime necessitatibus.`,
];

const Emojies = [
  `trophy.png`,
  `smile.png`,
  `sleeping.png`,
  `puke.png`,
  `angry.png`
];

const Users = [
  `Sonia`,
  `Sonia`,
  `Keks`,
  `Iron Man`,
  `Vigorous Stump`
];

const getRandomCommentDate = () => {
  const startDate = new Date(2000, 0, 1);
  const endDate = new Date();
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
};


const generateComment = () => {
  return {
    id: String(Date.now() + Math.random()),
    text: getRandomArrayItem(Texts),
    emoji: getRandomArrayItem(Emojies),
    userName: getRandomArrayItem(Users),
    date: getRandomCommentDate()
  };
};

export const generateComments = () => {
  return new Array(getRandomIntegerNumber(0, 15))
    .fill({})
    .map(generateComment);
};
