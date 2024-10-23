class GameController {
    constructor(gameModel, gameView) {
        this.gameModel = gameModel;
        this.gameView = gameView;
        this.gameView.comenzarJuego(this.startGame.bind(this));
    }

    init() {
        /*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 
        this.gameView.bindMoleIconClick(() => {
            console.log('El comentario del topito se está procesando...');
            const comment = this.gameModel.getRandomComment();
            this.gameView.displayComment(comment);
        });
        /*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM
        this.gameView.comenzarJuego(this.startGame.bind(this));

    }//init

/*----------------------------------------------------------------*///START GAME BUTTON
    startGame() {
        this.gameModel.resetGame();
        this.gameView.createBoard();
        this.addEventListeners();
        this.runGame();
    }//startGame
/*----------------------------------------------------------------*///START GAME BUTTON

/*___________________________________________________________________*///CREA TABLERO RANDOM HOLE
    addEventListeners() {
        this.gameView.bindMoleClick(this.handleMoleClick.bind(this));
    }//addEventListeners

    
    handleMoleClick(index) {
        if (index === this.currentMole) {
            this.gameModel.incrementScore();
            this.gameView.updateScore(this.gameModel.score);
            this.gameView.hitMole(this.currentMole);
        } else {
            this.gameModel.incrementMisses();
            this.gameView.updateMisses(this.gameModel.misses);
        }

        if (this.gameModel.isGameOver()) {
            this.endGame();
        }
    }//handleMoleClick
/*___________________________________________________________________*///CREA TABLERO RANDOM HOLE

    runGame() {
        this.gameInterval = setInterval(() => {
            this.showRandomMole();
        }, this.gameModel.gameSpeed);
    }//runGame

    showRandomMole() {
        if (this.currentMole !== null) {
            this.gameView.hideMole(this.currentMole);
        }
        this.currentMole = this.gameModel.getRandomHoleIndex();
        this.gameView.showMole(this.currentMole);
    }//showRandomMole



    endGame() {
        clearInterval(this.gameInterval);
        this.gameView.showGameOver(this.gameModel.score);
    }//endGame
}
