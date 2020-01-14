import {render} from './utils.js';
import FilmsSection from './components/films-section.js';
import ProfileRating from './components/profile.js';
import MainNavigation from './components/main-navigation.js';
import FooterStatistic from './components/footer-statistic.js';
import {generateFilms} from './mock/films.js';

const FILMS_COUNT = 54;

const films = generateFilms(FILMS_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new ProfileRating(films).getElement());
render(siteMainElement, new MainNavigation(films).getElement());

render(siteMainElement, new FilmsSection(films).getElement());

const footer = document.querySelector(`.footer`);

const footerStatistics = footer.querySelector(`.footer__statistics`);
footer.replaceChild(new FooterStatistic(films).getElement(), footerStatistics);
