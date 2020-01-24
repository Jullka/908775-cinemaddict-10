import {render} from './utils';
import PageController from './controllers/page-controller.js';
import ProfileRatingComponent from './components/profile.js';
import MainNavigationComponent from './components/main-navigation.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import {generateFilms} from './mock/films.js';

const FILMS_COUNT = 54;

const films = generateFilms(FILMS_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new ProfileRatingComponent(films).getElement());
render(siteMainElement, new MainNavigationComponent(films).getElement());

const pageController = new PageController(siteMainElement);
pageController.render(films);

const footerStatistics = siteFooterElement.querySelector(`.footer__statistics`);
siteFooterElement.replaceChild(new FooterStatisticComponent(films).getElement(), footerStatistics);
