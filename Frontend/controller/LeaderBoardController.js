import userRequestsService from '../services/user.requests.service.js';
import LeaderboardView from '../view/LeaderBoardView.js';

class LeaderboardController {
    constructor() {
        this.view = new LeaderboardView();
    }

    async loadLeaderboard() {
        try {
            const data = await userRequestsService.getAllUsers();
            this.view.updateLeaderboard(data.users);
        } catch (error) {
            console.error('Error loading leaderboard:', error);
        }
    }
}

export default LeaderboardController;