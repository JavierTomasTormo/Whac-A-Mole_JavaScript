class GameView {
    constructor() {
        this.gameBoard = document.getElementById('game-board');
        this.scoreElement = document.getElementById('score-value');
        this.missesElement = document.getElementById('misses-value');
        this.ticketsElement = document.getElementById('tickets-value');
        this.currentPrizePot = document.getElementById('prize-pot-value');


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
    
        this.bindShopButton();
        this.shopButton = document.createElement('button');
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
    comenzarJuego(handler) {
        this.startButton.addEventListener('click', () => {
            this.startScreen.style.display = 'none';
            this.countdownElement.style.display = 'block';
            this.startCountdown(handler);
        });
    }//comenzarJuego
/*---------------------------------------------------------------------*///START GAME BUTTON

/*♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪*///CREA TABLERO RANDOM HOLE
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
/*♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪♪*///CREA TABLERO RANDOM HOLE

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
        }, 999);
    }
/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*///CUENTA ATRAS

//••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••//RAndom Mole in raNDOM 
    bindMoleClick(handler) {
        const holes = document.querySelectorAll('.hole');
        holes.forEach((hole, index) => {
            hole.addEventListener('click', () => handler(index));
        });
    }
//••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••//RAndom Mole in raNDOM 
    updateTickets(tickets) {
        this.ticketsElement.textContent = tickets;
        this.updatePrizePot(tickets);
    }

    updateScore(score) {
        this.scoreElement.textContent = score;

        const currentMoles = localStorage.getItem('totalMolesWhacked');
        const newTotalMolesWhacked = parseInt(currentMoles) + 1;
        // console.log(newTotalMolesWhacked);
        // console.log(currentMoles);
        localStorage.setItem('totalMolesWhacked', newTotalMolesWhacked);
    }

    updateMisses(misses) {
        this.missesElement.textContent = misses;
    }

    updatePrizePot(ticketsEarned) {
        
        const currentTickets = localStorage.getItem('ticketsEarned');
        const newTotal = parseInt(currentTickets) + parseInt(ticketsEarned);
        // console.log(newTotal);
        this.currentPrizePot.textContent = newTotal;
        localStorage.setItem('newTotalticketsEarned', newTotal);
    }


    showGameOver(score, misses) {
        const randomGifIndex = Math.floor(Math.random() * 4) + 1;
        const randomGifPath = `../Frontend/assets/images/gif/${randomGifIndex}.gif`;
        const currentTickets = parseInt(localStorage.getItem('newTotalticketsEarned')) || 0;
        
        Swal.fire({
            title: '¡Game Over!',
            html: `
                <div class="game-over-stats">
                    <h3>Final Score: <span class="score-value">${score}</span></h3>
                    <h3>Misses: <span class="misses-value">${misses}</span></h3>
                    <img src="${randomGifPath}" alt="Game Over GIF" style="margin-top: 20px; max-width: 200px;">
                </div>
            `,
            icon: 'info',
            confirmButtonText: 'Play Again',
            background: '#f8f9fa',
            backdrop: 'rgba(0,0,123,0.4)',
            customClass: {
                title: 'game-over-title',
                confirmButton: 'game-over-button'
            }
        }).then(() => {
            fetch('http://localhost:3002/user/stats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    totalMolesWhacked: localStorage.getItem('totalMolesWhacked'),
                    ticketsEarned: currentTickets,
                    highScore: score
                })
            })
            .then(response => response.json())
            .then(data => {
                // console.log('Stats updated:', data);
                localStorage.setItem('highScore', data.user.highScore || '0');
                localStorage.setItem('totalGames', data.user.totalGamesPlayed || '0');
                localStorage.setItem('totalMolesWhacked', data.user.totalMolesWhacked || '0'); 
                localStorage.setItem('ticketsEarned', data.user.ticketsEarned || '0');
                localStorage.setItem('userAvatar', data.user.avatar || 'Frontend/assets/images/Moles/GoldenHelmetMole_RMBG.png');
                localStorage.setItem('userEmail', data.user.email); 
                localStorage.setItem('soundEffects', data.user.gameSettings.soundEnabled);
                localStorage.setItem('musicEnabled', data.user.gameSettings.musicEnabled);
                localStorage.setItem('difficulty', data.user.gameSettings.difficulty);
                localStorage.setItem('gameSpeed', data.user.gameSettings.gameSpeed);
            })
            .then(() => {
                window.location.reload();
            })
            .catch(error => console.error('Error:', error));
        });
    }


