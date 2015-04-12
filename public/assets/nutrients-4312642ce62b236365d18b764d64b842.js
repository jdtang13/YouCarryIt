
var GLUCOSE_WIDTH = 3;
var GLUCOSE_HEIGHT = 2;

var PROTEIN_LENGTH = 10;

var PROTEIN_LEG = (PROTEIN_LENGTH ^2 / 2)^.5;

var WATER_RADIUS = 4;

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
		if (this.counter % 5 == 0) this.clockwise = !this.clockwise;
		if (!this.clockwise){
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
		this.counter++;
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
		if (this.counter % 5 == 0) this.clockwise = !this.clockwise;
		if (!this.clockwise){
			this.worldX +=  PROTEIN_LENGTH * Math.cos(this.theta);
			this.worldY +=  PROTEIN_LENGTH * Math.sin(this.theta);
		}
		else {
			this.worldX -= PROTEIN_LENGTH * Math.cos(this.theta);
			this.worldY -= PROTEIN_LENGTH * Math.sin(this.theta);

		}
		ctx.beginPath();
		ctx.moveTo(this.worldX, this.worldY);
		ctx.lineTo(this.worldX + PROTEIN_LEG, this.worldY + PROTEIN_LEG);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(this.worldX, this.worldY + PROTEIN_LEG);
		ctx.lineTo(this.worldX + PROTEIN_LEG, this.worldY);
		ctx.stroke();
	};

	this.update = function(dt) {
		this.counter_++;
		// TODO: make tweet appear and gracefully slide off screen
		this.theta += THETA_CHANGE;
	};
}

/* Water nutrient: small blue circle */ 
function Water(worldX, worldY, streamData) {
	// nutrient is only created when streamData > .5 so  1 <= nutrious Factor <= 2
	this.nutritiousFactor = streamData * 2; 
	this.clockwise = false;

	this.feature = "water";

	this.worldX = worldX;
	this.worldY = worldY;

	this.theta = 0;
	this.counter = 1;


	this.render = function(ctx) {
		ctx.beginPath();
		if (this.counter % 5 == 0) this.clockwise = !this.clockwise;
		if (!this.clockwise){
			this.worldX +=  WATER_RADIUS * Math.cos(this.theta);
			this.worldY +=  WATER_RADIUS * Math.sin(this.theta);
		}
		else {
			this.worldX -= WATER_RADIUS * Math.cos(this.theta);
			this.worldY -= WATER_RADIUS * Math.sin(this.theta);
		}
		ctx.arc(this.worldX, this.worldY, WATER_RADIUS, 0, Math.PI*2);
		ctx.closePath();
		ctx.fillStyle = "#00FFFF";
		ctx.fill();
	};

	this.update = function(dt) {
		this.counter++;
		// TODO: make tweet appear and gracefully slide off screen
		this.theta += THETA_CHANGE;
	};
}
;
