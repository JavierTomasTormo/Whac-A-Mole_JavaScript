document.addEventListener('DOMContentLoaded', () => {
    const gameModel = new GameModel();
    const userModel = new UserModel();
    const gameView = new GameView();
    const loginView = new LoginView();
    const leaderboardView = new LeaderboardView();

    const userController = new UserController(userModel, loginView);
    const gameController = new GameController(gameModel, gameView);
    const leaderboardController = new LeaderboardController(leaderboardView);

    userController.init();
    gameController.init();
    leaderboardController.init();
});
