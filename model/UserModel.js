class UserModel {
    constructor() {
        this.currentUser = null;
    }

    login(username, password) {
        // In a real app, you'd validate against a server
        if (username && password) {
            this.currentUser = username;
            localStorage.setItem('currentUser', username);
            return true;
        }
        return false;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    getCurrentUser() {
        if (!this.currentUser) {
            this.currentUser = localStorage.getItem('currentUser');
        }
        return this.currentUser;
    }
}
