class GameModel {
    constructor() {
        this.score = 0;
        this.misses = 0;
        this.gameSpeed = 1000;
        this.maxMisses = 3;
    }

    resetGame() {
        this.score = 0;
        this.misses = 0;
    }

    incrementScore() {
        this.score++;
    }

    incrementMisses() {
        this.misses++;
    }

    isGameOver() {
        return this.misses >= this.maxMisses;
    }

    getRandomHoleIndex() {
        return Math.floor(Math.random() * 5);
    }
}
