'use stict'

var bg;
var gap = 3;    //gap for cells
var cellSize = 80;
var discLayer;
var turn = 1;
var scoreLabel;

var discs = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
]

// ----------ONLOAD----------

window.onload = function() {
    bg = document.getElementById('bg');
    discLayer = document.getElementById('disc_div');
    scoreLabel = document.getElementById('score');

    bg.style.width = (cellSize*8) + (gap*9) + 'px';
    bg.style.height = (cellSize*8) + (gap*9) + 'px';
    bg.style.backgroundColor = 'black';

    drawTable();
    drawDiscs();
}

// ----------DRAW TABLE----------

function drawTable() {
    for (var row = 0; row < 8; row++) {
            for (var column = 0; column < 8; column++) {
            var td = document.createElement('div');

            td.style.position = 'absolute';
            td.style.width = cellSize + 'px';
            td.style.height = cellSize + 'px';
            td.style.backgroundColor = 'green';
            td.style.left = (cellSize+gap)*column + gap + 'px';
            td.style.top = (cellSize+gap)*row + gap + 'px';

            td.setAttribute('onclick', 'clickTd('+row+', '+column+')');

            bg.appendChild(td);
        }
    }
}

// ----------DRAW DISCS----------

function drawDiscs() {
    discLayer.innerHTML = '';
    for (var row = 0; row < 8; row++) {
        for (var column = 0; column < 8; column++) {
            
            var value = discs[row][column];

            if (value != 0) {
                var disc = document.createElement('div');

                disc.style.position = 'absolute';
                disc.style.width = cellSize-4 + 'px';
                disc.style.height = cellSize-4 + 'px';
                disc.style.borderRadius = '50%';
                disc.style.left = (cellSize+gap)*column + gap+2 + 'px';
                disc.style.top = (cellSize+gap)*row + gap+2 + 'px';

                if (value == 1) {
                    disc.style.backgroundColor = 'black';
                }
                if (value == 2) {
                     disc.style.backgroundColor = 'white';
                }

                discLayer.appendChild(disc);

            }

        }
    }
}

// ----------CLICK TD-----------

function clickTd(row, column) {
    console.log(row, column);

    if (discs[row][column] != 0) {
        return;
    }
    if (canClick(row, column)) {

        var availableDiscs = getAvailableDiscs(row, column);
        flipDiscs(availableDiscs);

        discs[row][column] = turn;
        //--- next turn ---
        if (turn == 1) turn = 2;
        else turn = 1;
        //--- /next turn ---
        drawDiscs();
        countScores();
    }
}

function countScores() {
    var black = 0;
    var white = 0;
    for (var row = 0; row < 8; row++) {
        for (var column = 0; column < 8; column++) {
            var value = discs[row][column];
            if (value == 1) {
                black ++;
            } else if (value == 2) {
                white ++;
            }
        }
    }
    scoreLabel.innerHTML = 'black: ' + black + ' white: ' + white;
}

function canClick(row, column) {
    var availableDiscs = getAvailableDiscs(row, column);
    if (availableDiscs.length != 0) return true;
    else return false;
}

function getAvailableDiscs(row, column) {
    var availableDiscs = [];

    // --- left ---
    var enemies = [];
    var columnCounter = column;
    while (columnCounter < 7) {
        columnCounter ++;
        var valueAtSpot = discs[row][columnCounter];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                availableDiscs = availableDiscs.concat(enemies);
            }
            break;
        } else {
            var discLocation = {row: row, column: columnCounter};
            enemies.push(discLocation);
        }
    }

    // --- rigth ---
    var enemies = [];
    var columnCounter = column;
    while (columnCounter > 0) {
        columnCounter --;
        var valueAtSpot = discs[row][columnCounter];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                availableDiscs = availableDiscs.concat(enemies);
            }
            break;
        } else {
            var discLocation = {row: row, column: columnCounter};
            enemies.push(discLocation);
        }
    }

    // --- up ---
    var enemies = [];
    var rowCounter = row;
    while (rowCounter > 0) {
        rowCounter --;
        var valueAtSpot = discs[rowCounter][column];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                availableDiscs = availableDiscs.concat(enemies);
            }
            break;
        } else {
            var discLocation = {row: rowCounter, column: column};
            enemies.push(discLocation);
        }
    }

    // --- down ---
    var enemies = [];
    var rowCounter = row;
    while (rowCounter < 7) {
        rowCounter ++;
        var valueAtSpot = discs[rowCounter][column];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                availableDiscs = availableDiscs.concat(enemies);
            }
            break;
        } else {
            var discLocation = {row: rowCounter, column: column};
            enemies.push(discLocation);
        }
    }

    // --- up right ---
    var enemies = [];
    var rowCounter = row;
    var columnCounter = column;
    while (rowCounter < 7 && columnCounter < 7) {
        rowCounter ++;
        columnCounter ++;
        var valueAtSpot = discs[rowCounter][columnCounter];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                availableDiscs = availableDiscs.concat(enemies);
            }
            break;
        } else {
            var discLocation = {row: rowCounter, column: columnCounter};
            enemies.push(discLocation);
        }
    }

    // --- down right ---
    var enemies = [];
    var rowCounter = row;
    var columnCounter = column;
    while (rowCounter > 0 && columnCounter < 7) {
        rowCounter --;
        columnCounter ++;
        var valueAtSpot = discs[rowCounter][columnCounter];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                availableDiscs = availableDiscs.concat(enemies);
            }
            break;
        } else {
            var discLocation = {row: rowCounter, column: columnCounter};
            enemies.push(discLocation);
        }
    }

    // --- up left ---
    var enemies = [];
    var rowCounter = row;
    var columnCounter = column;
    while (rowCounter < 7 && columnCounter > 0) {
        rowCounter ++;
        columnCounter --;
        var valueAtSpot = discs[rowCounter][columnCounter];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                availableDiscs = availableDiscs.concat(enemies);
            }
            break;
        } else {
            var discLocation = {row: rowCounter, column: columnCounter};
            enemies.push(discLocation);
        }
    }

    // --- down left ---
    var enemies = [];
    var rowCounter = row;
    var columnCounter = column;
    while (rowCounter > 0 && columnCounter > 0) {
        rowCounter --;
        columnCounter --;
        var valueAtSpot = discs[rowCounter][columnCounter];
        if (valueAtSpot == 0 || valueAtSpot == turn) {
            if (valueAtSpot == turn) {
                availableDiscs = availableDiscs.concat(enemies);
            }
            break;
        } else {
            var discLocation = {row: rowCounter, column: columnCounter};
            enemies.push(discLocation);
        }
    }

    return availableDiscs;
}

function flipDiscs(availableDiscs) {
    for (var i = availableDiscs.length - 1; i >= 0; i--) {
        var spot = availableDiscs[i];
        if (discs[spot.row][spot.column] == 1) {
            discs[spot.row][spot.column] = 2
        } else {
            discs[spot.row][spot.column] = 1
        }
    }
}
