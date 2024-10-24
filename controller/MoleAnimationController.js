class MoleAnimation {
    constructor(moleImages) {
        this.moleImages = moleImages;
        // this.moleImages = [
        //     '../../assets/images/Moles/Mole_1.png',
        //     '../../assets/images/Moles/Mole_2.png',
        //     '../../assets/images/Moles/Mole_3.png',
        //     '../../assets/images/Moles/Mole_4.png',
        //     '../../assets/images/Moles/Mole_5.png',
        //     '../../assets/images/Moles/Mole_6.png',
        //     '../../assets/images/Moles/Mole_7.png',
            
        // ];
    }

    show(hole) {
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
        
        return { mole, curtain };
    }

    hide(elements) {
        const { mole, curtain } = elements;
        mole.classList.remove('up');
        curtain.classList.add('down');
        
        setTimeout(() => {
            curtain.classList.remove('down');
            mole.remove();
            curtain.remove();
        }, 1000);
    }
}
