import {createElement} from '../utils.js';

export default class FilmsSection {
  constructor() {
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
    return (
      `<section class="films"></section>`
    );
  }
}
