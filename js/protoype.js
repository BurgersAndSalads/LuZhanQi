// this is a prototype version of the main game
// will demostrate basic functionalities
// main game will be expanded with complexity

// general flow is the same as the main game

// initialize the setup, and allow for reinitialization for restarts

function initialize() {

    let board = [
        [-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]
    ]

    let turn = 1;
    let winner = false;

    // there should be more variables here, add as necessary
}


// define the pieces and their functions

class Piece {
    constructor(name, rank, amount) {
        this.name = name;
        this.rank = rank;
        this.amount = amount;
    }
}

let best    = new Piece('Best',     1, 1); //Best piece
let worst   = new Piece('Worst',    2, 2); //Worst piece
let flag    = new Piece('Flag',     2, 1); //Caputure the flag to win


// define board nodes

class Node {
    
    // node contains the information of, coordinate, node occupation status
    constructor(coordinate, occupation) {
        // default occupation should be none or -1
        this.coordinate = coordinate;
        this.occupation = occupation;
    }

    // nodes should be "aware" of its surroundings,
    connection() {
        
    }
    
    // check if immediate connected nodes are occupied
    // check if immediate connected nodes connection type
    // hold node information, update upon move||combat
}

// placing pieces
// 1. total number of pieces , total number of per type
//    can assign placing pieces in order, from a pre-determined array
//    take away pieces when piece is placed
//    notify user what piece is placed next, visual table
//    this will need adding setup params in initialization

// 2. involing DOM events, click to select from a table of items
//    click on the node will remove item from table, and place to board


// game flow

function takeTurn() {
    // moving pieces
    // click event, remove piece from selected node to the new node
    // add confirmation

    // game logic
    // check if move is legal, if the node is occupied by friendly
    // if the node is traversable
    // if node is occupied by opponent, do comparison check, 
    
    // while checking, checks will go through one by one, 
    // art can be updated, so it looks like the pieces is going from node to node, weave in sound and animation

    // special rules apply --- special pieces, and check for winner
    // if winner determined, annoucement, terminate game
    // check for restart, re-initialize game

    // after all checks pass, update node information
    
    // otherwise, scream at user
   
    // change player
    turn = turn * -1;
}


