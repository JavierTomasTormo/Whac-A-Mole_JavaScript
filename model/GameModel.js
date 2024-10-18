class GameModel {
    constructor() {
        this.score = 0;
        this.misses = 0;
        this.gameSpeed = 1000;
        this.holes = 9;
        this.tickets = 0;
        this.prizePot = 1000;
        this.prizeThreshold = 100;
    }

    incrementScore() {
        this.score++;
    }

    incrementMisses() {
        this.misses++;
    }

    increaseSpeed() {
        this.gameSpeed = Math.max(300, this.gameSpeed - 50);
    }

    resetGame() {
        this.score = 0;
        this.misses = 0;
        this.gameSpeed = 1000;
    }

    calculateTickets() {
        this.tickets = Math.floor(this.score / 10);
    }

    checkPrizePot() {
        if (this.score >= this.prizeThreshold) {
            const wonPrize = this.prizePot;
            this.prizePot = 1000;
            this.prizeThreshold += 50;
            return wonPrize;
        }
        return 0;
    }
}
