class UserRequestsService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async registerUser(username, password, email) {
        const response = await fetch(`${this.baseURL}/users/register`, {
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
        return response;
    }

    async loginUser(username, password) {
        const response = await fetch(`${this.baseURL}/users/login`, {
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
        return response;
    }

    async updateUserAvatar(avatarSrc) {
        const response = await fetch(`${this.baseURL}/users/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                user: {
                    avatar: avatarSrc
                }
            })
        });
        return response;
    }

    async updateUserSettings(token, settings) {
        const response = await fetch(`${this.baseURL}/user/settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            body: JSON.stringify({ gameSettings: settings })
        });
        return response;
    }

    async updateUserPassword(currentPassword, newPassword) {
        const response = await fetch(`${this.baseURL}/users/update-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                user: {
                    currentPassword: currentPassword,
                    password: newPassword
                }
            })
        });

        return response;
    }

    async updateUserDetails(newUsername, newEmail) {
        const response = await fetch(`${this.baseURL}/users/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                user: {
                    username: newUsername,
                    email: newEmail
                }
            })
        });

        return response;
    }

    async getUserProfile() {
        const response = await fetch(`${this.baseURL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response;
    }

    async updateUserStats(totalMolesWhacked, currentTickets, score) {
        const response = await fetch(`${this.baseURL}/user/stats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                totalMolesWhacked: totalMolesWhacked,
                ticketsEarned: currentTickets,
                highScore: score
            })
        });
        return response;
    }

    async updateUserSkin(skinUrl) {
        const response = await fetch(`${this.baseURL}/user/updateSkin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ skin: skinUrl })
        });
        return response;
    }


    async getUserSkins() {
        const response = await fetch(`${this.baseURL}/users/profile`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response;
    }


    async purchaseSkin(skinUrl, price) {
        const response = await fetch(`${this.baseURL}/user/purchaseSkin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                skinUrl,
                price
            })
        });
        return response;
    }    
    
}

const userRequestsService = new UserRequestsService('http://localhost:3002');
export default userRequestsService;