import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import AbstractSmartComponent from './abstract-smart-component.js';

const prepearData = (films) => {
  const genres = [];
  const genresData = new Map();

  films.map((film) => film.genres.forEach((genre) => genres.push(genre)));

  genres.forEach((genre) => {
    if (genresData.has(genre)) {
      const value = genresData.get(genre);
      genresData.set(genre, value + 1);
    } else {
      genresData.set(genre, 1);
    }
  });

  return genresData;
};

const sortedData = (genresData) => {
  return new Map([...genresData].sort((a, b) => b[1] - a[1]));
};

const renderFilmChart = (filmsCtx, films) => {
  const BAR_COLOR = `#ffe800`;
  const LABEL_PADDING = 80;
  const LABEL_COLOR = `#fff`;
  const LABEL_FONT_SIZE = 18;
  const LABEL_OFFSET = 40;

  const genresData = prepearData(films);
  const sortedGenresData = sortedData(genresData);

  return new Chart(filmsCtx, {
    type: `horizontalBar`,
    data: {
      labels: [...sortedGenresData.keys()],
      datasets: [{
        data: [...sortedGenresData.values()],
        backgroundColor: BAR_COLOR,
        categoryPercentage: 0.5,
        barPercentage: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          display: false,
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
          ticks: {
            padding: LABEL_PADDING,
            fontColor: LABEL_COLOR,
            fontSize: LABEL_FONT_SIZE
          }
        }]
      },
      plugins: {
        datalabels: {
          color: LABEL_COLOR,
          font: {
            size: LABEL_FONT_SIZE
          },
          anchor: `start`,
          align: `left`,
          offset: LABEL_OFFSET
        }
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    },
    plugins: [ChartDataLabels]
  });
};

const getDuration = (films) => {
  const totalMinutes = films.reduce((acc, film) => {
    const duration = film.duration.split(` `);
    const h = parseInt(duration[0], 10);
    const m = parseInt(duration[1], 10);
    const total = (h * 60) + m;

    return acc + total;
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    hours,
    minutes
  };
};

export default class StatisticsComponent extends AbstractSmartComponent {
  constructor(films) {
    super();

    this._films = films;
    this._filmsChart = null;
    this._renderCharts();
    this._countFilms = films.length || 0;
    this._totalDurationHours = getDuration(films).hours;
    this._totalDurationMinutes = getDuration(films).minutes;

    this._genresData = prepearData(films);
    this._sortedGenresData = sortedData(this._genresData);
    this._topGenre = [...this._sortedGenresData.keys()].shift() || `-`;
  }

  getTemplate() {
    return `<section class="statistic">
              <ul class="statistic__text-list">
                <li class="statistic__text-item">
                  <h4 class="statistic__item-title">You watched</h4>
                  <p class="statistic__item-text">${this._countFilms}<span class="statistic__watched-count">22</span> <span class="statistic__item-description">movies</span></p>
                </li>
                <li class="statistic__text-item">
                  <h4 class="statistic__item-title">Total duration</h4>
                  <p class="statistic__item-text">${this._totalDurationHours} <span class="statistic__item-description">h</span> ${this._totalDurationMinutes} <span class="statistic__item-description">m</span></p>
                </li>
                <li class="statistic__text-item">
                  <h4 class="statistic__item-title">Top genre</h4>
                  <p class="statistic__item-text">${this._topGenre}</p>
                </li>
              </ul>
              <div class="statistic__chart-wrap">
                <canvas class="statistic__chart" width="1000"></canvas>
              </div>
            </section>`;
  }

  _renderCharts() {
    const element = this.getElement();
    const filmsCtx = element.querySelector(`.statistic__chart`);

    this._resetCharts();

    this._filmsChart = renderFilmChart(filmsCtx, this._films);
  }

  _resetCharts() {
    if (this._filmsChart) {
      this._filmsChart.destroy();
      this._filmsChart = null;
    }
  }

  rerender(films) {
    this._films = films;

    super.rerender();

    this._renderCharts();
  }

  show() {
    super.show();

    this.rerender(this._films);
  }

  recoveryListeners() {}
}
