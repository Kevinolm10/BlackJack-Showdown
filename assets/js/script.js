let dealerPoint = 0; // dealer and your points/sum
let playerPoint = 0;
let dealerAces = 0; // dealer and your ace count
let playerAces = 0;
let flip; // hidden card in the beginning
let cardDeck = [];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "j", "q", "k"];
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

//function for when the game starts
function startGame() {
    flip = cardDeck.pop();
    dealerPoint += getAmount(flip);
    dealerAces += scanAce(flip);

    while (dealerPoint < 17) {
        let imageImg = document.createElement("img");
        let image = cardDeck.pop();
        imageImg.src = "./images/" + image + ".png";
        dealerPoint += getAmount(image);
        dealerAces += scanAce(image);
        document.getElementsByClassName("dealers-cards")[0].append(imageImg);
    }
    console.log(dealerPoint);

    for (let i = 0; i < 2; i++) {
        let imageImg = document.createElement("img");
        let image = cardDeck.pop();
        imageImg.src = "./images/" + image + ".png";
        playerPoint += getAmount(image);
        playerAces += scanAce(image);
        document.getElementsByClassName("players-cards")[0].append(imageImg);
    }

    console.log(playerPoint)
    document.getElementsByClassName("go").addEventListener("click", go);
    document.getElementsByClassName("stay").addEventListener("click", stay);

    function getAmount(image) {
        let data = image.split("-");
        let amount = data[0];

        if (isNaN(amount)) {
            if (amount === "a") {
                return 11;
            }
            return 10;
        }
        return parseInt(amount);
    }

    function scanAce(image) {
        if (image[0] === "a") {
            return 1;
        }
        return 0;
    }
}