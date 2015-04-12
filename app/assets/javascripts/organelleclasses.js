// TODO: Specify actual parameters of our game.
var MAXIMUM_NUTRIENT_LEVEL = 1000; 
var DEFAULT_NUTRIENT_LEVEL = 500;
var NUTRIENT_LOSS_QUANTITY = 5;
var NUTRIENT_EFFICIENCY_FACTOR = 1.1;
// associated nutrients for each organelle 
var ORGANELLE_NUTRIENTS = {mitchondrion: "energy", ribosome: "protein", vacuole: "water" };


var RIBOSOME_RADIUS = 5;

var MITHOCHONDRION_OUTER_RADIUS = 10;
var MITOCHONDRION_INNER_RADIUS = 5;

var VACUOLE_RADIUS = 20;

var GLUCOSE_WIDTH = 5;

var GLUCOSE_HEIGHT = 3;

// stores all bacteria cells. TODO: make sure you store all bacteria cells
var allCells;

// change in angle in radians by which free organelle moves */
var THETA_CHANGE = .25;

// maximum factor of radius from which ingested organelle can be from center 
var ORGANELLE_DISTANCE_FACTOR = (2/3);




/** Main bacterium */
function Eukaryote () 
{
	this.organelles = {mitochondria: 0; ribosomes: 0; vacuoles: 0};

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
	
	/* Rendering handled by Oliver */

	/* Make sure everything in TODO is covered in update.*/

		// TODO: 
		// If you detect nutrients, increase relevant nutrient levels.
		// If you detect the loss of an organelle, increase relevant nutrient loss quantity.
		// If you die (have no nutrient levels for at least one nutrient), die.
		// If you have ripe nutrient levels for all, engage in asexual reproduction.
		// Battle?

	};

	// TODO: Create nutrient classes, draw nutrients, handle nutrient ingestion, and passage of nutrients to bacterium 
}

