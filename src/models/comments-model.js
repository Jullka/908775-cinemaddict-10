import {USER} from "../utils.js";

export default class Comments {
  constructor() {
    this._comments = [];
    this._commentChangeHandlers = [];
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = Array.from(comments);
  }

  addComment(comment) {
    comment.user = this._getUser();
    this._comments = [...this._comments, comment];
    this._callHandlers(this._commentChangeHandlers);
  }

  _getUser() {
    return USER;
  }

  removeComment(data) {
    const index = this._comments.findIndex((it) => it.data === data);

    if (index === -1) {
      return false;
    }

    this._comments = [...this._comments.slice(0, index), ...this._comments.slice(index + 1)];
    this._callHandlers(this._commentChangeHandlers);

    return true;
  }

  setCommentChangeHandler(handler) {
    this._commentChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
