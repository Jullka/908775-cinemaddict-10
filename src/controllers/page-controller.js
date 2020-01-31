import {SortType, render, remove} from '../utils.js';
import NoFilmsComponent from '../components/no-films-component.js';
import ShowMoreButtonComponent from '../components/show-more-button-component';
import MostCommentedComponent from '../components/most-commented-component';
import TopRatedComponent from '../components/top-rated-component.js';
import FilmsSectionComponent from '../components/films-section-component.js';
import SortComponent from '../components/sort-component.js';
import MovieController from '../controllers/movie-controller.js';


const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const FILM_EXTRA_COUNT = 2;

export default class PageController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._filmsListContainer = null;
    this._filmsSectionElement = null;
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this._films = [];
    this._showedFilmControllers = [];

    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._noFilmsComponent = new NoFilmsComponent().getElement();
    this._sortComponent = new SortComponent();
    this._filmsSectionComponent = new FilmsSectionComponent().getElement();
    this._topRatedComponent = new TopRatedComponent();
    this._mostCommentedComponent = new MostCommentedComponent();

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onShowMoreButtonClick = this._onShowMoreButtonClick.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this.filmsModel.setFilterChangeHandler(this._onFilterChange);
    this._sortComponent.setClickSortHandler(this._onSortTypeChange);
  }

  _onFilterChange() {
    this._updateFilms(SHOWING_FILMS_COUNT_ON_START);
  }

  _updateFilms(count) {
    const films = this._filmsModel.getFilms().slice(0, count);
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

    this._removeFilms();
    remove(this._topRatedComponent);
    remove(this._mostCommentedComponent);

    this._renderFilms(this._filmsListContainer, films);
    this._renderTopRatedList();
    this._rendermostCommentedList();

    this._renderShowMoreButton();
  }

  _removeFilms() {
    this._showedFilmControllers.forEach((filmController) => filmController.destroy());
    this._showedFilmControllers = [];
  }

  _onDataChange(oldData, newData) {
    if (newData !== null) {
      this._filmsModel.updateFilms(oldData.id, newData);
    }
    this._updateFilms(this._showingFilmsCount);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _renderFilms(filmsContainer, films) {
    const newFilms = films.map((film) => {
      const movieController = new MovieController(filmsContainer, this._onDataChange, this._onViewChange, this._filmsModel);
      movieController.render(film);
      return movieController;
    });

    this._showedFilmControllers = [...this._showedFilmControllers, ...newFilms];
    this._countShowTasks = this._showedFilmControllers.length;
  }

  _renderShowMoreButton() {
    const films = this._filmsModel.getFilms();
    remove(this._showMoreButtonComponent);

    if (this._showingFilmsCount >= films.length) {
      return;
    }

    const filmsSectionElement = this._filmsSectionComponent.getElement();
    const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
    render(filmsListElement, this._showMoreButtonComponent.getElement());

    this._showMoreButtonComponent.setClickHandler(this._onShowMoreButtonClick);
  }

  _onShowMoreButtonClick() {
    const films = this._filmsModel.getFilms();
    const prevTasksCount = this._showingFilmsCount;
    this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;
    this._renderFilms(this._filmsListContainer, films.slice(prevTasksCount, this._showingFilmsCount));

    if (this._showingFilmsCount >= films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  render() {
    this._films = this._filmsModel.getFilms();
    if (this._films.length === 0) {
      render(this._container.getElement(), this._noFilmsComponent);
      return;
    }

    render(this._container, this._sortComponent.getElement());
    render(this._container, this._filmsSectionComponent);
    this._filmsSectionElement = this._filmsComponent.getElement();
    this._filmsListContainer = this._filmsSectionElement.querySelector(`.films-list__container`);

    this._renderFilms(this._filmsListContainer, this._films.slice(0, this._showingFilmsCount));
    this._renderShowMoreButton();

    this._renderTopRatedList();
    this._renderMostCommentedList();
  }

  _onSortTypeChange(sortType) {
    let sortFilms = [];

    const films = this._filmsModel.getFilms();

    switch (sortType) {
      case SortType.DATE:
        sortFilms = films.slice().sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate));
        break;
      case SortType.RATING:
        sortFilms = films.slice().sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
      default:
        sortFilms = films.slice();
        break;
    }

    this._removeFilms();
    this._renderFilms(this._filmsListContainer, sortFilms.slice(0, this._showingFilmsCount));
    this._renderShowMoreButton();
  }

  _renderTopRatedList() {
    const films = this._filmsModel.getFilms();
    const TopRatedList = this._getTopRatedList(films);
    if (!TopRatedList.length) {
      return;
    }

    render(this._filmsSectionElement, this._TopRatedComponent);
    const filmsListTopRatedContainer = this._topRatedComponent.getElement().querySelector(`.films-list__container`);
    this._renderFilms(filmsListTopRatedContainer, TopRatedList);
  }

  _renderMostCommentedList() {
    const films = this._filmsModel.getFilms();
    const mostCommentedList = this._getMostCommentedListFilms(films);
    if (!mostCommentedList.length) {
      return;
    }

    render(this._filmsSectionElement, this._mostCommentedComponent);
    const filmsListMostCommentedContainer = this._filmsMostCommentedComponent.getElement().querySelector(`.films-list__container`);
    this._renderFilms(filmsListMostCommentedContainer, mostCommentedList);
  }

  _getTopRatedList(films) {
    return films.slice().sort((a, b) => b.rating - a.rating).slice(0, FILM_EXTRA_COUNT);
  }

  _getMostCommentedListFilms(films) {
    return films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, FILM_EXTRA_COUNT);
  }
}
