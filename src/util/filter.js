import {FilterType} from '../const.js';

export const filter = {
  [FilterType.ALL]: (filmCard) => filmCard,
  [FilterType.WATCHLIST]: (filmCard) => filmCard.filter(({ toWatchlist }) => toWatchlist === true),
  [FilterType.HISTORY]: (filmCard) => filmCard.filter(({ isWatched }) => isWatched === true),
  [FilterType.FAVORITES]: (filmCard) => filmCard.filter(({ isFavorite }) => isFavorite === true),
};
