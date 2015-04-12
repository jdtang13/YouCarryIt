
// find hash for String
String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}
/* source:  http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/ */

//  Creating canvas
function runGame(first,second,third)
{

var ctx = document.getElementById('canvasGame').getContext('2d');  
/* more info: http://stackoverflow.com/questions/7381041/url-of-images-in-javascript-code-using-rails-3-1-asset-pipeline */



var freeFloatingOrganelles = new Array();
var freeFloatingNutrients = new Array();

var createOrganelle = function(type, worldX, worldY)
{
	if(type == "mito" || type == "mitochondrion")
	{
		//Mitochondrion
		freeFloatingOrganelles.push(new Mitochondrion(worldX,worldY));
	}
	else if(type == "ribo" || type == "ribosome")	
	{
		//Ribosome
		freeFloatingOrganelles.push(new Ribosome(worldX,worldY));
	}
	else
	{
		//Vacuole
		freeFloatingOrganelles.push(new Vacuole(worldX,worldY));
	}
};

var createNutrient = function(type, worldX, worldY, streamSentiment, streamTweet)
{
	if(type == "glucose")
	{
		//Glucose
		freeFloatingNutrients.push(new Glucose(worldX,worldY,streamSentiment, streamTweet));
	}
	else if(type == "protein")	
	{
		//Protein
		freeFloatingNutrients.push(new Protein(worldX,worldY, streamSentiment, streamTweet));
	}
	else
	{
		//Water
		freeFloatingNutrients.push(new Water(worldX,worldY,streamSentiment, streamTweet));
	}
};

var firstStreamSentiments = {.6, .6, .7, .8, .9};
var secondStreamSentiments = {.6, .6, .7, .8, .9};
var thirdStreamSenitments = {.6, .6, .7, .8, .9};
var firstStreamTweets = {"Hello nerds", "xDDDD here we go", "we gucci", "GAME DEV BOYS", "what?"};
var secondStreamTweets = {"Hello nerds", "xDDDD here we go", "we gucci", "GAME DEV BOYS", "what?"};
var thirdStreamTweets = {"Hello nerds", "xDDDD here we go", "we gucci", "GAME DEV BOYS", "what?"};

var hash;
var i;
for (i = 0; i < firstStreamSentiments.length; i++) {
	// create nutrient
	if (firstStreamSentiments[i] > .5) {
		hash = firstStreamTweets[i].hashCode();
		createNutrient("glucose", (hash / Number.MAX_VALUE) * 800, (hash / Number.MAX_VALUE) * 600, 
			firstStreamSentiments[i], firstStreamTweets[i]);
	}
};

for (i = 0; i < secondStreamSentiments.length; i++) {
	// create nutrient
	if (secondStreamSentiments[i] > .5) {
		hash = secondStreamTweets[i].hashCode();
		createNutrient("protein", (hash / Number.MAX_VALUE) * 800, (hash / Number.MAX_VALUE) * 600, 
			secondStreamSentiments[i], secondStreamTweets[i]);
	}
};

for (i = 0; i < thirdStreamSentiments.length; i++) {
	// create nutrient
	if (thirdStreamSentiments[i] > .5) {
		hash = thirdStreamTweets[i].hashCode();
		createNutrient("water", (hash / Number.MAX_VALUE) * 800, (hash / Number.MAX_VALUE) * 600, 
			thirdStreamSentiments[i], thirdStreamTweets[i]);
	}
};


var cell = new Cell(100,100);

// create organelles based off of tweets, randomly, or what?
createOrganelle("ribo",600,200);
createOrganelle("mito",400,400);
createOrganelle("vacu",200,200);


var update = function(dt)
{
	input(dt);

	cell.update(dt);

	for (var i = 0; i < freeFloatingOrganelles.length; i++) {
		freeFloatingOrganelles[i].update(dt);
	};

	for (var i = 0; i < freeFloatingNutrients.length; i++) {
		freeFloatingNutrients[i].update(dt);
	}

	checkCollisions();
};

// Old and new keyboard states
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);



var input = function(dt)
{
	if(keysDown[39])//Right
	{
		cell.worldX += 5;
	}
	if(keysDown[38])//Up
	{
		cell.worldY -= 5;
	}
	if(keysDown[37])//Left
	{
		cell.worldX -= 5;
	}
	if(keysDown[40])//Down
	{
		cell.worldY += 5;
	}
};

var checkCollisions = function()
{
	for (var i = 0; i < freeFloatingOrganelles.length; i++) 
	{
		var distanceBetweenCellAndOrganelle = 
			Math.sqrt(Math.pow(cell.worldX-freeFloatingOrganelles[i].worldX,2) + 
					  Math.pow(cell.worldY-freeFloatingOrganelles[i].worldY,2));

		if(distanceBetweenCellAndOrganelle < cellRadius + organelleRadius)
		{
			//  We have a collision	between cell and organelle
			freeFloatingOrganelles.splice(i,1);//  Delete from array add to cell 		
			//		Play absorption sound
			//		Create particle effect
		}
	};	
	for (var i = 0; i < freeFloatingNutrients.length; i++) 
	{
		var distanceBetweenCellAndNutrient = 
			Math.sqrt(Math.pow(cell.worldX-freeFloatingNutrients[i].worldX,2) + 
					  Math.pow(cell.worldY-freeFloatingNutrients[i].worldY,2));

		var nutrientRadius = 6;
		if(distanceBetweenCellAndNutrient < cellRadius + nutrientRadius)
		{

			var tweet = freeFloatingNutrients[i].streamTweet;
			var xCor = freeFloatingNutrients[i].worldX;
			var yCor = freeFloatingNutrients[i].worldY;
			//  We have a collision	between cell and nutrient
			freeFloatingNutrients.splice(i,1);//  Delete from array
			// Render tweet after it dies 
			ctx.font = "14px Georgia";
			ctx.fillText(tweet,xCor,yCor);
			setTimeout(cxt.clearRect(xCor, yCor, cxt.measureText(tweet).width, 10), 500);

			//		Increment nutrient values
			//		Create particle effect		
			//		Play munch sound	

		}
	};	

};


var render = function()
{
	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.fillRect(0,0,800,600);
	ctx.closePath();
	//  Check if images is ready
	//		Dislay image, ctx.drawImage();

	for (var i = 0; i < freeFloatingOrganelles.length; i++) {
		freeFloatingOrganelles[i].render(ctx);
	};

	for (var i = 0; i < freeFloatingNutrients.length; i++) {
		freeFloatingNutrients[i].render(ctx);
	};

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
}//  End of run game


function createGame()
{
	var forms = document.getElementById('threeOptions');
	forms.style.display = "none";

	var game = document.getElementById('canvasGame');
	game.style.display = "block";

	//Pull the text box's value
	runGame(
		document.getElementById("first").value,
		document.getElementById("second").value,
		document.getElementById("third").value);
};

