let dealerPoint = 0; // dealer and your points/sum
let playerPoint = 0;
let dealerAces = 0; // dealer and your ace count
let playerAces = 0;
let flip; // hidden card in the beginning
let cardDeck = [];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "q", "k"];
const types = ["c", "d", "h", "s"];

let goBtn = true; //allows to go if you are under 21 points

window.onload = function () {
    buildCardDeck();
    mixCards();
    startGame();
}

function buildCardDeck() {
    for (let i = 0; i < types.length; i++) { // Pushes an array of the possible cards to the function
        for (let f = 0; f < values.length; f++) {
            cardDeck.push(values[f] + "-" + types[i]);
        }

    }
    //console.log(cardDeck)
}

function mixCards() {
    for (let i = 0; i < cardDeck.length; i++) {
        let f = Math.floor(Math.random() * cardDeck.length); // Chooses random card from 1-52
        let card = cardDeck[i];
        cardDeck[i] = cardDeck[f];
        cardDeck[f] = card;
    }
    console.log(cardDeck);
}

function getImageSrc(card) {
    return `/workspace/BlackJack-Showdown/assets/images${values} + "-" + ${types} + .png`;
}

function startGame() {
    flip = cardDeck.pop();
    dealerPoint += getAmount(flip);
    dealerAces += scanAce(flip);
    console.log(flip);

    while (dealerPoint < 17) {
        flip = cardDeck.pop();
        dealerPoint += getAmount(flip);
        dealerAces += scanAce(flip);
        console.log(flip);

        if (dealerPoint > 21 && dealerAces > 0) {
            dealerPoint -= 10;
            dealerAces -= 1;
        }


        let cardImage = document.createElement("img");
        cardImage.src = getImageSrc(flip);

        let dealerCardsContainer = document.getElementsByClassName("dealers-cards");
        if (dealerCardsContainer.length > 0) {
            dealerCardsContainer[0].appendChild(cardImage);
        }
    }

}

function getAmount(images) {
    let data = images.split("-");
    let amount = data[0];

    if (isNaN(amount)) {
        if (amount === "a") {
            return 11;
        }
        return 10;
    }
    return parseInt(amount);
}

function scanAce(images) {
    if (images[0] === "a") {
        return 1;
    }
    return 0;
}