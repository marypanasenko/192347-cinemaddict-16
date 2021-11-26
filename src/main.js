import {createSiteMenuTemplate} from './view/site-menu-view.js';
import {createHeaderProfileTemplate} from './view/header-profile-view.js';
import {createSortContentTemplate} from './view/sort-content-view.js';
import {createFilmCardTemplate} from './view/film-card-view.js';
import {createFilmsContainerTemplate} from './view/films-container-view.js';
import {createButtonMoreTemplate} from './view/button-more-view.js';
import {createFooterStatisticTemplate} from './view/footer-statistics-view.js';
import {createPopupTemplate} from './view/popup-view.js';

const FILM_COUNT = 5;

const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('header');
const siteHeaderLogoElement = siteHeaderElement.querySelector('.header__logo');
const siteFooterElement = document.querySelector('footer');

renderTemplate(siteHeaderLogoElement, createHeaderProfileTemplate(), RenderPosition.AFTEREND);
renderTemplate(siteMainElement, createSiteMenuTemplate(), RenderPosition.AFTERBEGIN);

const siteMenuElement = siteMainElement.querySelector('.main-navigation');
renderTemplate(siteMenuElement, createSortContentTemplate(), RenderPosition.AFTEREND);
renderTemplate(siteMainElement, createFilmsContainerTemplate(), RenderPosition.BEFOREEND);

const siteFilmsContainerElement = siteMainElement.querySelector('.films-list__container');
for (let i = 0; i < FILM_COUNT; i++) {
  renderTemplate(siteFilmsContainerElement, createFilmCardTemplate(), RenderPosition.AFTERBEGIN);
}

renderTemplate(siteMainElement, createButtonMoreTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterElement,createFooterStatisticTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterElement,createPopupTemplate(), RenderPosition.AFTEREND);

