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

const getWatchlistMovies = (films) => films.filter((film) => film.isAddedToWatchlist);

const getHistoryMovies = (films) => films.filter((film) => film.isAlreadyWatched);

const getFavoriteMovies = (films) => films.filter((film) => film.isAddedToFavorites);

export const getFilmsByFilter = (films, filterType) => {
  switch (filterType) {
    case FilterType.WATCHLIST:
      return getWatchlistMovies(films);
    case FilterType.HISTORY:
      return getHistoryMovies(films);
    case FilterType.FAVORITES:
      return getFavoriteMovies(films);
    case FilterType.ALL:
    default:
      return films;
  }
};

