const FilterNames = [`all`, `watchlist`, `history`, `favorites`];

const generateFilters = () => {
  return FilterNames
  .map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10)
    };
  });
};

export {generateFilters};

