//playerSprite
let pharahSprite;

//player
let pharah;

//preload assets
function preload()
{
  pharahSprite = loadImage("images/pharahSprite_small.png");
  bg = loadImage("images/bg.png");
}

function setup()
{
  createCanvas(1920,1200);
  pharah = new Pharah();
}

function draw()
{
  background(bg);
  pharah.display();
  pharah.move();
}

class Pharah
{
  constructor()
  {
    this.xPos = 250;
    this.yPos = 250;
    this.sprite = pharahSprite;
    this.accel = 0.1;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }
  display()
  {
    image(this.sprite, this.xPos, this.yPos);
  }
  // this will move our character
  move()
  {
    // move left?
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      // subtract from character's xSpeed
      this.xSpeed -= this.accel;
    }
    // move right?
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      // add to character's xSpeed
      this.xSpeed += this.accel;
    }
    // move up?
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      // subtract from character's ySpeed
      this.ySpeed -= this.accel;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      // add to character's ySpeed
      this.ySpeed += this.accel;
    }
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;

    // speed limit!  prevent the user from moving too fast
    this.xSpeed = constrain(this.xSpeed, -5, 5);
    this.ySpeed = constrain(this.ySpeed, -5, 5);

    // wrap around logic
    if (this.xPos + this.sprite.width > width) {
      this.xPos = 0;
    }
    if (this.xPos < 0) {
      this.xPos = width - this.sprite.width;
    }
    if (this.yPos > height) {
      this.yPos = 0;
    }
    if (this.yPos + this.sprite.height < 0) {
      this.yPos = height - this.sprite.height;
    }
  }
}

class BadBoi
{
  constructor(x, y, image, speed)
  {
    this.xPos = x;
    this.yPos = y;

    this.sprite = image;
    this.xDest = random(100, width-100);
  }

  display()
  {
    image(this.sprite, this.xPos, this.yPos);

  }
}
