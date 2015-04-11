//  Creating canvas
function runGame()
{

var ctx = document.getElementById('canvasGame').getContext('2d');  
/* more info: http://stackoverflow.com/questions/7381041/url-of-images-in-javascript-code-using-rails-3-1-asset-pipeline */



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
