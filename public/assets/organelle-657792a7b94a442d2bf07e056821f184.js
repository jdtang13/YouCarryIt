// associated nutrients for each organelle 
var ORGANELLE_NUTRIENTS = {mitchondrion: "energy", ribosome: "protein", vacuole: "water" };

var DEFAULT_NUTRITION_BOOST = 20;

var organelleRadius = 7;
var RIBOSOME_RADIUS = 5;

var MITOCHONDRION_OUTER_RADIUS = 10;
var MITOCHONDRION_INNER_RADIUS = 5;

var VACUOLE_RADIUS = 9;

var GLUCOSE_WIDTH = 5;

var GLUCOSE_HEIGHT = 3;

// stores all bacteria cells. TODO: make sure you store all bacteria cells
var allCells;

var organelleFloatSpeed = 0.01;

// change in angle in radians by which free organelle moves */
var THETA_CHANGE = .25;

// maximum factor of radius from which ingested organelle can be from center 
var ORGANELLE_DISTANCE_FACTOR = (2/3);

/** Main bacterium */
function Eukaryote () 
{
	this.organelles = {mitochondria: 0, ribosomes: 0, vacuoles: 0};

    this.nutrientLevels = { energyLevel: DEFAULT_NUTRIENT_LEVEL, proteinLevel: DEFAULT_NUTRIENT_LEVEL, 
    	waterLevel: DEFAULT_NUTRIENT_LEVEL};

    this.nutrientLossQuantity = { energyLoss: NUTRIENT_LOSS_QUANTITY, proteinLoss: NUTRIENT_LOSS_QUANTITY, 
    	waterLoss: NUTRIENT_LOSS_QUANTITY};



    this.addOrganelle = function(organelle) {
    	if (ORGANELLE_NUTRIENTS[organelle] === "energy") {
    		this.nutrientLossQuantity.energyLoss /=  NUTRIENT_EFFICIENCY_FACTOR;
    		organelles[mitochondria]++;
    	}

    	if (ORGANELLE_NUTRIENTS[organelle] === "protein") {
    		this.nutrientLossQuantity.proteinLoss /=  NUTRIENT_EFFICIENCY_FACTOR;
    		organelles[ribosomes]++;
    	}

    	if (ORGANELLE_NUTRIENTS[organelle] === "vacuole") {
    		this.nutrientLossQuantity.waterLoss /=  NUTRIENT_EFFICIENCY_FACTOR;
    		organelles[vacuoles]++;
    	}
    };

    this.expendResources = function() {
    	this.nutrientLevels.energyLevel -= this.nutrientLossQuantity.energyLoss;
    	this.nutrientLevels.proteinLevel -= this.nutrientLossQuantity.proteinLoss;
    	this.nutrientLevels.waterLevel -= this.nutrientLossQuantity.waterLoss;
    };

    this.addNutrient = function(nutrient) {
    	if (nutrient.feature === "energy") {
    		this.nutrientLevel.energyLevel +=  nutrient.nutritiousFactor * DEFAULT_NUTRITION_BOOST;
    	};    	

    	if (nutrient.feature === "protein") {
    		this.nutrientLevel.proteinLevel +=  nutrient.nutritiousFactor * DEFAULT_NUTRITION_BOOST;    	}

    	if (nutrient.feature === "water") {
    		this.nutrientLevel.waterLevel += nutrient.nutriousFactor * DEFAULT_NUTRITION_BOOST;
    	}

    };
	
	/* Make sure everything in TODO is covered in update.*/
		// If you die (have no nutrient levels for at least one nutrient), die.
		// If you have ripe nutrient levels for all, engage in asexual reproduction.
		// Battle?

	};

