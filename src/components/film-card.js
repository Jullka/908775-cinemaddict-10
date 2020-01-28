import AbstractComponent from './abstract-component.js';
import {formatTime, formatYear} from '../utils.js';

export default class FilmCardComponent extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return `<article class="film-card">
              <h3 class="film-card__title">${this._film.title}</h3>
              <p class="film-card__rating">${this._film.rating}</p>
              <p class="film-card__info">
                <span class="film-card__year">${formatYear(this._film.releaseDate)}</span>
                <span class="film-card__duration">${formatTime(this._film.duration)}</span>
                <span class="film-card__genre">${this._film.genres[0]}</span>
              </p>
              <img src="./images/posters/${this._film.poster}" alt="" class="film-card__poster">
              <p class="film-card__description">${this._film.description}</p>
              <a class="film-card__comments">${this._film.comments.length.toString()} comments</a>
              <form class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${this._film.isAddedToWatchlist ? ` film-card__controls-item--active` : ``}">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${this._film.isAlreadyWatched ? ` film-card__controls-item--active` : ``}">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite${this._film.isAddedToFavorites ? ` film-card__controls-item--active` : ``}">Mark as favorite</button>
              </form>
            </article>`;
  }

  setOpenDetailsClickHandler(handler) {
    this.getElement()
      .querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`)
      .forEach((element) => element.addEventListener(`click`, handler));
  }

  setWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}
