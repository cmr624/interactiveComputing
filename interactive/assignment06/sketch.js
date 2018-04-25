var world;
var castle;

function setup() {
	noCanvas();
	world = new World('VRScene');
	let numberOfCols = 50;
	let numberOfGold = 50;
	let numberOfTrees = 50;

	//left columns
	for (let i = 0; i < numberOfCols; i+= 2)
	{
		var cl = new Column(-2, 10, -i);
		world.add(cl.cl);
	}

	//right columns
	for (let i = 0; i < numberOfCols; i+= 2)
	{
		var cl = new Column(2, 10, -i);
		world.add(cl.cl);
	}

	//left gold
	for(let i = 0; i < numberOfGold; i+= 2)
	{
		// Octahedron primitive
		var o = new Octahedron({
							x: random(-20, -4), y:random(2, 10), z:random(-50, 0),
							radius: 0.7,
							asset: "gold"
						});
		world.add(o);
	}
	//right gold
	for(let i = 0; i < numberOfGold; i+= 2)
	{
		// Octahedron primitive
		var o = new Octahedron({
							x: random(4, 20), y:random(2, 10), z:random(-50, 0),
							radius: 0.7,
							asset: "gold"
						});
		world.add(o)
	}

	//left tree
	for (let i = 0; i < numberOfTrees; i+= 2)
	{
		let tree = new Tree(random(-20, -4), 1, random(-50, 0));
		world.add(tree.container);
	}

	//right Tree
	for (let i = 0; i < numberOfTrees; i+= 2)
	{
		let tree = new Tree(random(4, 20), 1, random(-50, 0));
		world.add(tree.container);
	}


	//this wouldn't work, and i tried a bunch of stuff. Oh well :(
	/*
	castle = new DAE({
		asset: 'castle',
		x:0,
		y:0,
		z:0,
		xScale:1,
		yScale:1,
		zScale:1
	});
	world.add(castle);*/


	// create a plane to serve as our "ground"
	var g = new Plane({x:0, y:0, z:0, width:100, height:100, red:0, green:163, blue:144, rotationX:-90, metalness:0.25});

	// add the plane to our world
	world.add(g);
}

function draw()
{
	if (mouseIsPressed) {
			world.moveUserForward(0.05);
		}
}

class Column
{
	constructor(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.cl = new Cylinder({
							x:this.x , y:this.y, z:this.z,
							height:20,
							radius: 0.25,
							red:192, green:192, blue:192,
						});
	}
}
class Tree
{
	constructor(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		this.container = new Container3D({x:this.x, y:this.y, z:this.z});
		// add the container to the world
		//world.add(this.container);
		var s = new Sphere({
							x:0, y:1.5, z:0,
							radius: random(1, 1.5),
							red:0, green:242, blue:100
						});;

		this.container.addChild(s);
		var cyl = new Cylinder({
							x: 0 , y:0, z:0,
							height:1.5,
							radius: 0.25,
							red:92, green:64, blue:51,
						});
		this.container.addChild(cyl);
	}
}
