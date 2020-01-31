import {render, RenderPosition} from './utils.js';
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';
import ProfileRatingComponent from './components/profile-component.js';
import StatisticsComponent from './components/statistics-component.js';
import FooterStatisticComponent from './components/footer-statistic-component.js';
import FilmsModel from './models/films-model.js';
import {generateFilms} from './mocks/films-mock.js';

const FILMS_COUNT = 54;

const films = generateFilms(FILMS_COUNT);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new ProfileRatingComponent(films).getElement());

const filterController = new FilterController(siteMainElement, filmsModel);
filterController.render();

const statisticsComponent = new StatisticsComponent().getElement();
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(siteMainElement, filmsModel);
pageController.render();

const footerStatistics = siteFooterElement.querySelector(`.footer__statistics`);
siteFooterElement.replaceChild(new FooterStatisticComponent(films).getElement(), footerStatistics);
