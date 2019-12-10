import {createProfileTemplate} from "./components/profile";
import {createMainNavigationTemplate} from "./components/main-navigation";
import {createFilmsSectionTemplate} from "./components/films-section";
import {createShowMoreButtonTemplate} from "./components/show-more-button";
import {createFilmCardTemplate} from "./components/film-card";
import {createFilmDetailsTemplate} from "./components/film-details";
import {createFilmsListTopTemplate} from "./components/films-list-top";
import {createFilmsListMostTemplate} from "./components/films-list-most";
import {generateFilms, generateFilm} from './mock/films';


const FILM_CARDS_COUNT = 17;
const FILM_CARDS_COUNT_ON_START = 5;
const FILM__CARDS_EXTRA_COUNT = 2;
const WATCHED_FILMS_QUANTITY = 34;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const generatedFilms = generateFilms(FILM_CARDS_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createProfileTemplate(WATCHED_FILMS_QUANTITY));

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMainNavigationTemplate());
render(siteMainElement, createFilmsSectionTemplate());

const filmsSection = siteMainElement.querySelector(`.films`);
const filmListContainer = filmsSection.querySelector(`.films-list__container`);

let showingFilmsCount = FILM_CARDS_COUNT_ON_START;
generatedFilms
  .slice(0, showingFilmsCount)
  .forEach((film) => render(filmListContainer, createFilmCardTemplate(film)));

const filmsList = siteMainElement.querySelector(`.films-list`);
render(filmsList, createShowMoreButtonTemplate());

render(filmsSection, createFilmsListTopTemplate());
render(filmsSection, createFilmsListMostTemplate());

const filmsListExtraTop = siteMainElement.querySelector(`.films-list--extra:nth-child(2) .films-list__container`);

new Array(FILM__CARDS_EXTRA_COUNT)
  .fill(``)
  .forEach(
      () => render(filmsListExtraTop, createFilmCardTemplate()
      )
  );

const filmsListExtraMost = siteMainElement.querySelector(`.films-list--extra:nth-child(3) .films-list__container`);
new Array(FILM__CARDS_EXTRA_COUNT)
  .fill(``)
  .forEach(
      () => render(filmsListExtraMost, createFilmCardTemplate()
      )
  );

render(siteMainElement, createFilmDetailsTemplate(generateFilm()));
