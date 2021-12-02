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
import {getRandomInteger} from './mock/film-card.js';

export const FILM_COUNT = 16;
const CARD_COUNT = 5;
export const COMMENT_COUNT = getRandomInteger(0, 5);

export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const filmCard = Array.from({length: FILM_COUNT}, generateFilmCard);
const filter = generateFilter(filmCard);


const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('header');
const siteHeaderLogoElement = siteHeaderElement.querySelector('.header__logo');
const siteFooterElement = document.querySelector('footer');

renderTemplate(siteHeaderLogoElement, createHeaderProfileTemplate(), RenderPosition.AFTEREND);
renderTemplate(siteMainElement, createSiteMenuTemplate(filter), RenderPosition.AFTERBEGIN);

const siteMenuElement = siteMainElement.querySelector('.main-navigation');
renderTemplate(siteMenuElement, createSortContentTemplate(), RenderPosition.AFTEREND);
renderTemplate(siteMainElement, createFilmsContainerTemplate(), RenderPosition.BEFOREEND);

const siteFilmsContainerElement = siteMainElement.querySelector('.films-list__container');

renderTemplate(siteMainElement, createButtonMoreTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterElement,createFooterStatisticTemplate(filmCard), RenderPosition.BEFOREEND);


for (let i = 0; i < CARD_COUNT; i++) {
  renderTemplate(siteFilmsContainerElement, createFilmCardTemplate(filmCard[i]), RenderPosition.AFTERBEGIN);
}
filmCard.splice(0,CARD_COUNT);

const cardShowHandler = (evt) => {
  evt.preventDefault();
  if (filmCard.length >= CARD_COUNT) {
    for (let i = 0; i < 5; i++) {
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

// Rendering popup and comments

renderTemplate(siteFooterElement,createPopupTemplate(generateFilmCard()), RenderPosition.AFTEREND);

const siteListComments = document.querySelector('.film-details__comments-list');

for (let i = 0; i < COMMENT_COUNT; i++) {
  if (COMMENT_COUNT === 0) {
    break;
  }
  renderTemplate(siteListComments, createPopupComment(), RenderPosition.AFTERBEGIN);
}
const removePopupHandler = () => {
  document.querySelector('.film-details').remove();
};
const closePopupBtn = document.querySelector('.film-details__close-btn');
closePopupBtn.addEventListener('click', removePopupHandler);

// const cardFilmLink = document.querySelector('.film-card__link');
// cardFilmLink.addEventListener('click', renderPopup);
// console.log(cardFilmLink);

