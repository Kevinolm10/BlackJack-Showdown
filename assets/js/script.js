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

function getImagesSrc(images) {
    let image = "../images/"; // Update this to the correct path of your card images
    return `${image}${images}.png`;
}

function startGame() {
    flip = cardDeck.pop();
    dealerPoint += getAmount(flip);
    dealerAces += scanAce(flip);
    console.log(flip);
    //console.log(cardDeck);
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
        image.src = getImageSrc(flip);
        document.getElementById("dealer-cards").appendChild(image);
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