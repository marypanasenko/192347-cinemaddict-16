import ButtonMoreView from './view/button-more-view.js';
import CommentView from './view/comment-view.js';
import FilmCardView from './view/film-card-view.js';
import FilmsEmptyListView from './view/film-empty-list-view.js';
import FilmsView from './view/films-view.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import {generateFilmCard} from './mock/film-card.js';
import {generateFilter} from './mock/filter.js';
import HeaderProfileView from './view/header-profile-view.js';
import PopupView from './view/popup-view.js';
import {render, RenderPosition} from './render.js';
import SiteMenuView from './view/site-menu-view.js';
import SortContentView from './view/sort-content-view.js';

// replace to constants
export const FILM_COUNT = 6;
const CARD_COUNT = 5;

const filmCard = Array.from({length: FILM_COUNT}, generateFilmCard);
const filters = generateFilter(filmCard);

// render header profile and menu elements
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('header');
const siteHeaderLogoElement = siteHeaderElement.querySelector('.header__logo');
const siteFooterElement = document.querySelector('footer');

render(siteHeaderLogoElement, new HeaderProfileView().element, RenderPosition.AFTEREND);
render(siteMainElement, new SiteMenuView(filters).element, RenderPosition.AFTERBEGIN);

// render elements of sorting element
const siteMenuElement = siteMainElement.querySelector('.main-navigation');
render(siteMenuElement, new SortContentView().element, RenderPosition.AFTEREND);

// render film container element
render(siteMainElement, new FilmsView().element, RenderPosition.BEFOREEND);

const siteFilmsElement = siteMainElement.querySelector('.films-list');
const siteFilmsContainerElement = siteMainElement.querySelector('.films-list__container');

// render show more button element
render(siteMainElement, new ButtonMoreView().element, RenderPosition.BEFOREEND);

// render footer statistic element
render(siteFooterElement, new FooterStatisticsView().element, RenderPosition.BEFOREEND);

const renderFilm = (filmListElement, film) => {
  const filmElement = new FilmCardView(film);
  const popup = new PopupView(film);


  filmElement.element.querySelector('.film-card__link').addEventListener('click', () => {
    const removePopupHandler = () => {
      document.querySelector('.film-details').remove();
      document.body.style.overflow = '';
    };
    const renderPopupElement = () => {
      render(siteFooterElement, popup.element, RenderPosition.AFTEREND);
      document.body.style.overflow = 'hidden';
      const closePopupBtn = popup.element.querySelector('.film-details__close-btn');
      closePopupBtn.addEventListener('click', removePopupHandler);
    };
    renderPopupElement();
    const numberOfComment = film.numberOfComments;
    const siteListComments = popup.element.querySelector('.film-details__comments-list');
    for (let i = 0; i < numberOfComment; i++) {
      const comment = new CommentView();
      render(siteListComments, comment.element, RenderPosition.AFTERBEGIN);
    }
  });

  render(filmListElement, filmElement.element, RenderPosition.BEFOREEND);
};

// add EventListener to button show more
const cardShowHandler = (evt) => {
  evt.preventDefault();
  if (filmCard.length > CARD_COUNT) {
    for (let i = 0; i < CARD_COUNT; i++) {
      renderFilm(siteFilmsContainerElement, filmCard[i]);
    }
    filmCard.splice(0,CARD_COUNT);
  }
  else if (filmCard.length <= CARD_COUNT) {
    for (let i = 0; i < filmCard.length; i++) {
      renderFilm(siteFilmsContainerElement, filmCard[i]);
    }
    filmCard.splice(0,filmCard.length);
    document.querySelector('.films-list__show-more').remove();
  }
};
const showMoreBtn = document.querySelector('.films-list__show-more');

// render filmCards
if (filmCard.length === 0) {
  render(siteFilmsElement, new FilmsEmptyListView().element, RenderPosition.BEFOREEND);
  document.querySelector('.films-list__show-more').remove();
} else if (filmCard.length <= CARD_COUNT) {
  for (let i = 0; i < filmCard.length; i++) {
    renderFilm(siteFilmsContainerElement, filmCard);
  }
  filmCard.splice(0,filmCard.length);
  document.querySelector('.films-list__show-more').remove();
} else if (filmCard.length > CARD_COUNT) {
  for (let i = 0; i < CARD_COUNT; i++) {
    renderFilm(siteFilmsContainerElement, filmCard[i]);
  }
  filmCard.splice(0,CARD_COUNT);
  showMoreBtn.addEventListener('click', cardShowHandler);
}
