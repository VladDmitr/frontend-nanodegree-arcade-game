'use strict';

class GameDto {
    /**
     * @constructor
     * @param global
     */
    constructor(global) {
        this._global = global;
        this._player = null;
        this._enemies = [];
        this._canvas = null;
    }

    /**
     * @description sets the canvas
     * @param {Canvas} canvas
     * @returns {GameDto}
     */
    setCanvas(canvas) {
        this._canvas = canvas;
        return this;
    }

    /**
     * @description gets the canvas
     * @returns {null|Canvas}
     */
    getCanvas() {
        return this._canvas;
    }

    /**
     * @description sets the player
     * @param {Player} player
     * @returns {GameDto}
     */
    setPlayer(player) {
        this._player = player;
        return this;
    }

    /**
     * @description gets the player
     * @returns {null|Player}
     */
    getPlayer() {
        return this._player;
    }

    /**
     * @description sets enemies
     * @param {Enemy[]} enemies
     * @returns {GameDto}
     */
    setEnemies(enemies) {
        this._enemies = enemies;
        return this;
    }

    /**
     * @description gets enemies
     * @returns {Enemy[]|null}
     */
    getEnemies() {
        return this._enemies;
    }

    /**
     * gets window
     * @returns {Window}
     */
    getWindow() {
        return this._global.window;
    }

    /**
     * gets documents
     * @returns {Document}
     */
    getDocument() {
        return this._global.document;
    }
}