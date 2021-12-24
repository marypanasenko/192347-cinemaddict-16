import AbstractView from './abstract-view.js';
import {FILM_COUNT} from '../const';
const createFooterStatisticTemplate = () => (
  `<section class="footer__statistics">
    <p>${FILM_COUNT} movies inside</p>
  </section>`
);

export default class FooterStatisticsView extends AbstractView {
  get template() {
    return createFooterStatisticTemplate();
  }
}
