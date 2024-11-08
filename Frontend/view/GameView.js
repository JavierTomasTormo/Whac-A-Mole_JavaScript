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
            this.shopButton.addEventListener('click', () => {
                fetch('http://localhost:3002/shop_items', {
                    method: 'GET',
                })
                .then(response => response.json())
                .then(data => {
                    // console.log('Shop items:', data);

                    this.showShopModal(data.items);
                })
                .catch(error => {
                    console.error('Error fetching shop items:', error);
                    this.showShopModal(); 
                });
            });
        }
    }
    

    showShopModal(shopItems) {
        const currentTickets = localStorage.getItem('ticketsEarned') || 0;
        if (!shopItems || !Array.isArray(shopItems)) {
            const shopItemsHtml = `<p class="no-items-message"> No hay más items que comprar en esta tienda</p>`;
            Swal.fire({
                html: shopItemsHtml,
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
            return;
        }

        window.previewWallpaper = (wallpaper) => {
            // console.log('Previewing wallpaper:', wallpaper);
            const rarityStyles = {
                common: 'color: #B0B0B0; text-shadow: 0 0 5px rgba(176, 176, 176, 0.5);',
                uncommon: 'color: #1EFF00; text-shadow: 0 0 5px rgba(30, 255, 0, 0.5);',
                rare: 'color: #0070DD; text-shadow: 0 0 5px rgba(0, 112, 221, 0.5); animation: pulse 2s infinite;',
                epic: 'color: #A335EE; text-shadow: 0 0 8px rgba(163, 53, 238, 0.7); animation: glow 1.5s infinite;',
                legendary: 'color: #FF8000; text-shadow: 0 0 10px rgba(255, 128, 0, 0.8); animation: legendary-shine 2s infinite;',
                mythic: 'color: #FF0000; font-weight: bold; animation: mythic-fire 2.5s infinite alternate ease-in-out, mythic-float 3s ease-in-out infinite; transform-origin: center bottom;',

            };
            Swal.fire({
            title: wallpaper.name,
            html: `
                <div class="preview-modal">
                    <img src="${wallpaper.imageUrl}" alt="${wallpaper.name}" class="preview-image">
                    <div class="preview-info">
                        <p class="preview-description">${wallpaper.description}</p>
                        <div class="preview-details">
                            <p class="preview-price">💰 Price: 
                                ${wallpaper.price}<img src="Frontend/assets/images/utils/ticket.png" alt="ticket" class="price-icon">
                            </p>
                            <p class="preview-rarity" style="${rarityStyles[wallpaper.rarity.toLowerCase()]}">
                                Rarity: ${wallpaper.rarity}
                            </p>
                        </div>
                    </div>
                </div>
                <style>
                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }
                    @keyframes glow {
                        0% { text-shadow: 0 0 5px rgba(163, 53, 238, 0.7); }
                        50% { text-shadow: 0 0 20px rgba(163, 53, 238, 0.9); }
                        100% { text-shadow: 0 0 5px rgba(163, 53, 238, 0.7); }
                    }
                    @keyframes legendary-shine {
                        0% { text-shadow: 0 0 10px #FF8000; }
                        25% { text-shadow: 2px 2px 20px #FFD700; }
                        50% { text-shadow: -2px -2px 20px #FFA500; }
                        75% { text-shadow: 2px -2px 20px #FF8C00; }
                        100% { text-shadow: 0 0 10px #FF8000; }
                    }

@keyframes mythic-fire {
    0% {
        text-shadow: 
            0 0 15px #fff,
            0 -10px 25px #fff5bd,
            7px -20px 35px #ffd162,
            -7px -30px 45px #ff8c00,
            7px -40px 55px #ff4500,
            -7px -50px 65px #ff0000,
            12px -60px 75px #bd0000,
            -12px -70px 90px #900000;
        transform: scale(1.05) rotate(-2deg);
    }
    25% {
        text-shadow: 
            0 0 12px #fff,
            -10px -10px 22px #fff5bd,
            5px -22px 30px #ffd162,
            -12px -32px 50px #ff8c00,
            10px -42px 60px #ff4500,
            -5px -52px 70px #ff0000,
            15px -62px 80px #bd0000,
            -15px -72px 90px #900000;
        transform: scale(1.1) rotate(1deg);
    }
    50% {
        text-shadow: 
            0 0 18px #fff,
            12px -10px 20px #fff5bd,
            -12px -20px 40px #ffd162,
            10px -32px 55px #ff8c00,
            -12px -42px 65px #ff4500,
            12px -52px 70px #ff0000,
            -10px -62px 85px #bd0000,
            10px -72px 95px #900000;
        transform: scale(1.15) rotate(-3deg);
    }
    75% {
        text-shadow: 
            0 0 10px #fff,
            -10px -10px 22px #fff5bd,
            8px -22px 32px #ffd162,
            -8px -30px 48px #ff8c00,
            8px -40px 58px #ff4500,
            -10px -50px 68px #ff0000,
            10px -60px 78px #bd0000,
            -10px -70px 88px #900000;
        transform: scale(1.1) rotate(2deg);
    }
    100% {
        text-shadow: 
            0 0 15px #fff,
            0 -10px 25px #fff5bd,
            7px -20px 35px #ffd162,
            -7px -30px 45px #ff8c00,
            7px -40px 55px #ff4500,
            -7px -50px 65px #ff0000,
            12px -60px 75px #bd0000,
            -12px -70px 90px #900000;
        transform: scale(1.05) rotate(-1deg);
    }
}

@keyframes mythic-float {
    0% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-5px);
    }
    100% {
        transform: translateY(0px);
    }
}



                </style>
            `,
            width: '60%',
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cancelar',
            backdrop: 'rgba(0, 0, 0, 0.9)',
            customClass: {
                container: 'preview-modal-container',
                popup: 'preview-modal-popup',
                closeButton: 'custom-close-button'
            }
            }).then((result) => {
            if (result.dismiss === Swal.DismissReason.cancel) {
                fetch('http://localhost:3002/shop_items', {
                    method: 'GET',
                })
                .then(response => response.json())
                .then(data => {
                    this.showShopModal(data.items);
                    // this.showShopModal();
                })
                .catch(error => {
                    console.error('Error fetching shop items:', error);
                    this.showShopModal(); 
                });
            }
            });
        };
    
        const shopItemsHtml = shopItems.map(wallpaper => `
            <div class="shop-item">
                <div class="item-frame">
                    <img src="${wallpaper.imageUrl}" alt="${wallpaper.name}" width="200" height="200">
                    <div class="item-overlay" onclick="previewWallpaper(${JSON.stringify(wallpaper).replace(/"/g, '&quot;')})">
                        <span class="preview-text">👀 Preview</span>
                    </div>
                </div>
                <h3 class="item-title">${wallpaper.name}</h3>
                <div class="price-tag">
                    <img src="Frontend/assets/images/utils/ticket.png" alt="ticket" class="price-icon">
                    <span>${wallpaper.price}</span>
                </div>
                <button class="buy-button ${currentTickets >= wallpaper.price ? 'available' : 'locked'}" 
                        ${currentTickets >= wallpaper.price ? '' : 'disabled'}>
                    ${currentTickets >= wallpaper.price ? '🛒 Buy Now!' : '🔒 Locked'}
                </button>
            </div>
        `).join('');
        
        

    
        const modalContent = `
            <div class="modal-content-shop">
                <div class="shop-header">
                    <h2 class="shop-title">🎮 SHOP 🎮</h2>
                    <div class="user-tickets">
                        <img src="Frontend/assets/images/utils/ticket.png" alt="ticket" class="ticket-icon">
                        <span class="tickets-label">Your Tickets:</span>
                        <span id="shop-tickets" class="tickets-value">${currentTickets}</span>
                    </div>
                </div>
                <div id="wallpaper-grid" class="wallpaper-grid">
                    ${shopItemsHtml}
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
