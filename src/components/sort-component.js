import AbstractComponent from './abstract-component.js';
import {SortType} from '../utils.js';


export default class Sort extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return `<ul class="sort">
              <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
              <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button">Sort by date</a></li>
              <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button">Sort by rating</a></li>
            </ul>`;
  }

  setClickSortHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      if (evt.target.classList.contains(`sort__button--active`)) {
        return;
      }

      if (this._currentSortType === evt.target.dataset.sortType) {
        return;
      }

      this.getElement().querySelector(`.sort__button--active`).classList.remove(`sort__button--active`);
      evt.target.classList.add(`sort__button--active`);

      this._currentSortType = evt.target.dataset.sortType;

      handler(this._currentSortType);
    });
  }
}

