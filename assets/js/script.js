const dealerPoint = 0; // dealer and your points/sum
const playerPoint = 0;
const dealerAces = 0; // dealer and your ace count
const playerAces = 0;
let flip; // hidden card in the beginning
let cardDeck = [];

let goBtn = true; //allows to go if you are under 21 points

window.onload = function () {
    buildCardDeck();
}

function buildCardDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
    let types = ["c", "d", "h", "s"];

    for (let i = 0; i < types.length; i++) {

    }
    console.log(cardDeck)
}