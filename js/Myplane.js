function Myplane(img, x, y, w, h, game) {
  this.img = img;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.game = game;
  this.context = game.context;
  this.isLife = true;
}
Myplane.prototype = {
  draw() {
    this.checkIntersect();
    this.context.save();
    if (this.game.myPlaneHp <= 0) this.context.globalAlpha = 0.3;
    this.context.drawImage(this.img, this.x, this.y, this.w, this.h);
    this.context.restore();
  },
  move(x, y) {
    this.x = x - this.w / 2;
    if (this.x < 0) {
      this.x = 0;
    }
    var maxWidth = this.game.width - 80;
    if (this.x > maxWidth) {
      this.x = maxWidth;
    }
    this.y = y - this.h / 2;
    if (this.y < 0) {
      this.y = 0;
    }
    var maxHeight = this.game.height - 80;
    if (this.y > maxHeight) {
      this.y = maxHeight;
    }
  },
  checkIntersect() {
    var o = this;
    o.game.addhp.forEach(function (el1) {
      var result1 = o.game.checkIntersect(el1, o);
      if (result1) {
        o.game.myPlaneHp += parseInt(Math.random() * 100);
        // console.log( o.game.myPlaneHp);
        el1.isLife = false;
        if (o.game.myPlaneHp >= 500) {
          o.game.myPlaneHp = 500;
        }
      }
    });

    o.game.enemyPlane.forEach(function (el) {
      var result = o.game.checkIntersect(el, o);
      if (result) {
        o.game.myPlaneHp -= parseInt(Math.random() * 100);
        if (o.game.myPlaneHp > 0) o.game.score += parseInt(Math.random() * 60);
        // console.log( o.game.myPlaneHp);
        el.isLife = false;
      }
    });
  },
};
