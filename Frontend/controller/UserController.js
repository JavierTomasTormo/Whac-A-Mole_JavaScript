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
        // console.log(response);
            if (response.ok) {
                const data = await response.json();
                this.model.setLoginStatus(true, username, data.token);
                this.view.hideLoginForm();
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Vaya...",
                    text: "Las Credenciales no son correctas",
                    footer: "Por favor, intente nuevamente.",
                    backdrop: `
                            url("Frontend/assets/images/utils/auth_wallpaper_mobile.jpg")
                            left top
                        `
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
        window.location.reload();
    }

    // handleProfile() {
    //     const modal = document.getElementById('profile-modal');
    //     const closeButton = document.querySelector('.close-button');
    //     const currentUser = localStorage.getItem('username');

    //     document.getElementById('profile-username').textContent = currentUser;
    //     // document.getElementById('profile-score').textContent = this.model.getHighScore() || '0';
    //     // document.getElementById('profile-tickets').textContent = this.model.getTickets() || '0';
        
    //     modal.style.display = 'block';
        
    //     closeButton.onclick = () => {
    //         modal.style.display = 'none';
    //     }
        
    //     window.onclick = (event) => {
    //         if (event.target === modal) {
    //             modal.style.display = 'none';
    //         }
    //     }
    // }

    handleProfile() {
        const modal = document.getElementById('profile-modal');
        const closeButton = document.querySelector('.close-button');
        const currentUser = localStorage.getItem('username');
    
        // Basic Profile Info
        document.getElementById('profile-username').textContent = currentUser;
        document.getElementById('profile-email').textContent = `${currentUser}@whacamole.com`;
    
        // Statistics
        document.getElementById('high-score').textContent = localStorage.getItem('highScore') || '0';
        document.getElementById('total-games').textContent = localStorage.getItem('totalGames') || '0';
        document.getElementById('win-rate').textContent = localStorage.getItem('winRate') || '0%';
    
        // Load saved settings if they exist
        document.getElementById('difficulty').value = localStorage.getItem('difficulty') || 'medium';
        document.getElementById('game-speed').value = localStorage.getItem('gameSpeed') || '1';
        document.getElementById('sound-effects').checked = localStorage.getItem('soundEffects') === 'true';
        document.getElementById('background-music').checked = localStorage.getItem('backgroundMusic') === 'true';

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
                        <img src="Frontend/assets/images/avatars/avatar1.png" class="avatar-option">
                        <img src="Frontend/assets/images/avatars/avatar2.png" class="avatar-option">
                        <img src="Frontend/assets/images/avatars/avatar3.png" class="avatar-option">
                        <img src="Frontend/assets/images/avatars/avatar4.png" class="avatar-option">
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                didOpen: () => {
                    const avatarOptions = document.querySelectorAll('.avatar-option');
                    avatarOptions.forEach(avatar => {
                        avatar.addEventListener('click', () => {
                            localStorage.setItem('userAvatar', avatar.src);
                            avatarImg.src = avatar.src;
                            Swal.close();
                        });
                    });
                }
            });
        });

        // Event listeners for settings
        document.querySelector('.save-settings').addEventListener('click', () => {
            // Save all settings to localStorage
            localStorage.setItem('difficulty', document.getElementById('difficulty').value);
            localStorage.setItem('gameSpeed', document.getElementById('game-speed').value);
            localStorage.setItem('soundEffects', document.getElementById('sound-effects').checked);
            localStorage.setItem('backgroundMusic', document.getElementById('background-music').checked);
            
            Swal.fire({
                icon: "success",
                title: "¡Guardado!",
                text: "Los cambios han sido guardados exitosamente",
            });
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
                cancelButtonText: 'Cancelar'
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
                cancelButtonText: 'Cancelar'
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
    

}// End of UserController class




