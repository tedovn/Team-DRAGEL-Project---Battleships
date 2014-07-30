/* Function to place the ships in the grid */
function setupPlayer(ispc) {
    'use strict';

    var y, x,
        grid = [];

    for (y = 0; y < gridx; ++y) {
        grid[y] = [];
        for (x = 0; x < gridx; ++x)
            grid[y][x] = [100, -1, 0];
    }

    var shipno = 0;
    var s;
    for (s = shiptypes.length - 1; s >= 0; --s) {
        var i;
        for (i = 0; i < shiptypes[s][2]; ++i) {
            var d = Math.floor(Math.random() * 2);
            var len = shiptypes[s][1], lx = gridx, ly = gridy, dx = 0, dy = 0;
            if (d == 0) {
                lx = gridx - len;
                dx = 1;
            } else {
                ly = gridy - len;
                dy = 1;
            }
            var x, y, ok;
            do {
                y = Math.floor(Math.random() * ly);
                x = Math.floor(Math.random() * lx);
                var j, cx = x, cy = y;
                ok = true;
                for (j = 0; j < len; ++j) {
                    if (grid[cy][cx][0] < 100) {
                        ok = false;
                        break;
                    }
                    cx += dx;
                    cy += dy;
                }
            } while (!ok);
            var j, cx = x, cy = y;
            for (j = 0; j < len; ++j) {
                grid[cy][cx][0] = ship[d][s][j];
                grid[cy][cx][1] = shipno;
                grid[cy][cx][2] = dead[d][s][j];
                cx += dx;
                cy += dy;
            }
            if (ispc) {
                computersships[shipno] = [s, shiptypes[s][1]];
                computerlives++;
            } else {
                playersships[shipno] = [s, shiptypes[s][1]];
                playerlives++;
            }
            shipno++;
        }
    }

    return grid;
}

/* Preloading all images needed */
function imagePreload() {
    'use strict';

    var i, ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 100, 101, 102, 103, 201, 202, 203, 204, 205, 206];

    for (i = 0; i < ids.length; ++i) {
        var img = new Image, name = "img/batt" + ids[i] + ".gif";
        img.src = name;
        preloaded[i] = img;
    }
}

/* Function to change an image shown on a grid */
function setupImages(y, x, id, ispc) {
    'use strict';

    if (ispc) {
        computer[y][x][0] = id;
        document.images["pc" + y + "_" + x].src = "img/batt" + id + ".gif";
    } else {
        player[y][x][0] = id;
        document.images["ply" + y + "_" + x].src = "img/batt" + id + ".gif";
    }
}

/* Render game field */
function showGrid(ispc, field) {
    'use strict';

    var y, x,
        link = document.createElement('a'),
        image = document.createElement('img');

    for (y = 0; y < gridy; ++y) {

        for (x = 0; x < gridx; ++x) {
            if (ispc) {
                var currLink = link.cloneNode(true);
                currLink.setAttribute('href', 'javascript:gridClick(' + y + ',' + x + ');');
                var currImg = image.cloneNode(true);
                currImg.setAttribute('name', 'pc' + y + '_' + x);
                currImg.setAttribute('src', 'img/batt100.gif');
                currLink.appendChild(currImg);
                field.appendChild(currLink);
            }
            else {
                var currLink = link.cloneNode(true);
                currLink.setAttribute('href', 'javascript:void(0);');
                var currImg = image.cloneNode(true);
                currImg.setAttribute('name', 'ply' + y + '_' + x);
                currImg.setAttribute('src', 'img/batt' + player[y][x][0] + '.gif');
                currLink.appendChild(currImg);
                field.appendChild(currLink);
            }
        }

        field.innerHTML += '<br>';
    }
}