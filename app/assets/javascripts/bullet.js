var bulletRadius = 7;
var bulletVelocity =200;
var deathCooldown = 1;
function Bullet (worldX,worldY,xVelocity,yVelocity) 
{
    this.worldX = worldX;
    this.worldY = worldY;

    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;

    this.deathTimer = 0;
    this.dead = false;

    this.update = function(dt)
    {
        if(!this.dead)
        {
            this.deathTimer += dt;
            if(this.deathTimer > deathCooldown)
            {
                this.dead = true;
            }
        }

        this.worldX += this.xVelocity * dt * bulletVelocity;
        this.worldY += this.yVelocity * dt * bulletVelocity;
    };
	this.render = function(ctx)
	{
        //  Rendering center of bacteria 
        ctx.beginPath();
        ctx.arc(this.worldX, this.worldY, bulletRadius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.closePath();
	};
}