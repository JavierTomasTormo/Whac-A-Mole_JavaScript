class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentMole = null;
        this.gameInterval = null;
    }

    init() {
        this.view.bindStartGame(this.startGame.bind(this));
    }

    startGame() {
        this.model.resetGame();
        this.view.createBoard();
        this.addEventListeners();
        this.runGame();
    }

    addEventListeners() {
        this.view.bindMoleClick(this.handleMoleClick.bind(this));
    }

    runGame() {
        this.gameInterval = setInterval(() => {
            this.showRandomMole();
        }, this.model.gameSpeed);
    }

    showRandomMole() {
        if (this.currentMole !== null) {
            this.view.hideMole(this.currentMole);
        }
        this.currentMole = this.model.getRandomHoleIndex();
        this.view.showMole(this.currentMole);
    }

    handleMoleClick(index) {
        if (index === this.currentMole) {
            this.model.incrementScore();
            this.view.updateScore(this.model.score);
            this.view.hitMole(this.currentMole);
        } else {
            this.model.incrementMisses();
            this.view.updateMisses(this.model.misses);
        }

        if (this.model.isGameOver()) {
            this.endGame();
        }
    }

    endGame() {
        clearInterval(this.gameInterval);
        this.view.showGameOver(this.model.score);
    }
}
