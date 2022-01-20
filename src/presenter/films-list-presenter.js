import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsEmptyListView from '../view/film-empty-list-view.js';
import {render, RenderPosition, remove} from '../util/render.js';
import ButtonMoreView from '../view/button-more-view.js';
import FilmPresenter from './film-presenter.js';
import {siteMainElement} from '../main.js';
import SortContentView from '../view/sort-content-view.js';
import {sortByDate, sortByRating} from '../util/sort.js';
import {SortType, UserAction, UpdateType } from '../const.js';
import { filter } from '../util/filter.js';

const CARD_COUNT = 5;

export default class FilmsListPresenter {
  #filmsContainer = null;
  #filmsModel = null;
  #filterModel = null;

  #currentSortType = SortType.DEFAULT;
  #sortComponent = new SortContentView(this.#currentSortType);
  #filmsListComponent = new FilmsListContainerView();
  #loadButtonMoreComponent = new ButtonMoreView();

  #renderedFilmCount = CARD_COUNT;
  #filmPresenter = new Map();


  constructor(filmsContainer, filmsModel, filterModel) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#filmsModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    switch (this.#currentSortType) {
      case SortType.DATE:
        return [...this.#filmsModel.films].sort(sortByDate);
      case SortType.RATING:
        return [...this.#filmsModel.films].sort(sortByRating);
      default:
        return [...this.#filmsModel.films];
    }
  }


  init = () => {
    render(this.#filmsContainer, this.#filmsListComponent, RenderPosition.BEFOREEND);

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#filmPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // userAction - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType){
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    // Коллбэк вызывается моделью по подписке
    switch(updateType){
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({ resetRenderedFilmCount: true, resetSortType: true });
        this.#renderBoard();
        break;
    }
  }

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListComponent, this.#handleViewAction, this.#handleModeChange);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = (sortType);
    this.#clearFilmList();
    this.#renderFilmList();
  }

  #renderSort = () => {
    const siteMenuElement = siteMainElement.querySelector('.main-navigation');
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(siteMenuElement, this.#sortComponent, RenderPosition.AFTEREND);
  }

  #renderFilms = (from, to) => {
    this.films
      .slice(from, to)
      .forEach((film) => this.#renderFilm(film));
  }

  #cardShowHandler = () => {
    this.#renderFilms(this.#renderedFilmCount, this.#renderedFilmCount + CARD_COUNT);
    this.#renderedFilmCount += CARD_COUNT;

    if (this.#renderedFilmCount >= this.films.length) {
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

  #clearBoard = ({ resetRenderedFCardCount = false, resetSortType = false } = {}) => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#loadButtonMoreComponent);
    remove(this.#sortComponent);
    remove(this.#filmsListComponent);

    if (resetRenderedFCardCount) {
      this.#renderedFilmCount = CARD_COUNT;
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #renderFilmList = () => {
    this.#renderFilms(0, Math.min(this.films.length, CARD_COUNT));

    if (this.films.length > CARD_COUNT) {
      this.#renderLoadMoreButton();
    }
  };

  #renderBoard = () => {
    this.#renderSort();
    this.#renderFilmList();
    if (this.films.length === 0) {
      this.#renderNoTasks();
      this.#loadButtonMoreComponent.element.remove();
      this.#sortComponent.element.remove();
    }
  }
}

