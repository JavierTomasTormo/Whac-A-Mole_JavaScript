const userController = require('../controllers/users.controller.js');
const verifyJWT = require('../middleware/verifyJWT.js');

module.exports = (app) => {
    app.get('/users', userController.getAllUsers);
    app.get('/users/profile', verifyJWT, userController.getCurrentUser);
    app.get('/user/getUserSkins', verifyJWT, userController.getUserSkins);


    app.post('/user/stats', verifyJWT, userController.updateGameStats);
    app.post('/user/updateSkin', verifyJWT, userController.updateSkin);
    app.post('/users/register', userController.registerUser);
    app.post('/users/login', userController.userLogin);
    app.post('/user/purchaseSkin', verifyJWT, userController.purchaseShopItem);
    app.post('/user/settings', verifyJWT, userController.updateGameSettings);


    app.put('/users/update', verifyJWT ,userController.updateUser);
    app.put('/users/update-password', verifyJWT, userController.updatePassword);

};
