
// this is a prototype version of the main game
// will demostrate basic functionalities
// main game will be expanded with complexity
// general flow is the same as the main game

// initialize the setup, and allow for reinitialization for restarts
let board;
let winner;
let turn;
let cachedImg;
let x;
let y;
let imgBest = "img/Best.png";
let imgWorst = "img/Worst.png";
let imgFlag = "img/Flag.png";

function initialize() {
    turn = 1;
    winner = false;
    cachedImg = "";
    // there should be more variables here, add as necessary
}
initialize();


// define the pieces and their functions
class Piece {
    constructor(name, rank, img) {
        this.name = name;
        this.rank = rank;
        this.img = img;
    }
}
let best    = new Piece('Best',  1, imgBest);  //Best piece
let worst   = new Piece('Worst', 2, imgWorst); //Worst piece
let flag    = new Piece('Flag',  3, imgFlag);  //Caputure the flag to win

// array to hold player pieces
let player1Img = [best.img, worst.img, worst.img, flag.img];
let player2Img = [best.img, worst.img, worst.img, flag.img];

// game flow
let gameBoardEl = document.getElementById('game-board');
gameBoardEl.addEventListener('click', game);
function game(event) {
    x = event.target.id.charAt(1);
    y = event.target.id.charAt(0);
    console.log(x, y);

    // placing pieces
    // pieces are held in an array, and placed in the specified order
    if (event.target.id.innerHTML == "") {
        if(turn == 1){
            if (player1Img.length > 0) {
                placement(player1Img, event, x, y);
            } else if (player1Img.length == 0) {
            
            }
        } else if(turn == -1){
            if (player2Img.length > 0) {
                placement(player2Img, event, x, y);
            } else if (player2Img.length == 0) {

            }
        }
    }

    // taking turns
     

    // change player
    turn = turn * -1;

}


// -----------------------------------------
// start of the utility functions
// -----------------------------------------
// piece placement function
function placement(holder, event, x, y) {
    let img = document.createElement('img');
    if (holder.length > 0) {
        img.setAttribute('src', holder[0]);
        img.setAttribute('id', toString(x) + toString(y))
        event.target.appendChild(img);
        holder.shift();
    }
}
// -------------------------------------------
// child element saved to cachedImg then removed from parent
function remover(event) {
    cachedImg = event.target.firstElementChild('img');
    event.target.removeChild();
}
// -------------------------------------------------------
// child adder from cachedImg
function adder(event) {
    event.target.appendChild(cachedImg);
}