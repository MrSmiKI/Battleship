let view = {
    displayMessage(msg){
        let msgArea = document.getElementById("messageArea");
        msgArea.innerHTML = msg;
    },
    displayHit(location){
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss(location){
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};

let model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,

    ships: [
        {locations: ["06","16","26"], hits: ["","",""]},
        {locations: ["24","34","44"], hits: ["","",""]},
        {locations: ["10","11","12"], hits: ["","",""]}
    ],

    isSunk(ship) {
        return !ship.hits.includes("");
    },

    fire(guess){
        for (let i = 0; i < this.numShips; i++){     
            let ship = this.ships[i];
            let locations = ship.locations;          

            let index = locations.indexOf(guess);
            if (index >= 0){
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");

                if (this.isSunk(ship)){
                    view.displayMessage("You sank my battleship!");
                    this.shipsSunk++;
                }
                return true;
            }
        }

        view.displayMiss(guess);
        view.displayMessage("You missed.");
        return false;
    }
};

let controller = {
    guesses: 0,

    processGuess(guess){
        let location = parseGuess(guess);
        if(location){
            this.guesses++;
            let hit = model.fire(location);
            if(hit && model.shipsSunk == model.numShips){
                view.displayMessage(`You snak all my battleship, in ${this.guesses} guesses`);
            }
        }
    }
}

function parseGuess(guess){
    const alphabet = ["A", "B", "C", "D", "E"];

    if(guess == null || guess.length !=2){
        alert("Oop, please enter a letter and a nu,ber on the board");
    }else{
        let firtChar = guess.charAt(0);
        let row = alphabet.indexOf(firtChar);
        let column = guess.charAt(1);

        if(isNaN(column)){
            alert("Oops, that ins't on the board.");
        }else if(row < 0 || row >= model.boardSize || 
            column < 0 || column >= model.boardSize){
                alert("Oops, that's off the board");
        }else {
            return row + column;
        }
    }
    return null;
}

window.onload = function() {
    console.log(parseGuess("A0"));
    console.log(parseGuess("B2"));
    console.log(parseGuess("A7"));
    model.fire("53"); 
    model.fire("10");
    model.fire("11");
    model.fire("12");
    model.fire("34");
    model.fire("44");
    model.fire("54");
    model.fire("24");

};
