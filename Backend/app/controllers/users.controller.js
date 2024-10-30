const User = require('../models/users.model.js');
const asyncHandler = require('express-async-handler');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');


const registerUser = asyncHandler(async (req, res) => {
    const { user } = req.body;

    // console.log("users.controller.js, 9:", user);

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
        // { user: { email: user.email } },
        { user: { username: user.username, email: user.email } },
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


// const updateUser = asyncHandler(async (req, res) => {
//     const { user } = req.body;
    
//     // Extract email from token
//     const authHeader = req.headers.authorization;
//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     const currentEmail = decoded.user.email;

//     if (!user) {
//         return res.status(400).json({ message: "User data is required" });
//     }

//     const existingUser = await User.findOne({ email: currentEmail }).exec();

//     if (!existingUser) {
//         return res.status(404).json({ message: "User not found" });
//     }

//     // Check if new username or email already exists
//     if (user.username) {
//         const usernameExists = await User.findOne({ username: user.username }).exec();
//         if (usernameExists && usernameExists._id.toString() !== existingUser._id.toString()) {
//             return res.status(400).json({ message: "Username already exists" });
//         }
//     }

//     if (user.email) {
//         const emailExists = await User.findOne({ email: user.email }).exec();
//         if (emailExists && emailExists._id.toString() !== existingUser._id.toString()) {
//             return res.status(400).json({ message: "Email already exists" });
//         }
//     }

//     if (user.username) existingUser.username = user.username;
//     if (user.email) existingUser.email = user.email;
//     if (user.avatar) existingUser.avatar = user.avatar;
//     if (user.gameSettings) existingUser.gameSettings = { ...existingUser.gameSettings, ...user.gameSettings };
//     if (user.skins) existingUser.skins = user.skins;
//     if (user.totalMolesWhacked !== undefined) existingUser.totalMolesWhacked = user.totalMolesWhacked;
//     if (user.averageReactionTime !== undefined) existingUser.averageReactionTime = user.averageReactionTime;
//     if (user.achievements) existingUser.achievements = [...existingUser.achievements, ...user.achievements];

//     if (user.password) {
//         existingUser.password = await argon2.hash(user.password);
//     }

//     const updatedUser = await existingUser.save();

//     if (!updatedUser) {
//         return res.status(400).json({ message: "Failed to update user" });
//     }

//     res.status(200).json({
//         user: updatedUser.toUserResponse()
//     });
// });
const updateUser = asyncHandler(async (req, res) => {
    const { user } = req.body;
    
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const currentEmail = decoded.user.email;

    if (!user) {
        return res.status(400).json({ message: "User data is required" });
    }

    const existingUser = await User.findOne({ email: currentEmail }).exec();

    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    if (user.username) existingUser.username = user.username;
    if (user.email) existingUser.email = user.email;
    if (user.avatar) existingUser.avatar = user.avatar;
    if (user.gameSettings) existingUser.gameSettings = { ...existingUser.gameSettings, ...user.gameSettings };
    if (user.skins) existingUser.skins = user.skins;
    if (user.totalMolesWhacked !== undefined) existingUser.totalMolesWhacked = user.totalMolesWhacked;
    if (user.averageReactionTime !== undefined) existingUser.averageReactionTime = user.averageReactionTime;
    if (user.achievements) existingUser.achievements = [...existingUser.achievements, ...user.achievements];

    if (user.password) {
        existingUser.password = await argon2.hash(user.password);
    }

    if (user.username || user.email) {
        const newToken = jwt.sign(
            { user: { username: existingUser.username, email: existingUser.email } },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        existingUser.token = newToken;
    }

    const updatedUser = await existingUser.save();

    res.status(200).json({
        user: {
            ...updatedUser.toUserResponse(),
            token: updatedUser.token
        }
    });
});





// const getCurrentUser = asyncHandler(async (req, res) => {
//     // Extract email from token
//     const authHeader = req.headers.authorization;
//     const token = authHeader.split(' ')[1];
    
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     const email = decoded.user.email;
    
//     const user = await User.findOne({ email }).select('+token').exec();
    
//     res.status(200).json({
//         user: {
//             ...user.toUserResponse(),
//         }
//     });
// });
const getCurrentUser = asyncHandler(async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const email = decoded.user.email;
    
    const user = await User.findOne({ email }).select('+token').exec();
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        user: {
            ...user.toObject(),
            token: user.token
        }
    });
});





const userLogin = asyncHandler(async (req, res) => {
    const { user } = req.body;
    if (!user || !user.username || !user.password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const loginUser = await User.findOne({ username: user.username }).exec();
    if (!loginUser) {
        return res.status(404).json({ message: "User Not Found" });
    }
    const match = await argon2.verify(loginUser.password, user.password);
    if (!match) return res.status(401).json({ message: 'Unauthorized: Wrong password' });
    const token = jwt.sign(
        { user: { id: loginUser._id, username: loginUser.username, email: loginUser.email } },
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


const updatePassword = asyncHandler(async (req, res) => {
    const userId = req.userId;
    const { currentPassword, password } = req.body.user;
    const user = await User.findById(userId);
    if (!user) {return res.status(404).json({ message: "Usuario no encontrado" });}
    const isMatch = await argon2.verify(user.password, currentPassword);
    if (!isMatch) {return res.status(401).json({ message: "Contraseña actual incorrecta" });}
    user.password = await argon2.hash(password);
    await user.save();
    res.status(200).json({ message: "Contraseña actualizada correctamente" });
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
    const userId = req.userId;
    const { gameSettings } = req.body;
    if (!gameSettings) {
        return res.status(400).json({ message: "Game settings are required" });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.gameSettings = {
            difficulty: gameSettings.difficulty,
            soundEnabled: gameSettings.soundEnabled,
            musicEnabled: gameSettings.musicEnabled,
            gameSpeed: gameSettings.gameSpeed
        };
        await user.save();
        return res.status(200).json({
            message: "Game settings updated successfully",
            gameSettings: user.gameSettings
        });
    } catch (error) {
        return res.status(500).json({ message: "Error updating game settings" });
    }
});


module.exports = {
    registerUser,
    getAllUsers,
    updateUser,
    getCurrentUser,
    userLogin,
    updateGameStats,
    updateGameSettings,
    updatePassword,
};