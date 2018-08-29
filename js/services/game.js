'use strict';

class GameService {
    /**
     * @constructor
     * @param {ResourcesService} resourcesService
     * @param {PositionService} positionService
     * @param {GameDto} gameDto
     */
    constructor(resourcesService, positionService, gameDto) {
        this._isGameOver = false;
        this._playerScore = 0;
        this._lastTime = Date.now();
        this._resourcesService = resourcesService;
        this._positionService = positionService;
        this._gameDto = gameDto;
        this._document = gameDto.getDocument();
        this._canvas = gameDto.getCanvas();
        this._player = gameDto.getPlayer();
        this._enemies = gameDto.getEnemies();
    }

    /**
     * @description creates the game
     */
    create() {
        if (this._canvas.getContext() === null) {
            this._canvas.create();
        }
        this._addEvents();
        this._loop();
    }

    /**
     * @description loop of the game
     * @private
     */
    _loop() {
        if (this._isGameOver === false) {
            const now = Date.now();
            const dt = (now - this._lastTime) / 1000.0;
            this._update(dt);
            this._render();
            this._lastTime = now;
            this._gameDto.getWindow().requestAnimationFrame(this._loop.bind(this));
        }
    }

    /**
     * @description resets the game
     * @private
     */
    _reset() {
        this._isGameOver = false;
        this._drawScore(true);
        this._closeDialog();
        this._loop();
    }

    /**
     * @description updates entity's data
     * @param {number} dt
     * @private
     */
    _update(dt) {
        this._updateEntities(dt);
        this._checkCollisions();
    }

    /**
     * @description updates enemies data
     * @param {number} dt
     * @private
     */
    _updateEntities(dt) {
        const diffTime = dt;
        const gs = this;
        this._enemies.forEach(function (enemy) {
            enemy.update(diffTime);
        });
        this._enemies.forEach(function (enemy) {
            const position = enemy.getPosition();
            if (gs._positionService.isEnemyOutsideCanvas(position[0])) {
                enemy
                    .setSpeed(gs._positionService.getEnemyRandomSpeed())
                    .setPosition(
                        gs._positionService.getEnemyRandomHorizontalPosition(),
                        gs._positionService.getEnemyRandomVerticalPosition()
                    );
            }
        });
    }

    /**
     * @description checks collisions
     * @private
     */
    _checkCollisions() {
        const gs = this;
        this._enemies.forEach(function (enemy) {
            const enemyPosition = enemy.getPosition();
            const playerPosition = gs._player.getPosition();
            if (gs._positionService.isDirectionIntersect(enemyPosition, playerPosition)) {
                gs._gameOver();
            }
        });
    }

    /**
     * @description draws the "game level" and entity's
     * @private
     */
    _render() {
        /* This array holds the relative URL to the image used
        * for that particular row of the game level.
        */
        let rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        const ctx = this._canvas.getContext();

        // Before drawing, clear existing canvas
        ctx.clearRect(0, 0, this._canvas.getWidth(), this._canvas.getHeight())
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(this._resourcesService.get(rowImages[row]), col * 101, row * 83);
            }
        }

        this._renderEntities();
    }

    /**
     * @description draws entity's
     * @private
     */
    _renderEntities() {
        this._enemies.forEach(function (enemy) {
            enemy.render();
        });
        this._player.render();
    }

    /**
     * @description adds events
     * @private
     */
    _addEvents() {
        const gs = this;
        this._document.addEventListener('keyup', function (e) {
            if (gs._isGameOver === false) {
                const direction = gs._positionService.getDirectionViaKeyCode(e.keyCode);
                if (direction === 'up'
                    && !gs._positionService.canPlayerMoveToDirectionY(gs._player.getPosition()[1], direction)) {
                    gs._playerScore += 100;
                    gs._movePlayerToDefaultPosition();
                    gs._drawScore();
                } else {
                    gs._player.handleInput(direction);
                }
            }
        });
    }

    /**
     * @description moves the player to default position
     * @private
     */
    _movePlayerToDefaultPosition() {
        const defaultPlayerPosition = this._positionService.getPlayerDefaultPosition();
        this._player.setPosition(defaultPlayerPosition[0], defaultPlayerPosition[1]);
    }

    /**
     * @description draws the player's score
     * @param {boolean} reset
     * @private
     */
    _drawScore(reset = false) {
        const score = this._document.querySelector('.score');
        let playerScore = this._playerScore;
        if (reset === true) {
            playerScore = 0;
        }
        score.innerHTML = '' + playerScore;
    }

    /**
     * @description opens the game end dialog box
     * @private
     */
    _openDialog() {
        let dialog = this._document.querySelector('.dialog');
        if (dialog === null) {
            dialog = this._document.createElement('div');
            dialog.innerHTML = '<button class="play-again">Play Again</button></div>'
            dialog.classList.add('dialog');
            dialog.classList.add('show');
            this._document.body.insertBefore(dialog, this._document.body.firstChild);
        } else {
            dialog.classList.add('show');
        }

        let button = this._document.querySelector('.play-again');
        if (button !== null) {
            const gs = this;
            button.addEventListener('click', function (e) {
                gs._reset();
            });
        }
    }

    /**
     * @description closes the game end dialog box
     * @private
     */
    _closeDialog() {
        let dialog = this._document.querySelector('.dialog');
        if (dialog !== null) {
            dialog.classList.remove('show');
        }
    }

    /**
     * @description end of the game
     * @private
     */
    _gameOver() {
        this._isGameOver = true;
        this._playerScore = 0;
        this._movePlayerToDefaultPosition();
        this._openDialog();
    }
}