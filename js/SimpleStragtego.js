
// initialize necessary variables
let turn;                                           // cache turn counter
const imgBest = "img/Best.png";       
const imgWorst = "img/Worst.png";
const imgFlag1 = "img/Flag1.png";
const imgFlag2 = "img/Flag2.png";
let player1Pool = [];                               // player1 Piece pool
let player2Pool = [];                               // player2 Piece pool
let cache;                                          // used for caching selected piece
const bestUrl = `url("${imgBest}")`;
const worstUrl = `url("${imgWorst}")`;
const flag1Url = `url("${imgFlag1}")`;
const flag2Url = `url("${imgFlag2}")`;
let travel;                                         // array for calculating pathing logic
const banner = document.querySelector(".banner");
const btn = document.querySelector("button");
const cells = document.querySelectorAll("td");      // select all the grid cells  

class Piece {                                       // pretty useless for now
    constructor(name, rank, img) {                  // current purpose is to hold image property of the pieces
        this.name = name;
        this.rank = rank;
        this.img = img;
    }
}

let best    = new Piece('Best',  1, imgBest);  //player1 piece
let worst   = new Piece('Worst', 2, imgWorst); //player2 piece
let flag1   = new Piece('Flag1', 3, imgFlag1); //Caputure the flag to win
let flag2   = new Piece('Flag2', 3, imgFlag2); 

// initialize the game, and call init on reset and winner
function initialize() {
    turn = 1;
    cache = [];
    travel = [];
    banner.style.display = "none";
    player1Pool = [
        best,
        best,
        best,
        flag1
    ];
    player2Pool = [
        worst,
        worst,
        worst,
        flag2
    ];
    cells.forEach(e => {
        e.removeAttribute("style");
    });
}
initialize();


const boardElement = document.getElementById("game-board");
boardElement.addEventListener('click', game);

