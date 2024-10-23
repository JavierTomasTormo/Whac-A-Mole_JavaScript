class GameModel {
    constructor() {
        this.score = 0;
        this.misses = 0;
        this.gameSpeed = 1000;
        this.maxMisses = 3;
        /*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 

        this.comments = [
            "¡Uy, casi me tienes! 😉",
            "¿Eso es todo? 😏",
            "¡Por poquito! 😜",
            "¿Te cansas tan rápido? 😏",
            "¡Ni me rozaste! 😉",
            "¡Eso estuvo suavecito! 😏",
            "¿Otra vez tan lento? 😉",
            "¡Uy, te faltó energía! 😜",
            "¡Casi, pero no! 😉",
            "¿Ya te cansaste? 😏",
            "¡Imposible atraparme! 😜",
            "¡Uy, no tan fuerte... o sí! 😏",
            "¡Casi me pillas desprevenido! 😉",
            "¿Así de suave siempre? 😜",
            "¡Uf, estuviste tan cerca! 😏",
            "¿Te vas a rendir tan rápido? 😉",
            "¡Vas a tener que darme más duro! 😜",
            "¡Me gusta cuando te esfuerzas! 😉",
            "¿Eso fue todo? Apenas lo sentí 😏",
            "¡Uy, casi me haces vibrar! 😉",
            "¿Ya te cansaste de perseguirme? 😜",
            "¡A ver si esta vez lo logras! 😏",
            "¿Eso era en serio? Esperaba más 😉",
            "¡Uf, qué lent@! Así no me atrapas 😏",
            "¡Dale con más ganas! 😜",
            "¡Vas a tener que usar las dos manos! 😉"
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
