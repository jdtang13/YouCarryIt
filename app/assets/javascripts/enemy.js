var enemyRadius = 30;
var enemyCenterRadius = 5;
var enemyRange = 300;
var enemyWallThickness = 1;
var enemyBulletCooldown = 2;
function Enemy (worldX,worldY) 
{
    this.canShoot = true;
    this.canShootTimer = 0;

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

    this.update = function(dt)
    {
        //Resetting cooldowns
        if(!this.canShoot)
        {
            this.canShootTimer+=dt;
            if(this.canShootTimer>enemyBulletCooldown)
            {
                this.canShootTimer -= enemyBulletCooldown;
                this.canShoot = true;
            }
        }

        //  The undulating of cell walls
        this.undulationAngle += this.undulationSpeed*2;

        for (var i = 0; i < this.cellWallX.length; i++) 
        {
			var atEveryRadians = Math.PI*2/this.cellWallX.length;
        	var undulation = Math.sin((this.undulationAngle + atEveryRadians*i)*4) * undulationAmplitude;
        	 
            this.cellWallX[i] = Math.cos(atEveryRadians*i) * (enemyRadius + undulation);
            this.cellWallY[i] = Math.sin(atEveryRadians*i) * (enemyRadius + undulation);
        };
    };
	this.render = function(ctx, cameraX, cameraY)
    {
        var screenX = this.worldX - cameraX + 400;
        var screenY = this.worldY - cameraY + 300;

        //  Rendering center of bacteria 
        ctx.beginPath();
        ctx.arc(screenX, screenY, enemyCenterRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.closePath();

        //  "Wall" rendering
        for (var i = 0; i < this.cellWallX.length; i++) {
        	ctx.beginPath();
            ctx.arc(screenX + this.cellWallX[i], screenY + this.cellWallY[i], enemyWallThickness, 0 , 2*Math.PI, false);
            ctx.fillStyle = 'red';
        	ctx.fill();  
            ctx.closePath();          
        };
	};
}