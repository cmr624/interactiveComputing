// variable to hold a reference to our A-Frame world
var world;

function setup() {
	// no canvas needed
	noCanvas();

	// construct the A-Frame world
	// this function requires a reference to the ID of the 'a-scene' tag in our HTML document
	world = new World('VRScene');

	// now that we have a world we can add elements to it using a series of wrapper classes
	// these classes are discussed in greater detail on the A-Frame P5 documentation site
	// http://cs.nyu.edu/~kapp/courses/cs0380fall2017/aframep5.php

	// create a new box
	var b1 = new Box({x:0, y:0.5, z:0, width:1, height:1, depth:1, red:255, green:150, blue:0});

	// add the box to our world
	world.add(b1);

	// create two more boxes on top of the original one
	var b2 = new Box({x:0, y:1.5, z:0, width:1, height:1, depth:1, red:255, green:0, blue:0});
	world.add(b2);
	var b3 = new Box({x:0, y:2.5, z:0, width:1, height:1, depth:1, red:0, green:255, blue:0});
	world.add(b3);

	// create a plane to serve as our "ground"
	var g = new Plane({x:0, y:0, z:0, width:100, height:100, red:0, green:102, blue:153, rotationX:-90, metalness:0.25});

	// add the plane to our world
	world.add(g);
}

function draw() {

}
