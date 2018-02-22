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
//enemyImage array
let images;
let enemyNum;

let bulletSprite;
//gamestate, 0 = menu, 1 = gameplay
let state;

let score;

let b;
let flip;

let health;
let ammo;

let rangeData;

let shotSound;
//NOTES
//238 - ground (238 from the bottom, SO = height - 238);

function updateRange(clickedRange) {
  // grab the range data as an integer
  rangeData = int(clickedRange.value);
}
//preload assets
function preload()
{
  pharahSprite = loadImage("images/pharahSprite_small.png");
  bg = loadImage("images/bg.png");
  crosshairSprite = loadImage("images/crosshair.png");
  bulletSprite = loadImage("images/bullet.png");
  soundFormats("mp3");
  shotSound = loadSound("sounds/exp.mp3");

  //enemies, potentially variable with more effort lol
  enemy1sprite = loadImage("images/enemy1.png");
  enemy2sprite = loadImage("images/enemy2.png");
  enemy3sprite = loadImage("images/enemy3.png");

}

function setup()
{
  createCanvas(1920,1200);
  state = 0;
  //GAME STATE
  score = 0;
  flip = false;
  let enemy1 = new BadBoi(150, height-238-enemy1sprite.height, enemy1sprite, .03);
  let enemy2 = new BadBoi(400, height-238-enemy2sprite.height, enemy2sprite, .01);
  let enemy3 = new BadBoi(150, height-238-enemy3sprite.height, enemy3sprite, .02);
  let enemy4 = new BadBoi(150, height-238-enemy1sprite.height, enemy1sprite, .03);
  let enemy5 = new BadBoi(400, height-238-enemy2sprite.height, enemy2sprite, .01);
  let enemy6 = new BadBoi(150, height-238-enemy3sprite.height, enemy3sprite, .02);
  enemyArr = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
  //noCursor();
}

function draw()
{
  if (state === 0)
  {
    textSize(72);
    background(bg);
    text("Pharah", 800, 100);
    textSize(60);
    text("Press (1) - EASY", 700, 200);
    text("Press (2) - NORMAL", 700, 300);
    text("Press (3) - HARD", 700, 400);
    text("CONTROLS", 800, 500);
    textSize(32);
    text("Left / Right Arrow, or A / D", 700, 550);
    text("Press SPACEBAR to use Fuel", 700, 600);
    text("Click to shoot!", 700, 650);
    if (keyIsDown(49))
    {
      ammo = 12;
      health = 1500;
      state = 1;
      pharah = new Pharah(health, ammo);
    }
    else if (keyIsDown(50))
    {
      ammo = 8;
      health = 1000;
      state = 1;
      pharah = new Pharah(health, ammo);
    }
    else if (keyIsDown(51))
    {
      ammo = 4;
      health = 750;
      state = 1;
      pharah = new Pharah(health, ammo);
    }
  }
  else if (state === 1)
  {
    noCursor();
    //pharah.fuelCapacity = rangeData;
    background(bg);
    //background(255);
    pharah.display();
    pharah.move();
    //pharah.shoot();
    //spawn 3 enemies
    spawnEnemies(enemyArr, enemyArr.length);
    pharah.aim();
    //console.log("XYDIST: " + b.xDist, b.yDist);
    if (flip)
    {
      b.display();
      b.move();
      for (let i = 0; i < enemyArr.length; i++)
      {
        if(enemyArr[i].detectHit(b.bulletX, b.bulletY))
        {
          score += 1;
          if (score >= 6)
          {
            state = 2;
          }
        }
        if(pharah.detectHit(enemyArr[i].xPos, enemyArr[i].yPos))
        {
          pharah.health -= 10;
        }
      }
    }
  }
  else if (state === 2)
  {
    background(255);
    textSize(72)
    text("GAMEOVER", 10, 200);
    if(keyIsDown(82))
    {
      state = 1;
    }
  }

}

