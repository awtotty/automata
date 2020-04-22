class Cell
{
    constructor(x, y)
    {
        this.x = x; 
        this.y = y; 
    }

    toString() 
    {
        return this.x + " " + this.y; 
    }

    getNeighbors()
    {
        let neighbors = []; 
        for (let x = this.x-1; x <= this.x+1; x++)
            for (let y = this.y-1; y <= this.y+1; y++)
                neighbors.push(new Cell(x, y)); 
        return neighbors; 
    }
}