//moles arr
const moles = [];

//image
let april;
let golden;
let donkey;
let state;
let cursorImg;

let missSound;
let goodSound;

let cursor;

//scoreboard vars
let scoreboard;
let hits;
let misses;
let timer;

let clicked;

//load assets
function preload()
{
  april = loadImage("images/aprilcircle.png");
  golden = loadImage("images/goldenApril.png");
  donkey = loadImage("images/donkey.png");
  cursorImg = loadImage('images/cursor.png');

  soundFormats("mp3", "wav");
  missSound = loadSound("sounds/miss.mp3");
  goodSound = loadSound("sounds/objective.wav");
}

//instantiate everything
function setup()
{
  clicked = false;
  state = 0;
  hits = 0;
  misses = 0;
  timer = 60;
  createCanvas(500,500);
  const rowNum = 3;
  const colNum = 3;

  //create all these MOLES!!!!
  for (let i = 0; i < rowNum; i++)
  {
    for (let x = 0; x < colNum; x++)
    {
      moles.push(new Mole((x * 150) + 100, (i * 150) + 100));
    }
  }
  scoreboard = new Scoreboard();
  cursor = new Cursor();
}

//gameover function, print some stuff for the user
function gameOver()
{
  background(255);
  text("Thanks for playing.", 50, 50);
  text("Your score was: " + hits, 50, 100);
  text("You missed " + misses + " times.", 50, 150);
  text("-CM", 50, 200);
}
//draw function - check state and do the proper functino
function draw()
{
  checkTimer();
  if (state === 0)
  {
    //first menu
    menu();
  }
  else if (state === 1)
  {
    //main()
    game();
  }
  else if (state === 2)
  {
    //print hits/misses etc.
    gameOver();
  }
}

//basic menu system
function menu()
{
  background(255);
  text("Welcome.", 50, 50);
  text("Click all pictures of April... but be careful for Cuddles!", 50, 100);
  text("Choose Difficulty", 50, 150);
  text("Type (1) - Easy (45 seconds)", 50, 200);
  text("Type (2) - Medium (30 seconds)", 50, 250);
  text("Type (3) - Hard (15 seconds)", 50, 300);
  if (keyIsDown(49))
  {
    timer = 45;
    state = 1;
  }
  else if (keyIsDown(50))
  {
    timer = 30;
    state = 1;
  }
  else if (keyIsDown(51))
  {
    timer = 15;
    state = 1;
  }
}
//adapted from: http://alpha.editor.p5js.org/marynotari/sketches/S1T2ZTMp-
//mainly because millis() caused me *actual* nightmares
function checkTimer()
{
  if (frameCount % 60 === 0 && timer > 0)
  {
    timer--;
  }
  if (timer <= 0)
  {
    state = 2;
  }
}

//just set a global variable to true if clicked.
//is there an easier way to do this?
function mouseClicked()
{
  clicked = true;
}

//main function
function game()
{
  background(0);
  //console.log("millis" + millis());
  scoreboard.display();
  //go through every mole and display it and update it
  for (let i = 0; i < moles.length; i++)
  {
    moles[i].display();
    moles[i].update();
  }
  cursor.display();
}

//UI class
class Scoreboard
{
  constructor()
  {
    this.xPos = 10;
    this.yPos = 20;
    this.interval = 12;
  }
  display()
  {
    fill(255);
    text("Hits: " + hits, this.xPos, this.yPos);
    text("Misses: " + misses, this.xPos, this.yPos + this.interval);
    text("Timer: " + timer, this.xPos, this.yPos + (2 * this.interval));
  }
}

//dog bone logic
class Cursor
{
  constructor()
  {
    this.sprite = cursorImg;
  }
  display()
  {
    noCursor();
    image(this.sprite, mouseX, mouseY);
  }
}
//mole class. meat of this program!!
class Mole
{
  //use x, y to create a mole in a different place
  //x, y the only thing that changes between each mole
  constructor(x, y)
  {
    this.xPos = x;
    this.yPos = y;
    this.visible = false;
    this.r = 100;
    this.border = 10;
    this.april = april;
    this.lowerBound = 0;
    this.upperBound = 10;
    //number is the timer number
    this.number = random(this.lowerBound, this.upperBound);
    this.random = Math.floor(random(this.lowerBound, this.upperBound));
    //extra credit
    this.isGolden = false;
    this.isDonkey = false;
    this.golden = golden;
    this.donkey = donkey;
  }
  display()
  {
    if (this.visible)
    {
      fill(255);
      ellipse(this.xPos, this.yPos, this.r, this.r);
      if (this.isGolden)
      {
        image(this.golden, this.xPos - this.april.width/2, this.yPos - this.april.height / 2);
      }
      else if (this.isDonkey)
      {
        image(this.donkey, this.xPos - this.april.width/2, this.yPos - this.april.height / 2);
      }
      else
      {
        //regular april
        image(this.april, this.xPos - this.april.width/2, this.yPos - this.april.height / 2);
      }
    }
    else
    {
      //empty
      fill(255);
      ellipse(this.xPos, this.yPos, this.r, this.r);
      fill(0);
      ellipse(this.xPos, this.yPos, this.r-this.border, this.r-this.border);
    }
  }
  update()
  {
    //adapted from: http://alpha.editor.p5js.org/marynotari/sketches/S1T2ZTMp-
    if (frameCount % 60 === 0 && this.number > 0)
    {
      this.number--;
    }
    if (this.number <= 0)
    {
      //extra credit
      if (this.random === 3)
      {
        this.isGolden = true;
      }
      else if (this.random === 5)
      {
        this.isDonkey = true;
      }
      this.flip();
      this.number = random(this.lowerBound, this.upperBound);
    }
    //check if we have a hti and update points
    if (this.checkHit())
    {
      if (this.visible)
      {
        goodSound.play();
        if (this.isGolden)
        {
          hits += 10;
        }
        else if (this.isDonkey)
        {
          misses += 10;
        }
        else
        {
          hits += 1;
        }
        this.flip();
      }
      else
      {
        missSound.play();
        misses += 1;
      }
    }
  }
  //regular flip, switch visible bool
  flip()
  {
    if (this.visible)
    {
      this.visible = false;
      this.isGolden = false;
      this.isDonkey = false;
    }
    else
    {
      this.visible = true;
    }
  }
  //adapted from kapp notes, but it checks with mouseX and mouseY
  checkHit()
  {
    let distanceCheck =(dist(this.xPos, this.yPos, mouseX, mouseY) < this.r);
    if (distanceCheck && clicked)
    {
      clicked = false;
      return true;
    }
    else
    {
      return false;
    }
  }

}
