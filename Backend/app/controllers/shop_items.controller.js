const ShopItem = require('../models/shop_items.model');
const asyncHandler = require('express-async-handler');

const createShopItem = asyncHandler(async (req, res) => {
    const { item } = req.body;

    if (!item || !item.name || !item.price || !item.type) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const itemObject = {
        name: item.name,
        description: item.description,
        price: item.price,
        type: item.type,
        imageUrl: item.imageUrl,
        isAvailable: item.isAvailable || true,
        discount: item.discount || 0,
        rarity: item.rarity || 'common'
    };

    const createdItem = await ShopItem.create(itemObject);
    return res.status(201).json({
        item: createdItem.toItemResponse()
    });
});

const getAllShopItems = asyncHandler(async (req, res) => {
    const items = await ShopItem.find().sort({ price: 1 }).exec();
    const itemsResponse = items.map(item => ({
        ...item.toItemResponse()
    }));
    res.status(200).json({ items: itemsResponse });
});

const getShopItemById = asyncHandler(async (req, res) => {
    const item = await ShopItem.findById(req.params.id);
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ item: item.toItemResponse() });
});

const updateShopItem = asyncHandler(async (req, res) => {
    const { item } = req.body;
    const existingItem = await ShopItem.findById(req.params.id);

    if (!existingItem) {
        return res.status(404).json({ message: "Item not found" });
    }

    if (item.name) existingItem.name = item.name;
    if (item.description) existingItem.description = item.description;
    if (item.price) existingItem.price = item.price;
    if (item.type) existingItem.type = item.type;
    if (item.imageUrl) existingItem.imageUrl = item.imageUrl;
    if (item.isAvailable !== undefined) existingItem.isAvailable = item.isAvailable;
    if (item.discount) existingItem.discount = item.discount;
    if (item.rarity) existingItem.rarity = item.rarity;

    const updatedItem = await existingItem.save();
    res.status(200).json({
        item: updatedItem.toItemResponse()
    });
});

const deleteShopItem = asyncHandler(async (req, res) => {
    const item = await ShopItem.findByIdAndDelete(req.params.id);
    if (!item) {
        return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
});

const deleteAllShopItems = asyncHandler(async (req, res) => {
    await ShopItem.deleteMany({});
    res.status(200).json({ message: "All items deleted successfully" });
});

module.exports = {
    createShopItem,
    getAllShopItems,
    getShopItemById,
    updateShopItem,
    deleteShopItem,
    deleteAllShopItems
};
