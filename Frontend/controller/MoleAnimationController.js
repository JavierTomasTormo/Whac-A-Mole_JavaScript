class MoleAnimation {
    constructor(moleImages) {
        this.moleImages = moleImages;
        this.currentIndex = 0;
        this.holeQueue = [];
        this.isMoleVisible = false;
        // console.log(this.holeQueue);
    }

    show(hole) {
        console.log(hole);

        if (this.isMoleVisible) {
            this.holeQueue.push(hole);
            return;
        }

        const mole = document.createElement('div');
        const curtain = document.createElement('div');
        
        mole.classList.add('mole');
        curtain.classList.add('curtain');
        
        const randomMoleImage = this.moleImages[Math.floor(Math.random() * this.moleImages.length)];
        mole.style.backgroundImage = `url(${randomMoleImage})`;
        
        hole.appendChild(mole);
        hole.appendChild(curtain);
        
        mole.classList.add('up');
        curtain.classList.add('up');
        
        this.isMoleVisible = true;


        console.log(mole);
        console.log(curtain);    
        
        return { mole, curtain };
    }

    hide(elements) {
        console.log(elements);

        const { mole, curtain } = elements;
        mole.classList.remove('up');
        curtain.classList.add('down');
        
        setTimeout(() => {
            curtain.classList.remove('down');
            mole.remove();
            curtain.remove();
            this.isMoleVisible = false;
            if (this.holeQueue.length > 0) {
                const nextHole = this.holeQueue.shift();
                this.show(nextHole);
            }
        }, 1000);
    }
}