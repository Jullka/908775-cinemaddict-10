import FilmCardComponent from '../components/film-card.js';
import FilmDetailsComponent from '../components/film-details.js';
import UserRatingComponent from '../components/user-rating.js';

import {render, remove, replace} from "../utils";

const Mode = {
  DEFAULT: `default`,
  OPEN: `open`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._userRatingComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._closeDetails = this._closeDetails.bind(this);
    this._openDetails = this._openDetails.bind(this);
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._prepeareFilm(film);
    this._prepearDetails(film);

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent.getElement());
    }
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closeDetails();
    }
  }

  _prepeareFilm(film) {
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmCardComponent.setOpenDetailsClickHandler(() => this._openDetails(film));
    this._filmCardComponent.setWatchlistClickHandler((evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._filmCardComponent._film, Object.assign({}, this._filmCardComponent._film, {
        isAddedToWatchlist: !film.isAddedToWatchlist
      }));
    });
    this._filmCardComponent.setWatchedClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._filmCardComponent._film, Object.assign({}, this._filmCardComponent._film, {
        isAlreadyWatched: !film.isAlreadyWatched
      }));
    });
    this._filmCardComponent.setFavoriteClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, this._filmCardComponent._film, Object.assign({}, this._filmCardComponent._film, {
        isAddedToFavorites: !film.isAddedToFavorites
      }));
    });
  }

  _prepearDetails(film) {
    this._filmDetailsComponent = new FilmDetailsComponent(film);
    this._filmDetailsComponent.setCloseClickHandler(this._closeDetails);
    this._filmDetailsComponent.setWatchlistClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAddedToWatchlist: !film.isAddedToWatchlist
      }));
    });
    this._filmDetailsComponent.setWatchedClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAlreadyWatched: !film.isAlreadyWatched
      }));
    });
    this._filmDetailsComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, film, Object.assign({}, film, {
        isAddedToFavorites: !film.isAddedToFavorites
      }));
    });

    if (film.isAlreadyWatched) {
      const detailsMiddleContainer = this._filmDetailsComponent.getElement().querySelector(`.form-details__middle-container`);
      this._userRatingComponent = new UserRatingComponent(film);
      render(detailsMiddleContainer, this._userRatingComponent.getElement);
    }
  }

  _closeDetails() {
    this._mode = Mode.DEFAULT;
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _openDetails(film) {
    this._onViewChange();
    this._mode = Mode.OPEN;

    if (!this._filmDetailsComponent._element) {
      this._prepearDetails(film);
    }

    render(document.querySelector(`body`), this._filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeDetails();
    }
  }
}
