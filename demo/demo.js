window.onload = async function() 
{
    let canvas = document.getElementById("myCanvas"); 
    let ctx = canvas.getContext("2d"); 
    let w = canvas.width; 
    let h = canvas.height; 

    let cam = new Camera(20, -10, w, h); 

    let rule = new Rule(); 
    // add rule elements
    rule.add(   "111" + 
                "111" +
                "111", 1); 

    rule.add(   "111" + 
                "111" +
                "111", 1); 

    rule.add(   "011" +
                "011" + 
                "011", 1); 

    rule.add(   "110" +
                "110" + 
                "110", 1); 

    rule.add(   "000" +
                "111" +
                "111", 0); 

    rule.add(   "000" +
                "011" + 
                "011", 0); 

    rule.add(   "000" +
                "110" +
                "110", 0); 

    rule.add(   "111" +
                "111" +
                "000", 1); 

    rule.add(   "011" +
                "011" +
                "000", 1); 

    rule.add(   "110" + 
                "110" + 
                "000", 1); 

    rule.add(   "111" +
                "000" +
                "000", 1); 

    rule.add(   "011" +
                "000" +
                "000", 1); 

    rule.add(   "110" + 
                "000" + 
                "000", 1); 

    // create world
    let world = {}; 
    let worldStr =  "000000000\n" +
                    "011101110\n" +
                    "011101110\n" + 
                    "011101110\n" + 
                    "000000000\n";  
    this.setWorldState(world, worldStr, 0, 0); 

    // start visual
    let gen = 0; 
    while (gen < 20) 
    {
        this.console.log("Cam: " + cam.xCenter + " " + cam.yCenter); 
        this.renderOnCanvas(canvas, world, cam, 10, ["#ffffff", "#000000"])

        // camera crosshairs
        ctx.fillRect(w/2-3, h/2, 7, 1); 
        ctx.fillRect(w/2, h/2-3, 1, 7); 

        world = this.applyRule(world, rule); 
        gen++; 

        await this.sleep(500);         
    }

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}