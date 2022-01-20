import FilmCardView from '../view/film-card-view.js';
import PopupView from '../view/popup-view.js';
import {remove, render, RenderPosition, replace} from '../util/render.js';
import {EscapeType} from '../util/enum.js';
import {UserAction, UpdateType } from '../const.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  POPUP: 'POPUP'
};

export default class FilmPresenter {
  #filmListContainer = null;
  #film = null;
  #filmComponent = null;
  #popupComponent = null;
  #commentComponent = null;
  #changeData = null;
  #changeMode = null;

  #mode = Mode.DEFAULT

  constructor(filmListContainer, changeData, changeMode) {
    this.#filmListContainer = filmListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (film) => {
    this.#film = film;
    this.#renderFilm();
    this.#addEventHandlers();
  }

  #renderFilm = () => {
    const prevFilmComponent = this.#filmComponent;
    const prevFilmPopupComponent = this.#popupComponent;
    this.#filmComponent = new FilmCardView(this.#film);
    this.#popupComponent = new PopupView(this.#film);

    const siteFilmsContainerElement = this.#filmListContainer.element.querySelector('.films-list__container');
    if (prevFilmComponent === null && prevFilmPopupComponent === null) {
      render(siteFilmsContainerElement, this.#filmComponent, RenderPosition.BEFOREEND);
      return;
    }
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    if (this.#mode === Mode.POPUP) {
      replace(this.#filmComponent, prevFilmComponent);
      replace(this.#popupComponent, prevFilmPopupComponent);
    }
  }

  #addEventHandlers = () => {
    this.#filmComponent.setPopupClickHandler(this.#handlePopupClick);
    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmComponent.setWatchlistClickHandler(this.#handleWatchlistClick);

    this.#popupComponent.setPopupCloseHandler(this.#handlePopupCLose);
    this.#popupComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#popupComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
  }

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#popupComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#popupComponent.element.remove();
      this.#mode = Mode.DEFAULT;
    }
  }

  #handlePopupClick = () => {
    this.#renderPopupElement();

  };

  #renderPopupElement = () => {
    this.#changeMode();
    const siteFooterElement = document.querySelector('footer');
    render(siteFooterElement, this.#popupComponent, RenderPosition.AFTEREND);
    document.body.style.overflow = 'hidden';
    this.#mode = Mode.POPUP;
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === EscapeType.ESCAPE || evt.key === EscapeType.ESC) {
      evt.preventDefault();
      this.#removePopupHandler();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #removePopupHandler = () => {
    document.body.style.overflow = '';
    remove(this.#commentComponent);
    remove(this.#popupComponent);
    this.#mode = Mode.DEFAULT;
  };

  #handlePopupCLose = () => {
    this.#removePopupHandler();
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, isFavorite: !this.#film.isFavorite});
  };

  #handleWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, isWatched: !this.#film.isWatched});
  };

  #handleWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {...this.#film, toWatchlist: !this.#film.toWatchlist});
  };
}

