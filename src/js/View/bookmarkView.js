'use strict';
import icons from 'url:../../img/icons.svg';
import View from './View.js';

class Bookmark extends View {
    _parentElement = document.querySelector('.recipe');
    _headerListBookmark = document.querySelector('.bookmarks__list');
    _bookmarkIcon = document.querySelector('.btn--round');

    addHandlerBookmark(handlerFn) {
        this._parentElement.addEventListener('click', function (e) {
            e.preventDefault();

            const btn = e.target.closest('.btn--round');
            if (!btn) return;

            handlerFn();
        });
    }

    addHandlerLoadBookmark(handlerFn) {
        window.addEventListener('load', handlerFn);
    }

    addHandlerActiveBookmark(handlerFn) {
        this._headerListBookmark.addEventListener('click', e => {
            e.preventDefault();
            handlerFn();
        });
    }

    _getHTML() {
        this._headerListBookmark.innerHTML = '';

        if (this._data.length === 0) {
            return this._headerListBookmark.insertAdjacentHTML(
                'afterbegin',
                `
                  <div class="message">
                    <div>
                      <svg>
                        <use href="${icons}#icon-smile"></use>
                      </svg>
                    </div>
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it :)
                    </p>
                  </div>
                `
            );
        }

        this._data
            .map(obj => {
                this._headerListBookmark.insertAdjacentHTML(
                    'afterbegin',
                    `
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
                `
                );
            })
            .join('');
    }
}

export default new Bookmark();
