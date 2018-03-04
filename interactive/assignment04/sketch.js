
const moles = [];
let april;
let golden;
let donkey;
let state;
let cursorImg;

let cursor;
//scoreboard
let scoreboard;
let hits;
let misses;
let timer;

let clicked;

function preload()
{
  april = loadImage("images/aprilcircle.png");
  golden = loadImage("images/goldenApril.png");
  donkey = loadImage("images/donkey.png");
  cursorImg = loadImage('images/cursor.png');
}
function setup()
{
  clicked = false;
  state = 0;
  hits = 0;
  misses = 0;
  timer = 30;
  createCanvas(500,500);
  const rowNum = 3;
  const colNum = 3;
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

function draw()
{
  checkTimer();
  if (state === 0)
  {
    menu();
  }
  else if (state === 1)
  {
    game();
  }
  else if (state === 2)
  {
    gameOver();
  }
}

function menu()
{
  background(255);
  text("hey", 50, 50);
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

function mouseClicked()
{
  clicked = true;
}

function game()
{
  background(0);
  //console.log("millis" + millis());
  scoreboard.display();
  for (let i = 0; i < moles.length; i++)
  {
    moles[i].display();
    moles[i].update();
  }
  cursor.display();
}
function gameOver()
{
  background(255);
  text("bye", 50, 50);
}
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
class Mole
{
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
    this.number = random(this.lowerBound, this.upperBound);
    this.random = Math.floor(random(this.lowerBound, this.upperBound));
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
        image(this.april, this.xPos - this.april.width/2, this.yPos - this.april.height / 2);
      }
    }
    else
    {
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

    if (this.checkHit())
    {
      if (this.visible)
      {
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
        misses += 1;
      }
    }
  }
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
