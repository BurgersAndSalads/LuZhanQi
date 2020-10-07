
// this is a prototype version of the main game
// will demostrate basic functionalities
// main game will be expanded with complexity

// general flow is the same as the main game

// initialize the setup, and allow for reinitialization for restarts
let board;
let winner;
let turn;
let imgBest = "img/Best.png";
let imgWorst = "img/Worst.png";
let imgFlag = "img/Flag.png";
let gameBoard = document.getElementById('game-board');

function initialize() {

    board = [
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1],
        [-1, -1, -1, -1]
    ]

    turn = 1;
    winner = false;

    // there should be more variables here, add as necessary
}

initialize();


// define the pieces and their functions
// should add coordinates property
// i.e. i is y coordinate default at 0
//      j is x coordinate default at 0
class Piece {
    constructor(name, rank, img, x, y) {
        this.name = name;
        this.rank = rank;
        this.img = img;
        this.x = x;
    }
}

let best    = new Piece('Best',  1, imgBest, );  //Best piece
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

// placing pieces
// 1. total number of pieces , total number of per type
//    can assign placing pieces in order, from a pre-determined array
//    take away pieces when piece is placed
//    notify user what piece is placed next, visual table
//    this will need adding setup params in initialization

// 2. involing DOM events, click to select from a table of items
//    click on the node will remove item from table, and place to board


// game flow
document.addEventListener('click', takeTurn);

function takeTurn(event) {
    console.log(event.target.id.charAt(0), event.target.id.charAt(1));
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

    // placing the pieces
    if (event.target.id) {
        if(document.getElementById(event.target.id).innerHTML == "" ) {
            console.log('clicked empty');
            
            
            if (player1Img.length > 0) {
                let img = document.createElement('img');
                img.setAttribute('src',player1Img[0]);
                img.setAttribute('class', 'img');
                event.target.appendChild(img);
                player1Img.shift();
                return
            } 
            
            
            if (player2Img.length > 0) {
                let img = document.createElement('img');
                img.setAttribute('src',player2Img[0]);
                img.setAttribute('class', 'img');
                event.target.appendChild(img);
                player2Img.shift();
                return
            }


        } else if { // do the activation here
                alert('dont click between the grids!');
        }
    }
}


// function to calculate the start and destination vector
// put coordinate property in the piece object, origin, destination
function path(origin, destination) {
    let valid;
    if(origin == undefined || destination == undefined) {
        valid = false;
    } else if(origin == destination) {
        valid = false;
    } else if(false) {
        // this should check if there is a ally blocking path
        valid = false;
    } else {
        // pass all checks and pathing is valid
        valid = true;
    }
}

// going up vertically
// i is the y coordinate, column
// j is the x coordinate, row
function up(p) {
    p.y = p.y + 1;
}

function down(p) {
    p.y = p.y - 1; 
}

function left(p) {
    p.x = p.x - 1;
}

function right(p) {
    p.x = p.x + 1;
}

// DOM stuff  
// event listener to the nodes

// create a click event to activate the piece
// allow the activated piece to move
// place the activated piece to the new location
// deactivate the piece 

// the pieces should have coordinates properties in them
// maybe x and y are seperate, maybe array[y][x]

// select a piece thats already placed on the board
// the piece activates
// the activated piece has a starting coord
// click on the dest piece (can only move in straigh line for now)


