
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

let boardEl = document.getElementById("game-board");
boardEl.addEventListener('click', game);


function game(event) {
    let cellElement = event.target
    if(event.target.style.backgroundImage == "") {
        if(player1Pool.length > 0) {
            placement(player1Pool, cellElement);
        } else {
            placement(player2Pool, cellElement);
        }
    } else if(event.target.style.backgroundImage != "") {
        if(turn == 1){
            player1 = event.target.style.backgroundImage;
            // player1Pool
            event.target.style.backgroundImage = "";
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