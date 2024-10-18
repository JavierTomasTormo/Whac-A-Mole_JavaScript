class LoginView {
    constructor() {
        this.loginForm = document.createElement('form');
        this.loginForm.id = 'login-form';
        this.loginForm.innerHTML = `
            <input type="text" id="username" placeholder="Username" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        `;
        document.body.insertBefore(this.loginForm, document.getElementById('game-container'));
    }

    hideLoginForm() {
        this.loginForm.style.display = 'none';
    }

    showLoginForm() {
        this.loginForm.style.display = 'block';
    }
}
