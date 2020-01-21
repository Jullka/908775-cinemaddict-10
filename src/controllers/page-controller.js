import {render, remove} from "../utils";
import FilmCardComponent from "../components/film-card.js";
import NoFilmsComponent from "../components/no-films.js";
import FilmDetailsComponent from "../components/film-details.js";
import ShowMoreButtonComponent from "../components/show-more-button";
import MostCommentedComponent from "../components/most-commented";
import TopRatedComponent from "../components/top-rated.js";

const SHOWING_FILMS_COUNT_ON_START = 5;
const SHOWING_FILMS_COUNT_BY_BUTTON = 5;
const FILM_EXTRA_COUNT = 2;

export default class PageController {
  constructor(container) {
    this._container = container;
    this._showingFilmsCount = SHOWING_FILMS_COUNT_ON_START;
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
    this._noFilmsComponent = new NoFilmsComponent();
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
      render(document.querySelector(`body`), filmDetailsComponent);
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

  _renderShowMoreButton(filmListContainerElement, films) {
    const container = this._container.getElement();
    render(container, this._showMoreButtonComponent.getElement());

    this._showMoreButtonComponent.setClickHandler(() => {
      const prevTasksCount = this._showingFilmsCount;
      this._showingFilmsCount = this._showingFilmsCount + SHOWING_FILMS_COUNT_BY_BUTTON;

      this._renderFilms(filmListContainerElement, films.slice(prevTasksCount, this._showingFilmsCount));

      if (this._showingFilmsCount >= films.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  render(films) {
    const container = this._container.getElement();
    const filmListContainerElement = container.querySelector(`.films-list__container`);

    if (films.length === 0) {
      render(container, this._noFilmsComponent.getElement());
    } else {
      this._renderFilms(filmListContainerElement, films.slice(0, this._showingFilmsCount));
      this._renderShowMoreButton(filmListContainerElement, films);

      const filmTopList = films.slice().sort((a, b) => b.rating - a.rating).slice(0, FILM_EXTRA_COUNT);
      if (filmTopList.length) {
        const topRatedComponent = new TopRatedComponent();
        const filmsListTopContainerElement = topRatedComponent.getElement().querySelector(`.films-list__container`);
        render(container, topRatedComponent.getElement());
        this._renderFilms(filmsListTopContainerElement, filmTopList);
      }

      const filmMostList = films.slice().sort((a, b) => b.comments - a.comments).slice(0, FILM_EXTRA_COUNT);
      if (filmMostList.length) {
        const mostCommentedComponent = new MostCommentedComponent();
        const filmsListMostContainerElement = mostCommentedComponent.getElement().querySelector(`.films-list__container`);
        render(container, mostCommentedComponent.getElement());
        this._renderFilms(filmsListMostContainerElement, filmMostList);
      }
    }
  }
}
