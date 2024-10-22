document.addEventListener('DOMContentLoaded', () => {

    const gameModel = new GameModel();
    const gameView = new GameView();
    const gameController = new GameController(gameModel, gameView);

    gameController.init();
});
