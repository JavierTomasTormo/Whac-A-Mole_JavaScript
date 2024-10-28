
class UserView {
    constructor() {
        this.loginForm = document.createElement('div');
        this.loginForm.className = 'auth-container';
        this.loginForm.innerHTML = `
            <div id="loginSection">
                <h2>Login to Play</h2>
                <label for="username" class="sr-only">Username</label>
                <input type="text" id="username" placeholder="Username" aria-label="Username" required>
                
                <label for="password" class="sr-only">Password</label>
                <input type="password" id="password" placeholder="Password" aria-label="Password" required>
                
                <button type="submit" id="loginBtn">Login</button>
                <p>Don't have an account? <span id="showRegister" class="link">Register here</span></p>
            </div>

            <div id="registerSection" style="display: none;">
                <h2>Register to Play</h2>
                <label for="regUsername" class="sr-only">Username</label>
                <input type="text" id="regUsername" placeholder="Choose a username" aria-label="Username" required>
                
                <label for="regPassword" class="sr-only">Password</label>
                <input type="password" id="regPassword" placeholder="Create a password" aria-label="Password" required>
                
                <button type="button" id="registerBtn">Register</button>
                <p>Already have an account? <span id="showLogin" class="link">Login here</span></p>
            </div>

        `;
        document.body.insertBefore(this.loginForm, document.getElementById('start-screen'));
    }

    hideLoginForm() {
        this.loginForm.style.display = 'none';
        document.getElementById('start-screen').style.display = 'flex';
    }

    showLoginForm() {
        this.loginForm.style.display = 'block';
        document.getElementById('start-screen').style.display = 'none';
    }

    showRegisterSection() {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('registerSection').style.display = 'block';
    }

    showLoginSection() {
        document.getElementById('loginSection').style.display = 'block';
        document.getElementById('registerSection').style.display = 'none';
    }
}
