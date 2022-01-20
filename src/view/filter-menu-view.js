import AbstractView from './abstract-view.js';
import { FilterType } from '../const.js';

const createFilterCountTemplate = (count) => `<span class="main-navigation__item-count">${count}</span>`;

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {name, count, type} = filter;
  const filterCountTemplate = (type === FilterType.ALL) ? '' : createFilterCountTemplate(count);
  const filterActiveClassName = (type === currentFilterType) ? 'main-navigation__item--active' : '';
  return (
    `<a href="#${name}"
    class="main-navigation__item ${filterActiveClassName}">${name}
    ${filterCountTemplate}</a
    >`
  );
};

const createSiteMenuTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('\n');
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
     ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class FilterMenuView extends AbstractView {
  #filters = null;
  #currentFilterType = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createSiteMenuTemplate(this.#filters, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;

    window.addEventListener('hashchange', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();

    this._callback.filterTypeChange(location.hash.slice(1));
  };
}
