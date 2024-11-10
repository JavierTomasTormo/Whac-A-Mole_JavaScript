

class UserModel {
    constructor() {
        this.isLoggedIn = false;
        this.username = null;
        this.token = null;

        this.defaultSkin = "http://127.0.0.1:5500/Frontend/assets/images/Wallpaper_Charge/shop_items/Wallpaper.jpg";
        const storedSkin = localStorage.getItem('selectedSkin');
        this.skin = storedSkin && storedSkin !== 'null' ? storedSkin : this.defaultSkin;

        const storedSkins = JSON.parse(localStorage.getItem('skins')) || [];
        this.skins = storedSkins;

        const storedTickets = parseInt(localStorage.getItem('tickets'), 10) || 0;
        this.tickets = storedTickets;
    }

    getSelectedSkin() {
        // console.log("Selected Skin:", this.skin);
        // console.log("Default Skin:", this.defaultSkin);
        return this.skin || this.defaultSkin;
    }


    setSelectedSkin(newSkin) {
        this.skin = newSkin;
        localStorage.setItem('selectedSkin', newSkin);
    }

    getSkins() {
        return this.skins;
    }

    addSkin(skinUrl) {
        if (!this.skins.includes(skinUrl)) {
            this.skins.push(skinUrl);
            localStorage.setItem('skins', JSON.stringify(this.skins));
        }
    }

    getTickets() {
        return this.tickets;
    }

    updateTickets(amount) {
        this.tickets += amount;
        localStorage.setItem('tickets', this.tickets);
    }


    setLoginStatus(status, username, token) {
        this.isLoggedIn = status;
        this.username = username;
        this.token = token;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
    }

    checkLoginStatus() {
        const token = localStorage.getItem('token');
        if (token) {
            this.isLoggedIn = true;
            this.token = token;
            return true;
        }
        return false;
    }
}//UserModel
export default UserModel; 
