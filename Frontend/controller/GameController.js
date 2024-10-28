class GameController {
    constructor(gameModel, gameView, moleAnimation) {
        this.gameModel = gameModel;
        this.gameView = gameView;
        this.moleAnimation = moleAnimation;
        this.gameView.comenzarJuego(this.startGame.bind(this));
        this.timeLevelMole = 2000;
        this.gameInterval = null;
        this.isProcessing = false;
    }

    init() {
        this.gameView.bindMoleIconClick(() => { /*====*///COMENTARIOS DEL TOPITO RANDOM 
            const comment = this.gameModel.getRandomComment();
            this.gameView.displayComment(comment);
        });/*====*///COMENTARIOS DEL TOPITO RANDOM 
        this.gameView.comenzarJuego(this.startGame.bind(this));//START GAME BUTTON
    }//init


//••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••//RAndom Mole in raNDOM 

    addEventListeners() {
        const holes = document.querySelectorAll('.hole');
        holes.forEach(hole => {
            hole.addEventListener('click', (event) => {
                if (event.target.classList.contains('mole')) {
                    this.handleMoleClick(hole);
                }
            });
        });
    }

    showRandomMole() {
        if (this.isProcessing || this.gameModel.isGameOver()) return;
        
        this.isProcessing = true;
        const holes = document.querySelectorAll('.hole');
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        
        if (randomHole) {
            const elements = this.moleAnimation.show(randomHole);
            if (elements) {
                let moleClicked = false;
                
                elements.mole.addEventListener('click', () => {
                    if (!moleClicked) {
                        moleClicked = true;
                        this.gameModel.incrementScore();
                        this.gameView.updateScore(this.gameModel.score);
                        this.gameView.updateTickets(this.gameModel.incrementTickets());

                        this.moleAnimation.hide(elements);
                    }
                });

                setTimeout(() => {
                    if (!moleClicked) {
                        this.gameModel.incrementMisses();
                        this.gameView.updateMisses(this.gameModel.misses);
                        if (this.gameModel.isGameOver()) {
                            this.endGame();
                            return;
                        }
                    }
                    this.moleAnimation.hide(elements);
                    this.isProcessing = false;
                }, this.timeLevelMole);
            }
        }
    }
//••••••••••••••••••••••••••••••••••••••••••••••••••••••••••//RAndom Mole in raNDOM HOLE



/*╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚*///START GAME BUTTON

    startGame() {
        this.gameModel.resetGame();
        this.gameView.createBoard();
        this.runGame();
    }//startGame
/*╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚╚*///START GAME BUTTON

runGame() {
    this.gameInterval = setInterval(() => {
        if (!this.isProcessing) {
            this.showRandomMole();
        }
    }, 100);
}


    endGame() {
        clearInterval(this.gameInterval);
        this.gameView.showGameOver(this.gameModel.score, this.gameModel.misses);
    }
}
