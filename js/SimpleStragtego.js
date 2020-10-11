
let winner = 0;
let turn = 1;
const imgBest = "img/Best.png";
const imgWorst = "img/Worst.png";
const imgFlag = "img/Flag.png";

let board = [ 
    -1, -1, -1, -1,
    -1, -1, -1, -1,
    -1, -1, -1, -1,
    -1, -1, -1, -1
]

const cells = document.querySelectorAll("td")

class Piece {
    constructor(name, rank, img, faction, up = false, right = false, down = false, left = false) {
        this.name = name;
        this.rank = rank;
        this.img = img;
        this.faction = faction;
        this.up = up;
        this.down = down;
        this.left = left;
        this.right = right;
    }
}

let best    = new Piece('Best',  1, imgBest);  //Best piece
let worst   = new Piece('Worst', 2, imgWorst); //Worst piece
let flag    = new Piece('Flag',  3, imgFlag);  //Caputure the flag to win

let player1Pool = [
    best,
    worst,
    worst,
    flag
];
let player2Pool = [
    best,
    worst,
    worst,
    flag
];
let player1 = [];
let player2 = [];

const boardElement = document.getElementById("game-board");
boardElement.addEventListener('click', game);


function game(event) {

    if(player1Pool.length != 0 || player2Pool.length != 0) {
        placePiecesOnGameStart(event);
    }


}


function checkAvalaibleMoves(event, selected) {
    let destId = parseInt(event.target.id)
    if(board[destId - 4] === -1) {
        selected.up = true;
    }
    if(board[destId + 4] === -1) {
        selected.down = true;
    }
    if(board[destId - 1] === -1 &&
       board[destId - 1].classList.contains("edge") !== true) {
        selected.left = true;
    }
    if(board[destId + 1] === -1 &&
       board[destId + 1].classList.contains("edge") !== true) {
        selected.right = true;
    }
}

function placePiecesOnGameStart(event) {
    let cellElement = event.target
    if(event.target.style.backgroundImage == "") {
        if(player1Pool.length > 0) {
            placement(player1Pool, cellElement);
        }else if(player2Pool.length > 0) {
            placement(player2Pool, cellElement);
        }
    }
}


function placement(pool, element) {
    // let img = document.createElement('img');
    if (pool.length > 0) {
        // img.setAttribute('src', holder[0].img);
        element.style.backgroundImage = `url("${pool[0].img}")`
        // event.target.appendChild(img);
        pool.shift();
    }
}








/*
    New approach
    Set up the board as a single array
    Assign the pictures to their own rank
    Each player has starting pieces to place onto the board

    Update the board with the rank number when it is clicked on

    Show pictures to the corresponding number
    When the tile space is clicked, update the board data to (place holder 0) nothing
    When a tile with nothing in it is clicked, update the board state
    And the picture that was gone should show up again
    If the clicked tile is not empty
    First, check the tile is occupied by ally
        Then, nothing happens, the piece remains where it was
        And the user will have to go through the process again of moving
    Second, check the tile is occupied by enemy
        Compare the rank of the two 
        The bigger one will win and be the only picture on the tile



    Event is a snapshot


    Click on the cell element and remove the background image
    Click on the empty cell and place the image
*/