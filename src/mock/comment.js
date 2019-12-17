import {getRandomArrayItem} from '../utils.js';

const Emojies = [
  `./images/emoji/trophy.png`,
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`
];

const Texts = [
  `Lorem ipsum dolor sit amet consectetur`,
  `adipisicing elit. Quo repellat quae enim aliquid provident.`,
  `Facilis dicta, dolore vitae ducimus`,
  `omnis cupiditate et nesciunt eius quisquam cum reiciendis tempore maxime necessitatibus.`,
];
const Users = [
  `Noah Cheeseman`,
  `Liam Smith`,
  `William Proper`,
  `Mason Atkins`,
  `James Williamson`,
  `Benjamin Theron`,
  `Jacob Bloom`,
  `Michael Boreanaz`
];

const getRandomCommentDate = () => {
  const startDate = new Date(2000, 0, 1);
  const endDate = new Date();

  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
};

export const createCommentsTemplate = (comments) => {
  return Array.from(comments)
    .map((comment) => (`<li class="film-details__comment">
                            <span class="film-details__comment-emoji">
                                <img src="${comment.emoji}" width="55" height="55" alt="emoji">
                            </span>
                            <div>
                                <p class="film-details__comment-text">${comment.comment}</p>
                                <p class="film-details__comment-info">
                                    <span class="film-details__comment-author">${comment.userName}</span>
                                    <span class="film-details__comment-day">${comment.date}</span>
                                    <button class="film-details__comment-delete">Delete</button>
                                </p>
                            </div>
                        </li>`))
    .join(``);
};

export const generateComment = () => {
  return {
    emoji: getRandomArrayItem(Emojies),
    text: getRandomArrayItem(Texts),
    userName: getRandomArrayItem(Users),
    date: getRandomCommentDate()
  };
};

export const generateComments = (quantity) => {
  return new Array(quantity)
    .fill(``)
    .map(() => generateComment())
    .sort((first, second) => {
      return first.date - second.date;
    });
};
