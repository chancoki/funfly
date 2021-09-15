function Background(img, x, y, w, h, context, speed) { 
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.context = context;
    this.speed = speed;
}
Background.prototype = {
    draw() { 
    
        var o = this;
      
        if (o.y >= o.h) { 
            o.y = -o.h;
        }
        o.y += o.speed;
        this.context.drawImage(o.img, o.x, o.y, o.w, o.h);

    }

}