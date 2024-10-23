document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'assets/images/Wallpaper_Charge/wv1.png',
        'assets/images/Wallpaper_Charge/wv2.png',
        'assets/images/Wallpaper_Charge/wv3.png',
        'assets/images/Wallpaper_Charge/wv4.png',
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.getElementById('start-screen').style.backgroundImage = `url('${randomImage}')`;

    const gameModel = new GameModel();
    const gameView = new GameView();
    const gameController = new GameController(gameModel, gameView);

    gameController.init();
});
