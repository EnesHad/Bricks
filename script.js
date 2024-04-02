function drawIt() {

var x = 250;
var y = 350;
var dx = 0;
var dy = 3;
var WIDTH=500;
var HEIGHT=700;
var r=10;
var tocke;
var start=true;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
function init() { 
  sekunde = 0;
  izpisTimer = "00:00";
  intTimer = setInterval(timer, 1000);
  tocke = 0;
  $("#tocke").html(tocke);
  return intervalId=setInterval(draw, 10);
}

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
//END LIBRARY CODE
function draw() {

    clear();
    
    circle(x, y, 10);
    
    if (x + dx > WIDTH-r|| x + dx < 0 +r)
    
    dx = -dx;
    
    if (y + dy > HEIGHT-r|| y + dy < 0 +r)
    
    dy = -dy;
    
    x += dx;
    
    y += dy;
    }

init();
var paddlex;
var paddleh;
var paddlew;


function init_paddle() {
  paddlex = WIDTH / 2;
  paddleh = 10;
  paddlew = 75;
}

function draw() {
  clear();
  circle(x, y, 10);
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);

  
  if (x + dx > WIDTH-r || x + dx < 0+r)
    dx = -dx;

  if (y + dy < 0+r)
    dy = -dy;
    else if (y + dy > HEIGHT-r) {
      start=false;
          if (x > paddlex && x < paddlex + paddlew){
      dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
      dy = -dy;
      start=true;
      }
          else if (y + dy > HEIGHT-r)
            clearInterval(intervalId);
       
        }

  x += dx;
  y += dy;
}
init_paddle();
var rightDown = false;
var leftDown = false;

//nastavljanje leve in desne tipke
function onKeyDown(evt) {
  if (evt.keyCode == 39)
rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 39)
rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp); 

function draw() {
  clear();
  circle(x, y, 10);
  //premik ploščice levo in desno
  
  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
  if (x + dx > WIDTH -r || x + dx < 0 +r)
    dx = -dx;
  if (y + dy < 0 +r)
    dy = -dy;
  else if (y + dy > HEIGHT -r) {
    if (x > paddlex && x < paddlex + paddlew) {
        dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
        dy = -dy;
      }
      else if (y + dy > HEIGHT -r) {
        start=false;
            if (x > paddlex && x < paddlex + paddlew){
        dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
        dy = -dy;
        start=true;
        }
            else if (y + dy > HEIGHT-r)
              clearInterval(intervalId);
         
          }
        }
  x += dx;
  y += dy;
}
var canvasMinX;
var canvasMaxX;

function init_mouse() {
  //canvasMinX = $("#canvas").offset().left;
canvasMinX = $("canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
}

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = evt.pageX - canvasMinX-paddlew/2;
  }
}
$(document).mousemove(onMouseMove);


init_mouse();

var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;

function initbricks() { //inicializacija opek - polnjenje v tabelo
  NROWS = 5;
  NCOLS = 5;
  BRICKWIDTH = (WIDTH/NCOLS) - 1;
  BRICKHEIGHT = 15;
  PADDING = 1;
  bricks = new Array(NROWS);
  for (i=0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j=0; j < NCOLS; j++) {
      bricks[i][j] = 1;
    }
  }
}
initbricks();

function draw() {
    clear();
    circle(x, y, 10);
    //premik ploščice levo in desno
    if(rightDown){
      if((paddlex+paddlew) < WIDTH){
      paddlex += 5;
      }else{
      paddlex = WIDTH-paddlew;
      }
      }
      else if(leftDown){
      if(paddlex>0){
      paddlex -=5;
      }else{
      paddlex=0;
      }
      }
  
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
  
  //riši opeke
    for (i=0; i < NROWS; i++) {
      for (j=0; j < NCOLS; j++) {
        if (bricks[i][j] == 1) {
          rect((j * (BRICKWIDTH + PADDING)) + PADDING,
              (i * (BRICKHEIGHT + PADDING)) + PADDING,
              BRICKWIDTH, BRICKHEIGHT);
        }
      }
    }
  
    if (x + dx > WIDTH -r || x + dx < r)
      dx = -dx;
    if (y + dy < r)
      dy = -dy;
    else if (y + dy > HEIGHT -(r)) {
        if (x > paddlex && x < paddlex + paddlew) {
            dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
            dy = -dy;
          }
          else if (y + dy > HEIGHT -r) {
            start=false;
                if (x > paddlex && x < paddlex + paddlew){
            dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
            dy = -dy;
            start=true;
            }
                else if (y + dy > HEIGHT-r)
                  clearInterval(intervalId);
             
              }
    }
    x += dx;
    y += dy;
  }

  function draw() {
    clear();
    circle(x, y, 10);
    //premik ploščice levo in desno
    if(rightDown){
      if((paddlex+paddlew) < WIDTH){
      paddlex += 5;
      }else{
      paddlex = WIDTH-paddlew;
      }
      }
      else if(leftDown){
      if(paddlex>0){
      paddlex -=5;
      }else{
      paddlex=0;
      }
      }
  rect(paddlex, HEIGHT-paddleh, paddlew, paddleh);
  
  //riši opeke
    for (i=0; i < NROWS; i++) {
      for (j=0; j < NCOLS; j++) {
        if (bricks[i][j] == 1) {
          rect((j * (BRICKWIDTH + PADDING)) + PADDING,
              (i * (BRICKHEIGHT + PADDING)) + PADDING,
              BRICKWIDTH, BRICKHEIGHT);
        }
      }
    }
  
    rowheight = BRICKHEIGHT + PADDING + 2; //Smo zadeli opeko?
    colwidth = BRICKWIDTH + PADDING + 2;
    row = Math.floor(y/rowheight);
    col = Math.floor(x/colwidth);
    //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
    //štetje zadetih opek
    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy; bricks[row][col] = 0;
    tocke += 10; //v primeru, da imajo opeko večjo utež lahko prištevate tudi npr. 2 ali 3; pred tem bi bilo smiselno dodati še kakšen pogoj, ki bi signaliziral mesta opek, ki imajo višjo vrednost
    $("#tocke").html(tocke);
    }

    if (x + dx > WIDTH -r || x + dx < r)
      dx = -dx;
    if (y + dy < 0+r)
      dy = -dy;
    else if (y + dy > HEIGHT -r) {
        if (x > paddlex && x < paddlex + paddlew) {
            dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
            dy = -dy;
        }
        else if (y + dy > HEIGHT -r) {
          start=false;
              if (x > paddlex && x < paddlex + paddlew){
          dx = 8 * ((x-(paddlex+paddlew/2))/paddlew);
          dy = -dy;
          start=true;
          }
              else if (y + dy > HEIGHT-r)
                clearInterval(intervalId);
           
            }
    }
    x += dx;
    y += dy;
  }
    //timer
  var sekunde;
  var sekundeI;
  var minuteI;
  var intTimer;
  var izpisTimer;
  //timer
  function timer(){
    if(start==true){
      sekunde++;
      
      sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0"+sekundeI;
      minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0"+minuteI;
      izpisTimer = minuteI + ":" + sekundeI;
      
      $("#cas").html(izpisTimer);
      }
      else{
      sekunde=0;
      //izpisTimer = "00:00";
      $("#cas").html(izpisTimer);
      }
    }
  timer();
}