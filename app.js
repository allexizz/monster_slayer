new Vue({
    el: "#app",
    data: {
        gameStarted: false,
        playerHealth: 100,
        monsterHealth: 100,
        rounds: new Array()
    },
    methods: {
        startGame: function() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameStarted = true;
            this.rounds = [];
        },
        attack: function() {
            this.playerHealth -= getRandomNumber();
            if(this.checkIfGameEnded()) {
                return;
            }
            this.monsterHealth -= getRandomNumber();
            this.checkIfGameEnded();
        },
        specialAttack: function() {
            this.playerHealth -= getRandomNumber();
            if(this.checkIfGameEnded()) {
                return;
            }
            this.monsterHealth -= getRandomNumber() + 5;
            this.checkIfGameEnded();
        },
        heal: function() {
            this.playerHealth += (getRandomNumber() + 3);
            this.playerHealth = this.playerHealth > 100 ? 100 : this.playerHealth;
            this.playerHealth -= getRandomNumber();
        },
        giveUp: function() {
            this.gameStarted = false;
        },
        checkIfGameEnded: function () {
            if (this.playerHealth <= 0) {
                if (confirm('You lost. Start a new game?')) {
                    this.startGame();
                    return true;
                }
                else {
                    this.gameStarted = false;
                }
            }
            else if (this.monsterHealth <= 0) {
                if (confirm('You won. Start a new game?')) {
                    this.startGame();
                    return true;
                }
                else {
                    this.gameStarted = false;
                }
            }
        }
    },
    computed: {

    },
    watch: {
        playerHealth: function(currentH, previousH) {
            if (previousH < currentH) {
                this.rounds.unshift({
                    text: 'Player heals for ' + (currentH - previousH),
                    isPlayer: true
                });
                return;
            }
            this.rounds.unshift({
                text: 'Monster hits player for ' + (previousH - currentH),
                isPlayer: false
            });
        },
        monsterHealth: function(currentH, previousH) {
            this.rounds.unshift({
                text: 'Player hits monster for ' + (previousH - currentH),
                isPlayer: true,
            });
        }
    }
});

function getRandomNumber() {
    return Math.round(Math.random() * 10) + 1;
}