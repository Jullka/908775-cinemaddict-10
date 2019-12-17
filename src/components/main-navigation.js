export const createMainNavigationTemplate = (filters) => {
  return `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      ${filters
        .map((item) => {
          return `<a href="#watchlist" class="main-navigation__item">${item.name} <span class="main-navigation__item-count">${item.count}</span></a>`;
        })
        .join(` `)
}

      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>
    <ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`;
};
