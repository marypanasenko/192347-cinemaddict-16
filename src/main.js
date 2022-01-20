import FooterStatisticsView from './view/footer-statistics-view.js';
import {generateFilmCard} from './mock/film-card.js';
import HeaderProfileView from './view/header-profile-view.js';
import {render, RenderPosition} from './util/render.js';
import FilmsListPresenter from './presenter/films-list-presenter.js';
import {FILM_COUNT} from './const.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

export const films = Array.from({length: FILM_COUNT}, generateFilmCard);


const filmsModel = new FilmsModel();
filmsModel.films = films;
const filterModel = new FilterModel();

// render header profile and menu elements
export const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('header');
const siteHeaderLogoElement = siteHeaderElement.querySelector('.header__logo');
const siteFooterElement = document.querySelector('footer');

render(siteHeaderLogoElement, new HeaderProfileView().element, RenderPosition.AFTEREND);

render(siteFooterElement, new FooterStatisticsView().element, RenderPosition.BEFOREEND);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
filterPresenter.init();

const filmsPresenter = new FilmsListPresenter(siteMainElement, filmsModel, filterModel);
filmsPresenter.init();


