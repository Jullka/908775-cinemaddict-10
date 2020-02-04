import moment from 'moment';

export const RenderPosition = {
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const SHAKE_ANIMATION_TIMEOUT = 600;

export const getCheckedParametersCount = (films, parametr) => {
  let count = 0;
  films.forEach((item) => {
    if (item[parametr]) {
      count++;
    }
  });
  return count;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor((max - min) * Math.random());
};

export const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  if (parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export const isSubmitPressed = (evt) => {
  return evt.ctrlKey && (evt.key === `Enter` || evt.key === `Ent`);
};

export const formatTime = (time) => {
  const duration = moment.duration(time);

  return moment.utc(duration.asMilliseconds()).format(`h[h] mm[m]`);
};

export const formatYear = (date) => {
  return moment(date).format(`YYYY`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatCommentDate = (date) => {
  return moment(date).format(`DD/MM/YYYY, HH:MM`);
};

const getWatchlistFilms = (films) => films.filter((film) => film.isAddedToWatchlist);

const getHistoryFilms = (films) => films.filter((film) => film.isAlreadyWatched);

const getFavoriteFilms = (films) => films.filter((film) => film.isAddedToFavorites);

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.WATCHLIST:
      return getWatchlistFilms(films);
    case FilterType.HISTORY:
      return getHistoryFilms(films);
    case FilterType.FAVORITES:
      return getFavoriteFilms(films);
    case FilterType.ALL:
    default:
      return films;
  }
};

export const StatisticType = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export const StatisticPeriod = {
  [StatisticType.TODAY]: `days`,
  [StatisticType.WEEK]: `week`,
  [StatisticType.MONTH]: `month`,
  [StatisticType.YEAR]: `year`
};

const Rank = {
  NONE: `-`,
  NOVICE: `novice`,
  FAN: `fan`,
  MOVIE_BUFF: `movie buff`
};

export const getRank = (films) => {
  let rank = ``;
  const countView = films.filter((film) => film.isAlreadyWatched).length;
  if (countView === 0) {
    rank = Rank.NONE;
  } else if (countView >= 1 && countView <= 10) {
    rank = Rank.NOVICE;
  } else if (countView >= 11 && countView <= 20) {
    rank = Rank.FAN;
  } else {
    rank = Rank.MOVIE_BUFF;
  }

  return rank;
};

export const getFilmsByPeriod = (films, period) => {
  const watchedMovies = films.filter((film) => film.isWatch);

  if (period === StatisticType.ALL) {
    return watchedMovies;
  }

  return watchedMovies.filter((film) => {
    return moment(film.dateWatched).diff(new Date(), StatisticPeriod[period]) === 0;
  });
};

export const USER = `User`;

