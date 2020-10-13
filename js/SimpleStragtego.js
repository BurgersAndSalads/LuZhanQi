let turn;
const imgBest = "img/Best.png";
const imgWorst = "img/Worst.png";
const imgFlag1 = "img/Flag1.png";
const imgFlag2 = "img/Flag2.png";
let player1Pool = [];
let player2Pool = [];
let cache;
const bestUrl = `url("${imgBest}")`;
const worstUrl = `url("${imgWorst}")`;
const flag1Url = `url("${imgFlag1}")`;
const flag2Url = `url("${imgFlag2}")`;
let travel;
const banner = document.querySelector(".banner");
const btn = document.querySelector("button");
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
    let start = parseInt(element.id);
    if(element.id != "game-board") {
        if(player1Pool.length != 0 || player2Pool.length != 0) {                                    
            if(element.style.backgroundImage == "") {
                if(player1Pool.length != 0) {
                    placement(player1Pool, element);
                } else {
                    placement(player2Pool, element)
                }
            }
                                                                  
        } else {
            if (travel[0] != start) {                                                                                    
                travel.push(start)
            }
            if (turn == 1) {                                                                        
                if(element.hasAttribute("style") && element.style.backgroundImage != flag2Url) {                            
                    if (element.style.backgroundImage == flag1Url) {
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []                                 
                        return
                    } else if(element.style.backgroundImage != bestUrl){                            
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []
                        return
                    } else if(cache.length == 0) {                                                                                                  // allow for selecting a piece if there is none selected
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
                    !document.getElementById(`${travel[0]}`).classList.contains(document.getElementById(`${travel[1]}`).classList.item(1))) {       // only allow moving one tile at a time horizontally, cant go through the edge
                        if(!element.hasAttribute("style")) {
                            element.style.backgroundImage = cache[0]                                                                                // place the cached piece on the new tile
                            cache.shift()
                            travel = [];
                            turn = turn * -1;
                        } else if(element.style.backgroundImage == flag2Url) {
                            element.style.backgroundImage = cache[0]
                            document.getElementById("winner").innerText = "blue wins"
                            displayWinner();
                        }
                    } else if(Math.abs(travel[0] - travel[1]) == 4) {                                                                               // only allow moving vertically one tile at a time
                        if(!element.hasAttribute("style")) {
                            element.style.backgroundImage = cache[0]                                                                                // place the cached piece on the new tile
                            cache.shift()
                            travel = [];
                            turn = turn * -1;
                        } else if(element.style.backgroundImage == flag2Url) {
                            element.style.backgroundImage = cache[0]
                            document.getElementById("winner").innerText = "blue wins"
                            displayWinner();
                        }
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
                    if(travel.length == 1) {
                        let current = document.getElementById(`${travel[0]}`);
                        current.style.backgroundImage = cache[0];
                        cache.shift()
                        travel = []
                    }
                }
            } else {                                                                                
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

function displayWinner() {
    banner.style.display = "block";
}

btn.addEventListener('click', initialize);