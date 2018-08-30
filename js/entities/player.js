'use strict';

class Player extends Entity {
    /**
     * @constructor
     * @param {Canvas} canvas
     * @param {ResourcesService} resourcesService
     * @param {PositionService} positionService
     */
    constructor(canvas, resourcesService, positionService) {
        super(canvas, resourcesService, positionService);
        this._sprite = 'images/char-boy.png';
        this._position = positionService.getPlayerDefaultPosition();
    }

    /**
     * @description handler of input (button press)
     * @param {string} direction
     */
    handleInput(direction) {
        switch (direction) {
            case 'left':
                if (this._positionService.canPlayerMoveToDirectionX(this._position[0], direction)) {
                    this._position[0] -= this._positionService.getPlayerStepLR();
                }
                break;
            case 'up':
                if (this._positionService.canPlayerMoveToDirectionY(this._position[1], direction)) {
                    this._position[1] -= this._positionService.getPlayerStepUD();
                }
                break;
            case 'right':
                if (this._positionService.canPlayerMoveToDirectionX(this._position[0], direction)) {
                    this._position[0] += this._positionService.getPlayerStepLR();
                }
                break;
            case 'down':
                if (this._positionService.canPlayerMoveToDirectionY(this._position[1], direction)) {
                    this._position[1] += this._positionService.getPlayerStepUD();
                }
                break;
        }
    }
}