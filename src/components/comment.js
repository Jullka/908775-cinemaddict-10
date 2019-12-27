import {getCommentDateTime, createElement} from '../utils.js';

export default class Comment {
  constructor(comment) {
    this._comment = comment;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="${this._comment.emoji}" width="55" height="55" alt="emoji">
              </span>
              <div>
                <p class="film-details__comment-text">${this._comment.text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${this._comment.userName}</span>
                  <span class="film-details__comment-day">${getCommentDateTime(this._comment.date)}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`;
  }
}
