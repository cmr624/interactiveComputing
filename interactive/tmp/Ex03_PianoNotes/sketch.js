/* adapted from the p5 sound example library */

var osc, envelope, fft;

var scaleArray = [60, 62, 64, 65, 67, 69, 71, 72];
var note = 0;

function setup() {
  createCanvas(800, 200);
  osc = new p5.SinOsc();

  // Instantiate the envelope
  envelope = new p5.Env();

  // set attackTime, decayTime, sustainRatio, releaseTime
  envelope.setADSR(0.001, 0.5, 0.1, 0.5);

  // set attackLevel, releaseLevel
  envelope.setRange(1, 0);

  fill(255);
}

function draw() {
  background(0, 10);
}

function keyPressed() {

  if (keyCode == LEFT_ARROW) {
    osc.stop();
    var midiValue = scaleArray[0];
    rect(0,0,100,200);
  }
  if (keyCode == UP_ARROW) {
    osc.stop();
    var midiValue = scaleArray[1];
    rect(100,0,100,200);
  }
  if (keyCode == RIGHT_ARROW) {
    osc.stop();
    var midiValue = scaleArray[2];
    rect(200,0,100,200);
  }
  if (keyCode == DOWN_ARROW) {
    osc.stop();
    var midiValue = scaleArray[3];
    rect(300,0,100,200);
  }
  if (key == 'W') {
    osc.stop();
    var midiValue = scaleArray[4];
    rect(400,0,100,200);
  }
  if (key == 'A') {
    osc.stop();
    var midiValue = scaleArray[5];
    rect(500,0,100,200);
  }
  if (key == 'S') {
    osc.stop();
    var midiValue = scaleArray[6];
    rect(600,0,100,200);
  }
  if (key == 'D') {
    osc.stop();
    var midiValue = scaleArray[7];
    rect(700,0,100,200);
  }


  osc.start();
  var freqValue = midiToFreq(midiValue);
  osc.freq(freqValue);

  envelope.play(osc, 0, 0.1);
  note = (note + 1) % scaleArray.length;
}
