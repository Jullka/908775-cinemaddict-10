import {render, RenderPosition} from './utils';
import PageController from './controllers/page-controller.js';
import ProfileRatingComponent from './components/profile.js';
import MainNavigationComponent from './components/main-navigation.js';
import FilmsSectionComponent from "./components/films-section";
import SortComponent from './components/sort.js';
import FooterStatisticComponent from './components/footer-statistic.js';
import {generateFilms} from './mock/films.js';

const FILMS_COUNT = 54;

const films = generateFilms(FILMS_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

render(siteHeaderElement, new ProfileRatingComponent(films).getElement());
render(siteMainElement, new MainNavigationComponent(films).getElement());
render(siteMainElement, new SortComponent().getElement());

const filmsSection = new FilmsSectionComponent();
render(siteMainElement, filmsSection, RenderPosition.BEFOREEND);

const pageController = new PageController(filmsSection);
pageController.render(films);

const footerStatistics = footer.querySelector(`.footer__statistics`);
footer.replaceChild(new FooterStatisticComponent(films).getElement(), footerStatistics);
