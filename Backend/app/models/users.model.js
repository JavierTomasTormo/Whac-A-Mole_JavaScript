const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
    averageReactionTime: {
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
        }
    },
    avatar: {
        type: String,
        default: "https://static.productionready.io/images/mole-avatar.jpg"
    },
    skins: [{
        skinId: String,
        name: String,
        imageUrl: String,
        unlockDate: Date
    }]
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
        averageReactionTime: this.averageReactionTime,
        achievements: this.achievements,
        gameSettings: this.gameSettings,
        avatar: this.avatar,
        skins: this.skins
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
        skins: this.skins
    };
};

userSchema.methods.updateGameStats = function(score, molesWhacked, reactionTime) {
    this.totalGamesPlayed += 1;
    this.totalMolesWhacked += molesWhacked;
    
    if (score > this.highScore) {
        this.highScore = score;
    }
    
    this.averageReactionTime = (
        (this.averageReactionTime * (this.totalGamesPlayed - 1) + reactionTime) / 
        this.totalGamesPlayed
    );
    
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