const mongoose = require('mongoose')

const shopItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    type: {
        type: String,
        enum: ['skin', 'powerup', 'avatar'],
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    discount: {
        type: Number,
        default: 0
    },
    rarity: {
        type: String,
        enum: ['common', 'rare', 'epic', 'legendary'],
        default: 'common'
    },
    stats: {
        timespurchased: {
            type: Number,
            default: 0
        },
        lastPurchaseDate: {
            type: Date,
            default: null
        }
    }
}, {
    timestamps: true
})

shopItemSchema.methods.toItemResponse = function() {
    return {
        id: this._id,
        name: this.name,
        description: this.description,
        price: this.price,
        type: this.type,
        imageUrl: this.imageUrl,
        isAvailable: this.isAvailable,
        discount: this.discount,
        rarity: this.rarity,
        stats: this.stats
    }
}

module.exports = mongoose.model('shop_items', shopItemSchema)
