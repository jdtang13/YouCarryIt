// TODO: Specify actual parameters of our game.

// associated nutrients for each organelle 
var ORGANELLE_NUTRIENTS = {mitchondrion: "energy", ribosome: "protein", vacuole: "water" };

var RIBOSOME_RADIUS = 5;

var MITOCHONDRION_OUTER_RADIUS = 10;
var MITOCHONDRION_INNER_RADIUS = 5;

var VACUOLE_RADIUS = 9;

// stores all bacteria cells. TODO: make sure you store all bacteria cells
var allCells;

/** Main organelles */
function Mitochondrion (worldX, worldY) 
{
	this.nutrient = ORGANELLE_NUTRIENTS['mitochondrion'];

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
		if (cx === undefined) 
		{
			ctx.arc(this.worldOuterX,  this.worldOuterY, MITOCHONDRION_OUTER_RADIUS, 0, Math.PI*2);
			ctx.closePath();
			ctx.fillStyle = "#00ff00";
			ctx.fill();
			ctx.beginPath();
			ctx.arc(this.worldInnerX,  this.worldInnerY, MITOCHONDRION_INNER_RADIUS, 0, Math.PI*2);
			ctx.closePath();
			ctx.fillStyle = "#8FFF8F";
			ctx.fill();
		}
		else 
		{
			this.relativeInnerX = cx + (MITOCHONDRION_INNER_RADIUS * Math.cos(this.theta));
			this.relativeInnerY = cy + (MITOCHONDRION_INNER_RADIUS * Math.sin(this.theta));
			this.relativeOuterX = cx + (MITOCHONDRION_OUTER_RADIUS * Math.cos(this.theta));
			this.relativeOuterY = cy + (MITOCHONDRION_OUTER_RADIUS * Math.sin(this.theta));

			ctx.arc(this.relativeOuterX,  this.relativeOuterY, MITOCHONDRION_OUTER_RADIUS, 0, Math.PI*2);
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();
			ctx.arc(this.relativeInnerX,  this.relativeInnerY, MITOCHONDRION_INNER_RADIUS, 0, Math.PI*2);
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
		// /* after ingestion, establish new position in safe space relative to cell. */
		// /* safe zone: 2/3 of the bacterium radius, given random angle and position */
		// allCells.forEach(function(bacterium) {
		// 	if (Math.abs(bacterium.worldX - this.worldOuterX) < (MITOCHONDRION_OUTER_RADIUS + bacterium.radius) ||
		// 		Math.abs(bacterium.worldY - this.worldOuterY) < (MITOCHONDRION_OUTER_RADIUS + bacterium.radius)) {
		// 		bacterium.addOrganelle(this);
		// 		var distanceFromBacteriumCenter = Math.random() * bacterium.radius; 
		// 		var organelleTheta = Math.random() * 2*Math.PI();
		// 		this.relativeOuterX = bacterium.worldX + distanceFromBacteriumCenter * Math.cos(organelleTheta);
		// 		this.relativeOuterY = bacterium.worldY + distanceFromBacteriumCenter * Math.sin(organelleTheta);
		// 		this.relativeInnerX = bacterium.worldX + distanceFromBacteriumCenter * Math.cos(organelleTheta);
		// 		this.relativeInnerY = bacterium.worldY + distanceFromBacteriumCenter * Math.sin(organelleTheta);
		// 	}
		// });

		// this.theta += THETA_CHANGE;
	};

};


function Ribosome(worldX, worldY) 
{
	this.nutrient = ORGANELLE_NUTRIENTS['ribosome'];

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
		if (cx === undefined)
		{ 
			ctx.arc(this.worldX, this.worldY, RIBOSOME_RADIUS, 0, Math.PI*2);
		}
		else 
		{
			this.relativeX = cx + (RIBOSOME_RADIUS * Math.cos(this.theta));
			this.relativeY = cy + (RIBOSOME_RADIUS * Math.sin(this.theta));
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
		// /* after ingestion, establish new position in safe space relative to cell. */
		// /* safe zone: 2/3 of the bacterium radius, given random angle and position */
		// allCells.forEach(function(bacterium) 
		// {
		// 	if (Math.abs(bacterium.worldX - this.worldX) < (RIBOSOME_RADIUS + bacterium.radius) ||
		// 		Math.abs(bacterium.worldY - this.worldY) < (RIBOSOME_RADIUS + bacterium.radius))
		// 	{
		// 		bacterium.addOrganelle(this);
		// 		var distanceFromBacteriumCenter = Math.random() * bacterium.radius; 
		// 		var organelleTheta = Math.random() * 2*Math.PI();
		// 		this.relativeX = bacterium.worldX + distanceFromBacteriumCenter * Math.cos(organelleTheta);
		// 		this.relativeY = bacterium.worldY + distanceFromBacteriumCenter * Math.sin(organelleTheta);
		// 	}
		// });

		// this.theta += THETA_CHANGE;
	};
}

function Vacuole (worldX, worldY) 
{
	this.nutrient = ORGANELLE_NUTRIENTS['vacuole'];

	this.worldX = worldX;
	this.worldY = worldY;
	this.relativeX = 0;
	this.relativeY = 0;

	this.theta = 0;
	

	this.render = function(ctx, cx, cy)
	{
		ctx.beginPath();

		if (cx === undefined) 
		{
			ctx.arc(this.worldX,  this.worldY, VACUOLE_RADIUS, 0, Math.PI*2);
		}
		else 
		{
			this.relativeX = cx + (VACUOLE_RADIUS * Math.cos(this.theta));
			this.relativeY = cy + (VACUOLE_RADIUS * Math.sin(this.theta));
			ctx.arc(this.relativeX, this.relativeY, VACUOLE_RADIUS, 0, Math.PI*2);
			this.worldX = this.relativeX;
			this.worldY = this.relativeY;
		}
		ctx.fillStyle = "#0000CD"
		ctx.fill();
		ctx.closePath();
	};


	this.update = function(dt) 
	{

		// /* after ingestion, establish new position in safe space relative to cell. */
		// /* safe zone: 2/3 of the bacterium radius, given random angle and position */
		// allCells.forEach(function(bacterium) {
		// 	if (Math.abs(bacterium.worldX - this.worldX) < (VACUOLE_RADIUS + bacterium.radius) ||
		// 		Math.abs(bacterium.worldY - this.worldY) < (VACUOLE_RADIUS + bacterium.radius)) {
		// 		bacterium.addOrganelle(this);
		// 		var distanceFromBacteriumCenter = Math.random() * bacterium.radius; 
		// 		var organelleTheta = Math.random() * 2*Math.PI();
		// 		this.relativeX = bacterium.worldX + distanceFromBacteriumCenter * Math.cos(organelleTheta);
		// 		this.relativeY = bacterium.worldY + distanceFromBacteriumCenter * Math.sin(organelleTheta);
		// 	}
		// });

		// this.theta += THETA_CHANGE;

	};
}