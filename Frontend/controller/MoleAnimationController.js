class MoleAnimation {

    constructor(moleImages) {
        this.moleImages = moleImages;
        this.currentIndex = 0;
        this.currentMole = null;
    }

    show(hole) {
        // Clean up any existing mole first
        if (this.currentMole) {
            this.hide(this.currentMole);
        }

        const mole = document.createElement('div');
        const curtain = document.createElement('div');
        
        mole.classList.add('mole');
        curtain.classList.add('curtain');
        
        const randomMoleImage = this.moleImages[Math.floor(Math.random() * this.moleImages.length)];
        mole.style.backgroundImage = `url(${randomMoleImage})`;
        mole.style.left = '25%';
        
        hole.appendChild(mole);
        hole.appendChild(curtain);
        
        mole.classList.add('up');
        curtain.classList.add('up');
        
        const elements = { mole, curtain };
        this.currentMole = elements;
        
        return elements;
    }



    hide(elements) {
        if (!elements) return;
        
        const { mole, curtain } = elements;
        mole.classList.remove('up');
        curtain.classList.add('down');
        
        setTimeout(() => {
            mole.remove();
            curtain.remove();
            if (this.currentMole === elements) {
                this.currentMole = null;
            }
        }, 300);
    }
}