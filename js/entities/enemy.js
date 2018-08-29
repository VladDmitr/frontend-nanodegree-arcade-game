'use strict';

class Enemy extends Entity {
    /**
     * @constructor
     * @param {Canvas} canvas
     * @param {ResourcesService} resourcesService
     * @param {PositionService} positionService
     */
    constructor(canvas, resourcesService, positionService) {
        super(canvas, resourcesService, positionService);
        this._sprite = 'images/enemy-bug.png';
        this._position = positionService.getEnemyDefaultPosition();
        this._speed = positionService.getEnemyDefaultSpeed();
    }

    /**
     * @description sets speed
     * @param {number} speed
     * @returns {Enemy}
     */
    setSpeed(speed) {
        this._speed = speed;
        return this;
    }

    /**
     * @description gets speed
     * @returns {number}
     */
    getSpeed() {
        return this._speed;
    }

    /**
     * @description updates position
     * @param {number} dt
     */
    update(dt) {
        this._position[0] += this._speed * dt;
    }
}