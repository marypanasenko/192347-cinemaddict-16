import FooterStatisticsView from './view/footer-statistics-view.js';
import {generateFilmCard} from './mock/film-card.js';
import {generateFilter} from './mock/filter.js';
import HeaderProfileView from './view/header-profile-view.js';
import {render, RenderPosition} from './render.js';
import SiteMenuView from './view/site-menu-view.js';
import SortContentView from './view/sort-content-view.js';
import FilmsListPresenter from './presenter/films-list-presenter';

// replace to constants
export const FILM_COUNT = 12;

export const filmCard = Array.from({length: FILM_COUNT}, generateFilmCard);
const filters = generateFilter(filmCard);

// render header profile and menu elements
export const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('header');
const siteHeaderLogoElement = siteHeaderElement.querySelector('.header__logo');
const siteFooterElement = document.querySelector('footer');

render(siteHeaderLogoElement, new HeaderProfileView().element, RenderPosition.AFTEREND);
render(siteMainElement, new SiteMenuView(filters).element, RenderPosition.AFTERBEGIN);

// render elements of sorting element
const siteMenuElement = siteMainElement.querySelector('.main-navigation');
render(siteMenuElement, new SortContentView().element, RenderPosition.AFTEREND);

// render footer statistic element
render(siteFooterElement, new FooterStatisticsView().element, RenderPosition.BEFOREEND);

const filmsPresenter = new FilmsListPresenter(siteMainElement);
filmsPresenter.init(filmCard);


