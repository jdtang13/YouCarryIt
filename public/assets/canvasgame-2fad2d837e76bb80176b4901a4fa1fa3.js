//  Creating canvas
function runGame()
{

var ctx = document.getElementById('canvasGame').getContext('2d');  
/* more info: http://stackoverflow.com/questions/7381041/url-of-images-in-javascript-code-using-rails-3-1-asset-pipeline */


var distanceFromCenter = 30;
var undulationAmplitude = 8;

var plasmidRadius = 4;
var wallPieceRadius = 1;

function Cell (worldX,worldY) 
{
    this.worldX = worldX;
    this.worldY = worldY;

	this.organelles = {};

    this.cellWallX = new Array();
    this.cellWallY = new Array();
    this.undulationAngle = 0;
    this.undulationSpeed = 0.01;
	
    for (var i = 0; i < 45; i++) {
        this.cellWallX.push(0);
        this.cellWallY.push(0);
    };

    this.update = function(dt)
    {
        //  The undulating of cell walls
        this.undulationAngle += this.undulationSpeed;
        //this.undulationAngle *= 1.1;

        for (var i = 0; i < this.cellWallX.length; i++) 
        {
			var atEveryRadians = Math.PI*2/this.cellWallX.length;
        	var undulation = (Math.sin(this.undulationAngle) * undulationAmplitude);
        	
        	var xs = Math.cos(atEveryRadians*i) * (distanceFromCenter+undulation);
            this.cellWallX[i] = worldX + xs ;
            
			var ys = Math.sin(atEveryRadians*i) * (distanceFromCenter + undulation);
            this.cellWallY[i] = worldY + ys;
        };
    };
	this.render = function(ctx)
	{
        //  Center of bacteria 
        ctx.beginPath();
        //ctx.arc(this.worldX, this.worldY, plasmidRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();

        //  "Wall" rendering
        for (var i = 0; i < this.cellWallX.length; i++) {
        	ctx.beginPath();
            ctx.arc(this.cellWallX[i],this.cellWallY[i], wallPieceRadius, 0 , 2*Math.PI, false);
            ctx.fillStyle = 'blue';
        	ctx.fill();  
            ctx.closePath();          
        };

        
	};
}

var cell = new Cell(100,100);


var update = function(dt)
{
	input(dt);
	cell.update(dt);
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
	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,800,600);
	ctx.closePath();
	//  Check if images is ready
	//		Dislay image, ctx.drawImage();

	cell.render(ctx);
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
}

window.onload = runGame;
