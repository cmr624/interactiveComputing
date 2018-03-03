
const moles = [];
function setup()
{
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
}

function draw()
{
  background(0);
  for (let i = 0; i < moles.length; i++)
  {
    moles[i].display();
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
  }
  display()
  {
    if (this.visible)
    {
      console.log("CHANGED");
    }
    else
    {
      fill(255);
      ellipse(this.xPos, this.yPos, this.r, this.r);
    }
  }
}
