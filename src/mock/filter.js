const filmToFilterMap = {
  watchlist: (filmCard) => filmCard
    .filter((filtredFilm) => filtredFilm.watchlist).length,
  history: (filmCard) => filmCard
    .filter((filtredFilm) => filtredFilm.history).length,
  favorites: (filmCard) => filmCard
    .filter((filtredFilm) => filtredFilm.favorite).length,
};
export const generateFilter = (filmCard) => Object.entries(filmToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(filmCard),
  }),
);
