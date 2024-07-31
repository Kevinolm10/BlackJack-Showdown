/* jshint esversion: 11 */

/* 
 *General scoring and checking variables for the game
 */
let dealerPoint = 0;
let playerPoint = 0;
let dealerAces = 0;
let playerAces = 0;
let flip;
let cardDeck;

let goBtn = true;

/* 
 *This function loads the functions inside it when the page loads 
 */
window.onload = function () {
    buildCardDeck();
    mixCards();
    startGame();
    playAgain();
};

/* 
 *This function builds the card deck 
 *and assigns the cards with values and types.
 *The double for loop, loops through the arrays.
 */
function buildCardDeck() {
    let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "a", "j", "q", "k"];
    let types = ["c", "d", "h", "s"];
    cardDeck = [];
    for (let i = 0; i < types.length; i++) {
        for (let f = 0; f < values.length; f++) {
            cardDeck.push(values[f] + "-" + types[i]);
        }
    }
}

/*
 *mixCards function shuffles the cards 
 *and randomizes which cards should be picked 
 */
function mixCards() {
    for (let i = 0; i < cardDeck.length; i++) {
        let f = Math.floor(Math.random() * cardDeck.length);
        let card = cardDeck[i];
        cardDeck[i] = cardDeck[f];
        cardDeck[f] = card;
    }
    console.log(cardDeck);
}

/*
 *The startGame function decides what happens when the game starts.
 *The function allows us to produce random cards from the image list.
 *It appends the card after it gets an image from the folder.
 */
function startGame() {
    flip = cardDeck.pop();
    dealerPoint += getAmount(flip);
    dealerAces += scanAce(flip);
    // This whileloop is for the dealer to get a card.
    while (dealerPoint < 17) {
        let imageImg = document.createElement("img");
        let image = cardDeck.pop();
        imageImg.src = "./assets/images/" + image + ".png";
        imageImg.setAttribute("alt", "playing card");
        dealerPoint += getAmount(image);
        dealerAces += scanAce(image);
        document.getElementsByClassName("dealers-cards")[0].append(imageImg);
    }
    // This for loop is for the player to get a card.
    for (let i = 0; i < 2; i++) {
        let imageImg = document.createElement("img");
        let image = cardDeck.pop();
        imageImg.src = "./assets/images/" + image + ".png";
        playerPoint += getAmount(image);
        playerAces += scanAce(image);
        document.getElementsByClassName("players-cards")[0].append(imageImg);
    }
    /* 
     *Eventlisteners for the go or stay buttons
     */
    document.getElementsByClassName("go")[0].addEventListener("click", go);
    document.getElementsByClassName("stay")[0].addEventListener("click", stay);
}

/* 
 *This function makes it so we can press the go button
 *and when we do, we get a new card
 */
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

/* 
 *This function is for the stay button,
 *it makes it so that when the button is pressed, our turn is over
 *and a message is produced depending on the outcome.
 */
function stay() {
    dealerPoint = smallAce(dealerPoint, dealerAces);
    playerPoint = smallAce(playerPoint, playerAces);

    goBtn = false;
    document.querySelector(".hidden").src = "./assets/images/" + flip + ".png";

    let message = "";
    if (playerPoint > 21) {
        message = "The dealer won!";
    } else if (dealerPoint > 21) {
        message = "You outplayed the dealer!";
    } else if (playerPoint == dealerPoint) {
        message = "It is a draw!";
    } else if (playerPoint > dealerPoint) {
        message = "You outplayed the dealer!";
    } else if (playerPoint < dealerPoint) {
        message = "The dealer won!";
    }
    document.querySelector(".dealer-points").innerText = dealerPoint;
    document.querySelector(".player-points").innerText = playerPoint;
    document.querySelector(".results").innerText = message;
}

// For dialog box to open and close
let dialog = document.querySelector(".dial");
let openDialog = document.querySelector(".open");
let closeDialog = document.querySelector(".close");

openDialog.addEventListener('click', () => {
    dialog.show();
});

closeDialog.addEventListener('click', () => {
    dialog.close();
});

/* 
 *This function takes a card and uses the dash with value and type
 *to produce a card. We are splitting the values and gets an array,
 *for example q-c
 */
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

/* 
 *Checks for an ace. It takes a card checks if it is an ace
 *then returns 1 or 0
 */
function scanAce(image) {
    if (image[0] === "a") {
        return 1;
    }
    return 0;
}

/**
 *Function to check if ace is worth 10 or 1 if under 21
 */
function smallAce(playerPoint, playerAces) {
    while (playerPoint > 21 && playerAces > 0) {
        playerPoint -= 10;
        playerAces -= 1;
    }
    return playerPoint;
}

/*
 * Function to play the game again by pressing the restart button
 */
function playAgain() {
    document.querySelector('.startover').addEventListener('click', function () {
        window.location.reload();
        return false;
    });
}