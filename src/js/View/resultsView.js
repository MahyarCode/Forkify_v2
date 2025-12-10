'use strict';
import icons from 'url:../../img/icons.svg';
import View from './View.js';

class ResultsView extends View {
    _parentElement = document.querySelector('.results');
    _searchElement = document.querySelector('.search');

    addHandlerSearchResult(handlerFn) {
        this._searchElement.addEventListener('submit', function (e) {
            e.preventDefault();
            handlerFn();
        });
    }

    _getHTML() {
        if (!this._data) return;
        this._parentElement.innerHTML = '';

        const html = this._data
            .map(obj => {
                return `
          <li class="preview">
            <a class="preview__link ${
                obj.id === window.location.hash.slice(1) ? 'preview__link--active' : ''
            }" href="#${obj.id}">
              <figure class="preview__fig">
                <img src="${obj.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${obj.title}</h4>
                <p class="preview__publisher">${obj.publisher}</p>
                ${
                    obj.key
                        ? `
                <div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
                `
                        : ''
                }
                
              </div>
            </a>
          </li>
    `;
            })
            .join('');

        return html;
    }
}
export default new ResultsView();
