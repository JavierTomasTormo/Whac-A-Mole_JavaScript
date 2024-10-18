class GameView {
    constructor() {
        this.gameBoard = document.getElementById('game-board');
        this.scoreElement = document.getElementById('score-value');
        this.missesElement = document.getElementById('misses-value');
    }

    createBoard(holes) {
        this.gameBoard.innerHTML = '';
        for (let i = 0; i < holes; i++) {
            const hole = document.createElement('div');
            hole.classList.add('hole');
            const mole = document.createElement('div');
            mole.classList.add('mole');
            hole.appendChild(mole);
            this.gameBoard.appendChild(hole);
        }
    }

    updateScore(score) {
        this.scoreElement.textContent = score;
    }

    updateMisses(misses) {
        this.missesElement.textContent = misses;
    }

    // showMole(index) {
    //     const moles = this.gameBoard.querySelectorAll('.mole');
    //     moles[index].classList.add('visible');
    // }
    showMole(index, isGolden = false) {
        const moles = this.gameBoard.querySelectorAll('.mole');
        moles[index].classList.add('visible');
        if (isGolden) {
            moles[index].classList.add('golden');
        }
        // Trigger animation
        moles[index].style.animation = 'none';
        moles[index].offsetHeight; // Trigger reflow
        moles[index].style.animation = null;
    }

    // hideMole(index) {
    //     const moles = this.gameBoard.querySelectorAll('.mole');
    //     moles[index].classList.remove('visible');
    // }
    hideMole(index) {
        const moles = this.gameBoard.querySelectorAll('.mole');
        moles[index].classList.remove('visible', 'golden');
    }

    hitMole(index) {
        const mole = this.gameBoard.querySelectorAll('.mole')[index];
        mole.classList.add('hit');
        setTimeout(() => mole.classList.remove('hit'), 200);
    }

    createSkinSelector() {
        const skinSelector = document.createElement('div');
        skinSelector.id = 'skin-selector';
        skinSelector.innerHTML = `
            <h2>Select Skin</h2>
            <button class="skin-btn" data-skin="default">Default</button>
            <button class="skin-btn" data-skin="space">Space</button>
            <button class="skin-btn" data-skin="halloween">Halloween</button>
        `;
        document.body.insertBefore(skinSelector, document.getElementById('game-container'));
    }

    applySkin(skin) {
        document.body.className = `skin-${skin}`;
    }
}
