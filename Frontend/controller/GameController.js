class GameController {
    constructor(gameModel, gameView, moleAnimation) {
        this.gameModel = gameModel;
        this.gameView = gameView;
        this.moleAnimation = moleAnimation;
        this.gameView.comenzarJuego(this.startGame.bind(this));
        this.timeLevelMole = 2000; // 2 seconds default
    }

    init() {
       
        this.gameView.bindMoleIconClick(() => { /*====*///COMENTARIOS DEL TOPITO RANDOM 
            // console.log('El comentario del topito se está procesando...');
            const comment = this.gameModel.getRandomComment();
            this.gameView.displayComment(comment);
        });


        this.gameView.comenzarJuego(this.startGame.bind(this));
    }//init


//ççççççççççççççççççççççççççççççççççççççççç//RAndom Mole in raNDOM 

    addEventListeners() {
        const holes = document.querySelectorAll('.hole');
        holes.forEach(hole => {
            hole.addEventListener('click', () => {
                this.handleMoleClick(hole);
            });
        });
    }

    // showRandomMole() {
    //     const holes = document.querySelectorAll('.hole');
    //     const randomHole = holes[Math.floor(Math.random() * holes.length)];
    //     if (randomHole) {
    //         const moleAnimation = new MoleAnimation(randomHole);
    //         moleAnimation.show();
            
    //         setTimeout(() => {
    //             moleAnimation.hide();
    //         }, this.timeLevelMole);
    //     }
    // }
    showRandomMole() {
        const holes = document.querySelectorAll('.hole');
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        if (randomHole) {
            const elements = this.moleAnimation.show(randomHole);
            setTimeout(() => {
                this.moleAnimation.hide(elements);
            }, this.timeLevelMole);
        }
    }
//ççççççççççççççççççççççççççççççççççççççççç//RAndom Mole in raNDOM HOLE



/*------------*///START GAME BUTTON

    startGame() {
        this.gameModel.resetGame();
        this.gameView.createBoard();
        this.addEventListeners();
        this.runGame();
    }//startGame

/*-------------*///START GAME BUTTON

/*______________*///CREA TABLERO RANDOM HOLE

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

/*_________________________*///CREA TABLERO RANDOM HOLE

    runGame() {
        this.gameInterval = setInterval(() => {
            this.showRandomMole();
        }, this.gameModel.gameSpeed);
    }//runGame





    endGame() {
        clearInterval(this.gameInterval);
        this.gameView.showGameOver(this.gameModel.score);
    }//endGame
}
