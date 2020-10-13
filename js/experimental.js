
// initialize the variable for caching the image
let cachedImg;

// click on an image to remove
document.addEventListener('click', remover);
function remover(event) {
    console.log(event.target);
    cachedImg = event.target.firstElementChild();
    event.target.removeChild();
}

// click again to place the cached image in a new location
document.addEventListener('click', adder);
function adder(event) {
    console.log(event.target);
    event.target.appendChild(cachedImg);
}

// ---------------------------------

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
        let targetId = document.getElementById(event.target.id);
        if(targetId.innerHTML == "" ) {
            console.log('clicked empty');
            
            if (player1Img.length > 0) {
                let img = document.createElement('img');
                img.setAttribute('src',player1Img[0]);
                img.setAttribute('class', 'img');
                event.target.appendChild(img);
                player1Img.shift();
                return
            } 
            // make this block into a function
            
            if (player2Img.length > 0) {
                let img = document.createElement('img');
                img.setAttribute('src',player2Img[0]);
                img.setAttribute('class', 'img');
                event.target.appendChild(img);
                player2Img.shift();
                return
            }
            

        } else if(targetId.innerHTML != "" ) {
            console.log('clicked occupied')
            
            if (player1Img.length == 0) {
                player1Img.push(targetId.getAttribute('src'));
                targetId.removeAttribute('src');
                return
            }


            if (player2Img.length == 0) {
                debugger
                player2Img.push(targetId.getAttribute('src'));
                targetId.removeAttribute('src');
                return
            }

            return
        } else {
            // do the activation here
            alert('dont click between the grids!');
        }
    }
}


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



// if it is player 1 turn
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




function notMoving(travel, cache) {
    let current = document.getElementById(`${travel[0]}`);
    current.style.backgroundImage = cache[0];
    cache.shift()
    travel = []
}