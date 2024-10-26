class GameView {
    constructor() {
        this.gameBoard = document.getElementById('game-board');
        this.scoreElement = document.getElementById('score-value');
        this.missesElement = document.getElementById('misses-value');


        this.startScreen = document.getElementById('start-screen');
        this.countdownElement = document.getElementById('countdown');
        this.gameContainer = document.getElementById('game-container');

        /*----------------------------------------------------------------*///START GAME BUTTON
        this.startButton = document.getElementById('start-button');
        /*----------------------------------------------------------------*///START GAME BUTTON
        /*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 
        this.moleIcon = document.getElementById('mole-icon');
        this.randomComment = document.getElementById('random-comment');
        /*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 
    }

/*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 
    bindMoleIconClick(handler) {
        this.moleIcon.addEventListener('click', handler);
    }//bindMoleIconClick

    displayComment(comment) {
        this.randomComment.textContent = comment;
        this.randomComment.style.display = 'block';
        
        setTimeout(() => {
            this.randomComment.style.display = 'none';
        }, 3000);
    }//displayComment
/*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 


/*----------------------------------------------------------------*///START GAME BUTTON
    // comenzarJuego(handler) {
    //     this.startButton.addEventListener('click', handler);
    // }
    comenzarJuego(handler) {
        this.startButton.addEventListener('click', () => {
            this.startScreen.style.display = 'none';
            this.countdownElement.style.display = 'block';
            this.startCountdown(handler);
        });
    }//comenzarJuego
/*---------------------------------------------------------------------*///START GAME BUTTON

/*____________________________________________________________________________________________*///CREA TABLERO RANDOM HOLE
    createBoard() {
        this.gameBoard.innerHTML = '';
        const holePositions = [];
        for (let i = 0; i < 8; i++) {
            const hole = document.createElement('div');
            hole.classList.add('hole');
            let left, top;
            do {
                left = Math.random() * 80;
                top = Math.random() * 80;
            } while (this.noSuperposicion(left, top, holePositions));
            
            hole.style.left = `${left}%`;
            hole.style.top = `${top}%`;
            holePositions.push({ left, top });
            
            const holeImage = document.createElement('img');
            holeImage.src = '../Frontend/assets/images/utils/Hole.png';
            holeImage.alt = 'Hole';
            hole.appendChild(holeImage);
    
            const mole = document.createElement('div');
            mole.classList.add('mole');
            hole.appendChild(mole);
            
            this.gameBoard.appendChild(hole);
        }
    }//createBoard
    noSuperposicion(left, top, positions) {
        for (let pos of positions) {
            const distance = Math.sqrt(Math.pow(left - pos.left, 2) + Math.pow(top - pos.top, 2));
            if (distance < 20) return true;
        }
        return false;
    }//noSuperposicion
/*___________________________________________________________________________________________________*///CREA TABLERO RANDOM HOLE


/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*///CUENTA ATRAS
startCountdown(handler) {
    let countdown = 3;
    this.countdownElement.textContent = countdown;
    const interval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            this.countdownElement.textContent = countdown;
        } else {
            clearInterval(interval);
            this.countdownElement.style.display = 'none';
            this.gameContainer.style.display = 'block';
            handler();
        }
    }, 1000);
}
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*///CUENTA ATRAS

//ççççççççççççççççççççççççççççççççççççççççç//RAndom Mole in raNDOM 

    // bindMoleClick(handler) {
    //     this.gameBoard.addEventListener('click', (event) => {
    //         if (event.target.classList.contains('mole')) {
    //             const index = Array.from(this.gameBoard.children).indexOf(event.target.parentElement);
    //             handler(index);
    //         }
    //     });
    // }
    bindMoleClick(handler) {
        const holes = document.querySelectorAll('.hole');
        holes.forEach((hole, index) => {
            hole.addEventListener('click', () => handler(index));
        });
    }
//ççççççççççççççççççççççççççççççççççççççççç//RAndom Mole in raNDOM 




    // showMole(index) {
    //     const mole = this.gameBoard.children[index].querySelector('.mole');
    //     mole.classList.add('visible');
    // }

    // hideMole(index) {
    //     const mole = this.gameBoard.children[index].querySelector('.mole');
    //     mole.classList.remove('visible');
    // }

    // hitMole(index) {
    //     const mole = this.gameBoard.children[index].querySelector('.mole');
    //     mole.classList.add('hit');
    //     setTimeout(() => mole.classList.remove('hit'), 200);
    // }

    // updateScore(score) {
    //     this.scoreElement.textContent = score;
    // }

    // updateMisses(misses) {
    //     this.missesElement.textContent = misses;
    // }

    // showGameOver(score) {
    //     alert(`Game Over! Your score: ${score}`);
    // }
}
