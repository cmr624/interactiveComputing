//playerSprite
let pharahSprite;

//crosshair
let crosshairSprite;

//player
let pharah;

//enemies!!!!!
let enemy1sprite;
let enemy2sprite;
let enemy3sprite;

//enemy array
let enemyArr;

let images;
let enemyNum;
//NOTES
//238 - ground (238 from the bottom, SO = height - 238);

//preload assets
function preload()
{
  pharahSprite = loadImage("images/pharahSprite_small.png");
  bg = loadImage("images/bg.png");
  crosshairSprite = loadImage("images/crosshair.png");

  //enemies, potentially variable with more effort lol
  enemy1sprite = loadImage("images/enemy1.png");
  enemy2sprite = loadImage("images/enemy2.png");
  enemy3sprite = loadImage("images/enemy3.png");

}

function setup()
{
  createCanvas(1920,1200);
  pharah = new Pharah();
  enemy1 = new BadBoi(150, height-238-enemy1sprite.height, enemy1sprite, .03);
  enemy2 = new BadBoi(400, height-238-enemy2sprite.height, enemy2sprite, .01);
  enemy3 = new BadBoi(150, height-238-enemy3sprite.height, enemy3sprite, .02);
  enemyArr = [enemy1, enemy2, enemy3];
  noCursor();
}

function draw()
{
  //background(bg);
  background(255);
  //pharah.display();
  pharah.move();
  //pharah.shoot();
  //spawn 3 enemies
  //spawnEnemies(enemyArr, 3);
  pharah.aim();
}

function spawnEnemies(enemyArr, num)
{
  for (let i = 0; i < num; i++)
  {
    enemyArr[i].display();
    enemyArr[i].move();
  }
}
class Pharah
{
  constructor()
  {
    this.xPos = 250;
    this.yPos = 250;
    this.sprite = pharahSprite;
    this.crosshair = crosshairSprite;
    this.accel = 0.1;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.gravity = 0.03;
    this.collided = false;
    this.xLimit = 5;
    this.aimX = mouseX;
    this.aimY = mouseY;
    this.bulletX = this.sprite.width + (this.sprite.width / 2);
    this.bulletY = this.sprite.height + (this.sprite.height / 2);
    this.bulletSpeed = .02;
  }
  aim()
  {
    this.aimX = mouseX - (this.sprite.width / 2 - 33);
    this.aimY = mouseY - ((this.sprite.height / 2) + 10);
    image(this.crosshair, this.aimX, this.aimY);
    if (mousePressed)
    {
      this.shoot(this.aimX, this.aimY);
    }
  }
  shoot(x, y)
  {
      console.log("pew");
      let xDest = x;
      let yDest = y;
      let xDist = xDest - this.bulletX;
      let yDist = yDest - this.bulletY;
      this.bulletX += this.bulletSpeed * xDist;
      this.bulletY += this.bulletSpeed * yDist;
      ellipse(this.bulletX, this.bulletY, 80, 80);
  }
  display()
  {
    image(this.sprite, this.xPos, this.yPos);
  }
  // this will move our character
  move()
  {
    // wrap around logic

    if (this.xPos + this.sprite.width > width)
    {
      this.xSpeed = 0;
      this.collided = true;
      this.xPos = width - this.sprite.width
    }
    if (this.xPos < 0)
    {
      this.xSpeed = 0;
      this.collided = true;
      this.xPos = 0;
    }
    if (this.yPos > height-238-this.sprite.height)
    {
      this.ySpeed = 0;
      this.collided = true;
      this.yPos = height-238 - this.sprite.height;
    }
    if (this.yPos < 0)
    {
      this.ySpeed = 0;
      this.collided = true;
      this.yPos = 0;
    }
    this.collided = false;


    // move left?
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65))
    {
      // subtract from character's xSpeed
      this.xSpeed -= this.accel;
    }
    // move right?
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68))
    {
      // add to character's xSpeed
      this.xSpeed += this.accel;
    }
    // move up?
    if (keyIsDown(UP_ARROW) || keyIsDown(87))
    {
      // subtract from character's ySpeed
      this.ySpeed -= this.accel;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83))
    {
      // add to character's ySpeed
      this.ySpeed += this.accel;
    }



    this.ySpeed += this.gravity;
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;

    // speed limit!  prevent the user from moving too fast
    this.xSpeed = constrain(this.xSpeed, -this.xLimit, this.xLimit);
    this.ySpeed = constrain(this.ySpeed, -25, 25);
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
    this.speed = speed;
  }

  display()
  {
    image(this.sprite, this.xPos, this.yPos);
  }
  move()
  {
    let xDist = this.xDest - this.xPos;
    this.xPos += this.speed * xDist;

    if (dist(this.xPos, this.yPos, this.xDest, height-238) < 20)
    {
      shoot();
    }
  }
  shoot()
  {
    console.log("pew pew!");
  }
}
