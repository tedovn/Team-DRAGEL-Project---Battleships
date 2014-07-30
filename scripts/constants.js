/* Information used to draw the ships */
var ship = [
    [
        [1, 5],
        [1, 2, 5],
        [1, 2, 3, 5],
        [1, 2, 3, 4, 5]
    ],
    [
        [6, 10],
        [6, 7, 10],
        [6, 7, 8, 10],
        [6, 7, 8, 9, 10]
    ]
];

/* Information used to draw sunk ships */
var dead = [
    [
        [201, 203],
        [201, 202, 203],
        [201, 202, 202, 203],
        [201, 202, 202, 202, 203]
    ],
    [
        [204, 206],
        [204, 205, 206],
        [204, 205, 205, 206],
        [204, 205, 205, 205, 206]
    ]
];

/* Information used to describe ships */
var shiptypes = [
    ["Minesweeper", 2, 4],
    ["Frigate", 3, 4],
    [ "Cruiser", 4, 2],
    [ "Battleship", 5, 1]
];

var gridx = 16, gridy = 16;
var player = [], computer = [], playersships = [], computersships = [];
var playerlives = 0, computerlives = 0, playflag = true, statusmsg = "";

/* Function to preload all the images, to prevent delays during play */
var preloaded = [];