const express = require('express');
const shopItems = require('../controllers/shop_items.controller');
const verifyJWT = require('../middleware/verifyJWT');

module.exports = (app) => {

    app.post('/shop_items', shopItems.create);
    app.get('/shop_items', shopItems.findAll);
    app.get('/shop_items/:itemId', shopItems.findOne);
    
    app.put('/shop_items/:itemId', verifyJWT,shopItems.update);
    app.delete('/shop_items/:itemId', verifyJWT, shopItems.delete);
};
