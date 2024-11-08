class GameController {
        constructor(gameModel, gameView, moleAnimation, userModel) {

            this.userModel = userModel;
            this.body = document.querySelector('body');
            window.addEventListener('resize', () => this.setResponsiveBackgroundGame());
            this.setResponsiveBackgroundGame();



            this.gameModel = gameModel;
            this.gameView = gameView;
            this.moleAnimation = moleAnimation;
            this.gameView.comenzarJuego(this.startGame.bind(this));

            this.timeLevelMole = this.getTimeLevel();//2000        
            
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

        getTimeLevel() {
            const levelTime = localStorage.getItem('gameSpeed');

            if (!levelTime) return 2000; // Default speed
            
            switch (parseInt(levelTime)) {
                case 1: return 3000;
                case 2: return 2800;
                case 3: return 2600;
                case 4: return 2400;
                case 5: return 2200;
                case 6: return 2000;
                case 7: return 1800;
                case 8: return 1600;
                case 9: return 1400;
                case 10: return 1200;
                default: return 2000;
            }
        };


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
                            const comment = this.gameModel.getRandomComment();
                            this.gameView.displayComment(comment);
                        }
                        this.moleAnimation.hide(elements);
                        this.isProcessing = false;
                    }, this.timeLevelMole);
                }
            }
        }
    //••••••••••••••••••••••••••••••••••••••••••••••••••••••••••//RAndom Mole in raNDOM HOLE
    setResponsiveBackgroundGame() {
        const selectedSkin = this.userModel.getSelectedSkin(); 
        const mobileSuffix = '_Mobile';
        const extensionIndex = selectedSkin.lastIndexOf('.');
    
        let mobileSkin = selectedSkin.slice(0, extensionIndex) + mobileSuffix + selectedSkin.slice(extensionIndex);

        // console.log(mobileSkin);
        // console.log(selectedSkin);

        
        if (window.innerWidth <= 768) {
            this.body.style.backgroundImage = `url('${mobileSkin}')`;
            this.body.style.backgroundColor = '#f0f0f0';
        } else {
            this.body.style.backgroundImage = `url('${selectedSkin}')`;
        }    }


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



}//GameController
export default GameController; 