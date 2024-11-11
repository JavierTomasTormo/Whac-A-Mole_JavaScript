class GameModel {
    constructor() {
        this.score = 0;
        this.misses = 0;
        this.gameSpeed = 1000;
        this.hearts = ['❤️', '❤️', '❤️', '❤️', '❤️'];
        this.tickets = 0;
        this.maxMisses = 5;
        
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
    }//constructor

/*=======================================================================*///COMENTARIOS DEL TOPITO RANDOM 
    getRandomComment() {
        const randomIndex = Math.floor(Math.random() * this.comments.length);
        return this.comments[randomIndex];
    }

    getHearts() {
        return this.hearts.join(' ');
    }   

    addScore(points) {
            this.score += points;
            return this.score;
    }

    getScore() {
        return this.score;
    }

    addLife() {
                this.hearts.push('❤️');
                this.misses--;
                console.log("Life added! Hearts:", this.hearts.length);
                document.getElementById('hearts-container').textContent = this.hearts.join(' ');
            return this.hearts.length;
    }

    // resetGame() {
    //     this.score = 0;
    //     this.misses = 0;
    //     this.tickets = 0;
    // }
    resetGame() {
        this.misses = 0;
        this.score = 0;
        this.hearts = ['❤️', '❤️', '❤️', '❤️', '❤️'];
        this.tickets = 0;
    }

    incrementScore() {
        this.score++;
        console.log( "score", this.score);    
        return this.score;
    }

    incrementTickets() {
        this.tickets = Math.floor(this.score / 2);
        return this.tickets;
    }

    // incrementMisses() {
    //     this.misses++;
    //     console.log("Misses",this.misses);
    //     if (this.isGameOver()) {}
    //     return this.misses;
    // }
    incrementMisses() {
        this.misses++;
        this.hearts.pop(); 
        console.log("Hearts remaining:", this.hearts.length);
        if (this.isGameOver()) {}
        // return this.hearts.length;
        return this.misses;
    }

    // isGameOver() {
    //     return this.misses >= this.maxMisses;
    // }
    isGameOver() {
        // return this.hearts.length === 0;
        return this.misses >= this.maxMisses;
    }

/*___________________________________________________________________*///CREA TABLERO RANDOM HOLE
    getRandomHoleIndex() {
        return Math.floor(Math.random() * 5);
    }

}//class
export default GameModel; 
