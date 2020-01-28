import {getRandomIntegerNumber, getRandomArrayItem} from '../utils.js';

const Texts = [
  `Lorem ipsum dolor sit amet consectetur`,
  `adipisicing elit. Quo repellat quae enim aliquid provident.`,
  `Facilis dicta, dolore vitae ducimus`,
  `omnis cupiditate et nesciunt eius quisquam cum reiciendis tempore maxime necessitatibus.`,
];

const Emojies = [
  `./images/emoji/trophy.png`,
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`
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
