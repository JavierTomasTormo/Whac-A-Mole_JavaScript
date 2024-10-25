const userController = require('../controllers/users.controller.js');
const verifyJWT = require('../middleware/verifyJWT.js');

module.exports = (app) => {
    // User registration
    app.post('/users', userController.registerUser);

    // User login
    app.post('/users/login', userController.userLogin);

    // Get user profile
    app.get('/profile', verifyJWT, userController.getCurrentUser);

    // Get current user details at /user
    app.get('/user', verifyJWT, userController.getCurrentUser);

    // Logout
    app.post('/users/logout', userController.logoutUser);
};
