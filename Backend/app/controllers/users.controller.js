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
    const token = jwt.sign(
        { user: { email: user.email } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    const userObject = {
        username: user.username,
        password: hashedPwd,
        email: user.email,
        highScore: 0,
        totalGamesPlayed: 0,
        totalMolesWhacked: 0,
        averageReactionTime: 0,
        achievements: [
            {
                name: "Beginner",
                dateUnlocked: new Date(),
                description: "Welcome to Whac-A-Mole!"
            }
        ],
        gameSettings: {
            difficulty: 'easy',
            soundEnabled: true,
            musicEnabled: true
        },
        avatar: "/Frontend/assets/images/Moles/GoldenHelmetMole_RMBG.png",
        skins: [],
        token: token
    };

    try {
        const createdUser = await User.create(userObject);
        return res.status(201).json({
            user: {
                ...createdUser.toUserResponse(),
                token: token
            }
        });
    } catch (error) {
        return res.status(422).json({ message: "Unable to register user" });
    }
});


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().exec();
    
    const usersResponse = users.map(user => ({
        ...user.toObject()
    }));
    
    res.status(200).json({ users: usersResponse });
});




const updateUser = asyncHandler(async (req, res) => {
    const { user } = req.body;
    console.log(req.body.user.email);

    const email = req.body.user.email;

    if (!user) {
        return res.status(400).json({ message: "User data is required" });
    }

    const existingUser = await User.findOne({ email }).exec();

    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.username) existingUser.username = user.username;
    if (user.avatar) existingUser.avatar = user.avatar;
    if (user.gameSettings) existingUser.gameSettings = { ...existingUser.gameSettings, ...user.gameSettings };
    if (user.skins) existingUser.skins = user.skins;
    if (user.totalMolesWhacked !== undefined) existingUser.totalMolesWhacked = user.totalMolesWhacked;
    if (user.averageReactionTime !== undefined) existingUser.averageReactionTime = user.averageReactionTime;
    if (user.achievements) existingUser.achievements = [...existingUser.achievements, ...user.achievements];

    if (user.password) {
        existingUser.password = await argon2.hash(user.password);
    }

    const updatedUser = await existingUser.save();

    if (!updatedUser) {
        return res.status(400).json({ message: "Failed to update user" });
    }

    res.status(200).json({
        user: updatedUser.toUserResponse()
    });
});



const getCurrentUser = asyncHandler(async (req, res) => {
    const email = req.userEmail;
    const user = await User.findOne({ email }).select('+token').exec();
    
    res.status(200).json({
        user: {
            ...user.toUserResponse(),
        }
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
    getAllUsers,
    updateUser,
    getCurrentUser,
    userLogin,
    updateGameStats,
    updateGameSettings
};