
const ShopItem = require('../models/shop_items.model');

// Create and Save a new Shop Item
exports.create = async (req, res) => {
    try {
        // Create a Shop Item
        const shopItem = new ShopItem({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            type: req.body.type,
            imageUrl: req.body.imageUrl,
            isAvailable: req.body.isAvailable,
            discount: req.body.discount,
            rarity: req.body.rarity
        });

        // Save Shop Item in the database
        const data = await shopItem.save();
        res.status(201).send(data.toItemResponse());
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Shop Item."
        });
    }
};

// Retrieve all Shop Items from the database
exports.findAll = async (req, res) => {
    try {
        const shopItems = await ShopItem.find();
        res.send(shopItems.map(item => item.toItemResponse()));
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving shop items."
        });
    }
};

// Find a single Shop Item with an id
exports.findOne = async (req, res) => {
    try {
        const shopItem = await ShopItem.findById(req.params.id);
        if (!shopItem) {
            return res.status(404).send({
                message: "Shop Item not found with id " + req.params.id
            });
        }
        res.send(shopItem.toItemResponse());
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Shop Item not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving Shop Item with id " + req.params.id
        });
    }
};

// Update a Shop Item by the id
exports.update = async (req, res) => {
    try {
        const shopItem = await ShopItem.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            type: req.body.type,
            imageUrl: req.body.imageUrl,
            isAvailable: req.body.isAvailable,
            discount: req.body.discount,
            rarity: req.body.rarity
        }, { new: true });

        if (!shopItem) {
            return res.status(404).send({
                message: "Shop Item not found with id " + req.params.id
            });
        }
        res.send(shopItem.toItemResponse());
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Shop Item not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating Shop Item with id " + req.params.id
        });
    }
};

// Delete a Shop Item with the specified id
exports.delete = async (req, res) => {
    try {
        const shopItem = await ShopItem.findByIdAndRemove(req.params.id);
        if (!shopItem) {
            return res.status(404).send({
                message: "Shop Item not found with id " + req.params.id
            });
        }
        res.send({ message: "Shop Item deleted successfully!" });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Shop Item not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete Shop Item with id " + req.params.id
        });
    }
};

// Delete all Shop Items from the database
exports.deleteAll = async (req, res) => {
    try {
        await ShopItem.deleteMany({});
        res.send({ message: "Shop Items deleted successfully!" });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all shop items."
        });
    }
};
