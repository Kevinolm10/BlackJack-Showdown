let dealerPoint = 0; // dealer and your points/sum
let playerPoint = 0;
let dealerAces = 0; // dealer and your ace count
let playerAces = 0;
let flip; // hidden card in the beginning
let cardDeck;

let goBtn = true; //allows to go if you are under 21 points





window.onload = function () {
    buildCardDeck();
    mixCards();
    startGame();
    playAgain();
}

function buildCardDeck() {
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "a", "j", "q", "k"];
    let types = ["c", "d", "h", "s"];
    cardDeck = [];
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
        imageImg.src = "./assets/images/" + image + ".png";
        dealerPoint += getAmount(image);
        dealerAces += scanAce(image);
        document.getElementsByClassName("dealers-cards")[0].append(imageImg);
    }

    console.log(dealerPoint);

    for (let i = 0; i < 2; i++) {
        let imageImg = document.createElement("img");
        let image = cardDeck.pop();
        imageImg.src = "./assets/images/" + image + ".png";
        playerPoint += getAmount(image);
        playerAces += scanAce(image);
        document.getElementsByClassName("players-cards")[0].append(imageImg);
    }

    console.log(playerPoint);
    document.getElementsByClassName("go")[0].addEventListener("click", go);
    document.getElementsByClassName("stay")[0].addEventListener("click", stay);
}

function go() {
    if (!goBtn) {
        return;
    }
    let imageImg = document.createElement("img");
    let image = cardDeck.pop();
    imageImg.src = "./assets/images/" + image + ".png";
    playerPoint += getAmount(image);
    playerAces += scanAce(image);
    document.getElementsByClassName("players-cards")[0].append(imageImg);

    if (smallAce(playerPoint, playerAces) > 21) {
        goBtn = false;
    }
}

function stay() {
    dealerPoint = smallAce(dealerPoint, dealerAces)
    playerPoint = smallAce(playerPoint, playerAces)

    goBtn = false;
    document.querySelector(".hidden").src = "./assets/images/" + flip + ".png";

    let message = "";
    if (playerPoint > 21) {
        message = "The dealer won!";
    } else if (dealerPoint > 21) {
        message = "You outplayed the dealer!"
    } else if (playerPoint == dealerPoint) {
        message = "It is a draw!"
    } else if (playerPoint > dealerPoint) {
        message = "You outplayed the dealer!"
    } else if (playerPoint < dealerPoint) {
        message = "The dealer won!"
    }
    document.querySelector(".dealer-points").innerText = dealerPoint;
    document.querySelector(".player-points").innerText = playerPoint;
    document.querySelector(".results").innerText = message;
}

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

function smallAce(playerPoint, playerAces) {
    while (playerPoint > 21 && playerAces > 0) {
        playerPoint -= 10;
        playerAces -= 1;
    }
    return playerPoint;
}

function playAgain() {
    document.querySelector('.startover').addEventListener('click', function () {
        window.location.reload();
        return false;
    });
}