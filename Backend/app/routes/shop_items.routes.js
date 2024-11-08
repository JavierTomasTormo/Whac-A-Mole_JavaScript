const shopItems = require('../controllers/shop_items.controller');
const verifyJWT = require('../middleware/verifyJWT');

module.exports = (app) => {

    app.post('/shop_items', shopItems.createShopItem);
    app.get('/shop_items', shopItems.getAllShopItems);
    app.get('/shop_items/:itemId', shopItems.getShopItemById);
    
    app.put('/shop_items/:itemId', verifyJWT,shopItems.updateShopItem);
    app.delete('/shop_items/:itemId', verifyJWT, shopItems.deleteShopItem);
};
