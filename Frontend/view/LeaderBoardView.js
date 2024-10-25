class LeaderboardView {
    constructor() {
        this.leaderboardElement = document.createElement('div');
        this.leaderboardElement.id = 'leaderboard';
        document.body.appendChild(this.leaderboardElement);
    }

    updateLeaderboard(scores) {
        this.leaderboardElement.innerHTML = `
            <h2>Leaderboard</h2>
            <ol>
                ${scores.map(score => `<li>${score.username}: ${score.score}</li>`).join('')}
            </ol>
        `;
    }
}
