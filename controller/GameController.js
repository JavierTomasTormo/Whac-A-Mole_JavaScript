class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentMole = null;
        this.gameInterval = null;

        this.view.createBoard(this.model.holes);
        this.addEventListeners();
        this.startGame();
    }

    addEventListeners() {
        this.view.gameBoard.addEventListener('click', (e) => {
            if (e.target.classList.contains('mole') && e.target.classList.contains('visible')) {
                this.hitMole();
            } else {
                this.missMole();
            }
        });
    }

    startGame() {
        this.gameInterval = setInterval(() => {
            this.showRandomMole();
        }, this.model.gameSpeed);
    }

    showRandomMole() {
        if (this.currentMole !== null) {
            this.view.hideMole(this.currentMole);
        }
        this.currentMole = Math.floor(Math.random() * this.model.holes);
        const isGolden = Math.random() < 0.1; // 10% chance of golden mole
        this.view.showMole(this.currentMole, isGolden);

        setTimeout(() => {
            if (this.currentMole !== null) {
                this.view.hideMole(this.currentMole);
                this.currentMole = null;
            }
        }, this.model.gameSpeed - 100);
    }

    hitMole(isGolden) {
        this.model.incrementScore(isGolden ? 5 : 1);
        this.view.updateScore(this.model.score);
        this.view.hitMole(this.currentMole);
        this.view.hideMole(this.currentMole);
        this.currentMole = null;
        this.model.increaseSpeed();
        this.restartGameInterval();
    }

    missMole() {
        this.model.incrementMisses();
        this.view.updateMisses(this.model.misses);
        if (this.model.misses >= 3) {
            this.endGame();
        }
    }

    restartGameInterval() {
        clearInterval(this.gameInterval);
        this.startGame();
    }

    endGame() {
        clearInterval(this.gameInterval);
        alert(`Game Over! Your score: ${this.model.score}`);
        this.model.resetGame();
        this.view.updateScore(this.model.score);
        this.view.updateMisses(this.model.misses);
        this.startGame();
    }
}
