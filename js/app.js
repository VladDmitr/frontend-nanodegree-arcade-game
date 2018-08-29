'use strict';

const canvas = new Canvas(document);
const positionService = new PositionService(canvas);
const resourcesService = new ResourcesService();
resourcesService.load([
    'images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png'
]);

const enemiesCount = 10;
const enemies = [];
for (let i = 0; i < enemiesCount; i++) {
    enemies.push(
        (new Enemy(canvas, resourcesService, positionService))
            .setSpeed(positionService.getEnemyRandomSpeed())
            .setPosition(
                positionService.getEnemyRandomHorizontalPosition(),
                positionService.getEnemyRandomVerticalPosition()
            )
    );
}

const gameDto = new GameDto(this);
gameDto
    .setCanvas(canvas)
    .setPlayer(new Player(canvas, resourcesService, positionService))
    .setEnemies(enemies);

const gameService = new GameService(resourcesService, positionService, gameDto);
resourcesService.onReady(gameService.create.bind(gameService));