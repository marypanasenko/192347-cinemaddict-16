import {EMOJIS} from '../const';
import SmartView from './smart-view';


const createPopupTemplate = (filmCard) => {
  const {fullDescription, film, toWatchlist, isWatched, isFavorite, comments, commentEmoji, commentInput} = filmCard;
  const watchlistClassName = toWatchlist
    ? 'film-details__control-button--watchlist film-details__control-button--active'
    : 'film-details__control-button--watchlist';
  const watchedClassName = isWatched
    ? 'film-details__control-button--watched film-details__control-button--active'
    : 'film-details__control-button--watched';
  const favoriteClassName = isFavorite
    ? 'film-details__control-button--favorite film-details__control-button--active'
    : 'film-details__control-button--favorite';

  const createPopupComment = (comment) => {
    const {emoji, text, author, day} = comment;
    return `<li className="film-details__comment">
     <span className="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-sleeping">
     </span>
    <div>
      <p className="film-details__comment-text">${text}</p>
      <p className="film-details__comment-info">
        <span className="film-details__comment-author">${author}</span>
        <span className="film-details__comment-day">${day}</span>
        <button className="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
  };

  const createEmojiImgTemplate = (emoji) => `<img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji-${emoji}">`;
  const createNewComment = (emoji, comment) => {
    const emojiImg = emoji ? createEmojiImgTemplate(emoji) : '';
    const newComment = comment ? comment : '';
    return `
    <div class="film-details__add-emoji-label">
        ${emojiImg}
    </div>
    <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newComment}</textarea>
    </label>`;
  };
  const addComment = createNewComment(commentEmoji, commentInput);

  const displayComments = comments.map((comment) => createPopupComment(comment)).join('');
  const createEmojiList = (emoji) => `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`;
  const displayEmojis = EMOJIS.map((emoji) => createEmojiList(emoji)).join('');

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${film.image}" alt="">

          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${film.title}</h3>
              <p class="film-details__title-original">Original: ${film.title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${film.rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">Anthony Mann</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">30 March 1945</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${film.duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">USA</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                <span class="film-details__genre">Drama</span>
                <span class="film-details__genre">Film-Noir</span>
                <span class="film-details__genre">Mystery</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">
            ${fullDescription}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button ${watchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button ${watchedClassName}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button ${favoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
            ${displayComments}
        </ul>

        <div class="film-details__new-comment">
            ${addComment}

          <div class="film-details__emoji-list">
            ${displayEmojis}
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export class PopupView extends SmartView {
  constructor(film) {
    super();
    this._data = PopupView.parseFilmToData(film);

    this.#setInnerHandlers();
  }

  #onClickEmoji = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      evt.target.checked = true;
      this.updateData({ commentEmoji: evt.target.value });
    }
  };

  #onInputComment = (evt) => {
    evt.preventDefault();
    this.updateData({ commentInput: evt.target.value }, true);
  };

  #onScroll = (evt) => {
    evt.preventDefault();
    this.updateData({ scrollTop: evt.target.scrollTop }, true);
  };

  #setScrollPosition = () => {
    this.element.scrollTop = this._data.scrollTop;
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#onClickEmoji);

    this.element
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this.#onInputComment);

    this.element
      .addEventListener('scroll', this.#onScroll);
  };

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setScrollPosition();
    this.setPopupCloseHandler(this._callback.popupClose);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#watchlistClickHandler);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#watchedClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  };

  get template() {
    return createPopupTemplate(this._data);
  }

  #popupCloseHandler = () => {
    this._callback.popupClose();
  }

  setPopupCloseHandler = (callback) => {
    this._callback.popupClose = callback;
    this.element
      .querySelector('.film-details__close-btn')
      .addEventListener('click', this.#popupCloseHandler);
  }

  static parseFilmToData = (film) => ({
    ...film,
    commentEmoji: null,
    commentInput: null,
    scrollTop: 0,
  });
}
