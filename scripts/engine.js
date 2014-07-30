/* When whole ship is hit, show it using changed graphics */
function sinkShip(grid, shipno, ispc) {
    var y, x;
    for (y = 0; y < gridx; ++y) {
        for (x = 0; x < gridx; ++x) {
            if (grid[y][x][1] == shipno) {
                if (ispc) {
                    setupImages(y, x, computer[y][x][2], true);
                }
                else {
                    setupImages(y, x, player[y][x][2], false);
                }
            }
        }
    }
}

/* Show location of all the computers ships - when player has lost */
function knowYourEnemy() {
    var y, x;
    for (y = 0; y < gridx; ++y) {
        for (x = 0; x < gridx; ++x) {
            if (computer[y][x][0] == 103) {
                setupImages(y, x, computer[y][x][2], true);
            }
            else if (computer[y][x][0] < 100) {
                setupImages(y, x, computer[y][x][0], true);
            }
        }
    }
}

/* Show how many ships computer has left */
function updateStatus() {
    var f = false, i, s = "Computer has ";

    for (i = 0; i < computersships.length; ++i) {
        if (computersships[i][1] > 0) {
            f ? s = s + ", " : f = true;
            s = s + shiptypes[computersships[i][0]][0];
        }
    }
    if (!f) {
        s = s + "nothing left, thanks to you!";
    }

    statusmsg = s;
    window.status = statusmsg;
}

function setStatus() {
    window.status = statusmsg;
}

/* Start the game! */
(function () {
    require(['constants', 'render', 'interactions', 'ai'], function () {
        imagePreload();

        player = setupPlayer(false);
        computer = setupPlayer(true);

        var table = document.createElement('table');
        table.className = 'battleships';

        var tableTitle = table.insertRow(0);
        tableTitle.insertCell(0).textContent = 'Player\'s Fleet';
        tableTitle.insertCell(0).textContent = 'Computer\'s Fleet';

        var tableGame = table.insertRow(1);
        var playerField = tableGame.insertCell(0);
        var enemyField = tableGame.insertCell(1);

        showGrid(true, playerField);
        showGrid(false, enemyField);

        document.body.appendChild(table);

        updateStatus();
        setInterval("setStatus();", 1000);
    });

}());
