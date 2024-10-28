document.addEventListener('DOMContentLoaded', () => {
/*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■IMG Charger■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
    const images = [
        'Frontend/assets/images/Wallpaper_Charge/wv9.png',
        'Frontend/assets/images/Wallpaper_Charge/wv1.png',
        'Frontend/assets/images/Wallpaper_Charge/wv8.png',
        'Frontend/assets/images/Wallpaper_Charge/wv2.png',
        'Frontend/assets/images/Wallpaper_Charge/wv7.png',
        'Frontend/assets/images/Wallpaper_Charge/wv3.png',
        'Frontend/assets/images/Wallpaper_Charge/wv6.png',
        'Frontend/assets/images/Wallpaper_Charge/wv4.png',
    ];
    const moleImages = [
        '../Frontend/assets/images/Moles/Moles_1.png',
        '../Frontend/assets/images/Moles/Moles_2.png',
        '../Frontend/assets/images/Moles/Moles_3.png',
        '../Frontend/assets/images/Moles/Moles_4.png',
        '../Frontend/assets/images/Moles/Moles_5.png',
        '../Frontend/assets/images/Moles/Moles_6.png',
        '../Frontend/assets/images/Moles/Moles_7.png'
    ];
    const splashImages = [
        '../Frontend/assets/images/utils/splash/blood_2.png',
        '../Frontend/assets/images/utils/splash/blood_3.png',
        '../Frontend/assets/images/utils/splash/blood_4.png',
        '../Frontend/assets/images/utils/splash/blood_5.png'
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.getElementById('start-screen').style.backgroundImage = `url('${randomImage}')`;
/*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

// ············································································USER
    const userModel = new UserModel();
    const userView = new UserView();
    const userController = new UserController(userModel, userView);

// ·············································································GAME
    if (userModel.checkLoginStatus()) {
        const moleAnimation = new MoleAnimation(moleImages, splashImages);
        const gameModel = new GameModel();
        const gameView = new GameView();
        const gameController = new GameController(gameModel, gameView, moleAnimation);
        gameController.init();
    }
});
