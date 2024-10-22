class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.currentMole = null;
        this.gameInterval = null;
    }

    init() {
        this.view.comenzarJuego(this.startGame.bind(this));

        /*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 
        this.view.bindMoleIconClick(() => {
            const comment = this.model.getRandomComment();
            this.view.displayComment(comment);
        });
        /*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 
    }//init

/*----------------------------------------------------------------*///START GAME BUTTON
    startGame() {
        this.model.resetGame();
        this.view.createBoard();
        this.addEventListeners();
        this.runGame();
    }
/*----------------------------------------------------------------*///START GAME BUTTON

/*___________________________________________________________________*///CREA TABLERO RANDOM HOLE
    addEventListeners() {
        this.view.bindMoleClick(this.handleMoleClick.bind(this));
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
/*___________________________________________________________________*///CREA TABLERO RANDOM HOLE

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



    endGame() {
        clearInterval(this.gameInterval);
        this.view.showGameOver(this.model.score);
    }
}
