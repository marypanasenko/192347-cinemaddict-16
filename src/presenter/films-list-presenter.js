import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsEmptyListView from '../view/film-empty-list-view.js';
import {render, RenderPosition, remove} from '../util/render.js';
import ButtonMoreView from '../view/button-more-view.js';
import FilmPresenter from './film-presenter.js';
import {siteMainElement} from '../main.js';
import SortContentView from '../view/sort-content-view';
import {sortByDate, sortByRating} from '../util/sort';
import {SortType} from '../const';

const CARD_COUNT = 5;

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export default class FilmsListPresenter {
  #filmsContainer = null;
  #sortComponent = new SortContentView();
  #filmsListComponent = new FilmsListContainerView();
  #loadButtonMoreComponent = new ButtonMoreView();

  #boardFilms = [];
  #renderedFilmCount = CARD_COUNT;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardFilms = [];

  constructor(filmsContainer) {
    this.#filmsContainer = filmsContainer;
  }


  init = (boardFilms) => {
    this.#boardFilms = [...boardFilms];
    this.#sourcedBoardFilms = [...boardFilms];
    render(this.#filmsContainer, this.#filmsListComponent, RenderPosition.BEFOREEND);

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleFilmChange = (updatedFilm) => {
    this.#boardFilms = updateItem(this.#boardFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListComponent, this.#handleFilmChange, this.#handleModeChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #sortFilms = (sortType) => {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.DATE:
        this.#boardFilms.sort(sortByDate);
        break;
      case SortType.RATING:
        this.#boardFilms.sort(sortByRating);
        break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#boardFilms = [...this.#sourcedBoardFilms];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderFilmList();
  }

  #renderSort = () => {
    const siteMenuElement = siteMainElement.querySelector('.main-navigation');
    render(siteMenuElement, this.#sortComponent, RenderPosition.AFTEREND);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderFilms = (from, to) => {
    this.#boardFilms
      .slice(from, to)
      .forEach((boardFilms) => this.#renderFilm(boardFilms));
  }

  #cardShowHandler = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + CARD_COUNT);
    this.#renderedFilmCount += CARD_COUNT;

    if (this.#renderedFilmCount >= this.#boardFilms.length) {
      remove(this.#loadButtonMoreComponent);
    }
  }

  #renderNoTasks = () => {
    const siteFilmsElement = siteMainElement.querySelector('.films-list');
    render(siteFilmsElement, new FilmsEmptyListView().element, RenderPosition.BEFOREEND);
  }

  #renderLoadMoreButton = () => {
    render(siteMainElement, this.#loadButtonMoreComponent, RenderPosition.BEFOREEND);
    this.#loadButtonMoreComponent.setClickHandler(this.#cardShowHandler);
  }

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedFilmCount = CARD_COUNT;
    remove(this.#loadButtonMoreComponent);
  }

  #renderFilmList = () => {
    this.#renderFilms(0, Math.min(this.#boardFilms.length, CARD_COUNT));

    if (this.#boardFilms.length > CARD_COUNT) {
      this.#renderLoadMoreButton();
    }
  };

  #renderBoard = () => {
    this.#renderSort();
    this.#renderFilmList();
    if (this.#boardFilms.length === 0) {
      this.#renderNoTasks();
      this.#loadButtonMoreComponent.element.remove();
      this.#sortComponent.element.remove();
    }
  }
}

