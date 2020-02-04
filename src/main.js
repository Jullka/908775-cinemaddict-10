import {render} from './utils.js';
import PageController from './controllers/page-controller.js';
import FilterController from './controllers/filter-controller.js';
import ProfileRatingComponent from './components/profile-component.js';
import FooterStatisticComponent from './components/footer-statistic-component.js';
import StatisticsController from "./controllers/statistics-controller.js";
import FilmsModel from './models/films-model.js';
import {MainNavigationItems} from "./components/main-navigation-component.js";
import {getRank} from './utils.js';
import API from "./api.js";

export const AUTHORIZATION = `Basic eo0w590ik29889a`;
export const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

const api = new API(END_POINT, AUTHORIZATION);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const filmsModel = new FilmsModel();

const filterController = new FilterController(siteMainElement, filmsModel);

const pageController = new PageController(siteMainElement, filmsModel, api);

const statisticsController = new StatisticsController(siteMainElement, filmsModel);
statisticsController.render();
statisticsController.hide();

api.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    filterController.render();
    pageController.render();

    filterController.setOnChange((mainNavigationItems) => {
      switch (mainNavigationItems) {
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

    const rank = getRank(films);
    render(siteHeaderElement, new ProfileRatingComponent(rank).getElement());

    const footerStatisticComponent = new FooterStatisticComponent(films.length);
    render(document.querySelector(`.footer__statistics`), footerStatisticComponent);
  });
