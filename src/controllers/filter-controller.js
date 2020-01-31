import {FilterType, render, replace} from '../utils.js';
import MainNavigationComponent from '../components/main-navigation-component.js';

export default class FilterController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._activeFilterType = FilterType.ALL;

    this._mainNavigationComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._filmsModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const oldComponent = this._mainNavigationComponent;

    this._mainNavigationComponent = new MainNavigationComponent();
    this._mainNavigationComponent.setFilterTypeChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._mainNavigationComponent, oldComponent);
    } else {
      render(this._container, this._mainNavigationComponent);
    }
  }

  _onFilterChange(filterType) {
    this._filmsModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}
