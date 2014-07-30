/* Handler for clicking on the grid */
function gridClick(y, x) {
    if (playflag) {
        if (computer[y][x][0] < 100) {
            setupImages(y, x, 103, true);
            var shipno = computer[y][x][1];

            if (--computersships[shipno][1] == 0) {
                sinkShip(computer, shipno, true);
                alert("You sank my " + shiptypes[computersships[shipno][0]][0] + "!");
                updateStatus();

                if (--computerlives == 0) {
                    alert("You win! Press the Refresh button on\n" +
                        "your browser to play another game.");
                    playflag = false;
                }
            }

            if (playflag) {
                computerMove();
            }
        } else if (computer[y][x][0] == 100) {
            setupImages(y, x, 102, true);
            computerMove();
        }
    }
}