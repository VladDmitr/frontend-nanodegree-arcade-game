'use strict';

class Entity {
    /**
     * @constructor
     * @param {Canvas} canvas
     * @param {ResourcesService} resourcesService
     * @param {PositionService} positionService
     */
    constructor(canvas, resourcesService, positionService) {
        this._canvas = canvas;
        this._resourcesService = resourcesService;
        this._positionService = positionService;
        this._position = positionService.getDefaultPosition();
        this._sprite = null;
    }

    /**
     * @description sets entity position
     * @param {number} x
     * @param {number} y
     * @returns {Entity}
     */
    setPosition(x, y) {
        this._position = [x, y];
        return this;
    }

    /**
     * @description gets entity position
     * @returns {array|null}
     */
    getPosition() {
        return this._position;
    }

    /**
     * @description sets sprite for entity
     * @param {string} sprite
     * @returns {Entity}
     */
    setSprite(sprite) {
        this._sprite = sprite;
        return this;
    }

    /**
     * @description gets sprite for entity
     * @returns {null|string}
     */
    getSprite() {
        return this._sprite;
    }

    /**
     * @description renders entity
     */
    render() {
        this._canvas.getContext().drawImage(this._resourcesService.get(this._sprite), this._position[0], this._position[1]);
    }
}