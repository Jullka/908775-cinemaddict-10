import {FilterType, render, replace} from '../utils.js';
import MainNavigationComponent from '../components/main-navigation-component.js';
import {generateMainNavigation} from '../mocks/main-navigation-mock.js';

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._activeFilterType = FilterType.ALL;
    this._MainNavigationComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const oldComponent = this._mainNavigationComponent;
    const films = this._filmsModel.getFilms();
    const mainNavigationItems = generateMainNavigation(films);
    this._mainNavigationComponent = new MainNavigationComponent(mainNavigationItems);
    this._recoveryListeners();

    if (oldComponent) {
      replace(this._mainNavigationComponent, oldComponent);
    } else {
      render(this._container, this._mainNavigationComponent);
    }
  }

  _onFilterChange(filterName) {
    this._filmsModel.setFilter(filterName);
    this._activeFilterType = filterName;
  }
  _onDataChange() {
    this.render();
  }

  setOnChange(handler) {
    this._handlerOnMenuChange = handler;
    this._mainNavigationComponent.setOnChange((mainNavigationItem) => {
      this._mainNavigationComponent.setActiveMainNavigation(mainNavigationItem);
      if (this._handlerOnMainNavigationChange) {
        this._handlerOnMenuChange(mainNavigationItem);
      }
    });
  }

  _recoveryListeners() {
    this._mainNavigationComponent.setOnChange(this._onFilterChange);
    this.setOnChange(this._handlerOnMainNavigationChange);
  }
}
