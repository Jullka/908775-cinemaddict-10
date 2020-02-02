import AbstractComponent from './abstract-component.js';
import {formatCommentDate} from '../utils.js';

export default class CommentComponent extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
    this._date = formatCommentDate(comment.date);
    this._text = comment.text;
    this._user = comment.userName;
    this._emoji = comment.emoji;
  }
  getTemplate() {
    return `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${this._emoji}" width="55" height="55" alt="emoji">
              </span>
              <div>
                <p class="film-details__comment-text">${this._text}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${this._user}</span>
                  <span class="film-details__comment-day">${this._date}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`;
  }
  setDeleteClickHandler(handler) {
    const deleteButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    deleteButtons.forEach((button) => button.addEventListener(`click`, handler));
  }
}
