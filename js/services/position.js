'use strict';

class PositionService {
    /**
     * @constructor
     * @param {Canvas} canvas
     */
    constructor(canvas) {
        this._canvas = canvas;
        this._defaultPosition = [0, 0];
        this._playerWidth = 101;
        this._playerHeight = 171;
        this._playerDefaultPosition = [200, 380];
        this._playerStepLR = 100;
        this._playerStepUD = 83;
        this._enemyDefaultSpeed = 100;
        this._enemyDefaultPosition = [-101, 60];
        this._enemyRandomVerticalPosition = [60, 150, 230];
        this._enemyRandomHorizontalPosition = [-1000, -100];
        this._enemyRandomSpeed = [100, 300];
    }

    /**
     * @description gets default position for entity
     * @returns {number[]}
     */
    getDefaultPosition() {
        return this._defaultPosition.slice();
    }

    /**
     * @description gets default position for enemy
     * @returns {number[]}
     */
    getEnemyDefaultPosition() {
        return this._enemyDefaultPosition.slice();
    }

    /**
     * @description gets random vertical position for enemy
     * @returns {number}
     */
    getEnemyRandomVerticalPosition() {
        return this._enemyRandomVerticalPosition[this._getRandomInt(0, 2)];
    }

    /**
     * @description gets random horizontal position for enemy
     * @returns {number}
     */
    getEnemyRandomHorizontalPosition() {
        return this._getRandomInt(this._enemyRandomHorizontalPosition[0], this._enemyRandomHorizontalPosition[1]);
    }

    /**
     * @description gets default speed for enemy
     * @returns {number}
     */
    getEnemyDefaultSpeed() {
        return this._enemyDefaultSpeed;
    }

    /**
     * @description gets random speed for enemy
     * @returns {number}
     */
    getEnemyRandomSpeed() {
        return this._getRandomInt(this._enemyRandomSpeed[0], this._enemyRandomSpeed[1]);
    }

    /**
     * @description checks enemy position in the canvas
     * @param position
     * @returns {boolean}
     */
    isEnemyOutsideCanvas(position) {
        return this._canvas.getWidth() < position;
    }

    /**
     * @description gets default position for the player
     * @returns {number[]}
     */
    getPlayerDefaultPosition() {
        return this._playerDefaultPosition.slice();
    }

    /**
     * @description verifies the possibility for the player to move to "X" direction
     * @param {number} currentPosition
     * @param {string} direction
     * @returns {boolean}
     */
    canPlayerMoveToDirectionX(currentPosition, direction) {
        let positionX = currentPosition;
        if (direction === 'left') {
            positionX -= this._playerStepLR
        } else if (direction === 'right') {
            positionX += this._playerStepLR
        } else {
            throw new Error('Wrong direction');
        }
        return this._canvas.getWidth() - this._playerWidth >= positionX && positionX >= 0;
    }

    /**
     * @description verifies the possibility for the player to move to "Y" direction
     * @param {number} currentPosition
     * @param {string} direction
     * @returns {boolean}
     */
    canPlayerMoveToDirectionY(currentPosition, direction) {
        let positionY = currentPosition;
        if (direction === 'up') {
            positionY -= this._playerStepUD
        } else if (direction === 'down') {
            positionY += this._playerStepUD
        } else {
            throw new Error('Wrong direction');
        }
        return this._canvas.getHeight() - this._playerHeight >= positionY && positionY >= 0;
    }

    /**
     * @description sets the player step for "X" direction
     * @param {number} step
     * @returns {PositionService}
     */
    setPlayerStepLR(step) {
        this._playerStepLR = step;
        return this;
    }

    /**
     * @description gets the player step for "X" direction
     * @returns {number|*}
     */
    getPlayerStepLR() {
        return this._playerStepLR;
    }

    /**
     * @description sets the player step for "Y" direction
     * @param {number} step
     * @returns {PositionService}
     */
    setPlayerStepUD(step) {
        this._playerStepUD = step;
        return this;
    }

    /**
     * @description gets the player step for "Y" direction
     * @returns {number|*}
     */
    getPlayerStepUD() {
        return this._playerStepUD;
    }

    /**
     * @description checks intersection in positions between enemies and the player
     * @param {array} enemyPosition
     * @param {array} playerPosition
     * @returns {boolean}
     */
    isDirectionIntersect(enemyPosition, playerPosition) {
        const entityWH = 60;
        const ep1 = enemyPosition[0] + entityWH;
        const ep2 = enemyPosition[0];
        const ep3 = enemyPosition[1] + entityWH;
        const ep4 = enemyPosition[1];
        const pp1 = playerPosition[0];
        const pp2 = playerPosition[0] + entityWH;
        const pp3 = playerPosition[1];
        const pp4 = playerPosition[1] + entityWH;
        return !(ep1 <= pp1 || ep2 > pp2 || ep3 <= pp3 || ep4 > pp4)
    }

    /**
     * @description gets direction via key code
     * @param {number} keyCode
     * @returns {*}
     */
    getDirectionViaKeyCode(keyCode) {
        const allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        return allowedKeys[keyCode];
    }

    /**
     * @description gets random number
     * @param {number} min
     * @param {number} max
     * @returns {number}
     * @private
     */
    _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}