const MainNavigationItems = [
  {name: `All movies`, code: `all`},
  {name: `Watchlist`, code: `watchlist`},
  {name: `History`, code: `history`},
  {name: `Favorites`, code: `favorites`},
  {name: `Stats`, code: `stats`},
];

const getMainNavigationCountItems = (title, films) => {
  switch (title) {
    case `Watchlist`:
      return films.filter((film) => film.isNeedWatch).length;
    case `History`:
      return films.filter((film) => film.isWatch).length;
    case `Favorites`:
      return films.filter((film) => film.isFavorite).length;
    default:
      return 0;
  }
};

export const generateMainNavigation = (films) => {
  return MainNavigationItems.map((item) => {
    return {
      name: item.name,
      code: item.code,
      count: getMainNavigationCountItems(item.name, films),
    };
  });
};

