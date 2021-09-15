function EnemyPlane(img, x, y, w, h, speed, game) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.context = game.context;
    this.isLife = true;
    this.hp = parseInt(Math.random()*250);
    this.game = game;
    this.speed = speed;
    this.score= parseInt(Math.random()*200);
    var mx = this.game.width - this.w;
    if (this.x > mx) { 
        this.x = mx;
    }

}
    EnemyPlane.prototype = {
        draw() {
            this.context.drawImage(this.img, this.x, this.y, this.w, this.h);
            this.move();
            if (this.y > this.game.height) { 
                this.game.score -= parseInt(Math.random() * 100);
                if (this.game.score <= 0) { 
                    this.game.score = 0;
                }
                this.isLife = false;
            }
        },
        move() {
        //  var bgIndex = parseInt(Math.random() * 30 - 15);
        // this.x += bgIndex;
            this.y += this.speed;
        }
    }
