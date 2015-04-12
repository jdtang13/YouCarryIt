var updating = true; 

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

var twitter_factor = 1;

var firstStreamSentiments = [0.10205818815304715, 0.3506799629915738];
var secondStreamSentiments = [0.8173114933262084];
var thirdStreamSentiments = [0.9644229431726448];

var firstStreamTweets = ["RT @Ashton5SOS: http://t.co/j8usF8QTem", "Même chez nous cette série éblouie tous le monde https://t.co/k4xILiolWS"];
var secondStreamTweets = ["RT @PourLesSportifs: Ton corps reflète l'image de ton alimentation. http://t.co/9C6VhBqvbn"];
var thirdStreamTweets = ["@mzveegh Dancehall Queen! mi so proud of u.. more awards ahead #workhard"];

var lastTweet = "";

var populateTweets = function()
{
	if (twitter_factor) {
		var rawRailsData = (document.getElementById("rails-data").innerHTML).split("~");
	}
	else {
		var rawRailsString = " 0.8617306284949706, Смотрю про каких-то педофилов, 0.18657822745475813, RT @rtifuwouldfuckk: Liam payne, 0.8543252355287605, RT @NiallOfficial: What a day @TheMasters , @McIlroyRory played great and @JustinRose99 was on fire on the back nine! Gona be amazing tomo…, 0.4082836909922361, اللـهــم إنّــي أسـألــك عـيـشــاً قــاراً ورزقــاً داراً وعـمــلاً بــاراً http://t.co/X5Vmp4zADb, 0.6672679366592732, City today and then we got them ducking rentboys Chelsea on Saturday. Gonna be some tough matches for Man Utd, 0.5654403203625696, Себяха на работе), 0.14965798317796883, اللهم إني اسالك علما نافعا و رزقا طيبا و عملا متقبلا http://t.co/6i7pZhlbHi, 0.6177743113528182, NuBand https://t.co/0E1CiYuzUY, 0.18307667791019872, RT @re_born_mi: 下半身デブだと諦めてない？ 脚の形綺麗にしたい❤ セルライトなくしたい💙 あと、腹筋割りたい💓 そんな人はこれ→http://t.co/SLc0EhSbLI 美脚に無理な食事制限は必要ないよ😙✨ http://t.co/gnv8PM…, 0.32036117729704655, @YunjiPark1107 ㄷㄷㄷㄷㄷㄷ, 0.41385231333388234, RT @SUJUalltheway05: 150412 #BESTofBESTPH2015 - THE VENUE IS SO HUGE! SEATING CAPACITY IS THE SAME AS TOKYO DOME! :) ©Myalteregocmist :D, 0.40861519447161726, @kobusaaaan ファンはそれをわきまえとんよ あれはファンじゃねーな, 0.8046955417075975, さて・・・ ではいいとこ探しか・・・・ これは・・・・・・・・うん・・・・・時間があったらしよう！（する人が多すぎるわｗｗ！！）, 0.7907946083303335, Gua ga kaya mantan mantan lo han :v gua mah biasa aja., 0.1647870066493488, RT @PandanganPRIA: Memaafkan akan membawa ketenangan hati dan Jiwa, sedangkan Menghujat hanya akan menciptakan kedengkian di hati kita,";

		var rawRailsData = rawRailsString.split("~");
	}

	if (twitter_factor) {

		if (rawRailsData.length > 1 && rawRailsData[rawRailsData.length-1] != lastTweet) {

			for (var i = 0; i < rawRailsData.length - 1; i += 2) {
				var tweets = firstStreamTweets;
				var sents = firstStreamSentiments;
				if (i % 3 == 1) {
					tweets = secondStreamTweets;
					sents = secondStreamSentiments;
				}
				else if (i % 3 == 2) {
					tweets = thirdStreamTweets;
					sents = thirdStreamSentiments;
				}

				tweets.push(rawRailsData[i+1]);
				sents.push(rawRailsData[i])

				lastTweet = rawRailsData[i+1];
			}

			var hash;
			for (var i = 0; i < firstStreamSentiments.length; i++) {
				// create nutrient
				if (firstStreamSentiments[i] > .5) {
					hash = hasher(firstStreamTweets[i]);
					createNutrient("glucose", (hash % 600), (hash % 400), 
						firstStreamSentiments[i], firstStreamTweets[i]);
				}
			};

			createOrganelle("vacu",hash % 650,hash % 500);


			for (var i = 0; i < secondStreamSentiments.length; i++) {
				// create nutrient
				if (secondStreamSentiments[i] > .5) {
					hash = hasher(secondStreamTweets[i]);
					createNutrient("protein", (hash % 600), (hash % 400), 
						secondStreamSentiments[i], secondStreamTweets[i]);
				}
			};

			createOrganelle("ribo",hash % 650,hash % 500);

			for (var i = 0; i < thirdStreamSentiments.length; i++) {
				// create nutrient
				if (thirdStreamSentiments[i] > .5) {
					hash = hasher(thirdStreamTweets[i]);
					createNutrient("water", (hash % 600), (hash % 400), 
						thirdStreamSentiments[i], thirdStreamTweets[i]);
				}
			};

			// create organelles based off of tweets, randomly, or what?

			createOrganelle("mito",hash % 650,hash % 500);

		}

}

else {
	var limitRails = 15;

	var hash;
	for (var i = 0; i < limitRails; i++) {
		// create nutrient
		if (rand > .5) {
			createNutrient("glucose", (rand * 600), (rand * 400), 
				rand, "Gonna be some tough matches for Man");
		}
	};

	createOrganelle("vacu",rand * 650,rand * 500);


	for (var i = 0; i < limitRails; i++) {
		// create nutrient
		if (rand > .5) {
			createNutrient("protein", (rand * 600), (rand * 400), 
				rand, "THE VENUE IS SO HUGE! SEATING CAPACITY IS THE SAME AS TOKYO DOME!");
		}
	};

	createOrganelle("ribo",rand * 650,rand * 500);

	for (var i = 0; i < limitRails; i++) {
		// create nutrient
		if (rand > .5) {
			createNutrient("water", (rand * 600), (rand * 400), 
				rand, "RT @NiallOfficial: What a day @TheMasters ");
		}
	};

	// create organelles based off of tweets, randomly, or what?

	createOrganelle("mito",rand * 650,rand * 500);
}

};

var cell = new Cell(100,100);

var update = function(dt)
{
    populateTweets();

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
			var xCor = 320;
			var yCor = 720;
			//  We have a collision	between cell and nutrient
			freeFloatingNutrients.splice(i,1);//  Delete from array
			// Render tweet after it dies 
			ctx.font = "28px Georgia";
			ctx.fillText(tweet,xCor,yCor);
			updating = false;
			
			//		Increment nutrient values
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
	if (!updating) {
		updating = true;
		render();
	}

	else {
		update(toMilliseconds(dt));
		render();
	}

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
