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
        for (let i = 0; i < this.numShips; i++){     // <-- исправлено на 0
            let ship = this.ships[i];
            let locations = ship.locations;          // <-- исправлено

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

window.onload = function() {
    model.fire("53"); // проверка
    model.fire("10");
    model.fire("11");
    model.fire("12");
    

};
