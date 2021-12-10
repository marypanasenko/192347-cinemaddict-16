import {FILM_COUNT} from '../main.js';
import {createElement} from '../render.js';
const createFooterStatisticTemplate = () => (
  `<section class="footer__statistics">
    <p>${FILM_COUNT} movies inside</p>
  </section>`
);

export default class FooterStatisticsView {
  #element = null;
  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  get template() {
    return createFooterStatisticTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
