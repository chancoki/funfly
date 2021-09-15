function Bullet(img, x, y, w, h, game,speed,hurt) { 
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.context = game.context;
    this.game = game;
    this.speed = speed;
    this.hurt = hurt;
    this.isLife = true;
}
Bullet.prototype = {
    draw() { 
        // this.checkIntersect();
        this.context.drawImage(this.img, this.x, this.y, this.w, this.h);
       
        this.move();
    },
    move() { 
        // var a = parseInt(Math.random() * 600 - 300);
        // this.x += a;
        this.y -= this.speed;
        if (this.y < 0) { 
            this.isLife = false;
        }
    },
    draw1() { 
        // this.checkIntersect();
        this.context.drawImage(this.img, this.x, this.y, this.w, this.h);
        this.move1();
    },
    move1() { 
        // var a = parseInt(Math.random() * 600 - 300);
        // this.x += a;
        this.y -= this.speed;
        if (this.y < 0) { 
            this.isLife = false;
        }
    },
    draw2() { 
        // this.checkIntersect();
        this.context.drawImage(this.img, this.x, this.y, this.w, this.h);
        this.move2();
    },
    move2() {    
        // var a = parseInt(Math.random() * 600 - 300);
        // this.x += a;
        this.y -= this.speed;
        if (this.y < 0) { 
            this.isLife = false;
        }
    },
    checkIntersect() { 
        var o = this;
        o.game.addhp.forEach(function (ep1) {
            var result1 = o.game.checkIntersect(o, ep1);
            if (result1) {
                // o.isLife = false;
                ep1.isLife = false;
                o.game.myPlaneHp += parseInt(Math.random()*100);;
                if (o.game.myPlaneHp > 500) {
                    o.game.myPlaneHp = 500;
                    
                    
                }
            }
        });

        o.game.enemyPlane.forEach(function (ep) {
            var result = o.game.checkIntersect(o, ep);
            if (result) {
                o.isLife = false;
                ep.hp -= o.hurt;
                o.game.voiceArray.push(o.game.createVoice());
                if (ep.hp < 0) {
                   o.game.voiceArray.push(o.game.createVoice());
                    o.game.score += ep.score;
                    ep.isLife = false;
                    var bo = new Bomb(o.game.bombSource, ep.x, ep.y, o.game);
                    o.game.bombArray.push(bo);
                }
            }
        });
    }
}