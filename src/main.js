import {render} from './utils.js';
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';
import ProfileRatingComponent from './components/profile-component.js';
import FooterStatisticComponent from './components/footer-statistic-component.js';
import FilmsModel from './models/films-model.js';
import {generateFilms} from './mocks/films-mock.js';

const FILMS_COUNT = 54;

const films = generateFilms(FILMS_COUNT);
const moviesModel = new FilmsModel();
moviesModel.setFilms(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new ProfileRatingComponent(films).getElement());

const filterController = new FilterController(siteMainElement, moviesModel);
filterController.render();

const pageController = new PageController(siteMainElement);
pageController.render(films);

const footerStatistics = siteFooterElement.querySelector(`.footer__statistics`);
siteFooterElement.replaceChild(new FooterStatisticComponent(films).getElement(), footerStatistics);
