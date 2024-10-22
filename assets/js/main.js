document.addEventListener('DOMContentLoaded', () => {
    const moleIcon = document.getElementById('mole-icon');
    const randomComment = document.getElementById('random-comment');
    const comments = [
        "¡Atrápame si puedes, lentorro!",
        "¡Uy! ¿Eso era un martillo o una caricia?",
        "¡Ja! ¡Fallaste por milímetros!",
        "¿Eso es todo lo que tienes?",
        "¡Soy más rápido que un rayo!",
        "¡Casi me das! Bueno... no tanto.",
        "¡Tienes que mejorar esos reflejos!",
        "¡Demasiado lento! Intenta otra vez.",
        "¡Ay! ¡Eso me dolió... pero solo un poquito!",
        "¡Vas a necesitar más que eso para atraparme!",
        "JAJAJAJAJ soy inmortal !!!"
    ];
    moleIcon.addEventListener('click', function() {
        const randomIndex = Math.floor(Math.random() * comments.length);
        randomComment.textContent = comments[randomIndex];
        randomComment.style.display = 'block';
        
        setTimeout(() => {
            randomComment.style.display = 'none';
        }, 3000);
    });
/*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 


    const gameModel = new GameModel();
    const gameView = new GameView();
    const gameController = new GameController(gameModel, gameView);

    gameController.init();
});