// game flow , main function
function game(event) {
    let element = event.target;
    let start = parseInt(element.id);                                                                                                               // store the selected grid into memory
    if(element.id != "game-board") {                                                                                                                // this is here to prevent clicking on outside the grid
        if(player1Pool.length != 0 || player2Pool.length != 0) {                                                                                    // if both playerPool is empty, placement phase is over                                    
            if(element.style.backgroundImage == "") {                                                                                               // can only put pieces in empty grids
                if(player1Pool.length != 0) {                                                                                                       // player1 place their 4 pieces first
                    placement(player1Pool, element);
                } else {                                                                                                                            // player2 wait for their turn when p1 finishes
                    placement(player2Pool, element)
                }
            }
                                                                  
        } else {
            if (travel[0] != start) {                                                                                                               // check if the starting grid is the same as the landing grid                                                                                    
                travel.push(start)
            }
            if (turn == 1) {                                                                                                                        // player1 go first, player2 logic is exactly the same                                                                        
                if(element.hasAttribute("style") && element.style.backgroundImage != flag2Url) {                                                    // if the selected grid has any piece in it, and if its not the enemy flag                            
                    if (element.style.backgroundImage == flag1Url) {                                                                                // cant capture your own flag
                        let current = document.getElementById(`${travel[0]}`);                                                                      // get the starting grid
                        current.style.backgroundImage = cache[0];                                                                                   // put the piece back where it came from
                        cache.shift()                                                                                                               // clear cache
                        travel = []                                                                                                                 // clear pathing memory
                        return                                                                                                                      // end the fuction, try again
                    } else if(element.style.backgroundImage != bestUrl){                                                                            // cant fight your own pieces either, stop it
                        let current = document.getElementById(`${travel[0]}`);                                                                      // same thing, get grid, cache piece, then put it back
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []
                        return                                                                                                                      // try again, stop trying to kill yourself
                    } else if(cache.length == 0) {                                                                                                  // allow for selecting a piece if there is none selected
                        cache[0] = element.style.backgroundImage;                                                                                   // cache the piece
                        element.removeAttribute("style");                                                                                           // remove the piece from grid, its in the void now
                    } else {                                                                                                                        // catch all for some unforseen bug, put the piece back if it happens
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []
                    }
                } else {                                                                                                                            // so if its not the ally pieces, or enemy flag
                                                                                                                                         
                    if(Math.abs(travel[0] - travel[1]) == 1 &&                                                                                      // calculating horizontal movement, difference between id is always 1
                    !document.getElementById(`${travel[0]}`).classList.contains(document.getElementById(`${travel[1]}`).classList.item(1))) {       // cant teleport through the edge
                        if(!element.hasAttribute("style")) {                                                                                        // if theres nothing in the landing grid
                            element.style.backgroundImage = cache[0]                                                                                // place the cached piece on the new tile
                            cache.shift()                                                                                                           // clear memory
                            travel = [];
                            turn = turn * -1;                                                                                                       // legal move resolved, pass turn
                        } else if(element.style.backgroundImage == flag2Url) {                                                                      // if you run into the enemy flag
                            element.style.backgroundImage = cache[0]                                                                                // stomp on it
                            document.getElementById("winner").innerText = "blue wins"                                                               // somebody is a winner
                            displayWinner();                                                                                                        // yey
                        }
                    } else if(Math.abs(travel[0] - travel[1]) == 4) {                                                                               // only allow moving vertically one tile at a time
                        if(!element.hasAttribute("style")) {                                                                                        // performing the same check as above, see if theres no one home
                            element.style.backgroundImage = cache[0]                                                                                // place the cached piece on the new tile, clear memory, pass turn
                            cache.shift()
                            travel = [];
                            turn = turn * -1;
                        } else if(element.style.backgroundImage == flag2Url) {                                                                       // check if vertically moving captures the flag, rest is history
                            element.style.backgroundImage = cache[0]
                            document.getElementById("winner").innerText = "blue wins"
                            displayWinner();
                        }
                    } else if (element.style.backgroundImage == bestUrl) {                                                                           // the next four if statements are weird, and repetitive
                        let current = document.getElementById(`${travel[0]}`);                                                                       // theoretically they dont need to be there
                        current.style.backgroundImage = cache[0];                                                                                    // but im too scared to chage anything at this point
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
                    if(travel.length == 1) {                                                                                                          // check if the piece ever moved, i think.
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []
                    }
                }
            } else {                                                                                                                                  // if its player2 turn, same logic as p1
                if(element.hasAttribute("style") && element.style.backgroundImage != flag1Url) {                                                  
                    if (element.style.backgroundImage == flag2Url) {
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []
                        return
                    } else if(element.style.backgroundImage != worstUrl){
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []
                        return
                    } else if (cache.length == 0) {
                        cache[0] = element.style.backgroundImage;
                        element.removeAttribute("style");                        
                    } else {
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []
                    }
                } else {                      
                    if(Math.abs(travel[0] - travel[1]) == 1 &&
                    !document.getElementById(`${travel[0]}`).classList.contains(document.getElementById(`${travel[1]}`).classList.item(1))) {
                        if(!element.hasAttribute("style")) {
                            element.style.backgroundImage = cache[0]                                
                            cache.shift()
                            travel = [];
                            turn = turn * -1;
                        } else if(element.style.backgroundImage == flag1Url) {
                            element.style.backgroundImage = cache[0]
                            document.getElementById("winner").innerText = "red wins"
                            displayWinner();
                        }
                    } else if(Math.abs(travel[0] - travel[1]) == 4) {
                        if(!element.hasAttribute("style")) {                           
                        element.style.backgroundImage = cache[0]                                
                        cache.shift()
                        travel = [];
                        turn = turn * -1;
                        } else if(element.style.backgroundImage == flag1Url) {
                            element.style.backgroundImage = cache[0]
                            document.getElementById("winner").innerText = "red wins"
                            displayWinner();
                        }
                    } else if (element.style.backgroundImage == worstUrl) {
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []
                    } else if(element.style.backgroundImage == flag2Url) {
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
                    if(travel.length == 1) {
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []
                    } 
                }
            }
        }
    }
}




// placing player pieces upon game start
function placement(pool, element) {
    element.style.backgroundImage = `url("${pool[0].img}")`
    pool.shift();
}

// called when winner is determined
function displayWinner() {
    banner.style.display = "block";
}

btn.addEventListener('click', initialize);


/*
favourite function?
hard to say, probably the game function here, that can be much MUCH dry-er
it will be a fun (maybe) time to try and truncate the code, function variable scope is going to be a big issue


biggest challenge and key takeways
trying too hard to do weird things
simplicity gets the job done, but anything fancier adds points of failure
i was too focused on how to get the most efficient code and employ the best methods
but in the process of looking too deep i get lost in the code itself, and confuses myself in the process
much more reading needs to be done
the challenge is to look at what can be simplified to get the MVP
*/