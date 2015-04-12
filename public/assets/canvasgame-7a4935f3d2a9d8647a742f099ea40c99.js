// find hash for String
function hasher(tweet) {
	var hash = 0;
	if (tweet.length == 0) return hash;
	for (i = 0; i < tweet.length; i++) {
		char = tweet.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}
/* source:  http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/ */

//  Creating canvas
var img = new Image();
img.src = '/assets/images/backdrop0-2c363a96759b923e853c1dae858ac3bb.jpg'


function runGame(first,second,third)
{
var ctx = document.getElementById('canvasGame').getContext('2d');  
/* more info: http://stackoverflow.com/questions/7381041/url-of-images-in-javascript-code-using-rails-3-1-asset-pipeline */

var freeFloatingOrganelles = new Array();
var freeFloatingNutrients = new Array();
var cell = new Cell(100,100);

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

var firstStreamSentiments = [.4, .8, .9, .45, .78, 88];
var secondStreamSentiments = [.4, .7, .3, .79, .66, .85];
var thirdStreamSentiments = [.6, .55, .7, .85, .98, .54];
var firstStreamTweets = ["Hello nerds", "xDDDD here we go", "we gucci", "Hello, how are you today?",
	"I don't know what's going on", "This is a test"];
var secondStreamTweets = ["GAME DEV BOYS", "what?", "why?", "heeey nice job friend", "it could have been different", 
"what a disaster"];
var thirdStreamTweets = ["ayy lmao", "this is the end", "you had a good run", "but not really", "good job haha",
"this couldn't have been better"];

var hash;
for (var i = 0; i < firstStreamSentiments.length; i++) {

	var distance = Math.random() * 200 + 400;
	var angle = Math.random() * Math.PI * 2;
	// create nutrient
	if (firstStreamSentiments[i] > .5) {
		hash = hasher(firstStreamTweets[i]);
		createNutrient("glucose", cell.worldX + distance * Math.cos(angle), 
			cell.worldY + distance * Math.sin(angle),
			firstStreamSentiments[i], firstStreamTweets[i]);
	}
};

for (var i = 0; i < secondStreamSentiments.length; i++) {

	var distance = Math.random() * 200 + 400;
	var angle = Math.random() * Math.PI * 2;
	// create nutrient
	if (secondStreamSentiments[i] > .5) {
		hash = hasher(secondStreamTweets[i]);
		createNutrient("protein", cell.worldX + distance * Math.cos(angle), 
			cell.worldY + distance * Math.sin(angle), 
			secondStreamSentiments[i], secondStreamTweets[i]);
	}
};

for (var i = 0; i < thirdStreamSentiments.length; i++) {

	var distance = Math.random() * 200 + 400;
	var angle = Math.random() * Math.PI * 2;
	// create nutrient
	if (thirdStreamSentiments[i] > .5) {
		hash = hasher(thirdStreamTweets[i]);
		createNutrient("water", cell.worldX + distance * Math.cos(angle), 
			cell.worldY + distance * Math.sin(angle), 
			thirdStreamSentiments[i], thirdStreamTweets[i]);
	}
};




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
			cell.addOrganelle(freeFloatingOrganelles[i]);//	Add to cells organelle list		
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
		if(distanceBetweenCellAndNutrient < cellCollisionRadius + nutrientRadius)
		{

			var tweet = freeFloatingNutrients[i].streamTweet;
			cell.addNutrient(freeFloatingNutrients[i]);
			//  We have a collision	between cell and nutrient
			freeFloatingNutrients.splice(i,1);//  Delete from array

			// Render tweet after it dies 
			document.getElementById("Tweet Paragraph").innerHTML = tweet;			
			//		Create particle effect		
			//		Play munch sound	

		}
	};	

};


var render = function()
{
	ctx.drawImage(img,0,0);
	// ctx.beginPath();
	// ctx.fillStyle = 'white';
	// ctx.fillRect(0,0,800,600);
	// ctx.closePath();
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

	if (cell.isDead) {
		// indicate loss to user
		document.getElementById("Nutrient Information").innerHTML = "You're finished!";
		break;
	}
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

	var firstVal =  document.getElementById("first").value;
	var secondVal = document.getElementById("second").value;
	var thirdVal = document.getElementById("third").value;

	//Pull the text box's value
	runGame(
		firstVal,
		secondVal,
		thirdVal);

    jQuery.ajax({
      url: "welcome_controller/sendVals",
      type: "post",
      dataType: "script",
      data: { first : firstVal, second : secondVal, third : thirdVal }
    });
};