function mousePressed()
{
  if (pharah.ammoCapacity <= 0)
  {
    return false;
  }
  else {
    flip = true;
    shotSound.play();
    pharah.ammoCapacity -= 1;
    b = new Bullet(pharah, mouseX, mouseY, .02);
    return false;
  }
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
  constructor(health, ammoCapacity)
  {
    this.xPos = 250;
    this.yPos = 250;
    this.sprite = pharahSprite;
    this.crosshair = crosshairSprite;
    this.accel = 0.1;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.gravity = 0.03;
    this.xLimit = 5;
    this.aimX = mouseX;
    this.aimY = mouseY;
    this.bulletX = this.sprite.width + (this.sprite.width / 2);
    this.bulletY = this.sprite.height + (this.sprite.height / 2);
    this.bulletSpeed = .02;
    this.ammoCapacity = ammoCapacity;
    this.fuelCapacity = rangeData;;
    this.fuel = rangeData;
    this.currentTime = 0;
    this.jumpSize = 50;
    this.jumpSpeed = .02;
    this.health = 1000;
  }
  detectHit(x, y)
  {
    if(dist(x, y, this.xPos, this.yPos) < 50)
    {
      return true;
    }
    return false;
  }
  aim()
  {
    this.aimX = mouseX - (this.sprite.width / 2 - 33);
    this.aimY = mouseY - ((this.sprite.height / 2) + 10);
    image(this.crosshair, this.aimX, this.aimY);
  }
  display()
  {
    if (this.health < 0)
    {
      state = 2;
    }
    image(this.sprite, this.xPos, this.yPos);
    textSize(32);
    if (this.fuel < 0)
    {
      text("Fuel: 0", 10, 40);
    }
    else
    {
      text("Fuel: " + this.fuel, 10, 40);
    }
    text("Ammo: " + this.ammoCapacity, 10, 70);
    text("Score: " + score, 10, 105);
    text("Health: " + this.health, 10, 200);
  //  text("Name: " + name, 1500, 70);
    if (this.ammoCapacity <= 0)
    {
      textSize(72);
      text("Press R to reload.", (width/2)-200, 100);
    }
  }
  jump()
  {
    let yDistance = this.yPos - this.jumpSize;
    this.yPos -= this.jumpSpeed * yDistance;
  }
  // this will move our character
  move()
  {
    //contain logic
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
    // move left?
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65))
    {
      // subtract from character's xSpeed
      this.xSpeed -= this.accel;
      this.left = true;
      this.right = false;
    }
    // move right?
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68))
    {
      // add to character's xSpeed
      this.xSpeed += this.accel;
      this.right = true;
      this.left = false;
    }
    if (keyIsDown(82))
    {
      this.ammoCapacity = 8;
    }
    // move up?
    if (keyIsDown(32))
    {
      // subtract from character's ySpeed
      if (this.fuel > 0)
      {
        this.ySpeed -= this.accel;
      }
      if (this.fuel > -250)
      {
        this.fuel -= 15;
      }
    }
    /*
    if (keyCode == SHIFT)
    {
      if (cooldown)
      {
        let yDistance = this.yPos - this.jumpSize;
        this.yPos -= this.jumpSpeed * yDistance;
        jumping = true;
      }
    }*/
    if (this.right)
    {
      this.xSpeed -= this.gravity;
      if (this.xSpeed < 0)
      {
        this.right = false;
        this.left = true;
      }
    }
    else if (this.left)
    {
      this.xSpeed += this.gravity;
      if (this.xSpeed > 0)
      {
        this.right = true;
        this.left = false;
      }
    }

    this.ySpeed += this.gravity;
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;

    if (this.fuel < this.fuelCapacity)
    {
      this.fuel += 5;
    }

    // speed limit!  prevent the user from moving too fast
    this.xSpeed = constrain(this.xSpeed, -this.xLimit, this.xLimit);
    this.ySpeed = constrain(this.ySpeed, -25, 25);
  }
}

class Bullet
{
  constructor(owner, x, y, speed)
  {
    this.bulletX = owner.xPos;
    this.bulletY = owner.yPos;
    this.bulletXSpeed = 0;
    this.bulletYSpeed = 0;
    this.destX = mouseX;
    this.destY = mouseY;
    this.sprite = bulletSprite;
    this.bulletSpeed = speed;
    //x2 = mousex, x1 = pharahX
    this.xDist = this.destX - owner.xPos;
    this.yDist = this.destY - owner.yPos;
  }
  display()
  {
    image(this.sprite, this.bulletX, this.bulletY);
  }
  move()
  {
    let slope = this.yDist / this.xDist;
    //y is negative, x is positive
    if (this.yDist < 0 && this.xDist > 0)
    {
      slope = this.xDist / this.yDist;
      console.log("-Y, X");
      //WRONG
      this.bulletXSpeed -= slope;
      this.bulletYSpeed -= 1;
    }
    //y is positive, x is positive
    if (this.yDist > 0 && this.xDist > 0)
    {
      console.log("Y, X");
      //GOOD, WORKING
      this.bulletXSpeed += 1;
      this.bulletYSpeed += slope;
    }
    //y is negative, x is negative
    if (this.yDist < 0 && this.xDist < 0)
    {
      console.log("-Y, -X");

      //GOOD, WORKING
      this.bulletXSpeed -= 1;
      this.bulletYSpeed -= slope;
    }
    //y is positive, x is negative
    if (this.yDist > 0 && this.xDist < 0)
    {
      slope = this.xDist / this.yDist;
      //GOOD, WORKING
      console.log("Y, -X");
      this.bulletXSpeed += slope;
      this.bulletYSpeed += 1;
    }

    this.bulletX += this.bulletXSpeed;
    this.bulletY += this.bulletYSpeed;
  }

}
class BadBoi
{
  constructor(x, y, image, speed)
  {
    this.xPos = x;
    this.yPos = y;

    this.sprite = image;
    this.xDest = random(10, width-10);
    this.speed = speed;
    this.destroyed = false;
  }
  detectHit(x, y)
  {
    if (dist(x,y, this.xPos, this.yPos) < 50)
    {
      this.destroyed = true;
      return true;
    }
    return false;
  }
  display()
  {
    if (!this.destroyed)
    {
      image(this.sprite, this.xPos, this.yPos);
    }
    else
    {
      this.xPos = -999;
      this.yPos = -999;
    }
  }
  move()
  {
    if (abs(this.xPos - this.xDest) < 100)
    {
      this.xDest = random(10, width - 10);
    }
    let xDist = this.xDest - this.xPos;
    this.xPos += this.speed * xDist;
  }
}
