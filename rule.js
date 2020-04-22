var DEAD = '0'; 
var ALIVE = '1'; 

class Rule 
{
    constructor()
    {
        this.map = {}
    }

    add(neighborhood, result)
    {
        // remove spaces in neighborhood
        this.map[this.cleanStr(neighborhood)] = result; 
    }

    get(neighborhood) 
    {
        if (this.cleanStr(neighborhood) in this.map)
            return this.map[this.cleanStr(neighborhood)];  
        return DEAD; 
    }

    getDigit(neighborhood)
    {
        return BigInt("0b"+this.cleanStr(neighborhood)); 
    }

    cleanStr(str)
    {
        return str.replace(/ \n/g, '')
    }
}

function applyRule(world, rule) 
{
    let toKill = []; 
    let toRevive = []; 

    for (let cell in world)
    {
        let pos = cell.split(" "); 
        // get neighborhood
        let neighborhood = ""; 
        for (let neighbor in (new Cell(pos[0], pos[1])).getNeighbors())
        {
            neighbor = neighbor.toString(); 
            if (neighbor in world)
            {
                neighborhood += world[neighbor];  
            }
            else
            {
                neighborhood += DEAD; 
            }
        }
        // console.log(neighborhood); 

        let currState = world[cell]; 
        let newState = rule.get(neighborhood); 

        if (currState != newState)
        {
            // console.log("Cell " + cell + " is changing"); 
            if (currState == DEAD)
                toRevive.push(cell); 
            else
                toKill.push(cell); 
        }
    }

    // kill 
    for (let cell in toKill)
    {
        world[cell] = DEAD; 
    }

    // revive
    for (let cell in toRevive)
    {
        world[cell] = ALIVE; 
    }

    return world; 
}