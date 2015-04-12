
// change in angle in radians by which free organelle moves */
var THETA_CHANGE = .25;

// maximum factor of radius from which ingested organelle can be from center 
var ORGANELLE_DISTANCE_FACTOR = (2/3);

var MAXIMUM_NUTRIENT_LEVEL = 10000; 
var DEFAULT_NUTRIENT_LEVEL = 5000;
var NUTRIENT_LOSS_QUANTITY = 1;
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
    this.isDead = false;

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
        if (this.nutrientLevels.energyLevel <= 0 || this.nutrientLevels.proteinLevel <= 0
            ||  this.nutrientLevels.waterLevel <= 0) this.isDead = true;
        document.getElementById("Nutrient Information").innerHTML = 
            ("Energy: " + this.nutrientLevels.proteinLevel + " " + "Protein: " + this.nutrientLevels.proteinLevel 
            + " " + "Water: " + this.nutrientLevels.waterLevel);
    };

    this.addNutrient = function(nutrient) {
        var value = nutrient.nutritiousFactor * DEFAULT_NUTRITION_BOOST;
        if(isNaN(value))
        {
            var wo = true;
        }
        if (nutrient.feature === "energy") {
            
            this.nutrientLevels.energyLevel +=  5;
        };      

        if (nutrient.feature === "protein") {
            this.nutrientLevels.proteinLevel +=  5;        
        }

        if (nutrient.feature === "water") {
            this.nutrientLevels.waterLevel += 5;
        }

    };

    this.update = function(dt)
    {
        this.expendResources();

        for (var i = 0; i < this.allOrganelles.length; i++) {
            this.allOrganelles[i].update(dt);
        };

        for (var i = 0; i < this.organelles["mitochondria"].length; i++) {
            this.organelles["mitochondria"][i].update(dt);
        };
        for (var i = 0; i < this.organelles["ribosomes"].length; i++) {
            this.organelles["ribosomes"][i].update(dt);
        };
        for (var i = 0; i < this.organelles["vacuoles"].length; i++) {
            this.organelles["vacuoles"][i].update(dt);
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
	this.render = function(ctx)
	{
        for (var i = 0; i < this.allOrganelles.length; i++) {
            this.allOrganelles[i].render(ctx,this.worldX,this.worldY);
        };
        //  Rendering this.organelles
        for (var i = 0; i < this.organelles["mitochondria"].length; i++) {
            this.organelles["mitochondria"][i].render(ctx,this.worldX,this.worldY);
        };
        for (var i = 0; i < this.organelles["ribosomes"].length; i++) {
            this.organelles["ribosomes"][i].render(ctx,this.worldX,this.worldY);
        };
        for (var i = 0; i < this.organelles["vacuoles"].length; i++) {
            this.organelles["vacuoles"][i].render(ctx,this.worldX,this.worldY);
        };
        //  Rendering center of bacteria 
        ctx.beginPath();
        ctx.arc(this.worldX, this.worldY, this.centerRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();

        //  "Wall" rendering
        for (var i = 0; i < this.cellWallX.length; i++) {
        	ctx.beginPath();
            ctx.arc(this.worldX + this.cellWallX[i], this.worldY + this.cellWallY[i], wallPieceRadius, 0 , 2*Math.PI, false);
            ctx.fillStyle = 'blue';
        	ctx.fill();  
            ctx.closePath();          
        };
	};


}