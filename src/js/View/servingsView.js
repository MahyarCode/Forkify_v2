'use strict';

import View from './view.js';
import icons from 'url:../../img/icons.svg';

class Servings extends View {
    _parentElement = document.querySelector('.recipe');
    _servingNumber = document.querySelector('.recipe__info-data--people');

    addHandlerServing(handlerFn) {
        this._parentElement.addEventListener('click', function (e) {
            e.preventDefault();
            const btn = e.target.closest('.btn--tiny');

            const updateTo = +btn.dataset.servings;

            if (updateTo > 0) {
                if (btn.classList.contains('btn--increase-servings')) {
                    handlerFn(updateTo);
                } else {
                    handlerFn(updateTo);
                }
            }
        });
    }
}

export default new Servings();
