import StatisticsComponent from '../components/statistics-component.js';
import StatisticsRankComponent from '../components/statistics-rank-component.js';
import StatisticsFiltersComponent from '../components/statistics-filter-component.js';
import {render, replace, RenderPosition} from '../utils.js';
import {StatisticType, getRank, getFilmsByPeriod} from '../utils.js';

export default class StatisticsController {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;
    this._rank = null;
    this._activeFilterType = StatisticType.ALL;

    this._statisticsComponent = null;
    this._statisticsRankComponent = null;
    this._statisticsRankComponent = null;

    this._onStatisticsFilterChange = this._onStatisticsFilterChange.bind(this);
  }

  render() {
    const oldStatisticsComponent = this._statisticsComponent;
    const films = this._filmsModel.getFilms();
    const filmIsWatching = getFilmsByPeriod(films, this._activeFilterType);
    this._rank = getRank(films);

    this._statisticsComponent = new StatisticsComponent(filmIsWatching, this._activeFilterType);
    this._statisticsRankComponent = new StatisticsRankComponent(this._rank);
    this._statisticsFiltersComponent = new StatisticsFiltersComponent(this._activeFilterType);

    this._statisticsFiltersComponent.setClickSortHandler(this._onStatisticsFilterChange);

    const statisicsElement = this._statisticsComponent.getElement();
    render(statisicsElement, this._statisticsFiltersComponent, RenderPosition.AFTERBEGIN);
    render(statisicsElement, this._statisticsRankComponent, RenderPosition.AFTERBEGIN);

    if (oldStatisticsComponent) {
      replace(this._statisticsComponent, oldStatisticsComponent);
    } else {
      render(this._container, this._statisticsComponent);
    }
  }

  show() {
    this._statisticsComponent.show();
    this.render();
  }

  hide() {
    this._statisticsComponent.hide();
  }

  _onStatisticsFilterChange(filterType) {
    this._activeFilterType = filterType;
    this.render();
  }
}
