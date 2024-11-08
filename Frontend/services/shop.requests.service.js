// Frontend/services/shop.requests.service.js

class ShopRequestsService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async getShopItems() {
        const response = await fetch(`${this.baseURL}/shop_items`, {
            method: 'GET'
        });
        return response;
    }

    // Agrega más métodos según sea necesario
}

const shopRequestsService = new ShopRequestsService('http://localhost:3002');
export default shopRequestsService;