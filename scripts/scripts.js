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

/* Function to insert HTML source for a grid */
function showGrid(ispc) {
  var y,x;
  for (y=0;y<gridy;++y) {
    for (x=0;x<gridx;++x) {
      if ( ispc )
      document.write ('<a href="javascript:gridClick('+y+','+x+');"><img name="pc'+y+'_'+x+'" src="img/batt100.gif" width=16 height=16></a>');
      else
      document.write ('<a href="javascript:void(0);"><img name="ply'+y+'_'+x+'" src="img/batt'+player[y][x][0]+'.gif" width=16 height=16></a>');
    }
    document.write('<br>');
  }
}

/* Handler for clicking on the grid */
function gridClick(y,x) {
  if ( playflag ) {
  if (computer[y][x][0] < 100) {
    setImage(y,x,103,true);
    var shipno = computer[y][x][1];
    if ( --computersships[shipno][1] == 0 ) {
      sinkShip(computer,shipno,true);
      alert("You sank my "+shiptypes[computersships[shipno][0]][0]+"!");
      updateStatus();
      if ( --computerlives == 0 ) {
        alert("You win! Press the Refresh button on\n"+
        "your browser to play another game.");
        playflag = false;
      }
    }
    if ( playflag ) computerMove();
    } else if (computer[y][x][0] == 100) {
      setImage(y,x,102,true);
      computerMove();
    }
  }
}

/* Function to make the computers move. Note that the computer does not cheat, oh no! */
function computerMove() {
  var x,y,pass;
  var sx,sy;
  var selected = false;
  
  /* Make two passes during 'shoot to kill' mode */
  for (pass=0;pass<2;++pass) {
    for (y=0;y<gridy && !selected;++y) {
      for (x=0;x<gridx && !selected;++x) {
        /* Explosion shown at this position */
        if (player[y][x][0]==103) {
          sx=x; sy=y;
          var nup=(y>0 && player[y-1][x][0]<=100);
          var ndn=(y<gridy-1 && player[y+1][x][0]<=100);
          var nlt=(x>0 && player[y][x-1][0]<=100);
          var nrt=(x<gridx-1 && player[y][x+1][0]<=100);
          if ( pass == 0 ) {
            /* On first pass look for two explosions in a row - next shot will be inline */
            var yup=(y>0 && player[y-1][x][0]==103);
            var ydn=(y<gridy-1 && player[y+1][x][0]==103);
            var ylt=(x>0 && player[y][x-1][0]==103);
            var yrt=(x<gridx-1 && player[y][x+1][0]==103);
            if ( nlt && yrt) { sx = x-1; selected=true; }
              else if ( nrt && ylt) { sx = x+1; selected=true; }
              else if ( nup && ydn) { sy = y-1; selected=true; }
              else if ( ndn && yup) { sy = y+1; selected=true; }
            } else {
              /* Second pass look for single explosion - fire shots all around it */
              if ( nlt ) { sx=x-1; selected=true; }
              else if ( nrt ) { sx=x+1; selected=true; }
              else if ( nup ) { sy=y-1; selected=true; }
              else if ( ndn ) { sy=y+1; selected=true; }
            }
          }
        }
      }
    }
  if ( !selected ) {
    /* Nothing found in 'shoot to kill' mode, so we're just taking
       potshots. Random shots are in a chequerboard pattern for
       maximum efficiency, and never twice in the same place */
    do {
      sy = Math.floor(Math.random() * gridy);
      sx = Math.floor(Math.random() * gridx/2)*2+sy%2;
    } while( player[sy][sx][0]>100 );
    }
  if (player[sy][sx][0] < 100) {
    /* Hit something */
    setImage(sy,sx,103,false);
    var shipno = player[sy][sx][1];
    if ( --playersships[shipno][1] == 0 ) {
      sinkShip(player,shipno,false);
      alert("I sank your "+shiptypes[playersships[shipno][0]][0]+"!");
      if ( --playerlives == 0 ) {
        knowYourEnemy();
        alert("I win! Press the Refresh button on\n"+
        "your browser to play another game.");
        playflag = false;
      }
    }
  } else {
    /* Missed */
    setImage(sy,sx,102,false);
  }
}

/* When whole ship is hit, show it using changed graphics
*/
function sinkShip(grid,shipno,ispc) {
  var y,x;
  for (y=0;y<gridx;++y) {
    for (x=0;x<gridx;++x) {
      if ( grid[y][x][1] == shipno )
      if (ispc) setImage(y,x,computer[y][x][2],true);
      else setImage(y,x,player[y][x][2],false);
    }
  }
}
