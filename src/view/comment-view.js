export const createPopupComment = () => (
  `<li className="film-details__comment">
     <span className="film-details__comment-emoji">
        <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleeping">
     </span>
    <div>
      <p className="film-details__comment-text">Booooooooooring</p>
      <p className="film-details__comment-info">
        <span className="film-details__comment-author">John Doe</span>
        <span className="film-details__comment-day">2 days ago</span>
        <button className="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
);