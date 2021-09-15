function Bomb(imgArr, x, y, game) { 
    this.imgArr = imgArr;
    this.x = x;
    this.y = y;
    this.game = game;
    this.context = game.context;
    this.playNow = 0;
    this.isLife = true;

}
Bomb.prototype = { 
    draw(){
        var o = this;
        var img = this.imgArr[o.playNow];
        this.context.drawImage(img, o.x, o.y, img.width, img.height);
        o.playNow++;
        if (o.playNow >= o.imgArr.length - 1) { 
            o.isLife = false;

        }
    }
}