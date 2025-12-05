'use strict';
import icons from 'url:../../img/icons.svg';

export default class View {
    _parentElement;
    _data;

    render(data) {
        this._data = data;
        const html = this._getHTML();

        if (!html) return;

        this._parentElement.insertAdjacentHTML('beforeend', html);
    }

    renderSpinner() {
        this._parentElement.innerHTML = '';

        const html = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
        `;

        this._parentElement.insertAdjacentHTML('beforeend', html);
    }
}
