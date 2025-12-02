'use strict';

export default class View {
    _parentElement;
    _data;

    render(data) {
        this._data = data;
        const html = this._getHTML();

        this._parentElement.insertAdjacentHTML('beforeend', html);
    }
}
