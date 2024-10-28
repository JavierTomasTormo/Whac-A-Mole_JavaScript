

class UserModel {
    constructor() {
        this.isLoggedIn = false;
        this.username = null;
        this.token = null;
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
}
