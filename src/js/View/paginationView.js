'use strict';
import icons from 'url:../../img/icons.svg';
import * as model from '../Model/model.js';
import View from './View.js';

class Pagination extends View {
    _parentElement = document.querySelector('.pagination');

    addHandlerPagination(handlerFn) {
        this._parentElement.addEventListener('click', function (e) {
            e.preventDefault();
            const btn = e.target.closest('.btn--inline');

            if (!btn) return;

            if (btn.classList.contains('pagination__btn--next')) {
                model.state.page++;
            } else model.state.page--;
            handlerFn();
        });
    }

    _getHTML() {
        this._parentElement.innerHTML = '';

        // page 1
        if (model.state.page === 1) {
            return `
          <button class="btn--inline pagination__btn--next">
            <span>${model.state.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>        
        `;
        }

        // last page
        if (model.state.page === model.state.lastPage) {
            return `
          <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${model.state.page - 1}</span>
          </button>        
        `;
        }

        // middle page
        if ((model.state.page > 1) | (model.state.page < model.state.lastPage))
            return `
          <button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${model.state.page - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>${model.state.page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
        // only 1 page
        return '';
    }
}

export default new Pagination();
