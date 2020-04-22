window.onload = function() 
{
    var minX = -200; 
    var maxX = 200; 

    var c = document.getElementById("myCanvas"); 
    var ctx = c.getContext("2d"); 

    var world = {}; 
    var counts = {}; 

    var cam = new Camera(0, 0, c.width, c.height); 
    var colors = ['#000000', "#fafafa"]; 

    ctx.fillStyle = colors[colors.length-1]; 
    ctx.fillRect(0, 0, c.width, c.height); 
    
    var gen = 0; 
    while (gen < 10)
    {
        this.console.log("Gen " + gen); 
        gen++; 

        this.console.log(); 

        // draw cells from world
        this.drawWorld(ctx, world, 2, ['#000000', "#fafafa"], cam)

        // update world
        this.updateWorld(world, counts); 

        // introduce new cells
        for (var x = minX; x < maxX; x++)
        {
            world.set(new Cell(x, 0), Math.round(Math.random())); 
        }
    }
}

class Cell
{
    constructor(x, y)
    {
        this.x = x; 
        this.y = y; 
    }

    getNeighbors() 
    {
        neighbors = [ 
                        new Cell(this.x-1, this.y-1), 
                        new Cell(this.x-1, this.y), 
                        new Cell(this.x-1, this.y+1), 
                        new Cell(this.x, this.y-1), 
                        new Cell(this.x, this.y+1), 
                        new Cell(this.x+1, this.y-1), 
                        new Cell(this.x+1, this.y), 
                        new Cell(this.x+1, this.y+1), 
                    ]; 

        return neighbors; 
    }
}

function drawWorld(ctx, world, cellSize, colors, camera) 
{
    for (let [cell, state] in world)
    {
        if (camera.inView(cell.x, cell.y))
        {
            // cell is alive
            if (state == 0)
            {
                ctx.fillStyle = colors[0]; 
                ctx.fillRect(cell.x-camera.x, cell.y-camera.y, cellSize, cellSize); 
            }

            // cell is dead, but still a ghost
            else if (state < colors.length) 
            {
                ctx.fillStyle = colors[Math.floor(colors.length/state)]; 
                ctx.fillRect(cell.x-camera.x, cell.y-camera.y, cellSize, cellSize); 
            }
        }
    }
}

function updateWorld(world, counts) 
{
    var toKill = []; 
    var toRevive = []; 

    for (let [cell, state] in world)
    {
        // rules 1-3
        if (state == 0)
        {
            if (counts.get(cell) < 2 || counts.get(cell) > 3)
            {
                toKill.push(cell); 
            }
        }
        else 
        {
            world.set(cell, state+1);  

            if (counts.get(cell) == 3)
            {
                toRevive.push(cell); 
            }
        }
    }

    // kill
    for (var cell in toKill)
    {
        for (var neighbor in cell.getNeighbors())
        {
            counts.set(neighbor, counts.get(neighbor)-1); 
        }
    }

    // revive
    for (var cell in toRevive)
    {
        for (var neighbor in cell.getNeighbors())
        {
            counts.set(neighbor, counts.get(neighbor)+1); 
        }
        world.set(cell, 0); 
    }
}