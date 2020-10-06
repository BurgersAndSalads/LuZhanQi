

// build the board
function initialize(){

    // 2D array to track the data
    // setup initial board state
    let top = [
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1]
    ]; // 6x5 board on each side, i = 5 rows, j = 6 columns
    let bottom = [
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1]
    ]; // 6x5 board on each side, k = 5 rows, l = 6 columns

    // set player turn
    let turn = 1;

}; 

// define the pieces and their functions

class Piece {
    constructor(name, rank, amount) {
        this.name = name;
        this.rank = rank;
        this.amount = amount;
    }
}

// special rules
class Engineer extends Piece {
    // engineer can disable landmines, attack landmine and survive
    // enginner can travel using railroads with any valid route, doesnt have to be straight line
}

class Grenade extends Piece {
    // grenade will destroys itself upon collison
}

class Landmine extends Piece {
    // landmine cannot move
    // landmine can only be placed on the bottom 2 rows
    // landmine also destroys itself upon collison
    // engineers can kill it
}

class Flag extends Piece {
    // flag can only be placed inside headquaters
    // flag cannot move
    // capturing the flag decides a winner
}

class FieldMarshall extends Piece {
    // flag poisition is revealed when marshall dies
}


let fieldMarshall     = new FieldMarshall('Field Marshall', 2,  1); //司令
let general           = new Piece('General',                3,  1); //军长
let lieutenantGeneral = new Piece('Lieutenant General',     4,  2); //师长
let brigadier         = new Piece('Brigadier',              5,  2); //旅长
let colonel           = new Piece('Colonel',                6,  2); //团长
let major             = new Piece('Major',                  7,  2); //营长
let captain           = new Piece('Captain',                8,  3); //连长
let platoonCommander  = new Piece('Platoon Commander',      9,  3); //排长
let engineer          = new Engineer('Engineer',            10, 3); //工兵
let grenade           = new Grenade('Grenade',              0,  2); //炸弹
let landmine          = new Landmine('Landmine',            1,  3); //地雷
let flag              = new Flag('Flag',                    11, 1); //军旗

// define nodes
class Node {
    
}
// special nodes
// camp node
// coordinates, bottom side is not mirrored


/*
top[2][1];
top[2][3];
top[3][2];
top[4][1];
top[4][3];
bottom[1][1];
bottom[1][3];
bottom[2][2];
bottom[3][1];
bottom[3][3];
*/


// HQ node


/*
top[0][1];
top[0][3];
bottom[5][1];
bottom[5][3];
*/


// differentiate between roads and railroads
// for now, if travelling between these nodes, it is valid
// list of possible scenarios for a straight rail
// pieces can stop at any point btween these nodes
// engineer can travel along these routes in any way


/*
top[1][0] && top[1][4];
top[5][0] && top[5][4];
bottom[0][0] && bottom[0][4];
bottom[4][0] && bottom[4][4];
top[5][2] && bottom[0][2];
top[1][0] && bottom[4][0];
top[2][4] && bottom[4][4];
*/


// regular roads and diagonals moves

/*
top[0][0] && top[0][1];
top[0][0] && top[1][0];
top[0][1] && top[][];
top[][] && top[][];
top[][] && top[][];
top[][] && top[][];
top[][] && top[][];
top[][] && top[][];
*/


// place the pieces




// special thanks to Jack