function setup() {
  // set the background size of our canvas
  createCanvas(1200, 600);

  // white background
  background(255);

  // blue rectangle
  fill(0, 0, 255);
  rect(0,0,1200,120);

  // white rectangle
  fill(255);
  rect(0,120,1200,120);

  // blue rectangle
  fill(0, 0, 255);
  rect(0,240,1200,120);

  // white rectangle
  fill(255);
  rect(0,360,1200,120);

  // blue rectangle
  fill(0, 0, 255);
  rect(0,480,1200,120);

  // red triangle
  fill(255, 0, 0);
  triangle(0,0,0,600,400,300);

  // sketchy star -> center of star will be (150, 275)
  fill (255);
  noStroke();
  rect(150,275, 50, 50);

  // triangle parts of the "star"
  triangle(150,275,175,225,200,275);

  triangle(150,275,100,300,150,325);

  triangle(150,325,175,375,200,325);

  triangle(200,325,250,300,200,275);
}
