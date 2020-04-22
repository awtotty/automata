window.onload = function() 
{
    let c = document.getElementById("myCanvas"); 
    let ctx = c.getContext("2d"); 


    let cam = new Camera(0, 0, 800, 800); 
    let rule = new Rule(); 

    // add rule
    rule.add( "111\
               111\
               000", 1); 

    let world = {}; 

    world["0 0"] = ALIVE; 
    // world["5 0"] = ALIVE; 
    // world["0 7"] = ALIVE; 
    for (let x = 0; x < 10; x++)
    {
        for (let y = 0; y < 10; y++)
        {
            if (this.Math.random() > 0.5)
            {
                world[(new Cell(x, y)).toString()] = ALIVE; 
                // this.console.log(x + " " + y); 
            }
        }
    }

    ctx.fillRect(400,400,10,10); 
    
    let gen = 0; 
    while (gen < 20) 
    {
        this.console.log("Cam: " + cam.xCenter + " " + cam.yCenter); 
        this.renderOnCanvas(world, cam, 10, ["#ffffff", "#000000"])
        // world = this.applyRule(world, rule); 
        gen++; 
        
    }

}