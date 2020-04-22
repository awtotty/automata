var rule = "00011110"; // 30  

window.onload = function() 
{
    run();  
}

function updateRule()
{
    rule = parseInt(document.getElementById("rule").value).toString(2); 
}

function newRun()
{
    updateRule(); 
    run(); 
}

function run() 
{
    var c = document.getElementById("myCanvas"); 
    var ctx = c.getContext("2d"); 
    ctx.clearRect(0,0,c.width,c.height); 

    // game vars
    var state = "1"; 
    if (parseInt(rule,2) < 0 || parseInt(rule,2) > 255)
    {
        console.log(rule + " is not a valid rule"); 
        return false; 
    }

    rule = "0".repeat(8-rule.length) + rule; 

    // display vars
    var cellSize = 1;
    var cellsPerRow = c.width/cellSize; 
    var maxGens = c.height/cellSize; 
    var worldLength = 4*maxGens-1;

    var padding = 2*maxGens-1;
    state = "0".repeat(padding) + state + "0".repeat(padding);   

    var stateWindow;    

    for (var gen = 0; gen < maxGens; gen++)
    {
        // draw state
        stateWindow = state.substring(worldLength/2-cellsPerRow/2-gen, worldLength/2+cellsPerRow/2-gen); 
        drawBitMapLine(0, gen*cellSize, cellSize, ctx, stateWindow); 

        // get next gen
        state = apply_rule(state, rule); 
    }
}

function drawBitMapLine(x, y, cellSize, ctx, bitmap) 
{
    for (var cell = bitmap.length; cell > 0; cell--)
    {
        if (bitmap.charAt(cell)=="1")
        {
            ctx.fillRect(x+cell*cellSize, y, cellSize, cellSize); 
        }
    }
}

function apply_rule(state, rule) 
{
    var newState = ""; 

    for (var cell = 1; cell < state.length-1; cell++)
    {
        var local = ""; 
        for (var n = cell-1; n <= cell+1; n++)
        {
            local += state.charAt(n); 
        }
        newState += rule.charAt(rule.length - 1 - parseInt(local,2)); 
    }

    return newState; 
}
