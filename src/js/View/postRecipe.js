'use strict';

import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PostRecipe extends View {
    _parentElement = document.querySelector('.upload');
    _window = document.querySelector('.add-recipe-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-recipe');
    _btnClose = document.querySelector('.btn--close-modal');

    _uploadBtn = document.querySelector('.upload__btn');

    constructor() {
        super();
        this._btnOpen.addEventListener('click', this._toggleModal.bind(this));
        this._btnClose.addEventListener('click', this._toggleModal.bind(this));
        this._overlay.addEventListener('click', this._toggleModal.bind(this));
    }

    _toggleModal() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    addUploadRecipeHandler(handlerFn) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault();

            handlerFn();
        });
    }
}

export default new PostRecipe();
