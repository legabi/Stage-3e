let cards = [];
let grid = [];
let click = [];
let clickedCards = [];
let score = 0;

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

function genCard(numberOfCards = 12) {
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
            elementIMG.setAttribute("style", "border-radius: 10px;")
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
    setTimeout(() => {firstCard.setAttribute("src", "images/blank.png");}, 200);
    firstCard.setAttribute("class", "card");

    secondCard = document.getElementById(click[1]);
    setTimeout(() => {secondCard.setAttribute("src", "images/blank.png");}, 200);

    secondCard.setAttribute("class", "card");

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
            document.getElementById("score").innerHTML=score;

            firstCard = document.getElementById(click[0]);
            firstCard.removeEventListener(`click`, () => flipCard());

            secondCard = document.getElementById(click[1]);
            secondCard.removeEventListener(`click`, () => flipCard());

            click = [];
            clickedCards = [];
        } else {
            setTimeout(() => resetCard(), 500);
        }

    }

    if (score === nbCards*4/2){
        let win = document.createElement("p");
        win.innerHTML="Vous avez gagné !";
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
    }
}

function reloadGame(){
    window.location.href = document.location.href;
}


try {
    genCard(nbCards*4);
    shuffle(cards);
    createBoard();
}catch (error){
    console.error(error);
}