/** Main organelles */
function Mitochondrion (worldX, worldY) 
{
	this.nutrient = ORGANELLE_NUTRIENTS[mitochondrion];

	this.worldInnerX = worldX;
	this.worldInnerY = worldY;
	this.worldOuterX = worldX;
	this.worldOuterY = worldY;

	
	this.relativeInnerX = 0;
	this.relativeInnerY = 0;
	this.relativeOuterX = 0;
	this.relativeOuterY = 0;

	this.theta = 0;
	
	// handle stylistics
	this.render = function(ctx, cx, cy)
	{
		ctx.beginPath();

		// if organelle is not ingested
		if (!cx) {
			this.worldOuterX += MITHOCHONDRION_OUTER_RADIUS * Math.cos(this.theta);
			this.worldOuterY += MITHOCHONDRION_OUTER_RADIUS * Math.sin(this.theta);
			this.worldInnerX += MITHOCHONDRION_INNER_RADIUS * Math.cos(this.theta);
			this.worldInnerY += MITHOCHONDRION_INNER_RADIUS * Math.sin(this.theta);
			ctx.arc(this.worldOuterX,  this.worldOuterY, MITHOCHONDRION_OUTER_RADIUS, 0, Math.PI*2);
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();
			ctx.arc(this.worldInnerX,  this.worldInnerY, MITHOCHONDRION_INNER_RADIUS, 0, Math.PI*2);
			ctx.closePath();
			ctx.fillStyle = "#8FBC8F";
			ctx.fill();
		else {
			this.relativeInnerX += MITHOCHONDRION_INNER_RADIUS * Math.cos(this.theta);
			this.relativeInnerY += MITHOCHONDRION_INNER_RADIUS * Math.sin(this.theta);
			this.relativeOuterX += MITHOCHONDRION_OUTER_RADIUS * Math.cos(this.theta);
			this.relativeOuterY += MITHOCHONDRION_OUTER_RADIUS * Math.sin(this.theta);
			ctx.arc(this.relativeOuterX,  this.relativeOuterY, MITHOCHONDRION_OUTER_RADIUS, 0, Math.PI*2);
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();
			ctx.arc(this.relativeInnerX,  this.relativeInnerY, MITHOCHONDRION_INNER_RADIUS, 0, Math.PI*2);
			ctx.closePath();
			ctx.fillStyle = "#8FBC8F";
			ctx.fill();
			this.worldInnerX = this.relativeInnerX;
			this.worldOuterX = this.relativeOuterX;
			this.worldOuterY = this.relativeOuterY;
			this.worldInnerX = this.relativeInnerX;
		}
	};


	this.update = function(dt) 
	{
		/* after ingestion, establish new position in safe space relative to cell. */
		/* safe zone: 2/3 of the bacterium radius, given random angle and position */
		allCells.forEach(function(bacterium) {
			if (Math.abs(bacterium.worldX - this.worldOuterX) < (MITHOCHONDRION_OUTER_RADIUS + bacterium.radius) ||
				Math.abs(bacterium.worldY - this.worldOuterY) < (MITHOCHONDRION_OUTER_RADIUS + bacterium.radius)) {
				bacterium.addOrganelle(this);
				var distanceFromBacteriumCenter = Math.random() * bacterium.radius; 
				var organelleTheta = Math.random() * 2*Math.PI();
				this.relativeOuterX = bacterium.worldX + distanceFromBacteriumCenter * Math.cos(organelleTheta);
				this.relativeOuterY = bacterium.worldY + distanceFromBacteriumCenter * Math.sin(organelleTheta);
				this.relativeInnerX = bacterium.worldX + distanceFromBacteriumCenter * Math.cos(organelleTheta);
				this.relativeInnerY = bacterium.worldY + distanceFromBacteriumCenter * Math.sin(organelleTheta);
			}
		});

		this.theta += THETA_CHANGE;
	};

};


function Ribosome(worldX, worldY) 
{
	this.nutrient = ORGANELLE_NUTRIENTS[ribosome];

	this.worldX = worldX;
	this.worldY = worldY;
	this.relativeX = 0;
	this.relativeY = 0;

	this.theta = 0;

	// Ribosome is rendered as small circle
	// TODO: stylistics
	this.render = function(ctx, cx, cy)
	{
		ctx.beginPath();
		this.worldX += RIBOSOME_RADIUS * Math.cos(this.theta);
		this.worldY += RIBOSOME_RADIUS * Math.sin(this.theta);
		if (!cx) ctx.arc(this.worldX, this.worldY, RIBOSOME_RADIUS, 0, Math.PI*2);
		else {
			this.relativeX += RIBOSOME_RADIUS * Math.cos(this.theta);
			this.relativeY += RIBOSOME_RADIUS * Math.sin(this.theta);
			ctx.arc(this.relativeX, this.relativeY, RIBOSOME_RADIUS, 0, Math.PI*2);
			this.worldX = this.relativeX;
			this.worldY = this.relativeY;
		}
		ctx.closePath();
		ctx.fillStyle = "#A52A2A";
		ctx.fill();
	};

	this.update = function(dt) 
	{
		/* after ingestion, establish new position in safe space relative to cell. */
		/* safe zone: 2/3 of the bacterium radius, given random angle and position */
		allCells.forEach(function(bacterium) {
			if (Math.abs(bacterium.worldX - this.worldX) < (RIBOSOME_RADIUS + bacterium.radius) ||
				Math.abs(bacterium.worldY - this.worldY) < (RIBOSOME_RADIUS + bacterium.radius)) {
				bacterium.addOrganelle(this);
				var distanceFromBacteriumCenter = Math.random() * bacterium.radius; 
				var organelleTheta = Math.random() * 2*Math.PI();
				this.relativeX = bacterium.worldX + distanceFromBacteriumCenter * Math.cos(organelleTheta);
				this.relativeY = bacterium.worldY + distanceFromBacteriumCenter * Math.sin(organelleTheta);
			}
		});

		this.theta += THETA_CHANGE;
	};
}

function Vacuole (worldX, worldY) 
{
	this.nutrient = ORGANELLE_NUTRIENTS[vacuole];

	this.worldX = worldX;
	this.worldY = worldY;
	this.relativeX = 0;
	this.relativeY = 0;

	this.theta = 0;
	

	this.render = function(ctx)
	{
		ctx.beginPath();
		this.worldX += VACUOLE_RADIUS * Math.cos(this.theta);
		this.worldY += VACUOLE_RADIUS * Math.sin(this.theta);
		if (!cx) ctx.arc(this.worldX,  this.worldY, VACUOLE_RADIUS, 0, Math.PI*2);
		else {
			this.relativeX += VACUOLE_RADIUS * Math.cos(this.theta);
			this.relativeY += VACUOLE_RADIUS * Math.sin(this.theta);
			ctx.arc(this.relativeX, this.relativeY, VACUOLE_RADIUS, 0, Math.PI*2);
			this.worldX = this.relativeX;
			this.worldY = this.relativeY;
		}
		ctx.closePath();
		ctx.fillStyle = "#0000CD"
		ctx.fill();

	};


	this.update = function(dt) 
	{

		/* after ingestion, establish new position in safe space relative to cell. */
		/* safe zone: 2/3 of the bacterium radius, given random angle and position */
		allCells.forEach(function(bacterium) {
			if (Math.abs(bacterium.worldX - this.worldX) < (VACUOLE_RADIUS + bacterium.radius) ||
				Math.abs(bacterium.worldY - this.worldY) < (VACUOLE_RADIUS + bacterium.radius)) {
				bacterium.addOrganelle(this);
				var distanceFromBacteriumCenter = Math.random() * bacterium.radius; 
				var organelleTheta = Math.random() * 2*Math.PI();
				this.relativeX = bacterium.worldX + distanceFromBacteriumCenter * Math.cos(organelleTheta);
				this.relativeY = bacterium.worldY + distanceFromBacteriumCenter * Math.sin(organelleTheta);
			}
		});

		this.theta += THETA_CHANGE;

	};
}

/* Main nutrients associated with each organelle */

function Glucose (worldX, worldY) 
{
	this.nutrient = ORGANELLE_NUTRIENTS[mitochondrion];
	

	this.render = function(ctx)
	{
		ct.

	};


	this.update = function(dt) 
	{

	};
}



