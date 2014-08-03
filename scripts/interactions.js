/* Handler for clicking on the grid */
function gridClick(y, x) {
	var output = document.getElementById("output");
	var outRow = document.createElement("p");
	outRow.className = "cool";
	var shipInfos = document.getElementsByClassName("compship");
	var currentValue;
	
    if (playflag) {
        if (computer[y][x][0] < 100) {
            setupImages(y, x, 103, true);
           	hitSound.play();

            var shipno = computer[y][x][1];

            if (--computersships[shipno][1] == 0) {
                sinkShip(computer, shipno, true);
				if(shiptypes[computersships[shipno][0]][0] === "Battleship") {
					currentValue = parseInt(shipInfos[0].innerHTML);
					currentValue -= 1;
					shipInfos[0].innerHTML = currentValue;
					if(currentValue === 0) {
						shipInfos[0].className = "compship sunk";
					} else {
						shipInfos[0].className = "compship attacked";
					}
				} else if(shiptypes[computersships[shipno][0]][0] === "Cruiser") {
					currentValue = parseInt(shipInfos[1].innerHTML);
					currentValue -= 1;
					shipInfos[1].innerHTML = currentValue;
					if(currentValue === 0) {
						shipInfos[1].className = "compship sunk";
					} else {
						shipInfos[1].className = "compship attacked";
					}
				} else if(shiptypes[computersships[shipno][0]][0] === "Frigate") {
					currentValue = parseInt(shipInfos[2].innerHTML);
					currentValue -= 1;
					shipInfos[2].innerHTML = currentValue;
					if(currentValue === 0) {
						shipInfos[2].className = "compship sunk";
					} else {
						shipInfos[2].className = "compship attacked";
					}
				} else {
					currentValue = parseInt(shipInfos[3].innerHTML);
					currentValue -= 1;
					shipInfos[3].innerHTML = currentValue;
					if(currentValue === 0) {
						shipInfos[3].className = "compship sunk";
					} else {
						shipInfos[3].className = "compship attacked";
					}
				}				
				outRow.innerHTML = "You sank computer's " + shiptypes[computersships[shipno][0]][0] + "!";
				bombSound.play();

				output.appendChild(outRow);
				output.scrollTop = output.scrollHeight;
                /*alert("You sank computer's " + shiptypes[computersships[shipno][0]][0] + "!");*/
                updateStatus();

                if (--computerlives == 0) {
				    outRow.className = "very-cool";
					outRow.innerHTML = "You win! Press the Refresh button on your browser to play another game.";
				    output.appendChild(outRow);
					output.scrollTop = output.scrollHeight;
                    /*alert("You win! Press the Refresh button on\n" +
                        "your browser to play another game.");*/
                    playflag = false;
                }
            }

            if (playflag) {
            	setTimeout(function() { computerMove() }, 1800);
            }
        } else if (computer[y][x][0] == 100) {
            setupImages(y, x, 102, true);
            missSound.play();
            setTimeout(function() { computerMove() }, 1800);
        }
    }
}