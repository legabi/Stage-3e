let cards = [];
let grid = [];
let click = [];
let clickedCards = [];
let score1 = 0;
let score2 = 0;
let score = score1 + score2;
let player = 1;

let timerElement = document.getElementById('timer');
let timer = localStorage.getItem('timer');
let time = localStorage.getItem('time');
let timerTitle = document.createElement("h2");
let timerSpan = document.createElement("span");
let timerEnable = false;
let id;


//Google
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

if (timer !== null && time !== null) {
    if (timer == "true") {
        timerTitle.innerHTML = "Temps: ";

        timerSpan.innerHTML = millisToMinutesAndSeconds(time);

        timerTitle.appendChild(timerSpan);
        timerElement.appendChild(timerTitle);
    }
}

class Card {
    name = "";
    img = "";
    constructor (name, img) {
        this.name = name;
        this.img = img;
    }
}

let nbCards = 3;
if (localStorage.getItem('nb-cards') !== null){
    nbCards = parseInt(localStorage.getItem('nb-cards'));
}

//Google
function strRandom(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() *
 charactersLength));
   }
   return result;
}

//Google aussi
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

function decrementTimer(){
    if (timerEnable === false) {
        return;
    }
    time = time-1000;
    timerSpan.innerHTML = millisToMinutesAndSeconds(time);
    if(time <= 0) {
        resetCard();
        if (player === 1) {
            player = 2;
        } else {
            player = 1;
        }
        document.getElementById("player").innerHTML=player;
        startTimer();
        clearInterval(id);
    }
}

function startTimer() {
    try {
        time = localStorage.getItem('time');
        timerSpan.innerHTML = millisToMinutesAndSeconds(time);
        if (timer !== null && time !== null) {
            if (timer == "true") {
                id = setInterval(decrementTimer, 1000);
            }
        }
        
    }catch (error){
        console.error(error);
    }
    
    
}

function genCard(numberOfCards) {
    for(i=1; i <= numberOfCards / 2; i++) {
        let ncard = new Card(strRandom(5), `images/${i}.png`);
        cards.push(ncard);
        cards.push(ncard);
    }
}

function createBoard() {
    let b = 0;
    for (i=1; i<=nbCards; i++){
        for (a=1; a<=4; a++){
            let card = cards[b];
            grid[b] = card;
            let elementIMG = document.createElement("img");
            elementIMG.setAttribute("src", "images/blank.png");
            elementIMG.setAttribute("id", b);
            elementIMG.setAttribute("style", "border-radius: 10px;");
            elementIMG.setAttribute("class", "card");
            elementIMG.addEventListener(`click`, () => flipCard(elementIMG));


            let elementGrid = document.getElementsByClassName("grid")[0];
            let line = elementGrid.getElementsByClassName(`l${i}`)[0];
            line.appendChild(elementIMG);
            b += 1;
        }
    }
}

function resetCard(){
    firstCard = document.getElementById(click[0]);
    if (firstCard !== null) {
        setTimeout(() => {firstCard.setAttribute("src", "images/blank.png");}, 200);
        firstCard.setAttribute("class", "card");
    }

    secondCard = document.getElementById(click[1]);
    if (secondCard !== null) {
        setTimeout(() => {secondCard.setAttribute("src", "images/blank.png");}, 200);
        secondCard.setAttribute("class", "card");
    }

    click = [];
    clickedCards = [];
}

function flipCard(element) {
    if (click.length === 2){
        return;
    }

    card = grid[element.getAttribute("id")];
    setTimeout(() => {element.setAttribute("src", card.img);}, 200);
    element.setAttribute("class", "card-return card");
    click.push(element.getAttribute("id"));
    clickedCards.push(card);

    if (click.length === 2) {
        if (clickedCards[0] === clickedCards[1]) {
            score++;
            if (player === 1){
                score1++;
                document.getElementById(`score${player}`).innerHTML=score1;
            } else {
                score2++;
                document.getElementById(`score${player}`).innerHTML=score2;
            }

            firstCard = document.getElementById(click[0]);
            firstCard.removeEventListener(`click`, () => flipCard());

            secondCard = document.getElementById(click[1]);
            secondCard.removeEventListener(`click`, () => flipCard());

            click = [];
            clickedCards = [];
        } else {
            setTimeout(() => resetCard(), 900);
            if (player === 1) {
                player = 2;
            } else {
                player = 1;
            }
        }

        document.getElementById("player").innerHTML=player;

        setTimeout(() => {
            startTimer();
            clearInterval(id);
        }, 800);
        
    }

    if (score === nbCards*4/2){
        let win = document.createElement("p");
        if (score1 > score2) {
            win.innerHTML=`Le joueur 1 gagné !`;
        } else if (score2 > score1) {
            win.innerHTML=`Le joueur 2 gagné !`;
        } else {
            win.innerHTML=`Les deux joueurs ont gagné !`;
        }
        win.setAttribute("class", "text win");

        let button = document.createElement("button");
        button.innerHTML="Rejouer";
        button.setAttribute("onclick", "reloadGame()");

        let menu = document.createElement("a");
        menu.innerHTML="Retour au menu";
        menu.setAttribute("class", "button-win");
        menu.setAttribute("href", "./");

        let div = document.getElementById("blur");
        div.setAttribute("class", "blur");
        div.appendChild(win);
        div.appendChild(button);
        div.appendChild(menu);
        timerEnable = false;
    }
}

function reloadGame(){
    window.location.href = document.location.href;
}

genCard(nbCards*4);
shuffle(cards);

document.getElementById("player").innerHTML=player;

try {
    createBoard();
}catch (error){
    console.error(error);
}

timerEnable = true;
startTimer();
