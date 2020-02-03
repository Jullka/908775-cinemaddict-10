import {render, RenderPosition} from './utils.js';
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';
import ProfileRatingComponent from './components/profile-component.js';
import StatisticsComponent from './components/statistics-component.js';
import FooterStatisticComponent from './components/footer-statistic-component.js';
import StatisticsController from "./controllers/statistics-controller.js";
import FilmsModel from './models/films-model.js';
import {generateFilms} from './mocks/films-mock.js';
import {MainNavigationItems} from "./components/main-navigation-component.js";
import {getRank} from './utils.js';

const FILMS_COUNT = 54;

const films = generateFilms(FILMS_COUNT);
const rank = getRank(films);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new ProfileRatingComponent(rank).getElement());

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterController = new FilterController(siteMainElement, filmsModel);
filterController.render();

const pageController = new PageController(siteMainElement, filmsModel);
pageController.render();

const statisticsComponent = new StatisticsComponent(siteMainElement, filmsModel).getElement();
render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

const footerStatistics = siteFooterElement.querySelector(`.footer__statistics`);
siteFooterElement.replaceChild(new FooterStatisticComponent(films).getElement(), footerStatistics);

const statisticsController = new StatisticsController(siteMainElement, filmsModel);
statisticsController.render();
statisticsController.hide();

filterController.setOnChange((mainNavigationItem) => {
  switch (mainNavigationItem) {
    case MainNavigationItems.STATS:
      statisticsController.show();
      pageController.hide();
      break;
    default:
      statisticsController.hide();
      pageController.show();
      break;
  }
});
