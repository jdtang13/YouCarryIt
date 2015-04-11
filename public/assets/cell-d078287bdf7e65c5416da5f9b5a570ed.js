
var distanceFromCenter = 30;
var undulationAmplitude = 2;

var plasmidRadius = 4;
var wallPieceRadius = 0.5;

function Cell (worldX,worldY) 
{
    this.worldX = worldX;
    this.worldY = worldY;

	this.organelles = {};

    this.cellWallX = new Array();
    this.cellWallY = new Array();
    this.undulationAngle = 0;
    this.undulationSpeed = 0.01;
	
    for (var i = 0; i < 360; i++) {
        this.cellWallX.push(0);
        this.cellWallY.push(0);
    };

    this.update = function(dt)
    {
        //  The undulating of cell walls
        this.undulationAngle += this.undulationSpeed;
        //this.undulationAngle *= 1.1;

        for (var i = 0; i < this.cellWallX.length; i++) 
        {
			var atEveryRadians = Math.PI*2/this.cellWallX.length;
        	var undulation = (Math.sin(this.undulationAngle + atEveryRadians*i) * undulationAmplitude);
        	
        	var xs = Math.cos(atEveryRadians*i) * (distanceFromCenter+undulation);
            this.cellWallX[i] = worldX + xs ;
            
			var ys = Math.sin(atEveryRadians*i) * (distanceFromCenter + undulation);
            this.cellWallY[i] = worldY + ys;
        };
    };
	this.render = function(ctx)
	{
        //  Center of bacteria 
        ctx.beginPath();
        ctx.arc(this.worldX, this.worldY, plasmidRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();

        //  "Wall" rendering
        for (var i = 0; i < this.cellWallX.length; i++) {
        	ctx.beginPath();
            ctx.arc(this.cellWallX[i],this.cellWallY[i], wallPieceRadius, 0 , 2*Math.PI, false);
            ctx.fillStyle = 'blue';
        	ctx.fill();  
            ctx.closePath();          
        };

        
	};
}
;
