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

// Shuffle card function
function mixCards() {
    for (let i = 0; i < cardDeck.length; i++) {
        let f = Math.floor(Math.random() * cardDeck.length); // Chooses random card from 1-52
        let card = cardDeck[i];
        cardDeck[i] = cardDeck[f];
        cardDeck[f] = card;
    }
    console.log(cardDeck);
}

// Function to get the img source
function getImageSrc(card) {
    return `/workspace/BlackJack-Showdown/assets/images${values} + "-" + ${types} + .png`;
}

//function for when the game starts
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

        // for dealer cards to show
        let cardImage = document.createElement("img");
        cardImage.src = getImageSrc(flip);

        let dealerCardsContainer = document.getElementsByClassName("dealers-cards");
        if (dealerCardsContainer.length > 0) {
            dealerCardsContainer[0].appendChild(cardImage);
        }
        console.log(dealerPoint);
    }
    //for player cards to show up
    for (let i = 0; i < 2; i++) {
        let cardImage = document.createElement("img");
        cardImage.src = getImageSrc(flip);

        let playerCardsContainer = document.getElementsByClassName("players-cards");
        if (playerCardsContainer.length > 0) {
            playerCardsContainer[0].appendChild(cardImage);
        }
        console.log(dealerPoint);
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

}