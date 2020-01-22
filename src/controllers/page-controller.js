import {render, remove} from "../utils";
import FilmCardComponent from "../components/film-card.js";
import NoFilmsComponent from "../components/no-films.js";
import FilmDetailsComponent from "../components/film-details.js";
import ShowMoreButtonComponent from "../components/show-more-button";
import MostCommentedComponent from "../components/most-commented";
import TopRatedComponent from "../components/top-rated.js";
import FilmsSectionComponent from '../components/films-section.js';
import SortComponent, {SortType} from '../components/sort';

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const FILM_EXTRA_COUNT = 2;

export default class PageController {
  constructor(container) {
    this._container = container;
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._noFilmsComponent = new NoFilmsComponent();
    this._sortComponent = new SortComponent();
    this._filmsSectionComponent = new FilmsSectionComponent();
  }

  _renderFilms(filmsContainer, films) {
    films.forEach((film) => {
      this._renderFilm(filmsContainer, film);
    });
  }

  _renderFilm(filmsContainer, film) {
    const filmCardComponent = new FilmCardComponent(film);
    const filmDetailsComponent = new FilmDetailsComponent(film);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        closeFilmDetails();
      }
    };

    const openFilmDetails = () => {
      render(document.querySelector(`body`), filmDetailsComponent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
      filmDetailsComponent.setClickCloseHandler(closeFilmDetails);
    };
    const closeFilmDetails = () => {
      remove(filmDetailsComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };
    filmCardComponent.setOpenDetailHandler(openFilmDetails);
    render(filmsContainer, filmCardComponent.getElement());
  }

  _renderShowMoreButton(films) {
    if (this._showingFilmsCount >= films.length) {
      return;
    }

    const filmsSectionElement = this._filmsSectionComponent.getElement();
    const filmsListElement = filmsSectionElement.querySelector(`.films-list`);
    const filmsListContainerElement = filmsListElement.querySelector(`.films-list__container`);
    render(filmsListElement, this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      this._renderFilms(filmsListContainerElement, films.slice(prevTasksCount, this._showingFilmsCount));

      if (this._showingFilmsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  render(films) {
    if (films.length === 0) {
      render(this._container, this._noFilmsComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._filmsSectionComponent);
    const filmsElement = this._filmsSectionComponent.getElement();
    const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);

    this._sortComponent.setClickSortHandler((sortType) => {
      let sortFilms = [];

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
      filmsListContainerElement.innerHTML = ``;
      remove(this._showMoreButtonComponent);

      this._renderFilms(filmsListContainerElement, sortFilms.slice(0, this._showingFilmsCount));
      this._renderShowMoreButton(sortFilms);
    });

    this._renderFilms(filmsListContainerElement, films.slice(0, this._showingFilmsCount));
    this._renderShowMoreButton(films);

    const TopRatedList = films.slice().sort((a, b) => b.rating - a.rating).slice(0, FILM_EXTRA_COUNT);
    if (TopRatedList.length) {
      const filmsTopRatedComponent = new TopRatedComponent();
      const filmsListTopContainerElement = filmsTopRatedComponent.getElement().querySelector(`.films-list__container`);
      render(filmsElement, filmsTopRatedComponent);
      this._renderFilms(filmsListTopContainerElement, TopRatedList);
    }

    const MostCommentedList = films.slice().sort((a, b) => b.comments - a.comments).slice(0, FILM_EXTRA_COUNT);
    if (MostCommentedList.length) {
      const mostCommentedComponent = new MostCommentedComponent();
      const filmsListMostContainerElement = mostCommentedComponent.getElement().querySelector(`.films-list__container`);
      render(filmsElement, mostCommentedComponent);
      this._renderFilms(filmsListMostContainerElement, MostCommentedList);
    }
  }
}
