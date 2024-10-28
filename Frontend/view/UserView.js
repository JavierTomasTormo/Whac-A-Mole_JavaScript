
class UserView {
    constructor() {
        this.setResponsiveBackground();
        window.addEventListener('resize', () => this.setResponsiveBackground());
        
        this.loginForm = document.createElement('div');
        this.loginForm.className = 'auth-container';
        this.loginForm.innerHTML = `
            <div class="character"></div>
            <!-- Sección de Login -->
            <div id="loginSection">
                <h2>Login to Play</h2>
                <input type="text" id="username" placeholder="Username" aria-label="Username" required>
                <input type="password" id="password" placeholder="Password" aria-label="Password" required>
                <button type="submit" id="loginBtn">Login</button>
                <p>Don't have an account? <span id="showRegister" class="link">Register here</span></p>
            </div>
            <!-- Sección de Registro -->
            <div id="registerSection" style="display: none;">
                <h2>Register to Play</h2>
                <input type="text" id="regUsername" placeholder="Choose a username" aria-label="Username" required>
                <input type="password" id="regPassword" placeholder="Create a password" aria-label="Password" required>
                <button type="button" id="registerBtn">Register</button>
                <p>Already have an account? <span id="showLogin" class="link">Login here</span></p>
            </div>
        `;
        document.body.insertBefore(this.loginForm, document.getElementById('start-screen'));
    }

    setResponsiveBackground() {
        if (window.innerWidth <= 768) {
            document.body.style.backgroundImage = "url('Frontend/assets/images/utils/auth_wallpaper_mobile.jpg')";
            document.body.style.backgroundColor = '#f0f0f0';
        } else {
            document.body.style.backgroundImage = "url('Frontend/assets/images/utils/auth_wallpaper.jpg')";
        }
    }

    hideLoginForm() {
        // this.loginForm.style.display = 'none';
        // document.getElementById('start-screen').style.display = 'flex';
        this.loginForm.remove();
        
        window.removeEventListener('resize', () => this.setResponsiveBackground());
        
        document.body.style.backgroundImage = '';
        document.body.style.backgroundColor = '';
        
        document.getElementById('start-screen').style.display = 'flex';
        document.getElementById('game-container').style.display = 'block';
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
