document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'assets/images/Wallpaper_Charge/wv9.png',
            'assets/images/Wallpaper_Charge/wv1.png',
                'assets/images/Wallpaper_Charge/wv8.png',
                    'assets/images/Wallpaper_Charge/wv2.png',
                        'assets/images/Wallpaper_Charge/wv7.png',
                            'assets/images/Wallpaper_Charge/wv3.png',
                                'assets/images/Wallpaper_Charge/wv6.png',
                                    'assets/images/Wallpaper_Charge/wv4.png',
    ];

    const moleImages = [
        '../assets/images/Moles/Moles_1.png',
        '../assets/images/Moles/Moles_2.png',
        '../assets/images/Moles/Moles_3.png',
        '../assets/images/Moles/Moles_4.png',
        '../assets/images/Moles/Moles_5.png',
        '../assets/images/Moles/Moles_6.png',
        '../assets/images/Moles/Moles_7.png'
    ];



    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.getElementById('start-screen').style.backgroundImage = `url('${randomImage}')`;

    const moleAnimation = new MoleAnimation(moleImages);
    const gameModel = new GameModel();
    const gameView = new GameView();
    const gameController = new GameController(gameModel, gameView, moleAnimation);

    gameController.init();
});
