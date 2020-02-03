import {getRandomIntegerNumber, getRandomArrayItem} from '../utils.js';
import {generateComments} from './comment-mock.js';

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
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
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

const generateRating = () => {
  return getRandomIntegerNumber(10, 99) / 10.0;
};

const getRandomDuration = () => {
  return getRandomIntegerNumber(3600000, 18000000);
};

const getRandomDate = () => {
  const startDate = new Date(1950, 0, 1);
  const endDate = new Date();
  return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
};

const generateRandomArray = (count, array) => {
  const set = new Set();
  while (set.size < count) {
    set.add(getRandomArrayItem(array));
  }
  return Array.from(set);
};

const generateRandomStringFromArray = (count, array, space) => {
  let out = ``;
  generateRandomArray(getRandomIntegerNumber(1, count), array).forEach((item, index) => {
    out = index === 0 ? out + item : out + space + item;
  });
  return out;
};

const generateRandomCheck = () => {
  return Math.random() > 0.5;
};

const generateFilm = () => {
  const filmTitle = getRandomArrayItem(Titles);
  return {
    id: String(new Date() + Math.random()),
    title: filmTitle,
    titleOriginal: filmTitle,
    rating: generateRating(),
    releaseDate: getRandomDate(),
    duration: getRandomDuration(),
    genres: generateRandomArray(getRandomIntegerNumber(1, 3), Genres),
    poster: getRandomArrayItem(Posters),
    description: generateRandomStringFromArray(5, Descriptions, ` `),
    comments: generateComments(),
    director: getRandomArrayItem(Names),
    writers: generateRandomStringFromArray(3, Names, `, `),
    actors: generateRandomStringFromArray(5, Names, `, `),
    country: getRandomArrayItem(Countries),
    age: getRandomArrayItem(Ages),
    isAddedToWatchlist: generateRandomCheck(),
    isAlreadyWatched: generateRandomCheck(),
    isAddedToFavorites: generateRandomCheck()
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
