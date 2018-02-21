let bg;
let ball;
let coin;
let paddleLength;
let paddleHeight;
let paddlePosX;
let paddlePosY;
let paddleSpeedX;
let paddleAccel = 10;
let ballPosX;
let ballPosY;
let ballSpeedX;
let ballSpeedY;
let xCoin;
let yCoin;
let points;
let misses;
let missSound;
let objSound;
let bounceSound;


function preload()
{
  bg = loadImage("april.jpg");
  ball = loadImage("ball.png");
  coin = loadImage("coin.jpg");
  soundFormats("mp3", "wav");
  missSound = loadSound("miss.mp3");
  objSound = loadSound("objective.wav");
  bounceSound = loadSound("bouncy.wav");

}
function setup() {
  // set the background size of our canvas
  createCanvas(400, 533);
  background(bg);
  //default position
  paddlePosX = 160;
  paddlePosY = 523;

  //paddle dimensions default
  paddleLength = 80;
  paddleHeight = 10;

  //paddle speed controls
  paddleSpeedX = 0;

  //ball positions
  ballPosX = 200;
  ballPosY = 261;
  // ball original dimensions: 217 * 342
  // divided by 5: x = 43.4;
  // divided by 5: y = 68.4;
  ballSpeedX = random(-2, 2);
  ballSpeedY = random(-2, 2);

  points = 0;
  misses = 0;

  // where is the coin?
  xCoin = random(10, width-110);
  yCoin = random(10, height-300);

}
function draw()
{
  background(bg);
  fill(0,255,0);
  rect(paddlePosX, paddlePosY, paddleLength, paddleHeight);

  textSize(10);
  fill(0,0,255);
  text("Points: " + points, 30, 30);
  text("Misses: " + misses, 30, 40);

  // move left?
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    // subtract from character's xpos
    paddlePosX -= paddleAccel;
  }
  // move right?
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    // add to character's pos
    paddlePosX += paddleAccel;
  }
  paddlePosX += paddleSpeedX;
  ballPosX += ballSpeedX;
  ballPosY += ballSpeedY;
  //paddle restraint
  if (paddlePosX > width - 10 - paddleLength)
  {
    paddlePosX = width - 10 - paddleLength;
  }
  if (paddlePosX < 10)
  {
    paddlePosX = 10;
  }

  //ball bouncing
  if (ballPosX > width - 10 - 43.4)
  {
    bounceSound.play();
    ballSpeedX *= -1;
  }
  if (ballPosX < 10)
  {
    bounceSound.play();
    ballSpeedX *= -1;
  }
  if (ballPosY < 10)
  {
    bounceSound.play();
    ballSpeedY *= -1;
  }

  // COLLISION DETECTION
  if (dist(ballPosX, ballPosY, xCoin, yCoin) < 50){
    objSound.play();
    // collision happened, move the coin
    xCoin = random(10, width-110);
    yCoin = random(10, height-300);

    // give the user a point
    points += 1;
  }

  if ((ballPosY > height-10-68.4) && (ballPosX > paddlePosX-43.4 && ballPosX < paddlePosX + paddleLength))
  {
      ballSpeedY *= -1.4;
      ballSpeedX *= 1.4;
  }

  if (ballPosY > height-28.4)
  {
    missSound.play();
    ballPosX = 200;
    ballPosY = 261;
    // ball original dimensions: 217 * 342
    // divided by 5: x = 43.4;
    // divided by 5: y = 68.4;
    ballSpeedX = random(-5,5);
    ballSpeedY = random(-5, 5);
    misses += 1;
  }
  //borders
  noStroke();
  fill(0,125,233);
  rect(0,0, 10, 533);
  rect(0,0, 400, 10);
  rect(390,0,10,533);
  // draw the coin
  image(coin, xCoin, yCoin);
  image(ball,ballPosX, ballPosY, ball.width/5, ball.height/5);
}
