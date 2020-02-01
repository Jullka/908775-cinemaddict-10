import AbstractComponent from './abstract-component.js';

export default class CountCommentsComponent extends AbstractComponent {
  constructor(countComments) {
    super();

    this._countComments = countComments;
  }

  getTemplate() {
    return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._countComments}</span></h3>`;
  }
}
