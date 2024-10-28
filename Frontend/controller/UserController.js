class UserController {
    constructor(userModel, userView) {
        this.model = userModel;
        this.view = userView;
        this.init();
    }

    init() {
        if (!this.model.checkLoginStatus()) {
            this.view.showLoginForm();
            this.setupEventListeners();
        } else {
            this.view.hideLoginForm();
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
            const response = await fetch('/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                this.model.setLoginStatus(true, username, data.token);
                this.view.hideLoginForm();
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

        try {
            const response = await fetch('/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
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
}
