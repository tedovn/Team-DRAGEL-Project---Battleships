/* Information used to draw the ships */
var ship =  [[[1,5], [1,2,5], [1,2,3,5], [1,2,3,4,5]], [[6,10], [6,7,10], [6,7,8,10], [6,7,8,9,10]]];

/* Information used to draw sunk ships */
var dead = [[[201,203], [201,202,203], [201,202,202,203], [201,202,202,202,203]], [[204,206], [204,205,206], [204,205,205,206], [204,205,205,205,206]]];

/* Information used to describe ships */
var shiptypes = [["Minesweeper",2,4],["Frigate",3,4],[ "Cruiser",4,2],[ "Battleship",5,1]];

var gridx = 16, gridy = 16;
var player = [], computer = [], playersships = [], computersships = [];
var playerlives = 0, computerlives = 0, playflag=true, statusmsg="";

/* Function to preload all the images, to prevent delays during play */
var preloaded = [];

function imagePreload() {
  var i,ids = [1,2,3,4,5,6,7,8,9,10,100,101,102,103,201,202,203,204,205,206];
  window.status = "Preloading images...please wait";
  for (i=0;i<ids.length;++i) {
    var img = new Image, name = "img/batt"+ids[i]+".gif";
    img.src = name;
    preloaded[i] = img;
  }
  window.status = "";
}

/* Function to place the ships in the grid */
function setupPlayer(ispc) {
  var y,x;
  grid = [];
  for (y=0;y<gridx;++y) {
    grid[y] = [];
    for (x=0;x<gridx;++x)
    grid[y][x] = [100,-1,0];
  }
  var shipno = 0;
  var s;
  for (s=shiptypes.length-1;s>=0;--s) {
    var i;
    for (i=0;i<shiptypes[s][2];++i) {
      var d = Math.floor(Math.random()*2);
      var len = shiptypes[s][1], lx=gridx, ly=gridy, dx=0, dy=0;
      if ( d==0) {
        lx = gridx-len;
        dx=1;
      } else {
        ly = gridy-len;
        dy=1;
      }
      var x,y,ok;
      do {
        y = Math.floor(Math.random()*ly);
        x = Math.floor(Math.random()*lx);
        var j,cx=x,cy=y;
        ok = true;
        for (j=0;j<len;++j) {
          if (grid[cy][cx][0] < 100) {
          ok=false;
          break;
        }
        cx+=dx;
        cy+=dy;
      }
    } while(!ok);
      var j,cx=x,cy=y;
      for (j=0;j<len;++j) {
        grid[cy][cx][0] = ship[d][s][j];
        grid[cy][cx][1] = shipno;
        grid[cy][cx][2] = dead[d][s][j];
        cx+=dx;
        cy+=dy;
      }
      if (ispc) {
        computersships[shipno] = [s,shiptypes[s][1]];
        computerlives++;
      } else {
        playersships[shipno] = [s,shiptypes[s][1]];
        playerlives++;
      }
      shipno++;
    }
  }
return grid;
}