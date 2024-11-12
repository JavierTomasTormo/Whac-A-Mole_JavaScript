import UserModel from '../../model/UserModel.js';
import UserView from '../../view/UserView.js';
import UserController from '../../controller/UserController.js';
import GameModel from '../../model/GameModel.js';
import GameView from '../../view/GameView.js';
import GameController from '../../controller/GameController.js';
import MoleAnimation from '../../controller/MoleAnimationController.js';
import LeaderboardController from '../../controller/LeaderBoardController.js';

import shopRequestsService from '../../services/shop.requests.service.js';
import userRequestsService from '../../services/user.requests.service.js';

(function() {
    const originalFetch = fetch;
    window.fetch = async (...args) => {
        const response = await originalFetch(...args);
        if (response.status === 403) {
            window.handleLogout();
        }
        return response;
    };
})();

document.addEventListener('DOMContentLoaded', () => {
/*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■IMG Charger■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
    const images = [
        'Frontend/assets/images/Wallpaper_Charge/wv9.png',
        'Frontend/assets/images/Wallpaper_Charge/wv1.png',
        'Frontend/assets/images/Wallpaper_Charge/wv8.png',
        'Frontend/assets/images/Wallpaper_Charge/wv2.webp',
        'Frontend/assets/images/Wallpaper_Charge/wv7.png',
        'Frontend/assets/images/Wallpaper_Charge/wv3.png',
        'Frontend/assets/images/Wallpaper_Charge/wv6.png',
        'Frontend/assets/images/Wallpaper_Charge/wv4.png',
        // 'Frontend/assets/images/Wallpaper_Charge/wv10.png',
        'Frontend/assets/images/Wallpaper_Charge/wv11.png',
        'Frontend/assets/images/Wallpaper_Charge/wv12.png',
        // 'Frontend/assets/images/Wallpaper_Charge/wv13.png',
        // 'Frontend/assets/images/Wallpaper_Charge/wv14.png',
        'Frontend/assets/images/Wallpaper_Charge/wv15.png',
        'Frontend/assets/images/Wallpaper_Charge/wv16.webp',
    ];
    const moleImages = [
        '../Frontend/assets/images/Moles/Moles_11.png',//PERFECT
        '../Frontend/assets/images/Moles/Moles_1.png',//PERFECT
        '../Frontend/assets/images/Moles/Moles_20.png',//REGULAR PROBABLE
        '../Frontend/assets/images/Moles/Moles_3.png',//PERFECT
        '../Frontend/assets/images/Moles/Moles_5.png',//PERFECT
        '../Frontend/assets/images/Moles/GoldenHelmetMole_RMBG.png',//PERFECT
        '../Frontend/assets/images/Moles/Moles_15.png',//REGULAR PROBABLEMENTE LAS QUITE
        '../Frontend/assets/images/Moles/Moles_8.png',//PERFECT
        '../Frontend/assets/images/Moles/Moles_17.png',//REGULAR PROBABLEMENTE LAS QUITE
        '../Frontend/assets/images/Moles/Moles_9.png',//PERFECT
        '../Frontend/assets/images/Moles/Moles_4.png',//PERFECT
        '../Frontend/assets/images/Moles/Moles_16.png',//REGULAR PROBABLEMENTE LAS QUITE
        '../Frontend/assets/images/Moles/Moles_6.png',//PERFECT
        '../Frontend/assets/images/Moles/Moles_19.png',//REGULAR PROBABLEMENTE LAS QUITE
        '../Frontend/assets/images/Moles/Moles_2.png',//PERFECT
        '../Frontend/assets/images/Moles/Moles_12.png',//PERFECT


    ];
    const splashImages = [
        '../Frontend/assets/images/utils/splash/blood_2.png',
        '../Frontend/assets/images/utils/splash/blood_3.png',
        '../Frontend/assets/images/utils/splash/blood_4.png',
        '../Frontend/assets/images/utils/splash/blood_5.png',
        '../Frontend/assets/images/utils/splash/blood_6.png',
        '../Frontend/assets/images/utils/splash/blood_7.png',
    ];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.getElementById('start-screen').style.backgroundImage = `url('${randomImage}')`;

    const logoutButton = document.getElementById('logout-button');
    const profileButton = document.getElementById('profile-button');
    const startGameButton = document.getElementById('start-button');

    logoutButton.addEventListener('click', () => {
        userController.handleLogout();
    });

    profileButton.addEventListener('click', () => {
        userController.handleProfile();
    });

    startGameButton.addEventListener('click', () => {
        const leaderboardElement = document.getElementById('leaderboard');
        if (leaderboardElement) {
            leaderboardElement.remove();
        }
    });
/*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

// ············································································
    const userModel = new UserModel();
    const userView = new UserView();
    const userController = new UserController(userModel, userView);

    const leaderboardController = new LeaderboardController();
    leaderboardController.loadLeaderboard();

    if (userModel.checkLoginStatus()) {
        const gameModel = new GameModel();
        const gameView = new GameView(userModel);
        const moleAnimation = new MoleAnimation(moleImages, splashImages, gameModel);
        const gameController = new GameController(gameModel, gameView, moleAnimation, userModel);
        gameController.init();
    }
});
