//  Creating canvas
var ctx = document.getElementById('canvasGame').getContext('2d');  


/* more info: http://stackoverflow.com/questions/7381041/url-of-images-in-javascript-code-using-rails-3-1-asset-pipeline */


var distanceFromCenter = 5;
var undulationAmplitude = 2;

var plasmidRadius = 70;
var wallPieceRadius = 5;

function Cell (worldX,worldY) 
{
    this.worldX = 0;
    this.worldY = 0;

	this.organelles = {};

    this.cellWalls = {};
    this.undulationAngle = 0;
    this.undulationSpeed = 0.01;
	
    for (var i = 0; i < 360; i++) {
        this.cellWalls.add(new Array(2));
        this.cellWalls[i][0] = 0;
        this.cellWalls[i][1] = 0;
    };

    this.update = function(dt)
    {
        //  The undulating of cell walls
        this.undulationAngle += this.undulationSpeed;

        for (var i = 0; i < cellWalls.length; i++) 
        {
        	var x = (Math.cos(Math.PI*2/cellWalls.length*i) * distanceFromCenter;
            cellWalls[i][0] = x;//+(Math.Sin(this.undulationAngle + (Math.PI*2/cellWalls.length*i)) * undulationAmplitude));
            
			var y = (Math.sin(Math.PI*2/cellWalls.length*i) * distanceFromCenter ;
            cellWalls[i][1] = y;//+(Math.Sin(this.undulationAngle + (Math.PI*2/cellWalls.length*i)) * undulationAmplitude));
        };
    };
	this.render = function(ctx)
	{
        //  Center of bacteria 
        ctx.beginPath();
        ctx.arc(this.worldX, this.worldY, plasmidRadius, 0, 2 * Math.PI, false);
        

        //  "Wall" rendering
        for (var i = 0; i < this.cellWalls.length; i++) {
            ctx.arc(this.cellWalls[i][0],this.cellWalls[i][1], wallPieceRadius, 0 , 2*Math.PI, false);            
        };

        ctx.fillStyle = 'red';
        ctx.fill(); 
        ctx.endPath();
	};
}

var cell = new Cell(100,100);
cell.render(ctx);

var update = function(dt)
{
	input(dt);
};

// Old and new keyboard states
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


var input = function(dt)
{

};

//  TODO: Wrap image in class that knows if its loaded

var render = function()
{
	//  Check if images is ready
	//		Dislay image, ctx.drawImage();
}


//**********************  Move to utility js
var toMilliseconds = function(seconds)
{
	return seconds/1000;
};
//**********************


var main = function()
{
	var now = Date.now();
	var dt = now-then;

	//  Pass in a fixed timestep to our update function
	//  Warning this does not work with spring like physics
	update(toMilliseconds(dt));
	render();

	//  Update old time
	then = now;

	requestAnimationFrame(main);
};

//  Ensuring cross platform support
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//  Starting game loop
var then = Date.now();
main();
