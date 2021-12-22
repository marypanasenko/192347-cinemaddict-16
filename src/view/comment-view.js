import AbstractView from './abstract-view.js';

export const createPopupComment = (comment) => {
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

export default class CommentView extends AbstractView {
  #comment = null;

  constructor(comment) {
    super();
    this.#comment = comment;
  }

  get template() {
    return createPopupComment(this.#comment);
  }
}
