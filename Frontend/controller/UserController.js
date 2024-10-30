class UserController {
    constructor(userModel, userView) {
        this.model = userModel;
        this.view = userView;
        this.init();
        this.setupLogoutAndProfile();

    }

    init() {
        if (!this.model.checkLoginStatus()) {
            this.view.showLoginForm();
            this.setupEventListeners();
        } else {
            this.view.hideLoginForm();
        }
    }
    setupLogoutAndProfile() {
        const logoutBtn = document.getElementById('logout-button');
        const profileBtn = document.getElementById('profile-button');

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }
        
        if (profileBtn) {
            profileBtn.addEventListener('click', () => this.handleProfile());
        }
    }

    setupEventListeners() {
        const loginBtn = document.getElementById('loginBtn');
        const registerBtn = document.getElementById('registerBtn');
    
        const handleKeyPress = (e, handler) => {
            if (e.key === 'Enter' || e.keyCode === 13) {
                e.preventDefault();
                handler();
            }
        };
    
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    
        loginBtn.addEventListener('keydown', (e) => handleKeyPress(e, this.handleLogin.bind(this)));
    
        registerBtn.addEventListener('click', () => {
            this.handleRegister();
        });
    
        registerBtn.addEventListener('keydown', (e) => handleKeyPress(e, this.handleRegister.bind(this)));
    
        document.getElementById('showRegister').addEventListener('click', () => {
            this.view.showRegisterSection();
        });
    
        document.getElementById('showRegister').addEventListener('keydown', (e) => handleKeyPress(e,
            this.view.showRegisterSection.bind(this.view)
        ));
    
        document.getElementById('showLogin').addEventListener('click', () => {
            this.view.showLoginSection();
        });
    
        document.getElementById('showLogin').addEventListener('keydown', (e) => handleKeyPress(e,
            this.view.showLoginSection.bind(this.view)
        ));
    }






    async handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        try {
            const response = await fetch('http://localhost:3002/users/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    user: {
                        username: username,
                        password: password
                    }
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                this.model.setLoginStatus(true, username, data.user.token);

                console.log(data.user);
                
                localStorage.setItem('highScore', data.user.highScore || '0');
                localStorage.setItem('totalGames', data.user.totalGamesPlayed || '0');
                localStorage.setItem('totalMolesWhacked', data.user.totalMolesWhacked || '0'); 
                localStorage.setItem('ticketsEarned', data.user.ticketsEarned || '0');
                localStorage.setItem('userAvatar', data.user.avatar || 'Frontend/assets/images/Moles/GoldenHelmetMole_RMBG.png');
                localStorage.setItem('userEmail', data.user.email); 
                localStorage.setItem('soundEffects', data.user.gameSettings.soundEnabled);
                localStorage.setItem('musicEnabled', data.user.gameSettings.musicEnabled);
                localStorage.setItem('difficulty', data.user.gameSettings.difficulty);
                localStorage.setItem('gameSpeed', data.user.gameSettings.gameSpeed);
                // console.log(data.user.gameSettings);

                this.view.hideLoginForm();
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Vaya...",
                    text: "El Login ha fallado",
                    footer: "Por favor, intentelo mas tarde",
                });
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }


    async handleRegister() {
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;

        const email = username + "@whacamole.com";

        try {
            const response = await fetch('http://localhost:3002/users/register', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    user: {
                        username: username,
                        password: password,
                        email: email
                    }
                })
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Bienvenido...",
                    text: "El Registro ha sido exitoso",
                    footer: "Por Favor Inicia Sesion",
                });
                this.view.showLoginSection();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Vaya...",
                    text: "El Registro ha fallado",
                    footer: "Por favor, inténtelo mas tarde",
                });
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    }




    handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('highScore');
        localStorage.removeItem('totalGames');
        localStorage.removeItem('totalMolesWhacked');
        localStorage.removeItem('ticketsEarned');
        localStorage.removeItem('userAvatar');
        localStorage.removeItem('difficulty');
        localStorage.removeItem('gameSpeed');
        localStorage.removeItem('soundEffects');
        localStorage.removeItem('musicEnabled');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('gameSpeed');
        window.location.reload();
    }

    handleProfile() {
        const modal = document.getElementById('profile-modal');
        const closeButton = document.querySelector('.close-button');
        const currentUser = localStorage.getItem('username');
        const userEmail = localStorage.getItem('userEmail');

    
        // Basic Profile Info
        document.getElementById('profile-username').textContent = currentUser;
        document.getElementById('profile-email').textContent = userEmail || `${currentUser}@whacamole.com`;
    
        // Statistics
        document.getElementById('high-score').textContent = localStorage.getItem('highScore') + "   📊" || '0   📊';
        document.getElementById('total-games').textContent = localStorage.getItem('totalGames') + " 👾" || '0   👾';
        document.getElementById('mole-whack').textContent = localStorage.getItem('totalMolesWhacked') + "   🎯" || '0   🎯';
        document.getElementById('tickets-earned').textContent = localStorage.getItem('ticketsEarned') + "   💰" || '0   💰';
    
        // Load saved settings if they exist
        document.getElementById('difficulty').value = localStorage.getItem('difficulty') || 'medium';
        document.getElementById('game-speed').value = localStorage.getItem('gameSpeed') || '5';
        document.getElementById('sound-effects').checked = localStorage.getItem('soundEffects') === 'true';
        document.getElementById('background-music').checked = localStorage.getItem('musicEnabled') === 'true';

        // Avatar handling
        const avatarImg = document.querySelector('.profile-avatar img');
        const storedAvatar = localStorage.getItem('userAvatar') || 'Frontend/assets/images/Moles/GoldenHelmetMole_RMBG.png';
        avatarImg.src = storedAvatar;
    

        // Make avatar clickable for updates
        avatarImg.style.cursor = 'pointer';
        avatarImg.addEventListener('click', () => {
            Swal.fire({
                title: 'Selecciona un Avatar',
                html: `
                    <div class="avatar-selection">
                        <img src="Frontend/assets/images/Moles/Moles_7.png" class="avatar-option">
                        <img src="Frontend/assets/images/Moles/Moles_3.png" class="avatar-option">
                        <img src="Frontend/assets/images/Moles/Moles_6.png" class="avatar-option">
                        <img src="Frontend/assets/images/Moles/GoldenHelmetMole_RMBG.png" class="avatar-option">
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                didOpen: () => {
                    const sweetAlertContainer = document.querySelector('.swal2-container');
                    sweetAlertContainer.style.zIndex = '100000';
                    const avatarOptions = document.querySelectorAll('.avatar-option');
                    avatarOptions.forEach(avatar => {
                        avatar.addEventListener('click', async () => {
                            try {
                                const response = await fetch('http://localhost:3002/users/update', {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    },
                                    body: JSON.stringify({
                                        user: {
                                            avatar: avatar.src
                                        }
                                    })
                                });
        
                                if (response.ok) {
                                    localStorage.setItem('userAvatar', avatar.src);
                                    avatarImg.src = avatar.src;
                                    await this.updateUserStats(); // Reuse existing method
                                    Swal.close();
                                }
                            } catch (error) {
                                console.error('Error updating avatar:', error);
                            }
                        });
                    });
                }
            });
        });

        // Event listeners for settings
        document.querySelector('.save-settings').addEventListener('click', async () => {
            const settings = {
                difficulty: document.getElementById('difficulty').value,
                gameSpeed: document.getElementById('game-speed').value,
                soundEnabled: document.getElementById('sound-effects').checked,
                musicEnabled: document.getElementById('background-music').checked
            };
        
            try {
                const token = localStorage.getItem('token');
                // console.log(token);
                const response = await fetch('http://localhost:3002/user/settings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}` 
                    },
                    body: JSON.stringify({ gameSettings: settings })
                });
        
                if (response.ok) {
                    localStorage.setItem('difficulty', settings.difficulty);
                    localStorage.setItem('gameSpeed', settings.gameSpeed);
                    localStorage.setItem('soundEffects', settings.soundEnabled);
                    localStorage.setItem('musicEnabled', settings.musicEnabled);
                    await this.updateUserStats();

        
                    Swal.fire({
                        icon: "success",
                        title: "¡Guardado!",
                        text: "Los cambios han sido guardados exitosamente",
                        didOpen: () => {
                            const sweetAlertContainer = document.querySelector('.swal2-container');
                            sweetAlertContainer.style.zIndex = '100000';
                        }
                    });
                } else {
                    throw new Error('Failed to save settings');
                }
            } catch (error) {
                console.error('Error saving settings:', error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "No se pudieron guardar los cambios",
                    didOpen: () => {
                        const sweetAlertContainer = document.querySelector('.swal2-container');
                        sweetAlertContainer.style.zIndex = '100000';
                    }
                });
            }
        });
        
    
        // Account settings buttons
        document.getElementById('change-password').addEventListener('click', () => {
            Swal.fire({
                title: 'Cambiar Contraseña',
                html: `
                    <input type="password" id="current-password" class="swal2-input" placeholder="Contraseña Actual">
                    <input type="password" id="new-password" class="swal2-input" placeholder="Nueva Contraseña">
                    <input type="password" id="confirm-password" class="swal2-input" placeholder="Confirmar Contraseña">
                `,
                showCancelButton: true,
                confirmButtonText: 'Cambiar',
                cancelButtonText: 'Cancelar',
                didOpen: () => {
                    const sweetAlertContainer = document.querySelector('.swal2-container');
                    sweetAlertContainer.style.zIndex = '100000';
                }
            });
        });
    
        document.getElementById('edit-profile').addEventListener('click', () => {
            Swal.fire({
                title: 'Editar Perfil',
                html: `
                    <input type="text" id="edit-username" class="swal2-input" placeholder="Nombre de Usuario" value="${currentUser}">
                    <input type="email" id="edit-email" class="swal2-input" placeholder="Email" value="${currentUser}@whacamole.com">
                `,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                didOpen: () => {
                    const sweetAlertContainer = document.querySelector('.swal2-container');
                    sweetAlertContainer.style.zIndex = '100000';
                }
            });
        });
    
        // Show modal and setup close handlers
        modal.style.display = 'block';
        
        closeButton.onclick = () => {
            modal.style.display = 'none';
        }
        
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        }
    }
    




    async updateUserStats() {
        try {
            const response = await fetch('http://localhost:3002/users/profile', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                
                // Update statistics in localStorage
                localStorage.setItem('highScore', data.user.highScore || '0');
                localStorage.setItem('totalGames', data.user.totalGamesPlayed || '0');
                localStorage.setItem('totalMolesWhacked', data.user.totalMolesWhacked || '0');
                
                // Update displayed statistics if profile modal is open
                const profileModal = document.getElementById('profile-modal');
                if (profileModal && profileModal.style.display === 'block') {
                    document.getElementById('high-score').textContent = data.user.highScore || '0';
                    document.getElementById('total-games').textContent = data.user.totalGamesPlayed || '0';
                    document.getElementById('mole-whack').textContent = data.user.totalMolesWhacked || '0';
                }
            }
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }



}// End of UserController class






