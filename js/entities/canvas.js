'use strict';

class Canvas {
    /**
     * @constructor
     * @param {Document} document
     */
    constructor(document) {
        this._document = document;
        this._canvas = null;
        this._ctx = null;
        this._width = 505;
        this._height = 606;
    }

    /**
     * @description sets width
     * @param {number|null} width
     */
    setWidth(width) {
        this._width = width;
    }

    /**
     * @description gets width
     * @returns {number|null}
     */
    getWidth() {
        return this._width;
    }

    /**
     * @description sets height
     * @param {number|null} height
     */
    setHeight(height) {
        this._height = height;
    }

    /**
     * @description gets height
     * @returns {number|null}
     */
    getHeight() {
        return this._height;
    }

    /**
     * @description creates canvas
     */
    create() {
        this._canvas = this._document.createElement('canvas');
        this._ctx = this._canvas.getContext('2d');
        this._canvas.width = this._width;
        this._canvas.height = this._height;
        this._document.body.innerHTML = '<h1>Score: <span class="score">0</span></h1>';
        this._document.body.appendChild(this._canvas);
    }

    /**
     * @description gets canvas
     * @returns {null|Element}
     */
    getCanvas() {
        return this._canvas;
    }

    /**
     * @description gets canvas context
     * @returns {null|CanvasRenderingContext2D}
     */
    getContext() {
        return this._ctx;
    }
}