function getNeighbors(cellStr)
{
    let X = parseInt(cellStr.split(" ")[0]); 
    let Y = parseInt(cellStr.split(" ")[1]); 
    let neighbors = []; 
    for (let y = Y+1; y >= Y-1; y--)
        for (let x = X-1; x <= X+1; x++)
            neighbors.push(x + " " + y); 
    return neighbors; 
}

function setWorldState(world, state, stateX, stateY)
{
    let x = stateX; 
    let y = stateY; 

    for (let i = 0; i < state.length; i++)
    {
        if (state.charAt(i) == "\n")
        {
            y--; 
            x = stateX; 
        }
        world[x+" "+y] = parseInt(state.charAt(i)); 
        x++; 
    }
}