const filmToFilterMap = {
  all: (filmCard) => filmCard.length,
  watchlist: (filmCard) => filmCard.filter(({ toWatchlist }) => toWatchlist === true).length,
  history: (filmCard) => filmCard.filter(({ isWatched }) => isWatched === true).length,
  favorites: (filmCard) => filmCard.filter(({ isFavorite }) => isFavorite === true).length,
};
export const generateFilter = (filmCard) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms], index) => ({
    name: filterName,
    count: countFilms(filmCard),
    isChecked: index === 0,
  }),
);
