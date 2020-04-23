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
        this.map[neighborhood] = result; 
    }

    get(neighborhood) 
    {
        if (neighborhood in this.map)
            return this.map[neighborhood];  
        return DEAD; 
    }

    getDigit(neighborhood)
    {
        return BigInt("0b"+neighborhood); 
    }

}

function applyRule(world, rule) 
{
    let toKill = []; 
    let toRevive = []; 
    let newBorderCandidates = []; 

    for (let cell in world)
    {
        let pos = cell.split(" "); 
        // get neighborhood
        let neighborhood = ""; 
        let neighbors = getNeighbors(cell); 
        for (let i = 0; i < neighbors.length; i++)
        {
            neighbor = neighbors[i]; 
            // console.log("Cell " + cell + " neighbor " + neighbor); 
            if (neighbor in world)
            {
                // console.log("Cell " + cell + " neighbor " + neighbor + " in world, state=" + world[neighbor]); 
                neighborhood += world[neighbor];  
            }
            else
            {
                // console.log("Cell " + cell + " neighbor " + neighbor + " NOT in world"); 
                neighborhood += DEAD; 
            }
        }
        // console.log("Cell " + cell + " neighborhood " + neighborhood); 

        let currState = world[cell]; 
        let newState = rule.get(neighborhood); 

        // console.log("Cell " + cell + " next state " + newState); 

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
    for (let i = 0; i < toKill.length; i++)
    {
        // console.log("Cell " + toKill[i]+ " is now dead"); 
        world[toKill[i]] = DEAD; 
    }

    // revive
    for (let i = 0; i < toRevive.length; i++)
    {
        // console.log("Cell " + toRevive[i]+ " is now alive"); 
        world[toRevive[i]] = ALIVE; 

        // expand border if necessary 
        let neighbors = getNeighbors(toRevive[i]); 
        for (let i = 0; i < neighbors.length; i++)
        {
            neighbor = neighbors[i]; 
            if (!(neighbor in world))
            {
                world[neighbor] = DEAD; 
            }
        }

    }

    return world; 
}