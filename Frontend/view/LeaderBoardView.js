// import Swal from 'sweetalert2';

class LeaderboardView {
    constructor() {
        this.leaderboardElement = document.createElement('div');
        this.leaderboardElement.id = 'leaderboard';
        document.body.appendChild(this.leaderboardElement);
    }

    updateLeaderboard(users) {
        if (!Array.isArray(users)) {
            console.error('Expected an array of users, but got:', users);
            return;
        }

        // const highScoreList = users.slice().sort((a, b) => b.highScore - a.highScore).slice(0, 3).map(user => `<li>${user.username}: ${user.highScore}</li>`).join('');
        // const totalGamesList = users.slice().sort((a, b) => b.totalGamesPlayed - a.totalGamesPlayed).slice(0, 3).map(user => `<li>${user.username}: ${user.totalGamesPlayed}</li>`).join('');
        // const totalMolesList = users.slice().sort((a, b) => b.totalMolesWhacked - a.totalMolesWhacked).slice(0, 3).map(user => `<li>${user.username}: ${user.totalMolesWhacked}</li>`).join('');

        const highScoreList = users.slice()
            .sort((a, b) => b.highScore - a.highScore)
            .slice(0, 3)
            .map(user => `<li>
                <img src="${user.avatar || 'default-avatar.png'}" class="user-avatar" alt="${user.username}'s avatar">
                <span class="profile-link" data-user='${JSON.stringify(user).replace(/"/g, '&quot;')}'>${user.username}</span>: ${user.highScore}
            </li>`).join('');

        const totalGamesList = users.slice()
            .sort((a, b) => b.totalGamesPlayed - a.totalGamesPlayed)
            .slice(0, 3)
            .map(user => `<li>
                <img src="${user.avatar || 'default-avatar.png'}" class="user-avatar" alt="${user.username}'s avatar">
                <span class="profile-link" data-user='${JSON.stringify(user).replace(/"/g, '&quot;')}'>${user.username}</span>: ${user.totalGamesPlayed}
            </li>`).join('');

        const totalMolesList = users.slice()
            .sort((a, b) => b.totalMolesWhacked - a.totalMolesWhacked)
            .slice(0, 3)
            .map(user => `<li>
                <img src="${user.avatar || 'default-avatar.png'}" class="user-avatar" alt="${user.username}'s avatar">
                <span class="profile-link" data-user='${JSON.stringify(user).replace(/"/g, '&quot;')}'>${user.username}</span>: ${user.totalMolesWhacked}
            </li>`).join('');



        this.leaderboardElement.innerHTML = `
            <button id="close-leaderboard" class="close-button">✖</button>
            <h2>Leaderboard</h2>
            <div>
                <h3>High Scores</h3>
                <ol>${highScoreList}</ol>
            </div>
            <div>
                <h3>Total Games Played</h3>
                <ol>${totalGamesList}</ol>
            </div>
            <div>
                <h3>Total Moles Whacked</h3>
                <ol>${totalMolesList}</ol>
            </div>
        `;

        document.getElementById('close-leaderboard').addEventListener('click', () => {
            this.leaderboardElement.remove();
        });

        this.leaderboardElement.querySelectorAll('.profile-link').forEach(link => {
            link.addEventListener('click', (event) => {
                const user = JSON.parse(event.target.getAttribute('data-user'));
                this.showUserProfile(user);
            });
        });
    }


    showUserProfile(user) {
        const achievements = user.achievements || [];
        const achievementsHtml = achievements.map(achievement => `
            <div class="achievement">
                <img src="${achievement.icon}" alt="${achievement.name}" class="achievement-icon">
                <div class="achievement-info">
                    <h4>${achievement.name}</h4>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `).join('');

        Swal.fire({
            title: `${user.username}'s Profile`,
            html: `
                <div class="profile-modal">
                    <img src="${user.avatar || 'default-avatar.png'}" class="user-avatar-large" alt="${user.username}'s avatar">
                    <p><strong>High Score:</strong> ${user.highScore}</p>
                    <p><strong>Total Games Played:</strong> ${user.totalGamesPlayed}</p>
                    <p><strong>Total Moles Whacked:</strong> ${user.totalMolesWhacked}</p>
                    <h3>Achievements</h3>
                    <div class="achievements-container">
                        ${achievementsHtml}
                    </div>
                </div>
            `,
            width: '600px',
            background: 'linear-gradient(145deg, #2c2c2c, #4a4a4a)',
            backdrop: 'rgba(0,0,0,0.99)',
            showCloseButton: true,
            closeButtonHtml: '✖',
            customClass: {
                popup: 'profile-modal-popup',
                closeButton: 'custom-close-button'
            }
        });
    }
    // showUserProfile(user) {
    //     Swal.fire({
    //         title: `${user.username}'s Profile`,
    //         html: `
    //             <div class="profile-modal_leaderboard">
    //                 <img src="${user.avatar || 'default-avatar.png'}" class="user-avatar-large_leaderboard" alt="${user.username}'s avatar">
    //                 <p><strong>High Score:</strong> ${user.highScore}</p>
    //                 <p><strong>Total Games Played:</strong> ${user.totalGamesPlayed}</p>
    //                 <p><strong>Total Moles Whacked:</strong> ${user.totalMolesWhacked}</p>
    //             </div>
    //         `,
    //         width: '400px',
    //         background: 'linear-gradient(145deg, #2c2c2c, #4a4a4a)',
    //         backdrop: 'rgba(0,0,0,0.99)',
    //         showCloseButton: true,
    //         closeButtonHtml: '✖',
    //         customClass: {
    //             popup: 'profile-modal-popup_leaderboard',
    //             closeButton: 'custom-close-button_leaderboard'
    //         }
    //     });
    // }
    
}

export default LeaderboardView;