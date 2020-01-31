import AbstractComponent from './abstract-component.js';
// import {getCheckedParametersCount} from '../utils/common.js';

const ACTIVE_CLASS = `main-navigation__item--active`;

export const MainNavigationItems = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATS: `stats`
};

const getCurrentItem = (href) => {
  return href.split(`#`)[1];
};

const createMainNavigationMarkup = (item, {isChecked, isLast}) => {
  const {name, code, count} = item;

  const checkedClass = isChecked ? `main-navigation__item--active` : ``;
  const lastClass = isLast ? `main-navigation__item--additional` : ``;
  const countMarkup = count ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  return (
    `<a href="#${code}" class="main-navigation__item ${checkedClass} ${lastClass}">${name} ${countMarkup}</a>`
  );
};
const createMainNavigationTemplate = (mainNavigationItems) => {
  const mainNavigationMarkup = mainNavigationItems.map((item, i) => createMainNavigationMarkup(item, {isChecked: i === 0, isLast: i === mainNavigationItems.length - 1})).join(`\n`);
  return (
    `<nav class="main-navigation">
      ${mainNavigationMarkup}
    </nav>`
  );
};

export default class MainNavigationComponent extends AbstractComponent {
  constructor(mainNavigationItems) {
    super();
    this._mainNavigationItems = mainNavigationItems;
  }
  getTemplate() {
    return createMainNavigationTemplate(this._mainNavigationItems);
  }

  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const filterName = evt.target.href.split(`#`)[1];
      if (!filterName) {
        return;
      }

      handler(filterName);
    });
  }

  setActiveMainNavigation(mainNavigationItem) {
    const mainNavigationItems = this.getElement().querySelectorAll(`.main-navigation__item`);
    mainNavigationItems.forEach((item) => {
      item.classList.remove(ACTIVE_CLASS);
      if (getCurrentItem(item.href) === mainNavigationItem) {
        item.classList.add(ACTIVE_CLASS);
      }
    });
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      const mainNavigationItem = getCurrentItem(evt.target.href);

      if (!mainNavigationItem) {
        return;
      }

      handler(mainNavigationItem);
    });
  }
}
