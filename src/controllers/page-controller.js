import {render, remove} from "../utils";
import NoFilmsComponent from "../components/no-films.js";
import ShowMoreButtonComponent from "../components/show-more-button";
import MostCommentedComponent from "../components/most-commented";
import TopRatedComponent from "../components/top-rated.js";
import FilmsSectionComponent from '../components/films-section.js';
import SortComponent, {SortType} from '../components/sort';
import MovieController from '../controllers/movie-controller.js';


const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const FILM_EXTRA_COUNT = 2;

export default class PageController {
  constructor(container) {
    this._container = container;
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._films = [];
    this._showedFilmControllers = [];
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._noFilmsComponent = new NoFilmsComponent().getElement();
    this._sortComponent = new SortComponent();
    this._filmsSectionComponent = new FilmsSectionComponent().getElement();
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  _onDataChange(movieController, oldFilm, newFilm) {
    const index = this._films.findIndex((film) => film === oldFilm);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newFilm, this._films.slice(index + 1));
    movieController.render(this._films[index]);
  }

  _onViewChange() {
    this._showedFilmControllers.forEach((it) => it.setDefaultView());
  }

  _renderFilms(filmsContainer, films, onDataChange, onViewChange) {
    return films.map((film) => {
      const movieController = new MovieController(filmsContainer, onDataChange, onViewChange);
      movieController.render(film);
      return movieController;
    });
  }

  _renderShowMoreButton(films) {
    if (this._showingFilmsCount >= films.length) {
      return;
    }

    const filmsSectionElement = this._filmsSectionComponent;
    const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
    render(filmsListElement, this._showMoreButtonComponent.getElement());

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      const newFilms = this._renderFilms(filmsListContainerElement, films.slice(prevTasksCount, this._showingFilmsCount), this._onDataChange, this._onViewChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilms);

      if (this._showingFilmsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  render(films) {
    this._films = films;
    if (this._filmslength === 0) {
      render(this._container.getElement(), this._noFilmsComponent);
      return;
    }

    render(this._container, this._sortComponent.getElement());
    render(this._container, this._filmsSectionComponent);
    const filmsElement = this._filmsSectionComponent;
    const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);

    this._sortComponent.setClickSortHandler((sortType) => {
      let sortFilms = [];
      this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;

      switch (sortType) {
        case SortType.DATE:
          sortFilms = this._films.slice().sort((a, b) => Date.parse(b.releaseDate) - Date.parse(a.releaseDate));
          break;
        case SortType.RATING:
          sortFilms = this._films.slice().sort((a, b) => b.rating - a.rating);
          break;
        case SortType.DEFAULT:
          sortFilms = this._films.slice();
          break;
      }
      filmsListContainerElement.innerHTML = ``;
      remove(this._showMoreButtonComponent);

      const newFilms = this._renderFilms(filmsListContainerElement, sortFilms.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
      this._showedFilmControllers = newFilms;
      this._renderShowMoreButton(sortFilms);
    });

    const newFilms = this._renderFilms(filmsListContainerElement, this._films.slice(0, this._showingFilmsCount), this._onDataChange, this._onViewChange);
    this._showedFilmControllers = newFilms;
    this._renderShowMoreButton(films);

    const TopRatedList = this._films.slice().sort((a, b) => b.rating - a.rating).slice(0, FILM_EXTRA_COUNT);
    if (TopRatedList.length) {
      const filmsTopRatedComponent = new TopRatedComponent();
      const filmsListTopContainerElement = filmsTopRatedComponent.getElement().querySelector(`.films-list__container`);
      render(filmsElement, filmsTopRatedComponent.getElement());
      const newFilmsTop = this._renderFilms(filmsListTopContainerElement, TopRatedList, this._onDataChange, this._onViewChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilmsTop);
    }

    const MostCommentedList = this._films.slice().sort((a, b) => b.comments - a.comments).slice(0, FILM_EXTRA_COUNT);
    if (MostCommentedList.length) {
      const mostCommentedComponent = new MostCommentedComponent();
      const filmsListMostContainerElement = mostCommentedComponent.getElement().querySelector(`.films-list__container`);
      render(filmsElement, mostCommentedComponent.getElement());
      const newFilmsMost = this._renderFilms(filmsListMostContainerElement, MostCommentedList, this._onDataChange, this._onViewChange);
      this._showedFilmControllers = this._showedFilmControllers.concat(newFilmsMost);
    }
  }
}

