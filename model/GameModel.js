class GameModel {
    constructor() {
        this.score = 0;
        this.misses = 0;
        this.gameSpeed = 1000;
        this.maxMisses = 3;
        /*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 
        this.comments = [
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
        /*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 
    }//constructor

/*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 
    getRandomComment() {
        const randomIndex = Math.floor(Math.random() * this.comments.length);
        return this.comments[randomIndex];
    }
/*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 


    resetGame() {
        this.score = 0;
        this.misses = 0;
    }

    incrementScore() {
        this.score++;
    }

    incrementMisses() {
        this.misses++;
    }

    isGameOver() {
        return this.misses >= this.maxMisses;
    }
    
/*___________________________________________________________________*///CREA TABLERO RANDOM HOLE
    getRandomHoleIndex() {
        return Math.floor(Math.random() * 5);
    }
/*___________________________________________________________________*///CREA TABLERO RANDOM HOLE
}
