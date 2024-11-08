
class UserView {
    constructor() {
        // Create profile modal
        this.profileModal = document.createElement('div');
        this.profileModal.id = 'profile-modal';
        this.profileModal.className = 'modal';
        this.profileModal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                
                <div class="profile-header">
                    <div class="profile-avatar">
                        <img src="" alt="User Avatar">
                    </div>
                    <div class="profile-info">
                        <h2 id="profile-username">Username</h2>
                        <p id="profile-email">user@email.com</p>
                    </div>
                </div>

                <div class="profile-sections">
                    <div class="settings-section">
                        <h3 class="settings-title">Game Settings</h3>
                        <div class="setting-option">
                            <label>Difficulty Level</label>
                            <select id="difficulty">
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <br>
                        <div class="setting-option">
                            <label>Game Speed</label>
                            <input type="range" id="game-speed" min="1" max="10">
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3 class="settings-title">Audio Settings</h3>
                        <div class="setting-option">
                            <label>Sound Effects</label>
                            <input type="checkbox" id="sound-effects">
                        </div>
                        <div class="setting-option">
                            <label>Background Music</label>
                            <input type="checkbox" id="background-music">
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3 class="settings-title">Statistics</h3>
                        <div class="setting-option">
                            <p><b>High Score:</b> <span id="high-score">0</span></p>
                            <p><b>Total Games:</b> <span id="total-games">0</span></p>
                            <p><b>Moles Whacked:</b> <span id="mole-whack">0</span></p>
                            <p><b>Tickets Earned:</b><span id="tickets-earned">0</span></p>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h3 class="settings-title">Account Settings</h3>
                        <div class="setting-optionbtt">
                            <button id="change-password">Change Password</button>
                            <button id="edit-profile">Edit Username</button>
                            <button class="save-settings">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.profileModal);

        // Create background container
        this.backgroundContainer = document.createElement('div');
        this.backgroundContainer.className = 'auth-background';
        
        // Create auth container
        this.loginForm = document.createElement('div');
        this.loginForm.className = 'auth-container';

        
        // Add auth container inside background container
        this.backgroundContainer.appendChild(this.loginForm);
        
        this.setResponsiveBackground();
        window.addEventListener('resize', () => this.setResponsiveBackground());
        
        this.loginForm.innerHTML = `
            <div class="character"></div>
            <!-- Login Section -->
            <div id="loginSection">
                <h2>Login to Play</h2>
                <input type="text" id="username" placeholder="Username" aria-label="Username" required>
                <input type="password" id="password" placeholder="Password" aria-label="Password" required>
                <button type="submit" id="loginBtn">Login</button>
                <p>Don't have an account? <span id="showRegister" class="link">Register here</span></p>
            </div>
            <!-- Register Section -->
            <div id="registerSection" style="display: none;">
                <h2>Register to Play</h2>
                <input type="text" id="regUsername" placeholder="Choose a username" aria-label="Username" required>
                <input type="password" id="regPassword" placeholder="Create a password" aria-label="Password" required>
                <button type="button" id="registerBtn">Register</button>
                <p>Already have an account? <span id="showLogin" class="link">Login here</span></p>
            </div>
        `;
        
        document.body.insertBefore(this.backgroundContainer, document.getElementById('start-screen'));
    }


    setResponsiveBackground() {
        if (window.innerWidth <= 768) {
            this.backgroundContainer.style.backgroundImage = "url('Frontend/assets/images/utils/auth_wallpaper_mobile.jpg')";
            this.backgroundContainer.style.backgroundColor = '#f0f0f0';
        } else {
            this.backgroundContainer.style.backgroundImage = "url('Frontend/assets/images/utils/auth_wallpaper.jpg')";
        }
    }

    hideLoginForm() {
        this.backgroundContainer.remove();
        window.removeEventListener('resize', () => this.setResponsiveBackground());
        document.getElementById('start-screen').style.display = 'flex';
        // document.getElementById('game-container').style.display = 'block';
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
}// End of UserView.js
export default UserView; 
