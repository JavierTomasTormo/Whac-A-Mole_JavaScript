const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    highScore: {
        type: Number,
        default: 0
    },
    totalGamesPlayed: {
        type: Number,
        default: 0
    },
    totalMolesWhacked: {
        type: Number,
        default: 0
    },
    ticketsEarned: {
        type: Number,
        default: 0
    },
    lastPlayedDate: {
        type: Date,
        default: null
    },
    achievements: [{
        name: String,
        dateUnlocked: Date,
        description: String
    }],
    gameSettings: {
        difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard'],
            default: 'easy'
        },
        soundEnabled: {
            type: Boolean,
            default: true
        },
        musicEnabled: {
            type: Boolean,
            default: true
        },
        gameSpeed: {
            type: Number,
            default: 2
        }
    },
    token: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: "https://static.productionready.io/images/mole-avatar.jpg"
    },
    skins: [{
        type: String,
        default: 'http://127.0.0.1:5500/Frontend/assets/images/Wallpaper_Charge/shop_items/Wallpaper.jpg'
    }],
    selectedSkin: {
        type: String,
        default: 'http://127.0.0.1:5500/Frontend/assets/images/Wallpaper_Charge/shop_items/Wallpaper.jpg'
    }
}, {
    timestamps: true
});

userSchema.plugin(uniqueValidator);

userSchema.methods.toUserResponse = function() {
    return {
        username: this.username,
        email: this.email,
        highScore: this.highScore,
        totalGamesPlayed: this.totalGamesPlayed,
        totalMolesWhacked: this.totalMolesWhacked,
        ticketsEarned: this.ticketsEarned,
        achievements: this.achievements,
        gameSettings: this.gameSettings,
        avatar: this.avatar,
        skins: this.skins,
        selectedSkin: this.selectedSkin
    };
};

userSchema.methods.toProfileJSON = function() {
    return {
        id: this._id,         
        username: this.username,
        highScore: this.highScore,
        totalGamesPlayed: this.totalGamesPlayed,
        achievements: this.achievements,
        avatar: this.avatar,
        skins: this.skins,
        selectedSkin: this.selectedSkin
    };
};

userSchema.methods.updateGameStats = function(totalMolesWhacked, ticketsEarned, highScore) {
    if (highScore > this.highScore) {
        this.highScore = highScore;
    }
    this.totalMolesWhacked = totalMolesWhacked;
    this.ticketsEarned = ticketsEarned;
    this.totalGamesPlayed += 1;
    this.lastPlayedDate = new Date();
    
    return this.save();
};

userSchema.methods.updateGameSettings = function(settings) {
    this.gameSettings = {
        ...this.gameSettings,
        ...settings
    };
    return this.save();
};

module.exports = mongoose.model('User', userSchema);
