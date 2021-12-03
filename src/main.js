import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createHeaderProfileTemplate} from './view/header-profile-view.js';
import {createSortContentTemplate} from './view/sort-content-view.js';
import {createFilmCardTemplate} from './view/film-card-view.js';
import {createFilmsContainerTemplate} from './view/films-container-view.js';
import {createButtonMoreTemplate} from './view/button-more-view.js';
import {createFooterStatisticTemplate} from './view/footer-statistics-view.js';
import {generateFilmCard} from './mock/film-card.js';
import {createPopupTemplate} from './view/popup-view.js';
import {createPopupComment} from './view/comment-view.js';
import {generateFilter} from './mock/filter.js';
import {createFilmsEmptyListTemplate} from './view/film-empty-list-view.js';

// replace to constants
export const FILM_COUNT = 22;
const CARD_COUNT = 5;

export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};
// replace to util
export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const filmCard = Array.from({length: FILM_COUNT}, generateFilmCard);
const filter = generateFilter(filmCard);

// maping filmCard for rendering [0] popup
const filmCardCopy = filmCard.map((item) => item);

// render header profile and menu templates
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('header');
const siteHeaderLogoElement = siteHeaderElement.querySelector('.header__logo');
const siteFooterElement = document.querySelector('footer');

renderTemplate(siteHeaderLogoElement, createHeaderProfileTemplate(), RenderPosition.AFTEREND);
renderTemplate(siteMainElement, createSiteMenuTemplate(filter), RenderPosition.AFTERBEGIN);

// render elements of sorting template
const siteMenuElement = siteMainElement.querySelector('.main-navigation');
renderTemplate(siteMenuElement, createSortContentTemplate(), RenderPosition.AFTEREND);

// render film container templates
renderTemplate(siteMainElement, createFilmsContainerTemplate(), RenderPosition.BEFOREEND);

const siteFilmsElement = siteMainElement.querySelector('.films-list');
const siteFilmsContainerElement = siteMainElement.querySelector('.films-list__container');

// render show more button template
renderTemplate(siteMainElement, createButtonMoreTemplate(), RenderPosition.BEFOREEND);

// render footer statistic template
renderTemplate(siteFooterElement,createFooterStatisticTemplate(filmCard), RenderPosition.BEFOREEND);

// add EventListener to button show more
const cardShowHandler = (evt) => {
  evt.preventDefault();
  if (filmCard.length >= CARD_COUNT) {
    for (let i = 0; i < filmCard.length; i++) {
      renderTemplate(siteFilmsContainerElement, createFilmCardTemplate(filmCard[i]), RenderPosition.BEFOREEND);
    }
    filmCard.splice(0,CARD_COUNT);
  }
  else if (filmCard.length < CARD_COUNT) {
    for (let i = 0; i < filmCard.length; i++) {
      renderTemplate(siteFilmsContainerElement, createFilmCardTemplate(filmCard[i]), RenderPosition.BEFOREEND);
    }
    filmCard.splice(0,filmCard.length);
    document.querySelector('.films-list__show-more').remove();
  }
};
const showMoreBtn = document.querySelector('.films-list__show-more');
showMoreBtn.addEventListener('click', cardShowHandler);

// render filmCards
if (filmCard.length === 0) {
  renderTemplate(siteFilmsElement, createFilmsEmptyListTemplate(), RenderPosition.BEFOREEND);
  document.querySelector('.films-list__show-more').remove();
} else if (filmCard.length <= CARD_COUNT) {
  for (let i = 0; i < filmCard.length; i++) {
    renderTemplate(siteFilmsContainerElement, createFilmCardTemplate(filmCard[i]), RenderPosition.BEFOREEND);
  }
  filmCard.splice(0,filmCard.length);
  document.querySelector('.films-list__show-more').remove();
} else if (filmCard.length > CARD_COUNT) {
  for (let i = 0; i < filmCard.length; i++) {
    renderTemplate(siteFilmsContainerElement, createFilmCardTemplate(filmCard[i]), RenderPosition.BEFOREEND);
  }
  filmCard.splice(0,CARD_COUNT);
  showMoreBtn.addEventListener('click', cardShowHandler);
}

// render [0] popup, comments and close popup
if (filmCardCopy.length !== 0) {
  renderTemplate(siteFooterElement,createPopupTemplate(filmCardCopy[0]), RenderPosition.AFTEREND);
  const numberOfComments = filmCardCopy[0].numberOfComments;
  const siteListComments = document.querySelector('.film-details__comments-list');
  for (let i = 0; i < numberOfComments; i++) {
    renderTemplate(siteListComments, createPopupComment(filmCardCopy[0]), RenderPosition.AFTERBEGIN);
  }
  const removePopupHandler = () => {
    document.querySelector('.film-details').remove();
  };
  const closePopupBtn = document.querySelector('.film-details__close-btn');
  closePopupBtn.addEventListener('click', removePopupHandler);
}

