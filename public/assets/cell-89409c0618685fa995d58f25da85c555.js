
// change in angle in radians by which free organelle moves */
var THETA_CHANGE = .25;

// maximum factor of radius from which ingested organelle can be from center 
var ORGANELLE_DISTANCE_FACTOR = (2/3);

var MAXIMUM_NUTRIENT_LEVEL = 1000; 
var DEFAULT_NUTRIENT_LEVEL = 500;
var NUTRIENT_LOSS_QUANTITY = 5;
var NUTRIENT_EFFICIENCY_FACTOR = 1.1;

var cellRadius = 50;
var undulationAmplitude = 5;
var growthAmplitude = 5;
var centerUndulationRadius = 1.5;

var plasmidRadius = 7;
var wallPieceRadius = 1.75;

var cellCollisionRadius = 30;
var minimumOrganelleDistance = 15;
var maxOrganelleDistance = 20;

function Cell (worldX,worldY) 
{
    this.worldX = worldX;
    this.worldY = worldY;

    //Cell wall
    this.cellWallX = new Array();
    this.cellWallY = new Array();
    this.undulationAngle = 0;
    this.undulationSpeed = 0.01;

    this.centerRadius = plasmidRadius;
	
    for (var i = 0; i < 360; i++) {
        this.cellWallX.push(0);
        this.cellWallY.push(0);
    };

    this.organelles = {mitochondria: {}, ribosomes: {}, vacuoles: {}};
    this.allOrganelles = new Array();

    this.nutrientLevels = { 
        energyLevel: DEFAULT_NUTRIENT_LEVEL, 
        proteinLevel: DEFAULT_NUTRIENT_LEVEL, 
        waterLevel: DEFAULT_NUTRIENT_LEVEL};

    this.nutrientLossQuantity = { 
        energyLoss: NUTRIENT_LOSS_QUANTITY, 
        proteinLoss: NUTRIENT_LOSS_QUANTITY, 
        waterLoss: NUTRIENT_LOSS_QUANTITY};

    this.addOrganelle = function(organelle) {
        var xToOrganelle = organelle.worldX - this.worldX;
        var yToOrganelle = organelle.worldY - this.worldY;

        var startingAngle = Math.atan2(yToOrganelle,xToOrganelle);
        var startingDistance = minimumOrganelleDistance + (Math.random() * (maxOrganelleDistance - minimumOrganelleDistance));
        var relativeX = Math.cos(startingAngle) * startingDistance;
        var relativeY = Math.sin(startingAngle) * startingDistance;

        organelle.relativeX = relativeX;
        organelle.relativeY = relativeY;
        organelle.angleFromCenter = startingAngle;
        organelle.distanceFromCenter = startingDistance;

        this.allOrganelles.push(organelle);

        if (ORGANELLE_NUTRIENTS[organelle] === "energy") {
            this.nutrientLossQuantity.energyLoss /=  NUTRIENT_EFFICIENCY_FACTOR;
            this.organelles["mitochondria"].push(organelle);
        }

        if (ORGANELLE_NUTRIENTS[organelle] === "protein") {
            this.nutrientLossQuantity.proteinLoss /=  NUTRIENT_EFFICIENCY_FACTOR;
            this.organelles["ribosomes"].push(organelle);
        }

        if (ORGANELLE_NUTRIENTS[organelle] === "vacuole") {
            this.nutrientLossQuantity.waterLoss /=  NUTRIENT_EFFICIENCY_FACTOR;
            this.organelles["vacuoles"].push(organelle);
        }
    };

    this.expendResources = function() {
        this.nutrientLevels.energyLevel -= this.nutrientLossQuantity.energyLoss;
        this.nutrientLevels.proteinLevel -= this.nutrientLossQuantity.proteinLoss;
        this.nutrientLevels.waterLevel -= this.nutrientLossQuantity.waterLoss;
    };

    this.update = function(dt)
    {
        this.expendResources();

        for (var i = 0; i < this.allOrganelles.length; i++) {
            //this.allOrganelles[i].update(dt);
        };

        //  The undulating of cell walls
        this.undulationAngle += this.undulationSpeed*3;

        this.centerRadius = plasmidRadius + ( Math.sin(this.undulationAngle) * centerUndulationRadius);

        for (var i = 0; i < this.cellWallX.length; i++) 
        {
			var atEveryRadians = Math.PI*2/this.cellWallX.length;
        	var undulation = Math.sin((this.undulationAngle + atEveryRadians*i)*7) * undulationAmplitude;
            var growth = Math.sin(this.undulationAngle) * growthAmplitude;
        	 
            this.cellWallX[i] = Math.cos(atEveryRadians*i) * (cellRadius + undulation + growth);
            this.cellWallY[i] = Math.sin(atEveryRadians*i) * (cellRadius + undulation + growth);
        };
    };
	this.render = function(ctx, cameraX,cameraX)
	{
        var screenX = this.worldX - cameraX + 400;
        var screenY = this.worldY - cameraY + 300;

        for (var i = 0; i < this.allOrganelles.length; i++) {
            //this.allOrganelles[i].render(ctx,screenX,screenY,cameraX,cameraY);
        };

        //  Rendering center of bacteria 
        ctx.beginPath();
        ctx.arc(screenX,screenY, this.centerRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();

        //  "Wall" rendering
        for (var i = 0; i < this.cellWallX.length; i++) {
        	ctx.beginPath();
            ctx.arc(screenX + this.cellWallX[i], screenY + this.cellWallY[i], wallPieceRadius, 0 , 2*Math.PI, false);
            ctx.fillStyle = 'blue';
        	ctx.fill();  
            ctx.closePath();          
        };
	};

    
    
    /* Rendering handled by Oliver */

    /* Make sure everything in TODO is covered in update.*/

        // TODO: 
        // If you detect nutrients, increase relevant nutrient levels.
        // If you detect the loss of an organelle, increase relevant nutrient loss quantity.
        // If you die (have no nutrient levels for at least one nutrient), die.
        // If you have ripe nutrient levels for all, engage in asexual reproduction.
        // Battle?

    

    // TODO: Create nutrient classes, draw nutrients, handle nutrient ingestion, and passage of nutrients to bacterium 

}
;
