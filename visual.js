class Camera 
{
    constructor(xCenter, yCenter, w, h)
    {
        this.xCenter = xCenter; 
        this.yCenter = yCenter; 
        this.w = w; 
        this.h = h; 
    }

    inView(x, y) 
    {
        return x > Math.floor(xCenter-w/2) && x < Math.ceil(xCenter+w/2) &&
                y > Math.floor(yCenter-h/2) && x < Math.ceil(yCenter+h/2);
    }
}