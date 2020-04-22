class Automata2D 
{
    constructor(initialStateStr)
    {
        this.world = new Map(); 
        this.gen = 0; 

        // add each cell from initalStateStr to world 
    }
}

class Automata1D
{
    constructor(initialStateStr)
    {
        this.world = new Map(); 
        this.gen = 0; 

        // add each cell from initalStateStr to world 
    }

    draw(ctx, x, y, w, cellSize, centerCell) 
    {
        var minX = centerCell - Math.round(w/2); 
        var maxX = centerCell + Math.round(w/2); 
        for (var cell in this.world)
        {
            // if cell in window
            if (cell.x > minX && cell.x < maxX)
            {
                // if cell alive
                if (this.world.get(cell) == 1)
                {
                    var rectX = x+cellSize*(cell.x-minX); 
                    ctx.fillRect(rectX, y, cellSize, cellSize); 
                }
            }
        }
    }
}

class Cell
{
    /*
        Takes an array [x, [y, z]] representing this cell's 
        position in the world.
    */
    constructor(pos, isAlive)
    {
        this.pos = pos; 
        this.dim = pos.length; 
        this.neighbors = []; 
        this.age = 0; 
        this.isAlive = isAlive; 

        // num neighbors depends on dim
        if (this.dim == 1) 
        {
            this.neighbors.push(Cell([pos[0]-1]));
            this.neighbors.push(Cell([pos[0]+1]));
            this.x = pos[0]; 
        }
        else if (this.dim == 2) 
        {
            for (var x = pos[0]-1; x <= pos[0]+1; x++)
                for (var y = pos[1]-1; y <= pos[1]+1; y++)
                    if (x != pos[0] && y != pos[1])
                        this.neighbors.push(new Cell([x, y]));
            this.x = pos[0]; 
            this.y = pos[1]; 
        }
        else if (this.dim == 3) 
        {
            for (var x = pos[0]-1; x <= pos[0]+1; x++)
                for (var y = pos[1]-1; y <= pos[1]+1; y++)
                    for (var z = pos[2]-1; z <= pos[2]+1; z++)
                        if (x != pos[0] && y != pos[1] && z != pos[2])
                            this.neighbors.push(Cell([x, y, z]));
            this.x = pos[0]; 
            this.y = pos[1]; 
            this.z = pos[2]; 
        }
    }


}