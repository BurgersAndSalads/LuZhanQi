let winner;
let turn;
let selected;
const imgBest = "img/Best.png";
const imgWorst = "img/Worst.png";
const imgFlag1 = "img/Flag1.png";
const imgFlag2 = "img/Flag2.png";
let board = [];
let cache;
const bestUrl = `url("${imgBest}")`
const worstUrl = `url("${imgWorst}")`
const flag1Url = 'url("img/Flag1.png")';
const flag2Url = 'url("img/Flag2.png")';
let travel = [];

// initialize the game, and call init on reset and winner
function initialize() {
    winner = 0;
    turn = 1;
    selected = null;
    board = [ 
        -1, -1, -1, -1,
        -1, -1, -1, -1,
        -1, -1, -1, -1,
        -1, -1, -1, -1
    ]    
    cache = [];
}
initialize();

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
let flag1   = new Piece('Flag1', 3, imgFlag1); //Caputure the flag to win
let flag2   = new Piece('Flag2', 3, imgFlag2)

let player1Pool = [
    best,
    best,
    best,
    flag1
];
let player2Pool = [
    worst,
    worst,
    worst,
    flag2
];

const boardElement = document.getElementById("game-board");
boardElement.addEventListener('click', game);

// game flow , main function
function game(event) {
    let element = event.target;
    let start = parseInt(element.id);
    debugger
    if(element.id != "game-board") {
        if(player1Pool.length != 0 || player2Pool.length != 0) {                                    // placing pieces upon game start
            if(element.style.backgroundImage == "") {
                if(player1Pool.length != 0) {
                    placement(player1Pool, element);
                } else {
                    placement(player2Pool, element)
                }
            }
            // placePiecesOnGameStart(event);                                                          // call placement function
        } else {
            if (travel[0] != start) {                                                                                    // if all players placed their pieces
                travel.push(start)
            }
            if (turn == 1) {                                                                        // if it is player 1 turn
                if(element.hasAttribute("style")) {                            // check if there is a piece on the selected tile
                    if (element.style.backgroundImage == flag1Url) {
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []                                 // cannot move flag
                        return
                    } else if(element.style.backgroundImage != bestUrl){                            // cannot move opponent piece
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []
                        return
                    } else if(cache.length == 0) {                                                  // allow for selecting a piece if there is none selected
                        cache[0] = element.style.backgroundImage;
                        element.removeAttribute("style");
                    } else {
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []
                    }
                } else {
                    if(!element.hasAttribute("style")) {                                            // if there is a piece selected                        
                        if(Math.abs(travel[0] - travel[1]) == 1 &&
                        !document.getElementById(`${travel[0]}`).classList.contains(document.getElementById(`${travel[1]}`).classList.item(1))) {      // only allow moving one tile at a time horizontally, cant go through the edge
                            element.style.backgroundImage = cache[0]                                // place the cached piece on the new tile
                            cache.shift()
                            travel = [];
                        } else if(Math.abs(travel[0] - travel[1]) == 4) {                           // only allow moving vertically one tile at a time
                            element.style.backgroundImage = cache[0]                                // place the cached piece on the new tile
                            cache.shift()
                            travel = [];
                        } else if (element.style.backgroundImage == bestUrl) {
                            let current = document.getElementById(`${travel[0]}`);
                            current.style.backgroundImage = cache[0];
                            cache.shift()
                            travel = []
                        } else if(element.style.backgroundImage == flag1Url) {
                            let current = document.getElementById(`${travel[0]}`);
                            current.style.backgroundImage = cache[0];
                            cache.shift()
                            travel = []
                        } else {
                            let current = document.getElementById(`${travel[0]}`);
                            current.style.backgroundImage = cache[0];
                            cache.shift()
                            travel = []
                        }
                    } else if(travel.length == 1) {
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []
                    }
                }
            } else {                                                                                // if it is player 2 turn
                if(element.hasAttribute("style")){                                                  // exact same logic as player 1 turn
                    if (element.style.backgroundImage == flag2Url) {
                        return
                    } else if(element.style.backgroundImage != worstUrl){
                        return
                    } else if (cache.length != 1) {
                        cache[0] = element.style.backgroundImage;
                        element.removeAttribute("style");                        
                    }
                } else {
                    if(cache.length > 0) {
                        element.style.backgroundImage = cache[0]
                        cache.shift()
                    } 
                }
            }
        }
    }
}


// placement logic
function placePiecesOnGameStart(event) {
    let element = event.target
    if(event.target.style.backgroundImage == "") {
        if(player1Pool.length > 0) {
            placement(player1Pool, element);
        }else if(player2Pool.length > 0) {
            placement(player2Pool, element);
        }
    }
}

// placing player pieces upon game start
function placement(pool, element) {
    element.style.backgroundImage = `url("${pool[0].img}")`
    pool.shift();
}



// //  movement logic, check for available moves
// function checkAvalaibleMoves(event, selected) {
//     let destId = parseInt(event.target.id)
//     if(board[destId - 4] === -1) {
//         selected.up = true;
//     }
//     if(board[destId + 4] === -1) {
//         selected.down = true;
//     }
//     if(board[destId - 1] === -1 &&
//        board[destId - 1].classList.contains("edge") !== true) {
//         selected.left = true;
//     }
//     if(board[destId + 1] === -1 &&
//        board[destId + 1].classList.contains("edge") !== true) {
//         selected.right = true;
//     }
// }






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