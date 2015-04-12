// TODO: Specify actual parameters of our game.

// associated nutrients for each organelle 
var ORGANELLE_NUTRIENTS = {mitchondrion: "energy", ribosome: "protein", vacuole: "water" };

var organelleRadius = 7;
var RIBOSOME_RADIUS = 5;

var MITOCHONDRION_OUTER_RADIUS = 10;
var MITOCHONDRION_INNER_RADIUS = 5;

var VACUOLE_RADIUS = 9;

// stores all bacteria cells. TODO: make sure you store all bacteria cells
var allCells;

var organelleFloatSpeed = 0.01;

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
	this.speed = organelleFloatSpeed + (Math.random()/4);
	
	this.update = function(dt) 
	{
		if(this.floatDirection == 0)
		{
			this.angleFromCenter -= this.speed;
		}
		else
		{
			this.angleFromCenter += this.speed;
		}


		this.relativeX = (Math.cos(this.angleFromCenter) * this.distanceFromCenter);
		this.relativeY = (Math.sin(this.angleFromCenter) * this.distanceFromCenter);
	};

	// handle stylistics
	this.render = function(ctx,cameraX, cameraY, cx, cy )
	{
		if(cameraX !== undefined)
		{
			var screenX = this.worldX - cameraX + 400;
	        var screenY = this.worldY - cameraY + 300;
		}

		ctx.beginPath();

		// if organelle is not ingested
		if (cx === undefined) 
		{
			ctx.arc(screenX,  screenY, MITOCHONDRION_OUTER_RADIUS, 0, Math.PI*2);
			ctx.closePath();
			ctx.fillStyle = "#00ff00";
			ctx.fill();
			ctx.beginPath();
			ctx.arc(screenX,  screenY, MITOCHONDRION_INNER_RADIUS, 0, Math.PI*2);
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
};


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
	this.speed = organelleFloatSpeed + (Math.random()/4);
	
	this.update = function(dt) 
	{
		if(this.floatDirection == 0)
		{
			this.angleFromCenter -= this.speed;
		}
		else
		{
			this.angleFromCenter += this.speed;
		}

		this.relativeX = (Math.cos(this.angleFromCenter) * this.distanceFromCenter);
		this.relativeY = (Math.sin(this.angleFromCenter) * this.distanceFromCenter);
	};

	// Ribosome is rendered as small circle
	// TODO: stylistics
	this.render = function(ctx, cameraX, cameraY,cx, cy)
	{
		if(cameraX !== undefined)
		{
			var screenX = this.worldX - cameraX + 400;
	        var screenY = this.worldY - cameraY + 300;
		}

		ctx.beginPath();
		if (cx === undefined)
		{ 
			ctx.arc(screenX, screenY, RIBOSOME_RADIUS, 0, Math.PI*2);
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
	this.speed = organelleFloatSpeed + (Math.random()/4);
	
	this.update = function(dt) 
	{
		if(this.floatDirection == 0)
		{
			this.angleFromCenter -= this.speed;
		}
		else
		{
			this.angleFromCenter += this.speed;
		}


		this.relativeX = (Math.cos(this.angleFromCenter) * this.distanceFromCenter);
		this.relativeY = (Math.sin(this.angleFromCenter) * this.distanceFromCenter);
	};

	this.render = function(ctx,cameraX, cameraY, cx, cy )
	{
		if(cameraX !== undefined)
		{
			var screenX = this.worldX - cameraX + 400;
	        var screenY = this.worldY - cameraY + 300;
		}
		ctx.beginPath();

		if (cx === undefined) 
		{
			ctx.arc(screenX, screenY, VACUOLE_RADIUS, 0, Math.PI*2);
		}
		else 
		{
			ctx.arc(cx + this.relativeX, cy + this.relativeY, VACUOLE_RADIUS, 0, Math.PI*2);
			this.worldX = this.relativeX;
			this.worldY = this.relativeY;
		}
		ctx.fillStyle = "#0000CD"
		ctx.fill();
		ctx.closePath();
	};
}
;
