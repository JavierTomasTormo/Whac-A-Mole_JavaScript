const User = require('../models/users.model.js');
const asyncHandler = require('express-async-handler');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const { user } = req.body;

    if (!user || !user.email || !user.username || !user.password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ 
        $or: [{ email: user.email }, { username: user.username }] 
    });

    if (existingUser) {
        return res.status(422).json({ message: "Email or username already taken" });
    }

    const hashedPwd = await argon2.hash(user.password);
    const userObject = {
        username: user.username,
        password: hashedPwd,
        email: user.email,
        highScore: 0,
        totalGamesPlayed: 0,
        totalMolesWhacked: 0,
        averageReactionTime: 0,
        lastPlayedDate: null,
        achievements: [],
        gameSettings: {
            difficulty: 'easy',
            soundEnabled: true,
            musicEnabled: true
        },
        avatar: "https://static.productionready.io/images/mole-avatar.jpg",
        skins: []
    };
    const createdUser = await User.create(userObject);

    if (createdUser) {
        const token = jwt.sign(
            { user: { id: createdUser._id, email: createdUser.email } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(201).json({
            user: createdUser.toUserResponse(),
            token
        });
    }
    return res.status(422).json({ message: "Unable to register user" });
});





const getCurrentUser = asyncHandler(async (req, res) => {
    const email = req.userEmail;
    const user = await User.findOne({ email }).exec();
    
    if (!user) {
        return res.status(404).json({ message: "User Not Found" });
    }

    res.status(200).json({
        user: user.toUserResponse()
    });
});





const userLogin = asyncHandler(async (req, res) => {
    const { user } = req.body;

    if (!user || !user.email || !user.password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const loginUser = await User.findOne({ email: user.email }).exec();

    if (!loginUser) {
        return res.status(404).json({ message: "User Not Found" });
    }

    const match = await argon2.verify(loginUser.password, user.password);
    if (!match) return res.status(401).json({ message: 'Unauthorized: Wrong password' });

    const token = jwt.sign(
        { user: { id: loginUser._id, email: loginUser.email } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({
        user: {
            ...loginUser.toUserResponse(),
            token
        }
    });
});

const updateGameStats = asyncHandler(async (req, res) => {
    const { score, molesWhacked, reactionTime } = req.body;
    const email = req.userEmail;
    
    const user = await User.findOne({ email }).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await user.updateGameStats(score, molesWhacked, reactionTime);
    res.status(200).json({
        user: user.toUserResponse()
    });
});

const updateGameSettings = asyncHandler(async (req, res) => {
    const { settings } = req.body;
    const email = req.userEmail;
    
    const user = await User.findOne({ email }).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await user.updateGameSettings(settings);
    res.status(200).json({
        user: user.toUserResponse()
    });
});

module.exports = {
    registerUser,
    getCurrentUser,
    userLogin,
    updateGameStats,
    updateGameSettings
};
