
var GLUCOSE_WIDTH = 3;
var GLUCOSE_HEIGHT = 2;

var PROTEIN_LENGTH = 3;

var PROTEIN_LEG = (PROTEIN_LENGTH ^2 / 2)^.5;

var WATER_RADIUS = 3;

var THETA_CHANGE = .25;


/* Glucose nutrient: a rectangle with defined width and height */ 
function Glucose(worldX, worldY, streamData) {
	// nutrient is only created when streamData > .5 so  1 <= nutrious Factor <= 2
	this.nutritiousFactor = streamData * 2; 
	this.clockwise = false;

	this.feature = "energy";

	this.worldX = worldX;
	this.worldY = worldY;

	this.theta = 0;
	this.counter = 1;


	this.render = function(ctx) {
		if (counter % 5 == 0) clockwise = !clockwise;
		if (!clockwise){
			this.worldX +=  GLUCOSE_WIDTH * Math.cos(this.theta);
			this.worldY +=  GLUCOSE_HEIGHT * Math.sin(this.theta);
		}
		else {
			this.worldX -= GLUCOSE_WIDTH * Math.cos(this.theta);
			this.worldY -= GLUCOSE_HEIGHT * Math.sin(this.theta);
		}
		ctx.fillStyle = "green";
		ctx.fillRect(this.worldX, this.worldY, GLUCOSE_WIDTH, GLUCOSE_HEIGHT);
	};

	this.update = function(dt) {
		counter++;
		// TODO: make tweet appear and gracefully slide off screen
		this.theta += THETA_CHANGE;
	};
}


/* Protein nutrient: two diagonal lines */ 
function Protein(worldX, worldY, streamData) {
	// nutrient is only created when streamData > .5 so  1 <= nutrious Factor <= 2
	var nutritiousFactor = streamData * 2; 

	this.feature = "protein";

	this.worldX = worldX;
	this.worldY = worldY;

	this.theta = 0;
	this.counter = 1;


	this.render = function(ctx) {
		if (counter % 5 == 0) clockwise = !clockwise;
		if (!clockwise){
			this.worldX +=  PROTEIN_LENGTH * Math.cos(this.theta);
			this.worldY +=  PROTEIN_LENGTH * Math.sin(this.theta);
		}
		else {
			this.worldX -= PROTEIN_LENGTH * Math.cos(this.theta);
			this.worldY -= PROTEIN_LENGTH * Math.sin(this.theta);

		}
		ctx.beginPath();
		ctx.moveTo(this.worldX, this.worldY);
		ctx.LineTo(this.worldX + PROTEIN_LEG, this.worldY + PROTEIN_LEG);
		ctx.Stroke();
		ctx.beginPath();
		ctx.moveTo(this.worldX, this.worldY + PROTEIN_LEG);
		ctx.LineTo(this.worldX + PROTEIN_LEG, this.worldY);
		ctx.Stroke();
	};

	this.update = function(dt) {
		counter_++;
		
		// TODO: make tweet appear and gracefully slide off screen

		this.theta += THETA_CHANGE;
	};
}

/* Water nutrient: small blue circle */ 
function Water(worldX, worldY) {

	// nutrient is only created when streamData > .5 so  1 <= nutrious Factor <= 2
	this.nutritiousFactor = streamData * 2; 
	this.clockwise = false;

	this.feature = "water";

	this.worldX = worldX;
	this.worldY = worldY;

	this.theta = 0;
	this.counter = 1;


	this.render = function(ctx) {
		if (counter % 5 == 0) clockwise = !clockwise;
		if (!clockwise){
			this.worldX +=  GLUCOSE_WIDTH * Math.cos(this.theta);
			this.worldY +=  GLUCOSE_HEIGHT * Math.sin(this.theta);
		}
		else {
			this.worldX -= GLUCOSE_WIDTH * Math.cos(this.theta);
			this.worldY -= GLUCOSE_HEIGHT * Math.sin(this.theta);
		}
		ctx.fillStyle = "green";
		ctx.fillRect(this.worldX, this.worldY, GLUCOSE_WIDTH, GLUCOSE_HEIGHT);
	};

	this.update = function(dt) {
		counter++;
		// TODO: make tweet appear and gracefully slide off screen
		this.theta += THETA_CHANGE;
	};
	// Establish nutrient identifier as "water"

	// Render: Update worldX and worldY by movement around circle based
	// off of theta and the radius (WATER_RADIUS * cos/sin(theta)). make sure that it is sychronized

	// In update, determine whether bacterium swallows protein molecule. If it does,
	// delete the moecule (or move off screen) and call bacterium.addNutrient(this). you need
	// to code bacterium.addNutrient to simply update nutrient levels.


}