class MoleAnimation {
    constructor(moleImages, splashImages, gameModel) {
        
        this.gameModel = gameModel;
        this.moleImages = moleImages;
        this.splashImages = splashImages;
        this.currentIndex = 0;
        this.currentMole = null;
    }

    show(hole) {
        const mole = document.createElement('div');
        const curtain = document.createElement('div');
        
        mole.classList.add('mole');
        curtain.classList.add('curtain');
        const randomMoleImage = this.moleImages[Math.floor(Math.random() * this.moleImages.length)];
        mole.style.backgroundImage = `url(${randomMoleImage})`;
        mole.style.left = '25%';
        
        hole.appendChild(curtain);
        hole.appendChild(mole);
        setTimeout(() => {
            curtain.classList.add('up');
            setTimeout(() => {
                mole.classList.add('up');
            }, 100);
        }, 50);
        mole.addEventListener('click', () => {
            // Check if mole was already clicked
            if (mole.dataset.clicked) return;
            mole.dataset.clicked = true;
            if (randomMoleImage === '../Frontend/assets/images/Moles/GoldenHelmetMole_RMBG.png') {
                let currentScore = this.gameModel.getScore();
                this.gameModel.addScore(currentScore);
            }
            if (randomMoleImage === '../Frontend/assets/images/Moles/Moles_4.png') {
                this.gameModel.addScore(-2);
            } else if (randomMoleImage === '../Frontend/assets/images/Moles/Moles_5.png') {
                this.gameModel.addScore(-5);
            } else if (randomMoleImage === '../Frontend/assets/images/Moles/Moles_6.png') {
                this.gameModel.addScore(-3);
            } else if (randomMoleImage === '../Frontend/assets/images/Moles/Moles_11.png') {
                this.gameModel.addScore(5);
            } else if (randomMoleImage === '../Frontend/assets/images/Moles/Moles_1.png') {
                this.gameModel.addScore(3);
            } else if (randomMoleImage === '../Frontend/assets/images/Moles/Moles_2.png') {
                this.gameModel.addScore(3);
            } else if (randomMoleImage === '../Frontend/assets/images/Moles/Moles_3.png') {
                this.gameModel.addScore(3);
            } else if (randomMoleImage === '../Frontend/assets/images/Moles/Moles_9.png') {
                let currentScore = this.gameModel.getScore();
                let oneThirdScore = Math.floor(currentScore / 3);
                this.gameModel.addScore(-oneThirdScore);
            } else if (randomMoleImage === '../Frontend/assets/images/Moles/Moles_8.png'){
                this.gameModel.addLife(1);
            }
            const randomSplashImage = this.splashImages[Math.floor(Math.random() * this.splashImages.length)];
            mole.style.backgroundImage = `url(${randomSplashImage})`;
        });
        
        return { mole, curtain };
    }

    hide(elements) {
        if (!elements) return;
        const { mole, curtain } = elements;
        setTimeout(() => {
            mole.classList.remove('up');
            curtain.classList.add('down');
            setTimeout(() => {
                mole.remove();
                curtain.remove();
            }, 300);
        }, 500); 
    }

}//MoleAnimation
export default MoleAnimation; 