/**☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺ *///SHOP


    bindShopButton() {
        this.shopButton = document.getElementById('shop-button');
        if (this.shopButton) {
            this.shopButton.addEventListener('click', () => this.showShopModal());
        } else {
            alert('This button had a lazy day');
        }
    }
    // bindShopItemClick(handler) {
    //     const shopItems = document.querySelectorAll('.shop-item');
    //     shopItems.forEach((item, index) => {
    //         item.addEventListener('click', () => handler(index));
    //     });
    // }
    // bindShopItemBuy(handler) {
    //     const shopItems = document.querySelectorAll('.shop-item');
    //     shopItems.forEach((item, index) => {
    //         item.addEventListener('click', () => handler(index));
    //     });
    // }

    showShopModal() {
        const currentTickets = localStorage.getItem('ticketsEarned') || 0;
        
        const modalContent = `
        <div class="modal-content-shop">
            <div class="shop-header">
                <h2 class="shop-title">🎮 WALLPAPER SHOP 🎮</h2>
                <div class="user-tickets">
                    <img src="Frontend/assets/images/utils/ticket.png" alt="ticket" class="ticket-icon">
                    <span class="tickets-label">Your Tickets:</span>
                    <span id="shop-tickets" class="tickets-value">${currentTickets}</span>
                </div>
            </div>
            
            <div id="wallpaper-grid" class="wallpaper-grid">
                <div class="shop-item">
                    <div class="item-frame">
                        <img src="Frontend/assets/images/Wallpaper_Charge/wv1.png" alt="Wallpaper 1" width="200" height="200">
                        <div class="item-overlay">
                            <span class="preview-text">👀 Preview</span>
                        </div>
                    </div>
                    <h3 class="item-title">Forest Theme</h3>
                    <div class="price-tag">
                        <img src="Frontend/assets/images/utils/ticket.png" alt="ticket" class="price-icon">
                        <span>100</span>
                    </div>
                    <button class="buy-button ${currentTickets >= 100 ? 'available' : 'locked'}" 
                            ${currentTickets >= 100 ? '' : 'disabled'}>
                        ${currentTickets >= 100 ? '🛒 Buy Now!' : '🔒 Locked'}
                    </button>
                </div>
    
                <div class="shop-item">
                    <div class="item-frame">
                        <img src="Frontend/assets/images/Wallpaper_Charge/wv2.png" alt="Wallpaper 2" width="200" height="200">
                        <div class="item-overlay">
                            <span class="preview-text">👀 Preview</span>
                        </div>
                    </div>
                    <h3 class="item-title">Desert Theme</h3>
                    <div class="price-tag">
                        <img src="Frontend/assets/images/utils/ticket.png" alt="ticket" class="price-icon">
                        <span>200</span>
                    </div>
                    <button class="buy-button ${currentTickets >= 200 ? 'available' : 'locked'}" 
                            ${currentTickets >= 200 ? '' : 'disabled'}>
                        ${currentTickets >= 200 ? '🛒 Buy Now!' : '🔒 Locked'}
                    </button>
                </div>
    
                <div class="shop-item">
                    <div class="item-frame">
                        <img src="Frontend/assets/images/Wallpaper_Charge/wv3.png" alt="Wallpaper 3" width="200" height="200">
                        <div class="item-overlay">
                            <span class="preview-text">👀 Preview</span>
                        </div>
                    </div>
                    <h3 class="item-title">Snow Theme</h3>
                    <div class="price-tag">
                        <img src="Frontend/assets/images/utils/ticket.png" alt="ticket" class="price-icon">
                        <span>300</span>
                    </div>
                    <button class="buy-button ${currentTickets >= 300 ? 'available' : 'locked'}" 
                            ${currentTickets >= 300 ? '' : 'disabled'}>
                        ${currentTickets >= 300 ? '🛒 Buy Now!' : '🔒 Locked'}
                    </button>
                </div>
            </div>
        </div>
    `;
    
    
        Swal.fire({
            html: modalContent,
            width: '80%',
            backdrop: 'rgba(0, 0, 0, 0.9)',
            showCloseButton: true,
            closeButtonHtml: '❌',
            showConfirmButton: false,
            customClass: {
                container: 'shop-modal-container',
                popup: 'shop-modal-popup',
                closeButton: 'custom-close-button'
            }
        });
    }
    
/**☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺ *///SHOP


}//GameView
