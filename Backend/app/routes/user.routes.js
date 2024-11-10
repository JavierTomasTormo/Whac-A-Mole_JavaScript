const userController = require('../controllers/users.controller.js');
const verifyJWT = require('../middleware/verifyJWT.js');

module.exports = (app) => {

    // Get all users
    app.get('/users', userController.getAllUsers);

    // Update user details
    app.put('/users/update', verifyJWT ,userController.updateUser);

    app.put('/users/update-password', verifyJWT, userController.updatePassword);


    // User registration
    app.post('/users/register', userController.registerUser);

    // User login
    app.post('/users/login', userController.userLogin);

    // Get user profile
    app.get('/users/profile', verifyJWT, userController.getCurrentUser);

    // Get current user details
    // app.get('/user', verifyJWT, userController.getCurrentUser);
    app.post('/user/updateSkin', verifyJWT, userController.updateSkin);

    // Update game stats
    app.post('/user/stats', verifyJWT, userController.updateGameStats);

    // Update game settings
    app.post('/user/settings', verifyJWT, userController.updateGameSettings);
};
