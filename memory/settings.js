let cards = document.getElementById('nb-cartes');
let sCards = document.getElementById('cartes');

let timer = document.getElementById('timer');

let select = document.getElementById('select');

//Google
function convertNumToTime(number) {
    // Check sign of given number
    var sign = (number >= 0) ? 1 : -1;

    // Set positive value of number of sign negative
    number = number * sign;

    // Separate the int from the decimal part
    var minute = Math.floor(number);
    var decpart = number - minute;

    var min = 1 / 60;
    // Round to nearest minute
    decpart = min * Math.round(decpart / min);

    var seconds = Math.floor(decpart * 60);

    // Concate hours and minutes
    time = minute*60000 + seconds*1000;

    return time;
}



sCards.innerHTML=cards.value*4;
localStorage.setItem('nb-cards', 3);
localStorage.setItem('timer', false);
localStorage.setItem('time', 30000);

cards.onchange = function() {
    sCards.innerHTML=cards.value*4;
    localStorage.setItem('nb-cards', `${cards.value}`);
}

timer.onchange = function() {
    localStorage.setItem('timer', `${timer.checked}`);
}

select.onchange = function() {
    localStorage.setItem('time', convertNumToTime(select.value/2));
}