/** Main organelles */
function Mitochondrion (worldX, worldY) 
{
	this.nutrient = ORGANELLE_NUTRIENTS['mitochondrion'];

	this.worldX = worldX;
	this.worldY = worldY;

	this.angleFromCenter = 0;

	this.distanceFromCenter = 0;
	this.relativeX = 0;
	this.relativeY = 0;

	this.theta = 0;

	this.floatDirection = 0;
	if(Math.random()>0.5)
	{
		this.floatDirection = 1;
	}
	
	this.update = function(dt) 
	{
		if(this.floatDirection == 0)
		{
			this.angleFromCenter -= organelleFloatSpeed;
		}
		else
		{
			this.angleFromCenter += organelleFloatSpeed;
		}


		this.relativeX = (Math.cos(this.angleFromCenter) * this.distanceFromCenter);
		this.relativeY = (Math.sin(this.angleFromCenter) * this.distanceFromCenter);

		this.theta += THETA_CHANGE;
	};

	// handle stylistics
	this.render = function(ctx, cx, cy)
	{
		ctx.beginPath();

		// if organelle is not ingested
		if (cx === undefined) 
		{
			ctx.arc(this.worldX,  this.worldY, MITOCHONDRION_OUTER_RADIUS, 0, Math.PI*2);
			ctx.closePath();
			ctx.fillStyle = "#00ff00";
			ctx.fill();
			ctx.beginPath();
			ctx.arc(this.worldX,  this.worldY, MITOCHONDRION_INNER_RADIUS, 0, Math.PI*2);
			ctx.closePath();
			ctx.fillStyle = "#8FFF8F";
			ctx.fill();
		}
		else 
		{
			ctx.arc(
				cx + this.relativeX,
				cy + this.relativeY, MITOCHONDRION_OUTER_RADIUS, 0, Math.PI*2);
			ctx.closePath();
			ctx.fillStyle = "#00ff00";
			ctx.fill();
			ctx.beginPath();
			ctx.arc(
				cx + this.relativeX,
				cy + this.relativeY, MITOCHONDRION_INNER_RADIUS, 0, Math.PI*2);
			ctx.closePath();
			ctx.fillStyle = "#8FFF8F";
			ctx.fill();
			this.worldX = cx + this.relativeX;
			this.worldX = cy + this.relativeY;
		}
	};
}


function Ribosome(worldX, worldY) 
{
	this.nutrient = ORGANELLE_NUTRIENTS['ribosome'];

	this.worldX = worldX;
	this.worldY = worldY;

	this.angleFromCenter = 0;
	this.distanceFromCenter = 0;
	this.relativeX = 0;
	this.relativeY = 0;

	this.theta = 0;

	this.floatDirection = 0;
	if(Math.random()>0.5)
	{
		this.floatDirection = 1;
	}
	
	this.update = function(dt) 
	{
		if(this.floatDirection == 0)
		{
			this.angleFromCenter -= organelleFloatSpeed;
		}
		else
		{
			this.angleFromCenter += organelleFloatSpeed;
		}


		this.relativeX = (Math.cos(this.angleFromCenter) * this.distanceFromCenter);
		this.relativeY = (Math.sin(this.angleFromCenter) * this.distanceFromCenter);
		this.theta += THETA_CHANGE;
	};

	// Ribosome is rendered as small circle
	// TODO: stylistics
	this.render = function(ctx, cx, cy)
	{
		ctx.beginPath();
		if (cx === undefined)
		{ 
			ctx.arc(this.worldX, this.worldY, RIBOSOME_RADIUS, 0, Math.PI*2);
		}
		else 
		{
			ctx.arc(cx + this.relativeX, cy + this.relativeY, RIBOSOME_RADIUS, 0, Math.PI*2);
			this.worldX = this.relativeX;
			this.worldY = this.relativeY;
		}
		ctx.closePath();
		ctx.fillStyle = "#A52A2A";
		ctx.fill();
	};
}

function Vacuole (worldX, worldY) 
{
	this.nutrient = ORGANELLE_NUTRIENTS['vacuole'];

	this.worldX = worldX;
	this.worldY = worldY;

	this.angleFromCenter = 0;
	this.distanceFromCenter = 0;
	this.relativeX = 0;
	this.relativeY = 0;

	this.theta = 0;
	
	this.floatDirection = 0;
	if(Math.random()>0.5)
	{
		this.floatDirection = 1;
	}
	
	this.update = function(dt) 
	{
		if(this.floatDirection == 0)
		{
			this.angleFromCenter -= organelleFloatSpeed;
		}
		else
		{
			this.angleFromCenter += organelleFloatSpeed;
		}


		this.relativeX = (Math.cos(this.angleFromCenter) * this.distanceFromCenter);
		this.relativeY = (Math.sin(this.angleFromCenter) * this.distanceFromCenter);
	};

	this.render = function(ctx, cx, cy)
	{
		ctx.beginPath();

		if (cx === undefined) 
		{
			ctx.arc(this.worldX,  this.worldY, VACUOLE_RADIUS, 0, Math.PI*2);
		}
		else 
		{
			ctx.arc(cx + this.relativeX, cy + this.relativeY, VACUOLE_RADIUS, 0, Math.PI*2);
			this.worldX = this.relativeX;
			this.worldY = this.relativeY;
		}
		ctx.fillStyle = "#0000CD"
		ctx.fill();

	};


	this.update = function(dt) 
	{

		this.theta += THETA_CHANGE;

	};
}

;
