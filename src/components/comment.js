import AbstractComponent from './abstract-component.js';

export default class CommentComponent extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  formatDateTime(date) {
    const day = date.getDate() < 10 ? `0` + date.getDate() : date.getDate().toString();
    const month = date.getMonth() + 1;
    return date.getFullYear() + `/` + month + `/` + day + ` ` + date.getHours() + `:` + date.getMinutes();
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
                  <span class="film-details__comment-day">${this.formatDateTime(this._comment.date)}</span>
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`;
  }
}