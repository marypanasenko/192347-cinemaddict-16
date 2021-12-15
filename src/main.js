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
export const FILM_COUNT = 12;
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

// render footer statistic element
render(siteFooterElement, new FooterStatisticsView().element, RenderPosition.BEFOREEND);

const renderFilm = (filmListElement, film) => {
  const filmElement = new FilmCardView(film);
  const popup = new PopupView(film);


  filmElement.setPopupClickHandler(() => {
    const activePopup = filmElement.element.querySelector('.film-details');
    const siteListComments = popup.element.querySelector('.film-details__comments-list');
    siteListComments.innerHTML = '';
    if (activePopup) {
      activePopup.remove();
    }
    const removePopupHandler = () => {
      document.querySelector('.film-details').remove();
      document.body.style.overflow = '';
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removePopupHandler();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    const renderPopupElement = () => {
      render(siteFooterElement, popup.element, RenderPosition.AFTEREND);
      document.body.style.overflow = 'hidden';
      popup.setPopupCloseHandler(() => {
        removePopupHandler();
      });
      document.addEventListener('keydown', onEscKeyDown);
      const numberOfComment = film.numberOfComments;
      for (let i = 0; i < numberOfComment; i++) {
        const comment = new CommentView();
        render(siteListComments, comment.element, RenderPosition.AFTERBEGIN);
      }
    };
    renderPopupElement();
  });

  render(filmListElement, filmElement.element, RenderPosition.BEFOREEND);
};
const renderFilmCards = () => {
  const cardShowHandler = () => {
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
  const loadButtonMoreComponent = new ButtonMoreView();
  render(siteMainElement, loadButtonMoreComponent.element, RenderPosition.BEFOREEND);

  if (filmCard.length === 0) {
    render(siteFilmsElement, new FilmsEmptyListView().element, RenderPosition.BEFOREEND);
    loadButtonMoreComponent.element.remove();
  } else if (filmCard.length <= CARD_COUNT) {
    for (let i = 0; i < filmCard.length; i++) {
      renderFilm(siteFilmsContainerElement, filmCard[i]);
    }
    filmCard.splice(0,filmCard.length);
    loadButtonMoreComponent.element.remove();
  } else if (filmCard.length > CARD_COUNT) {
    for (let i = 0; i < CARD_COUNT; i++) {
      renderFilm(siteFilmsContainerElement, filmCard[i]);
    }
    filmCard.splice(0,CARD_COUNT);
    loadButtonMoreComponent.setClickHandler(() => {
      cardShowHandler();
    });
  }
};
renderFilmCards();

