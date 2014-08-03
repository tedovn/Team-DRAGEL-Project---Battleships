/* Function to make the computers move. */
function computerMove() {
    var x, y, pass;
    var sx, sy;
    var selected = false;
	var output = document.getElementById("output");
	var outRow = document.createElement("p");
	outRow.className = "bad";
    var shipInfos = document.getElementsByClassName("playship");
	var currentValue;
    /* Make two passes during 'shoot to kill' mode */
    for (pass = 0; pass < 2; ++pass) {
        for (y = 0; y < gridy && !selected; ++y) {
            for (x = 0; x < gridx && !selected; ++x) {

                /* Explosion shown at this position */
                if (player[y][x][0] == 103) {
                    sx = x;
                    sy = y;
                    var nup = (y > 0 && player[y - 1][x][0] <= 100);
                    var ndn = (y < gridy - 1 && player[y + 1][x][0] <= 100);
                    var nlt = (x > 0 && player[y][x - 1][0] <= 100);
                    var nrt = (x < gridx - 1 && player[y][x + 1][0] <= 100);

                    if (pass == 0) {
                        /* On first pass look for two explosions in a row - next shot will be inline */
                        var yup = (y > 0 && player[y - 1][x][0] == 103);
                        var ydn = (y < gridy - 1 && player[y + 1][x][0] == 103);
                        var ylt = (x > 0 && player[y][x - 1][0] == 103);
                        var yrt = (x < gridx - 1 && player[y][x + 1][0] == 103);

                        if (nlt && yrt) {
                            sx = x - 1;
                            selected = true;
                        }
                        else if (nrt && ylt) {
                            sx = x + 1;
                            selected = true;
                        }
                        else if (nup && ydn) {
                            sy = y - 1;
                            selected = true;
                        }
                        else if (ndn && yup) {
                            sy = y + 1;
                            selected = true;
                        }
                    } else {
                        /* Second pass look for single explosion - fire shots all around it */
                        if (nlt) {
                            sx = x - 1;
                            selected = true;
                        }
                        else if (nrt) {
                            sx = x + 1;
                            selected = true;
                        }
                        else if (nup) {
                            sy = y - 1;
                            selected = true;
                        }
                        else if (ndn) {
                            sy = y + 1;
                            selected = true;
                        }
                    }
                }
            }
        }
    }

    if (!selected) {
        /* Nothing found in 'shoot to kill' mode, so we're just taking
         potshots. Random shots are in a chequerboard pattern for
         maximum efficiency, and never twice in the same place */
        do {
            sy = Math.floor(Math.random() * gridy);
            sx = Math.floor(Math.random() * gridx / 2) * 2 + sy % 2;
        } while (player[sy][sx][0] > 100);
    }

    if (player[sy][sx][0] < 100) {
        /* Hit something */
        setupImages(sy, sx, 103, false);
        hitSound.play();
        var shipno = player[sy][sx][1];

        if (--playersships[shipno][1] == 0) {
            sinkShip(player, shipno, false);
			if(shiptypes[playersships[shipno][0]][0] === "Battleship") {
			   currentValue = parseInt(shipInfos[0].innerHTML);
			   currentValue -= 1;
			   shipInfos[0].innerHTML = currentValue;
			   if(currentValue === 0) {
					shipInfos[0].className = "playship sunk";
				} else {
				    shipInfos[0].className = "playship attacked";
				}
			} else if(shiptypes[playersships[shipno][0]][0] === "Cruiser") {
			   currentValue = parseInt(shipInfos[1].innerHTML);
			   currentValue -= 1;
			   shipInfos[1].innerHTML = currentValue;
			   if(currentValue === 0) {
					shipInfos[1].className = "playship sunk";
				} else {
				    shipInfos[1].className = "playship attacked";
				}
			} else if(shiptypes[playersships[shipno][0]][0] === "Frigate") {
			   currentValue = parseInt(shipInfos[2].innerHTML);
			   currentValue -= 1;
			   shipInfos[2].innerHTML = currentValue;
			   if(currentValue === 0) {
					shipInfos[2].className = "playship sunk";
				} else {
				    shipInfos[2].className = "playship attacked";
				}
			} else {
			   currentValue = parseInt(shipInfos[3].innerHTML);
			   currentValue -= 1;
			   shipInfos[3].innerHTML = currentValue;
			   if(currentValue === 0) {
					shipInfos[3].className = "playship sunk";
				} else {
				    shipInfos[3].className = "playship attacked";
				}
			}	
			outRow.innerHTML = "Computer sank your " + shiptypes[playersships[shipno][0]][0] + "!";
            bombSound.play();
			output.appendChild(outRow);
			output.scrollTop = output.scrollHeight;

            /*alert("Computer sank your " + shiptypes[playersships[shipno][0]][0] + "!");*/
            if (--playerlives == 0) {
                knowYourEnemy();
				outRow.className = "very-bad";
				outRow.innerHTML = "Computer win! Press the Refresh button on your browser to play another game.";
				output.appendChild(outRow);
				output.scrollTop = output.scrollHeight;
                /*alert("Computer win! Press the Refresh button on\n" +
                    "your browser to play another game.");*/
                playflag = false;
            }
        }
    } else {
        /* Missed */
        missSound.play();
        setupImages(sy, sx, 102, false);
    }
}