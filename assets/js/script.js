let dealerPoint = 0; // dealer and your points/sum
let playerPoint = 0;
let dealerAces = 0; // dealer and your ace count
let playerAces = 0;
let flip; // hidden card in the beginning
let cardDeck = [];

let goBtn = true; //allows to go if you are under 21 points

window.onload = function () {
    buildCardDeck();
    mixCards();
    startGame();
}

function buildCardDeck() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
    const types = ["c", "d", "h", "s"];

    for (let i = 0; i < types.length; i++) { // Pushes an array of the possible cards to the function
        for (let f = 0; f < values.length; f++) {
            cardDeck.push(values[f] + "-" + types[i]);
        }

    }
    console.log(cardDeck)
}

function mixCards() {
    for (let i = 0; i < cardDeck.length; i++) {
        let f = Math.floor(Math.random() * cardDeck.length); // Chooses random card from 1-52
    }
}

function startGame() {

}