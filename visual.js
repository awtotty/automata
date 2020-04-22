class Camera 
{
    constructor(xCenter, yCenter, w, h)
    {
        this.xCenter = xCenter; 
        this.yCenter = yCenter; 
        this.w = w; 
        this.h = h; 
    }

    inView(x, y) 
    {
        return x > this.minX() && x < this.maxX() &&
                y > this.minY() && x < this.maxY();
    }

    getRelativeX(x)
    {
        return Math.ceil(this.w/2)-(this.xCenter-x);  
    }
    getRelativeY(y)
    {
        return Math.ceil(this.h/2)+(this.yCenter-y);  
    }

    minX() 
    {
        return Math.floor(this.xCenter-this.w/2);
    }
    minY() 
    {
        return Math.floor(this.yCenter-this.h/2); 
    }
    maxX() 
    {
        return Math.ceil(this.xCenter+this.w/2); 
    }
    maxY() 
    {
        return Math.ceil(this.yCenter+this.h/2); 
    }
}

function renderOnCanvas(world, camera, cellSize, colors)
{
    var c = document.getElementById("myCanvas"); 
    var ctx = c.getContext("2d"); 

    ctx.fillStyle = colors[0]; 
    ctx.fillRect(0, 0, c.width, c.height); 

    for (let cell in world)
    {
        let pos = cell.split(" "); 

        // console.log("In render: " + cell)
        if (camera.inView(pos[0], pos[1]))
        {
            // console.log("cell in view: " + cell)
            if (world[cell] == ALIVE)
            {
                // console.log("cell alive: " + cell)
                ctx.fillStyle = colors[1]; 
                ctx.fillRect(camera.getRelativeX(parseInt(pos[0]*cellSize)), camera.getRelativeY(parseInt(pos[1])*cellSize), cellSize, cellSize); 
            }
        }
    }
}