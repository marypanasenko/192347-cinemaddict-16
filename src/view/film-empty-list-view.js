import {createElement} from '../render';

const createFilmsEmptyListTemplate = () => (
  `<h2 class="films-list__title">
    There are no movies in our database
  </h2>`
);

export default class FilmsEmptyListView {
  #element = null;
  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createFilmsEmptyListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}

