var x = 250;
  var y = 350;
  var dx = 0;
  var dy = 1.5;
  var WIDTH = 500;
  var HEIGHT = 700;
  var r = 20;
  var ctx;
  var paddlex;
  var paddleh;
  var paddlew;
  var rightDown = false;
  var leftDown = false;
  var canvasMinX;
  var canvasMaxX;
  var bricks;
  var NROWS;
  var NCOLS;
  var BRICKWIDTH;
  var BRICKHEIGHT;
  var PADDING;
  var tocke;
  var sekunde =0;
  var sekundeI;
  var minuteI;
  var intTimer;
  var izpisTimer;
  var start = true;
  const ice = document.getElementById("ice");
  var anc=0;
  var audio = new Audio('sound/melt.mp3');
  audio.volume=0.05;
  var score = 1;
  var hit=0;
  var nbrick;
  
  var fire =new Array();
  fire[0] =new Image();
  fire[0].src= 'img/fire1.png';
  fire[1] =new Image();
  fire[1].src= 'img/fire2.png';
  fire[2] =new Image();
  fire[2].src= 'img/fire3.png';
  fire[3] =new Image();
  fire[3].src= 'img/fire4.png';
  fire[4] =new Image();
  fire[4].src= 'img/fire5.png';
  fire[5] =new Image();
  fire[5].src= 'img/fire6.png';

  function rules(){
    Swal.fire({
      title: "RULES",
      text: "Melt away the bricks. Use mouse or arrow keys.",
      confirmButtonText: "OK",
      confirmButtonColor: "#7d9ab3",
      customClass: {
				title: "custom-title",
			},
    });
  }

  function win(){
    Swal.fire({
      title: "YOU WON",
      text: "gg",
      confirmButtonText: "PLAY AGAIN",
      confirmButtonColor: "#7d9ab3",
      customClass: {
				title: "custom-title",
			},
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  function end(){
    Swal.fire({
      title: "GAME OVER",
      text: "You lost better luck next time",
      confirmButtonText: "TRY AGAIN",
      confirmButtonColor: "#7d9ab3",
      customClass: {
				title: "custom-title",
			},
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }



function drawIt() {
  
  function init() {
    ctx = $('#canvas')[0].getContext("2d");
    WIDTH = $("#canvas").width();
    HEIGHT = $("#canvas").height();
    tocke = 0;
    $("#tocke").html(tocke);
    sekunde = 0;
    izpisTimer = "00:00";
    intTimer = setInterval(timer, 1000);
    intAni = setInterval(animation,100);
    return intervalId = setInterval(draw, 10);
  }

  function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
  }

  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }
  function init_paddle() {
    paddlex = (WIDTH / 2) - 37.5;
    paddleh = 10;
    paddlew = 70;
  }

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

  function init_mouse() {
    canvasMinX = $("canvas").offset().left;
    canvasMaxX = canvasMinX + WIDTH;
  }

  function onMouseMove(evt) {
    if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
      paddlex = evt.pageX - canvasMinX - paddlew / 2;
      //if(paddlex >= ){

      //}
    }
  }
  $(document).mousemove(onMouseMove);

  function initbricks() { //inicializacija opek - polnjenje v tabelo
    NROWS = 4;
    NCOLS = 4;
    nbrick= NROWS*NCOLS;
    BRICKWIDTH = (WIDTH / NCOLS) - 7;
    BRICKHEIGHT = 55;
    PADDING = 5;
    bricks = new Array(NROWS);
    for (i = 0; i < NROWS; i++) {
      bricks[i] = new Array(NCOLS);
      for (j = 0; j < NCOLS; j++) {
        bricks[i][j] = 1;
      }
    }
  }

  function timer() {
    if (start == true) {
      sekunde++;

      sekundeI = ((sekundeI = (sekunde % 60)) > 9) ? sekundeI : "0" + sekundeI;
      minuteI = ((minuteI = Math.floor(sekunde / 60)) > 9) ? minuteI : "0" + minuteI;
      izpisTimer = minuteI + ":" + sekundeI;

      $("#cas").html(izpisTimer);
    }
    else {
      sekunde = 0;
      //izpisTimer = "00:00";
      $("#cas").html(izpisTimer);
    }
  }

  function animation(){
    anc++;
  }
  document.getElementById("reset").disabled=false;
  document.getElementById("play").disabled=true;
  init();
  init_paddle();
  init_mouse();
  initbricks();

  function draw() {
    clear();

    //set to -1 of array ore else error
    if(anc>5){
      anc=0;
    }
    ctx.drawImage(fire[anc],x-r,y-r,2*r,2*r);

    if (x + dx > WIDTH - r || x + dx < r)
      dx = -dx;
    if (y + dy > HEIGHT -10 || y + dy < r)
      dy = -dy;
    x += dx;
    y += dy;

    //premik ploščice levo in desno
    if (rightDown) paddlex += 5;
    else if (leftDown) paddlex -= 5;
    rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);
    if (x + dx > WIDTH - r || x + dx < 0 + r)
      dx = -dx;
    if (y + dy < 0 + r)
      dy = -dy;
    else if (y + dy > HEIGHT - 10) {
      if (x > paddlex && x < paddlex + paddlew) {
        dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
        dy = -dy;
      }
      else if (y + dy > HEIGHT - 10) {
        start = false;
        if (x > paddlex && x < paddlex + paddlew) {
          dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
          dy = -dy;
        }
        else if (y + dy > HEIGHT - 10)
          clearInterval(intervalId);
          start = false;
      }
    }
    x += dx;
    y += dy;

    rect(paddlex, HEIGHT - paddleh, paddlew, paddleh);

    //riši opeke
    for (i = 0; i < NROWS; i++) {
      for (j = 0; j < NCOLS; j++) {
        if (bricks[i][j] == 1) {
          ctx.drawImage(ice,j * (BRICKWIDTH + PADDING) + PADDING,i * (BRICKHEIGHT + PADDING) + PADDING,BRICKWIDTH, BRICKHEIGHT);
        }
      }
    }


    rowheight = BRICKHEIGHT + PADDING; //Smo zadeli opeko?
    colwidth = BRICKWIDTH + PADDING;
    row = Math.floor(y / rowheight);
    col = Math.floor(x / colwidth);
    //Če smo zadeli opeko, vrni povratno kroglo in označi v tabeli, da opeke ni več
    if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
      dy = -dy; 
      bricks[row][col] = 0;
      audio.play();
      tocke += 10; //v primeru, da imajo opeko večjo utež lahko prištevate tudi npr. 2 ali 3; pred tem bi bilo smiselno dodati še kakšen pogoj, ki bi signaliziral mesta opek, ki imajo višjo vrednost
      $("#tocke").html(tocke);
      hit++;
      if(hit==nbrick){
        dx=0;
        dy=0;
        win();
        //clearInterval(intervalId);
      }
    }
    if (x + dx > WIDTH - r || x + dx < r)
      dx = -dx;
    if (y + dy < 0 + r)
      dy = -dy;
    else if (y + dy > HEIGHT - 12) {
      if ((x > paddlex||x+2*r>paddlex) && x < paddlex + paddlew) {
        dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
        dy = -dy;
      }
        else if (y + dy > HEIGHT - 12) {
          score--;
          sekunde = 0;
          console.log(score);
          if (!score) {
            start = false;
            // Show sweet alert
            end();
          } else {
            drawIt();
          }
          clearInterval(intervalId);
        }
      }
    }
  }


