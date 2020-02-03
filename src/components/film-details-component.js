import he from 'he';
import CommentsComponent from './comments-component.js';
import AbstractSmartComponent from './abstract-smart-component.js';
import {formatDate, formatTime} from '../utils.js';

const GENRES_NAME_SWITCH_LIMIT = 1;

const parseFormData = (formData) => {
  const date = new Date().getTime();
  const comment = he.encode(formData.get(`comment`));

  return {
    id: String(Date.now() + Math.random()),
    text: comment,
    date,
    emoji: `${formData.get(`comment-emoji`)}.png`
  };
};

export default class FilmDetailsComponent extends AbstractSmartComponent {
  constructor(film) {
    super();
    this._film = film;
    this._genreTitle = this._film.genres.length > GENRES_NAME_SWITCH_LIMIT ? `Genres` : `Genre`;
    this._genres = this._film.genres.map((item) => {
      return (`<span class="film-details__genre">` + item + `</span>`);
    }).join(``);
    this._comments = new CommentsComponent(this._film).getTemplate();
  }

  setChecked(isChecked) {
    return isChecked ? `checked` : ``;
  }

  setCloseClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }

  setWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, handler);
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, handler);
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, handler);
  }

  setFormSumbitHandler(handler) {
    handler();
  }

  recoveryListeners() {

  }

  getData() {
    const form = this.getElement().querySelector(`form`);
    const formData = new FormData(form);

    return parseFormData(formData);
  }

  getTemplate() {
    return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${this._film.poster}" alt="">
              <p class="film-details__age">${this._film.age.toString()}</p>
            </div>
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${this._film.title}</h3>
                  <p class="film-details__title-original">Original: ${this._film.titleOriginal}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${this._film.rating.toString()}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${this._film.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${this._film.writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${this._film.actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${formatDate(this._film.releaseDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatTime(this._film.duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${this._film.country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${this._genreTitle}</td>
                  <td class="film-details__cell">${this._genres}</td>
                </tr>
              </table>

              <p class="film-details__film-description">${this._film.description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this.setChecked(this._film.isAddedToWatchlist)}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this.setChecked(this._film.isAlreadyWatched)}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this.setChecked(this._film.isAddedToFavorites)}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
        <div class="form-details__middle-container">
        </div>
        <div class="form-details__bottom-container">
        </div>
      </form>
    </section>`;
  }
}
