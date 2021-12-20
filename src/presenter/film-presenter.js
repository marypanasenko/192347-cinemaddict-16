import FilmCardView from '../view/film-card-view';
import PopupView from '../view/popup-view';
import {remove, render, RenderPosition, replace} from '../render';
import CommentView from '../view/comment-view';

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
  #numberOfComments = null;
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
    this.#numberOfComments = film.numberOfComments;
    this.#renderFilm(film);
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
  }

  destroy = () => {
    remove(this.#filmComponent);
    remove(this.#popupComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#removePopupHandler();
    }
  }

  #handlePopupClick = () => {
    this.#renderPopupElement();
    this.#popupComponent.setPopupCloseHandler(this.#handlePopupCLose);
  };

  #renderPopupElement = () => {
    this.#changeMode();
    const siteFooterElement = document.querySelector('footer');
    render(siteFooterElement, this.#popupComponent, RenderPosition.AFTEREND);
    document.body.style.overflow = 'hidden';
    this.#renderPopupComments();
    this.#mode = Mode.POPUP;
  };

  #renderPopupComments = () => {
    const siteListComments = document.querySelector('.film-details__comments-list');
    document.addEventListener('keydown', this.#onEscKeyDown);


    for (let i = 0; i < this.#numberOfComments; i++) {
      this.#commentComponent = new CommentView();
      render(siteListComments, this.#commentComponent, RenderPosition.AFTERBEGIN);
    }
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
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
    this.#changeData({...this.#film, isFavorite: !this.#film.isFavorite});
  }

  #handleWatchedClick = () => {
    this.#changeData({...this.#film, isWatched: !this.#film.isWatched});
  }

  #handleWatchlistClick = () => {
    this.#changeData({...this.#film, toWatchlist: !this.#film.toWatchlist});
  }
}

