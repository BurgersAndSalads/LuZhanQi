
// this is a prototype version of the main game
// will demostrate basic functionalities
// main game will be expanded with complexity
// general flow is the same as the main game

// initialize the setup, and allow for reinitialization for restarts
let board;
let winner;
let turn;
let cachedImg;
let imgBest = "img/Best.png";
let imgWorst = "img/Worst.png";
let imgFlag = "img/Flag.png";
let gameBoard = document.getElementById('game-board');

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

// define board nodes
class Node {
    
    // node contains the information of, coordinate, node occupation status
    constructor(coordinate, occupation) {
        // default occupation should be none or -1
        this.coordinate = coordinate;
        this.occupation = occupation;
    }

    // nodes should be "aware" of its surroundings,
    // check if immediate connected nodes are occupied
    // check if immediate connected nodes connection type
    // hold node information, update upon move||combat
}

// game flow
document.addEventListener('click', game);
function game(event) {
    console.log(event.target.id.charAt(0), event.target.id.charAt(1));
    // placing pieces
    // pieces are held in an array, and placed in the specified order
    if (typeof event.target.id === "string") {
        let targetId = document.getElementById(event.target.id);
        if(!targetId.hasChildNodes()) {
            console.log('clicked empty');
            if(turn == 1){
                placement(player1Img, event);
            } else if(turn == -1){
                placement(player2Img, event);
            }
        } else if(targetId.hasChildNodes()) {
            console.log('clicked occupied')
            return
        } else {
            // do the activation here
            alert('dont click between the grids!');
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
function placement(holder, event) {
    let img = document.createElement('img');
    if (holder.length > 0) {
        img.setAttribute('src', holder[0]);
        img.setAttribute('class', 'img');
        event.target.appendChild(img);
        holder.shift();
        return
    }
}
// -------------------------------------------
// child elemenet saved to cachedImg and removed
function remover(event) {
    cachedImg = event.target.firstElementChild();
    event.target.removeChild();
}
// -------------------------------------------------------
// child adder from cachedImg
function adder(event) {
    event.target.appendChild(cachedImg);
}