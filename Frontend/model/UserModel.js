

class UserModel {
    constructor() {
        this.isLoggedIn = false;
        this.username = null;
        this.token = null;

        this.skin = 'http://127.0.0.1:5500/Frontend/assets/images/Wallpaper_Charge/shop_items/god_h.jpg';
    }

    getSelectedSkin() {
        return this.skin;
    }

    setSelectedSkin(skin) {
        this.skin = skin;
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
