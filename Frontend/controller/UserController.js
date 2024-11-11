import shopRequestsService from '../services/shop.requests.service.js';
import userRequestsService from '../services/user.requests.service.js';

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
        const showRegister = document.getElementById('showRegister');
        const showLogin = document.getElementById('showLogin');
    
        // Asocia los clics a las funciones
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    
        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleRegister();
        });
    
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            this.view.showRegisterSection();
        });
    
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            this.view.showLoginSection();
        });
    }

    async handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        try {
            const response = await userRequestsService.loginUser(username, password);

            // console.log(response);

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
                localStorage.setItem('selectedSkin', data.user.selectedSkin);
                localStorage.setItem('skins', JSON.stringify(data.user.skins));
                // console.log(data.user.skins);
                // console.log(JSON.parse(localStorage.getItem('skins')));                
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
            const response = await userRequestsService.registerUser(username, password, email);

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
        localStorage.removeItem('selectedSkin');
        localStorage.removeItem('skins');
        localStorage.removeItem('backgroundMusic');
        localStorage.removeItem('newTotalticketsEarned');
        localStorage.removeItem('totalmolesWhacked');
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
        
        // console.log(this.model.getSelectedSkin());
        // document.getElementById('selected-skin-imagen').value = this.model.getSelectedSkin();
        // console.log(this.model.getSelectedSkin());
        const selectedSkinElement = document.getElementById('selected-skin-image');
        if (selectedSkinElement) {
            selectedSkinElement.src = this.model.getSelectedSkin();
            // console.log(selectedSkinElement.src);
        } else {
            console.error('Element with ID "selected-skin" not found.');
        }



        // Avatar handling
        const avatarImg = document.querySelector('.profile-avatar img');
        const storedAvatar = localStorage.getItem('userAvatar') || 'Frontend/assets/images/Moles/GoldenHelmetMole_RMBG.png';
        avatarImg.src = storedAvatar;

        avatarImg.style.cursor = 'pointer';
        avatarImg.addEventListener('click', () => {
            Swal.fire({
                title: 'Selecciona un Avatar',
                html: `
                    <div class="avatar-selection">
                        <img src="Frontend/assets/images/Moles/Moles_7.png" class="avatar-option">
                        <img src="Frontend/assets/images/Moles/Moles_8.png" class="avatar-option">
                        <img src="Frontend/assets/images/Moles/Moles_9.png" class="avatar-option">
                        <img src="Frontend/assets/images/Moles/Moles_12.png" class="avatar-option">
                        <img src="Frontend/assets/images/Moles/Moles_10.png" class="avatar-option">
                        <img src="Frontend/assets/images/Moles/Moles_11.png" class="avatar-option">

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
                                const response = await userRequestsService.updateUserAvatar(avatar.src);

                                if (response.ok) {
                                    localStorage.setItem('userAvatar', avatar.src);
                                    avatarImg.src = avatar.src;
                                    await this.updateUserStats();
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

        document.querySelector('.save-settings').addEventListener('click', async () => {
            const settings = {
                difficulty: document.getElementById('difficulty').value,
                gameSpeed: document.getElementById('game-speed').value,
                soundEnabled: document.getElementById('sound-effects').checked,
                musicEnabled: document.getElementById('background-music').checked
            };

            try {
                const token = localStorage.getItem('token');
                const response = await userRequestsService.updateUserSettings(token, settings);

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

                    setTimeout(() => {
                        // this.handleLogout();
                        window.location.reload();
                    }, 1000);
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
                preConfirm: async () => {
                    const currentPassword = document.getElementById('current-password').value;
                    const newPassword = document.getElementById('new-password').value;
                    const confirmPassword = document.getElementById('confirm-password').value;
        
                    if (newPassword !== confirmPassword) {
                        Swal.showValidationMessage('Las contraseñas no coinciden');
                        return false;
                    }
        
                    try {
                        const response = await userRequestsService.updateUserPassword(currentPassword, newPassword);
        
                        if (!response.ok) {
                            throw new Error('Contraseña actual incorrecta');
                        }
        
                        return true;
                    } catch (error) {
                        Swal.showValidationMessage(error.message);
                        return false;
                    }
                },
                didOpen: () => {
                    const sweetAlertContainer = document.querySelector('.swal2-container');
                    sweetAlertContainer.style.zIndex = '100000';
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'Contraseña actualizada correctamente'
                    });
                    this.handleLogout();
                }
            });
        });
        
    
        document.getElementById('edit-profile').addEventListener('click', () => {
            Swal.fire({
                title: 'Editar Perfil',
                html: `
                    <input type="text" id="edit-username" class="swal2-input" placeholder="Nombre de Usuario" value="${currentUser}" required>
                    <input type="email" id="edit-email" class="swal2-input" placeholder="Email" value="${userEmail}" required>
                `,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                preConfirm: async () => {
                    const newUsername = document.getElementById('edit-username').value;
                    const newEmail = document.getElementById('edit-email').value;
        
                    try {
                        const response = await userRequestsService.updateUserDetails(newUsername, newEmail);

                        if (!response.ok) {
                            throw new Error('Error al actualizar el perfil');
                        }
                        localStorage.setItem('username', newUsername);
                        localStorage.setItem('userEmail', newEmail);
                        await this.updateUserStats();
                        return true;
                    } catch (error) {
                        Swal.showValidationMessage(error.message);
                        return false;
                    }
                },
                didOpen: () => {
                    const sweetAlertContainer = document.querySelector('.swal2-container');
                    sweetAlertContainer.style.zIndex = '100000';
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'Perfil actualizado correctamente',
                        didOpen: () => {
                            const sweetAlertContainer = document.querySelector('.swal2-container');
                            sweetAlertContainer.style.zIndex = '100000';
                        }
                    }).then(() => {
                        setTimeout(() =>{this.handleLogout();});
                    });                
                }
            });
        });
    
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
            const response = await userRequestsService.getUserProfile();

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


                                                                                                                                //
                                                                                                                                //
}// End of UserController class


window.handleLogout = () => {
    const userModel = new UserModel();
    const userView = new UserView();
    const userController = new UserController(userModel, userView);
    userController.handleLogout();
};
export default UserController;





