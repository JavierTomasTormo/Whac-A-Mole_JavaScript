class MoleAnimation {

    constructor(moleImages, splashImages) {
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
            const randomMoleImage = this.splashImages[Math.floor(Math.random() * this.splashImages.length)];
            mole.style.backgroundImage = `url(${randomMoleImage})`;
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