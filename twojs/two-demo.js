function playAndDrawGame(world, rule, camera, cellSize) 
{
    // Make an instance of two and place it on the page.
    var elem = document.getElementById('draw-shapes');
    var params = { fullscreen: true };
    var two = new Two(params).appendTo(elem);

    let colors = ['rgb(255,255,255,15)', 'rgb(0,0,0,15)']; 

    let maxX = Math.ceil(two.width/cellSize)+1; 
    let maxY = Math.ceil(two.height/cellSize)+1; 

    // create rects for view
    var rects = new Array(maxX); 
    for (let x = 0; x < maxX; x++) {
        let col = new Array(maxY); 
        for (let y = 0; y < maxY; y++) {
            col[y] = (two.makeRectangle(x*cellSize, y*cellSize, cellSize, cellSize)); 
            col[y].noStroke(); 
        }
        rects[x] = col; 
    }

    two.bind('update', function(frameCount) {
        // update world
        world = applyRule(world, rule); 

        // draw world
        // for each cell in view 
        let res; 
        for (let x = 0; x < maxX; x++) {
            for (let y = 0; y < maxY; y++) {
                // get cell data and fill accordingly
                res = world.get(x-cam.x, y-cam.y); 
                if (res) {
                    rects[x][y].fill = colors[res]; 
                }
                else {
                    rects[x][y].fill = colors[colors.length-1]; 
                }

            }
        }
    }).play(); 
}

function createWorld() {
    let world = {}; 

    for (let x = 0; x < 100; x++) {
        for (let y = 0; y < 100; y++) {
            if (Math.random() > 0.3) {
                world.put(x+" "+y, 1);
            }
        }
    }

    return world; 
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
        let neighbors = []; 
        for (var neighbor in neighbors)
        {
            counts.set(neighbor, counts.get(neighbor)-1); 
        }
    }

    // revive
    for (var cell in toRevive)
    {
        let neighbors = []; 
        for (var neighbor in neighbors)
        {
            counts.set(neighbor, counts.get(neighbor)+1); 
        }
        world.set(cell, 0); 
    }
}

function getNeighbors(cell) {
    let neighbors = [];


    return neighbors; 
}

let world = createWorld; 
let rule = null; 
let camera = null; 
let cellSize = 20; 
playAndDrawGame(world, rule, camera, cellSize); 