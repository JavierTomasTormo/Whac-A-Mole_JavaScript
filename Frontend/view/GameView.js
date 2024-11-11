import shopRequestsService from '../services/shop.requests.service.js';
import userRequestsService from '../services/user.requests.service.js';
class GameView {
    constructor(userModel) {
        this.userModel = userModel;
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

/*----------------------------------------------------------------*///START GAME BUTTON
    comenzarJuego(handler) {
        this.startButton.addEventListener('click', () => {
            this.startScreen.style.display = 'none';
            this.countdownElement.style.display = 'block';
            this.startCountdown(handler);
        });
    }//comenzarJuego

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
            holeImage.src = '../Frontend/assets/images/utils/Hole2.png';
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

//••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••//RAndom Mole in raNDOM 
    bindMoleClick(handler) {
        const holes = document.querySelectorAll('.hole');
        holes.forEach((hole, index) => {
            hole.addEventListener('click', () => handler(index));
        });
    }


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

    updateHearts(hearts) {
        const heartsContainer = document.getElementById('hearts-container');
        heartsContainer.textContent = hearts;
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
        const totalGamesPlayed = parseInt(localStorage.getItem('totalGames')) + 1;
        
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
            // console.log(totalGamesPlayed);
            userRequestsService.updateUserStats(
                localStorage.getItem('totalMolesWhacked'),
                currentTickets,
                totalGamesPlayed,
                score
            )
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
                shopRequestsService.getShopItems()
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
    

    async showShopModal(shopItems) {
        const currentTickets = this.userModel.getCurrentTickets();
        const selectedSkin = this.userModel.getSelectedSkin();

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
                poop: 'color: #8B4513; font-weight: bold; animation: poop-float 2s infinite ease-in-out, poop-spin 3s infinite linear; text-shadow: 0 0 8px rgba(139, 69, 19, 0.7); position: relative;',
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
                shopRequestsService.getShopItems()
                .then(response => response.json())
                .then(data => {
                    // console.log('Shop items:', data);
                    this.showShopModal(data.items);
                })
                .catch(error => {
                    console.error('Error fetching shop items:', error);
                    this.showShopModal();
                });
            }
            });
        };
        const response = await userRequestsService.getUserSkins();
        const data = await response.json();
        const userSkins = data.user.skins;
        // console.log(userSkins);
        const shopItemsHtml = shopItems.map(wallpaper => {
        const isSelected = wallpaper.imageUrl === selectedSkin;
        const isOwned = userSkins.includes(wallpaper.imageUrl);
            // userSkins.forEach(skinUrl => {
            //     console.log(skinUrl, wallpaper.imageUrl);
            //     if (skinUrl === wallpaper.imageUrl) {
            //         isOwned = true;
            //     }
            // });
            // console.log("Checking:", wallpaper.imageUrl);
            // console.log("Against:", userSkins);
            // console.log("Result:", isOwned);
            return `
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
                    ${isSelected ? '<button class="selected-button">Selected</button>' :
                    isOwned ? `<button class="owned-button" onclick="selectSkin('${wallpaper.imageUrl}')">Comprada</button>` :
                    `<button class="buy-button ${currentTickets >= wallpaper.price ? 'available' : 'locked'}"
                            ${currentTickets >= wallpaper.price ? '' : 'disabled'} onclick="buySkin('${wallpaper.imageUrl}', ${wallpaper.price})">
                        ${currentTickets >= wallpaper.price ? '🛒 Buy Now!' : '🔒 Locked'}
                    </button>`}
                </div>
            `;
        }).join('');
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
            window.selectSkin = (skinUrl) => {
                this.selectSkin(skinUrl);
            };
            window.buySkin = (skinUrl, price) => {
                this.buySkin(skinUrl, price);
            };
        Swal.fire({
            html: modalContent,
            width: window.innerWidth <= 768 ? '80%' : '60%',
            backdrop: 'rgba(0, 0, 0, 0.99)',
            showCloseButton: true,
            closeButtonHtml: '❌',
            showConfirmButton: false,
            customClass: {
                container: 'shop-modal-container',
                popup: 'shop-modal-popup',
                closeButton: 'custom-close-button'
            },
        });
    }

/**☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺☻☺ *///SHOP
    async buySkin(skinUrl, price) {
        try {
            // console.log('Attempting to purchase skin:', skinUrl, 'for price:', price);
            const response = await userRequestsService.purchaseSkin(skinUrl, price);
            // console.log('Response received:', response);
            const data = await response.json();
            // console.log('Data parsed:', data);
            if (data.success === true) {
                // console.log('Purchase successful, updating user model');
                this.userModel.updateTickets(-price);
                this.userModel.addSkin(skinUrl);
                Swal.fire({
                    title: 'Purchase Successful!',
                    text: 'The skin has been added to your collection',
                    icon: 'success',
                    backdrop: 'rgba(0, 0, 0, 0.99)',
                    confirmButtonText: 'Cool!'
                }).then(() => {
                    shopRequestsService.getShopItems()
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
                
            } else {
                console.log('Purchase failed:', data.message);
                Swal.fire({
                    title: 'Purchase Failed',
                    text: data.message || 'Insufficient tickets',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        } catch (error) {
            console.error('Error during purchase:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to purchase skin',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    async selectSkin(skinUrl) {
        try {
            const response = await userRequestsService.updateUserSkin(skinUrl);
            if (response.ok) {
                const data = await response.json();
                this.userModel.setSelectedSkin(skinUrl);
                setTimeout(() => {
                    window.location.reload();
                }, 100);
                // const shopItems = await shopRequestsService.getShopItems();
                // this.showShopModal(shopItems.items);
            }
        } catch (error) {
            console.error('Error selecting skin:', error);
        }
    }

}//GameView
export default GameView;