

class UserModel {
    constructor() {
        this.isLoggedIn = false;
        this.username = null;
        this.token = null;

        this.defaultSkin = "http://127.0.0.1:5500/Frontend/assets/images/Wallpaper_Charge/shop_items/god_h.jpg";
    
        const storedSkin = localStorage.getItem('selectedSkin');
        this.skin = storedSkin && storedSkin !== 'null' ? storedSkin : this.defaultSkin;
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
