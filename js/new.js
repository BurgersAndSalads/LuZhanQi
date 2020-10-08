
let winner = 0;
let turn = 1;
let imgBest = "img/Best.png";
let imgWorst = "img/Worst.png";
let imgFlag = "img/Flag.png";

let board = [ 
    -1, -1, -1, -1,
    -1, -1, -1, -1,
    -1, -1, -1, -1,
    -1, -1, -1, -1
]

class Piece {
    constructor(name, rank, img, faction) {
        this.name = name;
        this.rank = rank;
        this.img = img;
        this.faction = faction;
    }
}
let best    = new Piece('Best',  1, imgBest);  //Best piece
let worst   = new Piece('Worst', 2, imgWorst); //Worst piece
let flag    = new Piece('Flag',  3, imgFlag);  //Caputure the flag to win

let player1Starting = [
    best,
    worst,
    worst,
    flag
];
let player2Starting = [
    best,
    worst,
    worst,
    flag
];


let boardEl = document.getElementById("game-board");
boardEl.addEventListener('click', game);

function game(event) {
    console.log(event.target.id);
    let = 
    console.log(document.querySelector(`td${#event.target.id}`));
    if(document.querySelector('td#event.target.id').innerHTML == "") {
        placement(player1Starting, event);
    }
}


function placement(holder, event) {
    let img = document.createElement('img');
    if (holder.length > 0) {
        img.setAttribute('src', holder[0]);
        event.target.appendChild(img);
        holder.shift();
    }
}