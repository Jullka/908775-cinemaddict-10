import {getRandomIntegerNumber, getRandomArrayItem} from '../utils';

const Titles = [
  `Back to the Future`,
  `Peppa Pig`,
  `Memento`,
  `The Dark Knight`,
  `The Jungle Book`,
  `ALF`,
  `The Silence of the Lambs`,
  `Se7en`,
  `The Godfather`,
  `The Lion King`,
  `Lost`,
  `Friends`,
  `Harry Potter and the Chamber of Secrets`,
  `Forrest Gump`,
  `Interstellar`,
  `House MD`,
  `Matrix`,
  `Sex And The City`,
  `Pirates of the Caribbean`,
  `Inception`
];

const Posters = [
  `/images/posters/made-for-each-other.png`,
  `/images/posters/popeye-meets-sinbad.png`,
  `/images/posters/sagebrush-trail.jpg`,
  `/images/posters/santa-claus-conquers-the-martians.jpg`,
  `/images/posters/the-dance-of-life.jpg`,
  `/images/posters/the-great-flamarion.jpg`,
  `/images/posters/the-man-with-the-golden-arm.jpg`
];

const Descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const Names = [`Jodie Foster`, `Anthony Hopkins`, `Lawrence A. Bonney`, `Guy Pearce`, `Carrie-Anne Moss`, `Joe Pantoliano`, `Marlon Brando`, `Al Pacino`, `James Caan]`];

const Ages = [`0+`, `6+`, `12+`, `18+`];

const Countries = [`USA`, `UK`, `Spain`, `Russia`, `Italy`, `Canada`, `Hungary`];

const Genres = [`Adventure`, `Drama`, `Mystery`, `Thriller`, `Comedy`, `Crime`, `Action`, `Animation`];

const Emojies = [
  `./images/emoji/trophy.png`,
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`
];

const getRandomDescription = () => {
  return new Array(getRandomIntegerNumber(1, 3))
    .fill(` `)
    .map(() => getRandomArrayItem(Descriptions))
    .join(` `);
};

const getRandomRunTime = () => {
  const randomRunTime = getRandomIntegerNumber(0, 300);
  const RunTimeHours = Math.floor(randomRunTime / 60);
  const RunTimeMinutes = randomRunTime % 60;

  return `${RunTimeHours}h : ${RunTimeMinutes}m`;
};

const getRandomActors = () => {
  return new Array(getRandomIntegerNumber(1, 6))
    .fill(``)
    .map(() => getRandomArrayItem(Names))
    .join(` `);
};

const getRandomCommentDate = () => {
  const startDate = new Date(2000, 0, 1);
  const endDate = new Date();

  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
};

const getRandomGenres = (genres) => {
  return genres
    .filter(() => Math.random() > 0.5)
    .slice(0, 3);
};

const generateFilm = () => {
  const filmTitle = getRandomArrayItem(Titles);
  return {
    poster: getRandomArrayItem(Posters),
    title: filmTitle,
    rating: `${getRandomIntegerNumber(0, 9)}.${getRandomIntegerNumber(0, 9)}`,
    year: getRandomIntegerNumber(1980, 2019),
    duration: getRandomRunTime(),
    genre: getRandomArrayItem(Genres),
    genres: new Set(getRandomGenres(Genres)),
    titleOriginal: filmTitle,
    director: getRandomArrayItem(Names),
    writers: getRandomArrayItem(Names),
    actors: getRandomActors(),
    releaseDate: new Date(getRandomIntegerNumber(1980, 2019), getRandomIntegerNumber(0, 11), getRandomIntegerNumber(1, 28)),
    description: getRandomDescription(),
    country: getRandomArrayItem(Countries),
    age: getRandomArrayItem(Ages),
    comments: generateComments(getRandomIntegerNumber(0, 50)),
  };
};

const generateComment = () => {
  return {
    emoji: getRandomArrayItem(Emojies),
    text: getRandomArrayItem(Descriptions),
    userName: getRandomArrayItem(Names),
    date: getRandomCommentDate()
  };
};

const generateComments = (quantity) => {
  return new Array(quantity)
    .fill(``)
    .map(() => generateComment())
    .sort((first, second) => {
      return first.date - second.date;
    });
};

const generateFilms = (quantity) => {
  return new Array(quantity)
    .fill(``)
    .map(() => generateFilm());
};

export {generateFilm, generateComments, generateFilms};
