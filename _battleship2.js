let view = {
    displayMessage: function (msg) {
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    
    displayHit: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },

    displayMiss: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
}

let model = {
    boardSize: 7,
    numShips: 3,
    shipsSunk: 0,
    shipLength: 3,
    
    ships: [
            { locations: [0, 0, 0], hits: ["","",""] },
            { locations: [0, 0, 0], hits: ["","",""] },
            { locations: [0, 0, 0], hits: ["","",""] },
        ], 

    fire: function (quess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            let index = ship.locations.indexOf(quess);
            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(quess);
                view.displayMessage("TRAFIONY!!!")
                if (this.isSunk(ship)) {
                    view.displayMessage("Zatopiłeś mój okręt :( ");
                    this.shipsSunk++
                }
                return true;
            }
        } 
        view.displayMiss(quess);
        view.displayMessage("Pudło :P");
        return false
    }, 

    isSunk: function(ship) {
        for (let i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false
            }
        } return true;
    },

    generateShipLocations: function() {
        let locations;
        for (let i = 0 ; i < this.numShips ; i++) {
            do {
                locations = this.generateShip();
            } while (this.collision(locations));
            this.ships[i].locations = locations;
        }
    },

    generateShip: function() {
        let direction = Math.floor(Math.random()*2);
        let row, col; 
        if (direction === 1) {
            row = Math.floor(Math.random()*this.boardSize);
            col = Math.floor(Math.random()*(this.boardSize - this.shipLength));
        } else {
            row = Math.floor(Math.random()*(this.boardSize - this.shipLength));
            col = Math.floor(Math.random()*this.boardSize);
        }

        let newShipLocations = [];
        for (let i = 0 ; i < this.shipLength ; i++) {
            if (direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            } else {
                newShipLocations.push((row + 1) + "" + col);
            }
        }
        return newShipLocations;
    },

    collision: function(locations) {
        for ( let i = 0 ; i < this.numShips ; i++) {
            let ship = model.ships[i];
            for ( let j = 0 ; j < locations.length ; j++ ) {
                if (ship.locations.indexOf(locations[j]) >= 0) {
                    return true;
                }
            }
        } return false;
    }
}

let controller = {
    quesses: 0,

    processGuess: function(quess) {
        let location = parseGuess(quess);
        if (location) {
            this.quesses++;
            let hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("Zatopiłeś wszystkie moje okręty, w " + this.quesses + " próbach.");
            }
        }

    }

}

function parseGuess (quess) {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (quess === null || quess.length !== 2) {
        alert("Ups, proszę wpisać literę i cyfrę.");
    } else {
        firstChar = quess.charAt(0);
        let row = alphabet.indexOf(firstChar);
        let column = quess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert("Ups, to nie są współrzędne!");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("Ups, pole poza planszą.");
        } else {
            return row + column;
        }
    } return null;
}

function handleFireButton() {
    let quessInput = document.getElementById("quessInput");
    let quess = quessInput.value; 
    controller.processGuess(quess);

    quessInput.value = "";
}

function init () {
    let fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    let quessInput = document.getElementById("quessInput");
    quessInput.onkeypress = handleKeyPress;
    model.generateShipLocations();
    alert ("Ja żyje!");
    }


function handleKeyPress(e) {
    let fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;

// view.displayMiss("00");
// view.displayHit("34");
// view.displayMiss("55");
// view.displayHit("12");
// view.displayHit("25");
// view.displayMiss("26")

// view.displayMessage("Halo Halo...Czy to coś działa?");

// model.fire("00");
// model.fire("06");
// model.fire("16");
// model.fire("26");
// model.fire("34");
// model.fire("24");
// model.fire("44");
// model.fire("12");
// model.fire("11");
// model.fire("10");

// console.log(parseGuess("A1"));
// console.log(parseGuess("Z1"));
// console.log(parseGuess("12"));
// console.log(parseGuess("aa"));
// console.log(parseGuess("G4"));
// console.log(parseGuess("F3"));

// controller.processGuess("A0");
// controller.processGuess("B0");
// controller.processGuess("C0");
// controller.processGuess("D0");
// controller.processGuess("D1");
// controller.processGuess("D2");
// controller.processGuess("D3");
// controller.processGuess("D4");
// controller.processGuess("D5");
// controller.processGuess("G3");
// controller.processGuess("G4");
// controller.processGuess("G5");