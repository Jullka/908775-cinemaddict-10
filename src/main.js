import {render} from './utils.js';
import {createFilmElement} from './components/film.js';
import FilmsSection from './components/films-section.js';
import FilmsList from './components/films-list.js';
import MostCommented from './components/most-commented.js';
import ProfileRating from './components/profile.js';
import MainNavigation from './components/main-navigation.js';
import TopRated from './components/top-rated.js';
import ShowMore from './components/show-more-button.js';
import FooterStatistic from './components/footer-statistic.js';
import {generateFilms} from './mock/films.js';

const FILMS_COUNT = 54;
const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;

const films = generateFilms(FILMS_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileRating(films).getElement());
render(siteMainElement, new MainNavigation(films).getElement());
render(siteMainElement, new FilmsSection().getElement());

const filmsElement = siteMainElement.querySelector(`.films`);
render(filmsElement, new FilmsList().getElement());

const topRatesComponent = new TopRated(films);
render(filmsElement, topRatesComponent.getElement());

const mostCommentedComponent = new MostCommented(films);
render(filmsElement, mostCommentedComponent.getElement());

const filmsListElement = filmsElement.querySelector(`.films-list`);
const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);

let showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
films.slice(0, showingFilmsCount).forEach((film) => {
  render(filmsListContainerElement, createFilmElement(film));
});

render(filmsListElement, new ShowMore().getElement());

const showMoreButton = filmsListElement.querySelector(`.films-list__show-more`);
showMoreButton.addEventListener(`click`, () => {
  const prevFilmsCount = showingFilmsCount;
  showingFilmsCount = showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

  films.slice(prevFilmsCount, showingFilmsCount)
    .forEach((film) => render(filmsListContainerElement, createFilmElement(film)));

  if (showingFilmsCount >= films.length) {
    showMoreButton.remove();
  }
});
const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);

const topRatedFilmsListContainerElement = filmsListExtraElements[0].querySelector(`.films-list__container`);

const topRated = topRatesComponent.getTopRated();
if (topRated[0].rating > 0) {
  topRated.forEach((film) => {
    render(topRatedFilmsListContainerElement, createFilmElement(film));
  });
}

const mostCommentedFilmsListContainerElement = filmsListExtraElements[1].querySelector(`.films-list__container`);

const mostCommented = mostCommentedComponent.getMostCommented();
if (mostCommented[0].comments.length > 0) {
  mostCommented.forEach((film) => {
    render(mostCommentedFilmsListContainerElement, createFilmElement(film));
  });
}

const footer = document.querySelector(`.footer`);

const footerStatistics = footer.querySelector(`.footer__statistics`);
footer.replaceChild(new FooterStatistic(films).getElement(), footerStatistics);
