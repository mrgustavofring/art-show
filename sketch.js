var gravity = 0.7;
var jump = 25;
var powerUp = 0;
var counter = 0;
var timeleft = 0;
var timer = 0;
var score = 0;
var justShot = false;
var theScore = "POINTS"


function preload() {
  ballImg = loadImage("ball.png");
  hoop = loadImage("basketball.png");
  bgrnd = loadImage("assets/thebronjame.png")
  bgrnd2 = loadImage("assets/lebanonjameson.png")
  bgrnd3 = loadImage("assets/baskballman.png")
}


function setup() {
  mode = 0;
  createCanvas(1200, 800);

  player = createSprite(mouseX, mouseY, 60, 60);
  ballImg.resize(100, 100);
  player.addImage(ballImg);
  player.friction = 0.01;

  platform = createSprite(20, 790, 100, 20);

  backboard = createSprite(1108, 285, 3, 400);

  hoopCircle = createSprite(1034, 400, 25, 25);
  rim = createSprite(943, 380, 1, 25);

  rim.visible = false;
  hoopCircle.visible = false;

  player.restitution = 0.8;
  platform.immovable = true;
  backboard.immovable = true;
  rim.immovable = true;

  backboard.visible = false
  platform.shapeColor = color(179, 252, 52);
}

function keyPressed() {
  if (keyCode === ENTER) {
    mode = 1;
  }
  if (keyCode === UP_ARROW) {
    mode = 2;
  }
  //if (keyCode === LEFT_ARROW) {
  //mode = 3;
  //}
 // if (keyCode === DOWN_ARROW)
   // mode = 0;
}

function draw() {
  clear();
  if (mode == 0) {
    background(bgrnd);
    fill (255, 255, 255);
    textSize(75)
    text('the bron jame basketball', 175, 300)
    textSize(50)
    text('press ENTER', 450, 500)
  }

  if (mode == 1) {
    background(bgrnd2);
    fill(255, 255, 255);
    textSize(60)
    text('Objective', 450, 100)
    textSize(40)
    text('the whole point of the game is to get as many shots in the basket', 25, 200)
    text('as possible with 60 seconds on the clock', 225, 250)
    textSize(50)
    text('instructions', 450, 400)
    textSize(40)
    text('press SPACE to build up the strength of the throw and release', 40, 500)
    text('SPACE to throw the ball into the air', 275, 550)
    textSize(30)
    text('press UP ARROW to play', 410, 700)
  }

  if (mode == 2) {
    background(220);
    image(hoop, -25, -25, width + 100, height + 50);

    player.velocity.y += gravity;
    player.velocity.x += 0;

    if (player.bounce(platform)) {

    }

    if (player.bounce(backboard)) {

    }

    if (player.bounce(rim)) {

    }


    if (player.overlap(hoopCircle)) {
      if (justShot) {
        score++;
        justShot = false;

        didScore = true;
      }
    }

    if (keyDown(' ')) {
      powerUp += 0.1;
      powerUp = constrain(powerUp, 0, 20);
    }

    if (keyWentUp(' ')) {
      player.velocity.y = -jump - powerUp;
      player.velocity.x = jump / 2 + powerUp / 2;
      // player.setSpeed(30, 280);
    }

    push();
    fill(179, 210, 52);
    stroke(0);
    strokeWeight(5);
    rect(800, 790, 50, 1 - powerUp * 15);
    pop();

    drawSprites();

    fill(0);
    stroke(255, 255, 255);
    strokeWeight(5);
    rect(550, 130, 65, 70);
    textSize(35);
    text(timeleft, 562, 175);
    textSize(15);
    textStyle(BOLD);
    text('TIME', 560, 120);

    fill(0);
    stroke(255, 255, 255);
    strokeWeight(5);
    rect(630, 130, 65, 70);
    textSize(35);
    text(score, 645, 175);

    textSize(15);
    textStyle(BOLD);
    text(theScore, 632, 120);

    if (frameCount % 60 == 0) {
      timeleft--;
    }

    if (timeleft < 0) {
      timeleft = 0;
    }

    if (timeleft == 0) {
      playBuzz = true;

      if (playBuzz) {
        timeleft = 60;
        playBuzz = false;
      }
    }

    if (player.position.x > width + 20) {
      resetLevel();
    }

    if (player.position.y > height + 20) {
      resetLevel();
    }

  }

  if (mode == 3) {
    background(bgrnd3)
    fill (255, 255, 255);
    textSize(70)
    text('well done player', 355, 250);
    text('the bron is proud of your balling', 100, 375);
    textSize(80)
    text('score:' + score, 475, 550);
    //textSize(40)
    //text('press DOWN ARROW to go back to the menu', 200, 600)
  }

  if (timeleft == 1) {
    mode = 3;
  } else if (timeleft > 1) {
    mode = 2;
  } 
}

function mousePressed() {

  resetLevel();
}

function resetLevel() {
  var randX = random(0, 470);
  var randY = random(255, height);

  platform.position.x = randX;
  platform.position.y = randY;

  player.position.x = randX;
  player.position.y = randY - 65;

  player.velocity.x = 0;
  player.velocity.y = 0;

  powerUp = 0;

  justShot = true;
}
