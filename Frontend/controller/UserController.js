// class UserController {
//     constructor(userModel, userView) {
//         this.model = userModel;
//         this.view = userView;
//         this.init();
//     }

//     init() {
//         this.view.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
//         document.getElementById('showRegister').addEventListener('click', () => this.view.showRegisterSection());
//         document.getElementById('showLogin').addEventListener('click', () => this.view.showLoginSection());
//         document.getElementById('registerBtn').addEventListener('click', () => this.handleRegister());
        
//         // Check if user is already logged in
//         const token = localStorage.getItem('token');
//         if (token) {
//             this.validateToken(token);
//         }
//     }

//     async handleLogin(e) {
//         e.preventDefault();
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

//         try {
//             const response = await fetch('/api/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, password })
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 this.model.setLoginStatus(true, username, data.token);
//                 this.view.hideLoginForm();
//             } else {
//                 alert('Invalid credentials');
//             }
//         } catch (error) {
//             alert('Error during login');
//         }
//     }

//     async handleRegister() {
//         const username = document.getElementById('regUsername').value;
//         const password = document.getElementById('regPassword').value;

//         try {
//             const response = await fetch('/api/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, password })
//             });

//             if (response.ok) {
//                 alert('Registration successful! Please login.');
//                 this.view.showLoginSection();
//             } else {
//                 alert('Registration failed');
//             }
//         } catch (error) {
//             alert('Error during registration');
//         }
//     }

//     async validateToken(token) {
//         // Add token validation logic here
//         // If token is valid, hide login form and show game
//         this.view.hideLoginForm();
//     }
// }

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
        document.getElementById('loginBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('registerBtn').addEventListener('click', () => {
            this.handleRegister();
        });

        document.getElementById('showRegister').addEventListener('click', () => {
            this.view.showRegisterSection();
        });

        document.getElementById('showLogin').addEventListener('click', () => {
            this.view.showLoginSection();
        });
    }

    async handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                this.model.setLoginStatus(true, username, data.token);
                this.view.hideLoginForm();
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    }

    async handleRegister() {
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                alert('Registration successful! Please login.');
                this.view.showLoginSection();
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    }
}
