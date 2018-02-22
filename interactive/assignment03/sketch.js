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

//boring initializer variables
let score;

let b;
let flip;

let health;
let ammo;

let rangeData;

let shotSound;

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
  //hot diggity this is big
  createCanvas(1920,1200);
  state = 0;
  //GAME STATE
  score = 0;
  flip = false;

  //make all the bad guys
  let enemy1 = new BadBoi(150, height-238-enemy1sprite.height, enemy1sprite, .03);
  let enemy2 = new BadBoi(400, height-238-enemy2sprite.height, enemy2sprite, .01);
  let enemy3 = new BadBoi(150, height-238-enemy3sprite.height, enemy3sprite, .02);
  let enemy4 = new BadBoi(150, height-238-enemy1sprite.height, enemy1sprite, .03);
  let enemy5 = new BadBoi(400, height-238-enemy2sprite.height, enemy2sprite, .01);
  let enemy6 = new BadBoi(150, height-238-enemy3sprite.height, enemy3sprite, .02);

  //this hurts, but idk a better way rn
  enemyArr = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
}

function draw()
{
  //opening menu
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
    //EASY
    if (keyIsDown(49))
    {
      ammo = 12;
      health = 1500;
      state = 1;
      pharah = new Pharah(health, ammo);
    }
    //NORMAL
    else if (keyIsDown(50))
    {
      ammo = 8;
      health = 1000;
      state = 1;
      pharah = new Pharah(health, ammo);
    }
    //HARD
    else if (keyIsDown(51))
    {
      ammo = 4;
      health = 750;
      state = 1;
      pharah = new Pharah(health, ammo);
    }
  }
  //GAMEPLAY LOOP
  else if (state === 1)
  {
    noCursor();
    background(bg);
    //get pharah lookin cool and movin nicely
    pharah.display();
    pharah.move();

    //let's spawnEnemies
    spawnEnemies(enemyArr, enemyArr.length);

    //oh and let pharah aim
    pharah.aim();

    //oh god. This is how I got the bullet to finally shoot
    //it feels very hacky, and based on our lecture today, I assume we
    //will find a more intuitive way to do this later on in the course. But I create a bullet in mousePressed()
    //so to avoid null pointer errors theres a "flip" boolean to make sure b exists (the bullet)
    if (flip)
    {
      b.display();
      b.move();
      for (let i = 0; i < enemyArr.length; i++)
      {
        //check if there's a hit, if there is, add score, if the score is game-ending, then END IT
        if(enemyArr[i].detectHit(b.bulletX, b.bulletY))
        {
          score += 1;
          if (score >= 6)
          {
            state = 2;
          }
        }
        //Pharah takes damage if she touches people
        if(pharah.detectHit(enemyArr[i].xPos, enemyArr[i].yPos))
        {
          pharah.health -= 10;
        }
      }
    }
  }
  //standard gameover screen.
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

//again, the hackiest bullet ever
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
    //yeah, so here I create the bullet so it can be drawn. flip the bool, etc.
    b = new Bullet(pharah, mouseX, mouseY, .02);
    return false;
  }
}

//just a helper function when I thought it would be cute to do so
function spawnEnemies(enemyArr, num)
{
  for (let i = 0; i < num; i++)
  {
    enemyArr[i].display();
    enemyArr[i].move();
  }
}
//Alright, here we go
class Pharah
{
  //instantiate all her important stuff
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
  //basic collision taken from KAPP notes
  detectHit(x, y)
  {
    if(dist(x, y, this.xPos, this.yPos) < 50)
    {
      return true;
    }
    return false;
  }
  //set the mouseX and mouseY offsets so the crosshair looks more centered
  aim()
  {
    this.aimX = mouseX - (this.sprite.width / 2 - 33);
    this.aimY = mouseY - ((this.sprite.height / 2) + 10);
    image(this.crosshair, this.aimX, this.aimY);
  }
  //display
  display()
  {
    //kill her!!!
    if (this.health < 0)
    {
      state = 2;
    }
    //normal image
    image(this.sprite, this.xPos, this.yPos);

    //included text, felt easier here
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
  //not implemented, unfortuantely. Couldn't get it to work. Want to go back to it
  jump()
  {
    let yDistance = this.yPos - this.jumpSize;
    this.yPos -= this.jumpSpeed * yDistance;
  }
  // this will move our character
  move()
  {
    //contain logic within borders
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
    //kapp notes helpful as always
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
    //reload, basic
    if (keyIsDown(82))
    {
      this.ammoCapacity = 8;
    }
    // fuel!!
    if (keyIsDown(32))
    {
      if (this.fuel > 0)
      {
        //if you still have fuel, then use it
        this.ySpeed -= this.accel;
      }
      if (this.fuel > -250)
      {
        //250 is the threshold under 0 to simulate a "delay" since idk how millis() works
        this.fuel -= 15;
      }
    }
    //look at this sad commented out failure of a feature... maybe one day
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
    //this I felt I wanted to do so that the left and right speeds
    //would naturally slow down over time. Felt unnatural otherwise.
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

    //the standard movement. Add gravity, speed to position
    this.ySpeed += this.gravity;
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;

    //gradually grow your fuel overtime. A counter would've been great but I couldn't learn it in time...
    //no pun intended.
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
  //all standard stuffs
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
  //simple display function (hallelujah)
  display()
  {
    image(this.sprite, this.bulletX, this.bulletY);
  }

  //OK...
  //This idea came to me in the shower (literally) so it might be dumb
  //But I thought if I ahd the X,Y of when the mouse was pressed, and I had the current
  //x,y of the image, I could calculate the slope of the line
  //connecting those two points, which is just the ratio of y pixels over x pixels
  //and add to the x y vectors based on that slope. I ended up having
  //to have four special cases for each quadrant as referenced by the console.logs
  //There has to be a better way for this, but this is the best I could do
  //and it's still not perfect (I haven't yet, but I assume at some point I could accidentally
  //divide by 0 for example)
  move()
  {
    let slope = this.yDist / this.xDist;
    //y is negative, x is positive
    if (this.yDist < 0 && this.xDist > 0)
    {
      slope = this.xDist / this.yDist;
      console.log("-Y, X");
      //FINALLY WORKING
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

    //then just move regularly
    this.bulletX += this.bulletXSpeed;
    this.bulletY += this.bulletYSpeed;
  }
}
//ENEMIES! The guys that gave me the least amount of trouble
class BadBoi
{
  //build me a badboi
  constructor(x, y, image, speed)
  {
    this.xPos = x;
    this.yPos = y;

    this.sprite = image;
    this.xDest = random(10, width-10);
    this.speed = speed;
    this.destroyed = false;
  }
  //Kapp notes >>
  detectHit(x, y)
  {
    if (dist(x,y, this.xPos, this.yPos) < 50)
    {
      this.destroyed = true;
      return true;
    }
    return false;
  }
  //this was the easiest way I could "delete" them,
  //send them way offscreen and turn off their image...
  //again, probably not the best way to do this.
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
  //move! Use the kapp notes movement from Zelda to randomly choose positions
  //and get closer to them by the "Speed" which was instantiated as I think .02 which
  //was what we used in the notes (move 2% fo the distance etc.)
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
