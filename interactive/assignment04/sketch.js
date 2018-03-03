
const moles = [];
let april;

//scoreboard
let scoreboard;
let hits;
let misses;
let timer;

let seconds;

function preload()
{
  april = loadImage("images/aprilcircle.png");
}
function setup()
{
  seconds = 0;
  hits = 0;
  misses = 0;
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
}

function draw()
{
  background(0);
  //console.log("millis" + millis());
  timer = millis() / 1000;
  timer = Math.floor(timer);
  scoreboard.display();
  for (let i = 0; i < moles.length; i++)
  {
    moles[i].display();
    moles[i].update();
  }
}
class Scoreboard
{
  //scoreboard
  /*
  let hits;
  let misses;
  let timer;*/
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
    this.number = random(2, 10);
    this.lastTime = 0;
  }
  display()
  {
    if (this.visible)
    {
      fill(255);
      ellipse(this.xPos, this.yPos, this.r, this.r);
      image(this.april, this.xPos - this.april.width/2, this.yPos - this.april.height / 2);
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
    if (this.currentTime > this.number)
    {
      this.lastTime = this.currentTime;
      this.currentTime = (millis() / 1000) - this.lastTime;
      this.flip();
    }
  }
  flip()
  {
    if (this.visible)
    {
      this.visible = false;
    }
    else
    {
      this.visible = true;
    }
  }
}
