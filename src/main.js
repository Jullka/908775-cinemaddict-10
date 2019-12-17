import {createProfileTemplate} from "./components/profile";
import {createMainNavigationTemplate} from "./components/main-navigation";
import {createFilmsSectionTemplate} from "./components/films-section";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
import {createFilmCardTemplate} from "./components/film-card";
import {createFilmDetailsTemplate} from "./components/film-details";
import {createTopRatedsTemplate, getTopRated} from "./components/films-list-top";
import {createMostCommentedTemplate, getMostCommented} from "./components/films-list-most";
import {createCommentsTemplate} from './components/comments';
import {generateFilms} from './mock/films';
import {generateFilters} from './mock/filters';
import {generateComments} from './mock/comment.js';

const FILM_CARDS_COUNT = 17;
const FILM_CARDS_COUNT_ON_START = 5;
const FILM_CARDS_COUNT_BY_BUTTON = 5;
const WATCHED_FILMS_QUANTITY = 34;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const generatedFilms = generateFilms(FILM_CARDS_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createProfileTemplate(WATCHED_FILMS_QUANTITY));

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMainNavigationTemplate(generateFilters()));
render(siteMainElement, createFilmsSectionTemplate());

const filmsSection = siteMainElement.querySelector(`.films`);
const filmListContainer = filmsSection.querySelector(`.films-list__container`);
let showingFilmsCount = FILM_CARDS_COUNT_ON_START;
generatedFilms
  .slice(0, showingFilmsCount)
  .forEach((film) => render(filmListContainer, createFilmCardTemplate(film)));

render(filmsSection, createTopRatedsTemplate());
render(filmsSection, createMostCommentedTemplate());

const filmsListExtraElements = filmsSection.querySelectorAll(`.films-list--extra`);

const topRatedFilmsListContainerElement = filmsListExtraElements[0].querySelector(`.films-list__container`);
const topRated = getTopRated(generatedFilms);
if (topRated[0].rating > 0) {
  topRated.forEach((film) => {
    render(topRatedFilmsListContainerElement, createFilmCardTemplate(film));
  });
}

const mostCommentedFilmsListContainerElement = filmsListExtraElements[1].querySelector(`.films-list__container`);
const mostCommented = getMostCommented(generatedFilms);
if (mostCommented[0].comments.length > 0) {
  mostCommented.forEach((film) => {
    render(mostCommentedFilmsListContainerElement, createFilmCardTemplate(film));
  });
}

const siteBodyElement = document.querySelector(`body`);
render(siteBodyElement, createFilmDetailsTemplate(generatedFilms[0]));
const popupBottomElement = document.querySelector(`.form-details__bottom-container`);
const comments = generateComments(generatedFilms[0].comments);
render(popupBottomElement, createCommentsTemplate(comments));

const filmsList = siteMainElement.querySelector(`.films-list`);
render(filmsList, createShowMoreButtonTemplate());
const showMoreButton = document.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  const prevTasksCount = showingFilmsCount;
  showingFilmsCount += FILM_CARDS_COUNT_BY_BUTTON;

  generatedFilms.slice(prevTasksCount, showingFilmsCount).forEach((film) => render(filmListContainer, createFilmCardTemplate(film)));

  if (showingFilmsCount >= FILM_CARDS_COUNT) {
    showMoreButton.remove();
  }
});

