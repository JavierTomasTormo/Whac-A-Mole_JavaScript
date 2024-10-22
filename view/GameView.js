class GameView {
    constructor() {
        this.gameBoard = document.getElementById('game-board');
        this.scoreElement = document.getElementById('score-value');
        this.missesElement = document.getElementById('misses-value');
        this.startButton = document.getElementById('start-button');
    }

    bindStartGame(handler) {
        this.startButton.addEventListener('click', handler);
    }

    createBoard() {
        this.gameBoard.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const hole = document.createElement('div');
            hole.classList.add('hole');
            hole.style.left = `${Math.random() * 80}%`;
            hole.style.top = `${Math.random() * 80}%`;
            
            const holeImage = document.createElement('img');
            holeImage.src = 'Hole.jpg';
            holeImage.alt = 'Hole';
            hole.appendChild(holeImage);

            const mole = document.createElement('div');
            mole.classList.add('mole');
            hole.appendChild(mole);
            
            this.gameBoard.appendChild(hole);
        }
    }

    // bindMoleClick(handler) {
    //     this.gameBoard.addEventListener('click', (event) => {
    //         if (event.target.classList.contains('mole')) {
    //             const index = Array.from(this.gameBoard.children).indexOf(event.target.parentElement);
    //             handler(index);
    //         }
    //     });
    // }

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
