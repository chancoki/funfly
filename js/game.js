function Game(box) {
  this.box = box;
  this.width = 0;
  this.height = 0;
  var f = 0;
  var f1 = 0;
  var f2 = 0;
  var f3 = 0;

  this.isPlaying = true;
  var level = 1;
  var q = 0;
  var d = 0;
  this.context = box.getContext("2d");
  this.width = this.box.width = window.innerWidth;
  this.height = this.box.height = window.innerHeight;
  this.context.save();
  //数字图片
  this.numberImg = [
    "./image/0.png",
    "./image/1.png",
    "./image/2.png",
    "./image/3.png",
    "./image/4.png",
    "./image/5.png",
    "./image/6.png",
    "./image/7.png",
    "./image/8.png",
    "./image/9.png",
  ];
  this.numberSource = [];

  // 爆炸图片
  this.bombImg = [
    "./image/b1.gif",
    "./image/b2.gif",
    "./image/b3.gif",
    "./image/b4.gif",
    "./image/b5.gif",
    "./image/b6.gif",
    "./image/b7.gif",
    "./image/b8.gif",
    "./image/b9.gif",
    "./image/b10.gif",
    "./image/b11.gif",
  ];
  this.bombSource = [];
  this.bombArray = [];
  // 背景图片
  this.bgImg = [
    "./image/bg_01.jpg",
    "./image/bg_02.jpg",
    "./image/bg_03.jpg",
    "./image/bg_04.jpg",
    "./image/bg_05.jpg",
  ];

  // 背景数列
  this.bgImgArray = [];
  this.bgNow = "";

  this.bulletImg = "./image/bullet1.png";
  this.bulletImg1 = "./image/bullet11.png";
  this.bulletArray = [];
  this.bulletArray1 = [];
  this.bulletArray2 = [];

  this.bulletTime = new Date().getTime();

  // HP图片
  this.hpImg = "./image/img_HP.png";
  this.myPlanImg = "./image/myplane1.png";
  this.myPlaneHp = 500;
  this.hpSource = null;
  this.score = 000;
  this.bombVoice = "./audio/zd.mp3";
  this.bulletVoice = "./audio/biu.mp3";
  this.voiceSource = null;
  this.voiceArray = [];
  this.bulletSource = null;
  this.animateID = null;

  // 敌机图片
  this.enemyImg = ["./image/dj1.png", "./image/dj6.png", "./image/dj10.png"];
  this.addhpImg = ["./image/hp.png", "./image/hp1.png", "./image/hp2.png"];
  this.enemySource = []; //存储敌机图片资源
  this.enemyTime = new Date().getTime();
  this.addhpSource = []; //存储敌机图片资源
  this.addhpTime = new Date().getTime();
  this.addhp = []; //存储所有的敌机
  this.enemyPlane = []; //存储所有的敌机
  // 图片加载数量
  this.loadNow = 0;

  // 图片加载总量
  this.loadCount = 38;
  this.isLoadEnd = false;
  this.bgY = 0;

  // 背景滚动速度
  this.bgSpeed = 2;

  this.loadImg = function (path) {
    var o = this;
    var img = new Image();
    img.src = path;
    img.onload = function () {
      o.loadNow++;
    };
    img.onerror = function () {
      window.alert(path + "图片加载错误");
    };
    return img;
  };
  //加载音频
  this.loadAudio = function (path) {
    var o = this;
    var audio = document.createElement("audio"); //创建一个标签对象
    audio.src = path;
    audio.onloadedmetadata = function () {
      //当多媒体数据加载完成执行
      o.loadNow++;
    };
    audio.onerror = function () {
      window.alert(path + "音频出错");
    };
    return audio;
  };
  this.createVoice = function () {
    var aud = new Audio();
    aud.src = this.voiceSource.src;
    return aud;
  };

  // 加载背景以及进度条
  this.init = function () {
    this.context.beginPath();
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.closePath();

    this.context.beginPath();
    this.context.fillStyle = "#49DE8B";
    this.context.shadowColor = "#49DE8B";
    this.context.shadowBlur = 10;
    this.context.font = "20px 微软雅黑";
    var text4 = "健康游戏忠告";
    var text = "抵制不良游戏，拒绝盗版游戏。注意自我保护， 谨防受骗上当。";
    var text1 = "适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。";
    this.context.textAlign = "center";
    this.context.fillText(text, this.width / 2, this.height - 30);
    this.context.fillText(text1, this.width / 2, this.height - 60);
    this.context.fillText(text4, this.width / 2, this.height - 90);
    this.context.closePath();

    var pP = this.loadNow / this.loadCount;

    var progressWidth = this.width * 0.6 * pP;
    var progressHeight = 20;
    var progressX = this.width * 0.2;
    var progressY = (this.height + 20) / 2;

    // 进度条
    this.context.beginPath();
    this.context.shadowColor = "#49DE8B";
    this.context.shadowBlur = 30;
    this.context.fillStyle = "#49DE8B";
    this.context.fillRect(progressX, progressY, progressWidth, progressHeight);
    this.context.closePath();

    // 进度条框
    this.context.beginPath();
    this.context.strokeStyle = "#49DE8B";
    this.context.strokeRect(
      progressX,
      progressY,
      this.width * 0.6,
      progressHeight
    );
    this.context.closePath();

    this.context.beginPath();
    this.context.fillStyle = "#49DE8B";
    this.context.font = "italic bold 100px 微软雅黑";
    this.context.textAlign = "center";
    this.context.fillText("这么小声", this.width / 2, this.height / 2 - 200);
    this.context.closePath();

    this.context.beginPath();
    this.context.fillStyle = "#49DE8B";
    this.context.font = "italic bold 80px 微软雅黑";
    this.context.textAlign = "center";
    this.context.fillText("还想开飞稽", this.width / 2, this.height / 2 - 100);
    this.context.closePath();

    // 进度条进度数字
    this.context.beginPath();
    this.context.fillStyle = "#49DE8B";
    this.context.font = "20px 微软雅黑";
    this.context.textAlign = "center";
    this.context.fillText(
      parseInt(pP * 100) + "%",
      this.width / 2,
      this.height / 2 + progressHeight * 3
    );
    this.context.closePath();

    // 判断图片是否加载完成
    if (this.loadNow >= this.loadCount) {
      this.isLoadEnd = true;
    }
  };
  this.startGame = function () {
    var o = this;

    this.numberImg.forEach(function (v, i, a) {
      o.numberSource.push(o.loadImg(v));
    });

    this.bombImg.forEach(function (v, i, a) {
      o.bombSource.push(o.loadImg(v));
    });

    this.enemyImg.forEach(function (v) {
      o.enemySource.push(o.loadImg(v));
    });
    this.addhpImg.forEach(function (v) {
      o.addhpSource.push(o.loadImg(v));
    });

    this.bgImg.forEach(function (v) {
      o.bgImgArray.push(o.loadImg(v));
    });

    var bgIndex = parseInt(Math.random() * 4.99);
    o.bgNow = o.bgImgArray[bgIndex];

    // 生成背景
    o.bg1 = new Background(
      o.bgNow,
      0,
      0,
      o.width,
      o.height,
      o.context,
      o.bgSpeed
    );
    o.bg2 = new Background(
      o.bgNow,
      0,
      -o.height,
      o.width,
      o.height,
      o.context,
      o.bgSpeed
    );

    this.bulletImgSource = this.loadImg(o.bulletImg);
    this.bulletImgSource1 = this.loadImg(o.bulletImg1);
    this.hpSource = this.loadImg(o.hpImg);
    var pimg = this.loadImg(o.myPlanImg);

    // 生成飞机
    this.myPlane = new Myplane(
      pimg,
      o.width / 2 - 10,
      o.height - 120,
      80,
      80,
      o
    );
    this.myPlane1 = new Myplane(
      pimg,
      o.width / 2 + 100,
      o.height - 80,
      50,
      50,
      o
    );
    this.myPlane2 = new Myplane(
      pimg,
      o.width / 2 - 90,
      o.height - 80,
      50,
      50,
      o
    );

    this.voiceSource = this.loadAudio(o.bombVoice);
    this.bulletSource = this.loadAudio(o.bulletVoice);

    this.box.addEventListener("mousemove", function (event) {
      var x = event.pageX;
      var y = event.pageY;
      var p = event.pageX + 95;
      var q = event.pageY + 20;
      var n = event.pageX - 95;
      var m = event.pageY + 20;

      o.myPlane.move(x, y);
      o.myPlane1.move(n, m);
      o.myPlane2.move(p, q);
    });
    document.addEventListener("keydown", function (a) {
      if (q > 0) {
        location.reload();
      }
    });
    document.addEventListener("keydown", function (e) {
      if ((e.keyCode = 32 && o.isPlaying && d > 1)) {
        o.context.save();
        o.context.beginPath();
        o.context.fillStyle = "rgba(0,0,0,0.4)";
        o.context.fillRect(0, 0, o.width, o.height);
        o.context.closePath();

        o.context.beginPath();
        o.context.fillStyle = "rgba(0,0,0,0.7)";
        o.context.fillRect(0, o.height / 3, o.width, o.height / 3);
        o.context.closePath();

        o.context.beginPath();
        o.context.fillStyle = "#f00";
        o.context.font = "bold 20px 微软雅黑";
        o.context.shadowBlur = 30;
        o.context.shadowColor = "#f00";
        o.context.textAlign = "center";
        o.context.fillText(
          '按"任意键"继续游戏',
          o.width / 2,
          o.height / 2 + 80
        );
        o.context.closePath();

        o.context.beginPath();
        o.context.fillStyle = "#f00";
        o.context.shadowBlur = 100;
        o.context.shadowColor = "#f00";
        o.context.font = "italic bold 80px 微软雅黑";
        o.context.textAlign = "center";
        o.context.fillText("GAME PAUSE", o.width / 2, o.height / 2 + 20);
        o.context.closePath();
        o.context.restore();
        cancelAnimationFrame(o.animateID);
        o.isPlaying = false;
      } else {
        animate();
        o.isPlaying = true;
      }
    });

    animate();
    function animate() {
      if (!o.isLoadEnd) {
        o.init();
      } else if (o.myPlaneHp > 0) {
        o.context.restore();
        o.playGame();
      } else {
        o.myPlaneHp = 0;
        o.bg1.draw();
        o.bg2.draw();
        o.drawHp();
        o.drawScore();
        o.myPlane.img;
        o.myPlane.draw();
        o.myPlane1.draw();
        o.myPlane2.draw();
        o.gameover();
      }
      o.animateID = requestAnimationFrame(animate);
    }
  };
  this.gameover = function () {
    var o = this;
    q++;
    o.context.save();
    o.context.beginPath();
    o.context.fillStyle = "rgba(255,0,0,0.15)";
    o.context.fillRect(0, 0, o.width, o.height);
    o.context.closePath();

    o.context.beginPath();
    o.context.fillStyle = "rgba(0,0,0,0.7)";
    o.context.fillRect(0, o.height / 3, o.width, o.height / 3);
    o.context.closePath();

    o.context.beginPath();
    o.context.fillStyle = "#f00";
    o.context.shadowBlur = 100;
    o.context.shadowColor = "#f00";
    o.context.font = "italic bold 80px 微软雅黑";
    o.context.textAlign = "center";
    o.context.fillText("GAME OVER", o.width / 2, o.height / 2 + 20);
    o.context.closePath();

    this.context.beginPath();
    this.context.fillStyle = "#f00";
    this.context.font = "bold 20px 微软雅黑";
    this.context.shadowBlur = 30;
    this.context.shadowColor = "#f00";
    this.context.textAlign = "center";
    this.context.fillText(
      '按"任意键"重新开始游戏',
      this.width / 2,
      this.height * 0.6
    );
    this.context.restore();

    o.context.restore();
    cancelAnimationFrame(o.animateID);
    o.isPlaying = false;
  };

  this.playGame = function () {
    d++;

    if (d == 1) {
      this.context.save();
      this.context.beginPath();
      this.context.fillStyle = "#49DE8B";
      this.context.font = "bold 20px 微软雅黑";
      this.context.shadowBlur = 30;
      this.context.shadowColor = "#49DE8B";
      this.textAlign = "center";
      this.context.fillText(
        '按"任意键"开始游戏',
        this.width / 2 - 90,
        this.height * 0.7
      );
      this.context.restore();
      cancelAnimationFrame(this.animateID);
      o.isPlaying = false;
    }

    var o = this;
    this.bg1.draw();
    this.bg2.draw();
    this.drawHp();

    var add = 3;
    var bulletSpeed = 20;
    var bulletSpeed1 = 12;
    var addhpDate = 10000;
    var addhpSpeed = 3;
    var bulletDate = 300;
    var bulletHurt = 18;
    var bulletHurt1 = 10;

    if (o.score >= 5000 && o.score < 15000) {
      add = 5;
      bulletDate = 300;
      bulletHurt = 22;
      bulletHurt1 = 15;
      bulletSpeed = 25;
      bulletSpeed1 = 17;
      addhpDate = 9000;
      level = 2;
      f++;
      o.levelUp(f, 200, 200);
    }
    if (o.score >= 15000 && o.score < 25000) {
      add = 5;
      bulletHurt = 24;
      bulletHurt1 = 17;
      bulletDate = 200;
      bulletSpeed = 30;
      bulletSpeed1 = 23;
      addhpDate = 7000;
      level = 3;
      f1++;
      o.levelUp(f1, 200, 200);
    }
    if (o.score >= 25000 && o.score < 40000) {
      add = 7;
      bulletHurt = 25;
      bulletHurt1 = 17;
      bulletDate = 120;
      bulletSpeed = 35;
      bulletSpeed1 = 27;
      addhpDate = 5000;
      level = 4;
      f2++;
      o.levelUp(f2, 250, 250);
    }
    if (o.score > 40000) {
      add = 9;
      bulletHurt = 28;
      bulletHurt1 = 18;
      bulletDate = 100;
      bulletSpeed = 40;
      addhpDate = 2000;
      bulletSpeed1 = 33;
      level = 5;
      f3++;
      o.levelUp(f3, 250, 250);
    }

    this.myPlane.draw();
    this.myPlane1.draw();
    this.myPlane2.draw();

    this.context.save();
    this.context.beginPath();
    this.context.fillStyle = "#f00";
    this.context.font = "italic bold 40px 楷体";
    this.context.shadowBlur = 30;
    this.context.shadowColor = "#f00";
    this.textAlign = "center";
    this.context.fillText("lv." + level, 20, 85);
    this.context.restore();

    //生成子弹
    var currentTime = new Date().getTime();

    if (currentTime - this.bulletTime > 50) {
      //创建子弹1
      var bullet = new Bullet(
        this.bulletImgSource,
        this.myPlane.x - 10,
        this.myPlane.y - 50,
        100,
        100,
        o,
        bulletSpeed,
        bulletHurt
      );
      // 创建子弹2
      var bullet1 = new Bullet(
        this.bulletImgSource1,
        this.myPlane1.x + 10,
        this.myPlane1.y - 10,
        30,
        30,
        o,
        bulletSpeed1,
        bulletHurt1
      );
      // 创建子弹3
      var bullet2 = new Bullet(
        this.bulletImgSource1,
        this.myPlane2.x + 10,
        this.myPlane2.y - 10,
        30,
        30,
        o,
        bulletSpeed1,
        bulletHurt1
      );
      this.bulletArray.push(bullet);
      this.bulletArray1.push(bullet1);
      this.bulletArray2.push(bullet2);

      this.bulletTime = currentTime; //记录当前生成子弹时间
    }
    // 绘制子弹1
    this.bulletArray.forEach(function (bull, index) {
      bull.checkIntersect();
      if (!bull.isLife) {
        o.bulletArray.splice(index, 1);
      }
      o.bulletSource.play();
      bull.draw();
      // console.log(o.bulletArray.length);
    });
    // 绘制子弹2
    this.bulletArray1.forEach(function (bull, index) {
      bull.checkIntersect();
      if (!bull.isLife) {
        o.bulletArray1.splice(index, 1);
      }

      bull.draw1();
      // console.log(o.bulletArray1.length);
    });
    //绘制子弹3
    this.bulletArray2.forEach(function (bull, index) {
      bull.checkIntersect();
      if (!bull.isLife) {
        o.bulletArray2.splice(index, 1);
      }

      bull.draw2();
      // console.log(o.bulletArray2.length);
    });
    /* 	敌机
			生成时间
			数组
			图片资源
		*/

    var addhpCurrentTime = new Date().getTime();

    if (addhpCurrentTime - this.addhpTime > addhpDate) {
      var epRandom1 = this.addhpSource[parseInt(Math.random() * 3)];
      var randomX1 = parseInt(Math.random() * (this.width - epRandom1.width));

      var epY1 = -epRandom1.height;
      var ep1 = new Addhp(
        epRandom1,
        randomX1,
        epY1,
        epRandom1.width,
        epRandom1.height,
        addhpSpeed,
        this
      );
      var isIntersect = false;

      this.addhp.forEach(function (eple1) {
        if (o.checkIntersect(ep1, eple1)) {
          isIntersect = true;
        }
      });
      if (!isIntersect) {
        this.addhp.push(ep1);
      }
      this.addhpTime = addhpCurrentTime;
    }
    this.addhp.forEach(function (eplane1, index) {
      if (!eplane1.isLife) {
        o.addhp.splice(index, 1);
      }
      eplane1.draw();
    });
    var enemyCurrentTime = new Date().getTime();
    if (enemyCurrentTime - this.enemyTime > bulletDate) {
      //开始生成敌机
      // console.log("enemyPlane.length");
      var epRandom = this.enemySource[parseInt(Math.random() * 3)];
      var randomX = parseInt(Math.random() * (this.width - epRandom.width));

      var epY = -epRandom.height;

      var ep = new EnemyPlane(
        epRandom,
        randomX,
        epY,
        epRandom.width * 0.8,
        epRandom.height * 0.8,
        add,
        this
      );
      var isIntersect = false;

      this.enemyPlane.forEach(function (eple) {
        if (o.checkIntersect(ep, eple)) {
          isIntersect = true;
        }
      });
      if (!isIntersect) {
        this.enemyPlane.push(ep);
      }
      this.enemyTime = enemyCurrentTime;
    }
    //开始绘制敌机
    this.enemyPlane.forEach(function (eplane, index) {
      if (!eplane.isLife) {
        o.enemyPlane.splice(index, 1);
      }
      eplane.draw();
    });

    this.voiceArray.forEach(function (vo, index) {
      vo.play();
      o.voiceArray.splice(index, 1);
    });

    //绘制爆炸动画
    this.bombArray.forEach(function (bom, index) {
      if (!bom.isLife) {
        o.bombArray.splice(index, 1);
      }
      bom.draw();
    });
    this.drawScore();
    if (o.myPlaneHp < 100) {
      o.context.save();
      o.context.beginPath();
      o.context.fillStyle = "rgba(255,0,0,0.15)";
      o.context.fillRect(0, 0, o.width, o.height);
      o.context.closePath();
      o.context.restore();
    }
  };

  this.drawHp = function () {
    this.context.beginPath();
    this.context.fillStyle = "#f00";
    this.context.fillRect(58, 30, this.myPlaneHp, 20);
    this.context.strokeStyle = "#f00";
    this.context.strokeRect(58, 30, 500, 20);
    this.context.drawImage(
      this.hpSource,
      20,
      20,
      this.hpSource.width,
      this.hpSource.height
    );
    var d = parseInt((this.myPlaneHp / 500) * 100);

    this.context.beginPath();
    this.context.fillStyle = "#FFECC8";
    this.context.font = "22px 微软雅黑";
    this.context.fillText(d + "%", 75, 48);
    this.context.closePath();
  };
  //升级画面
  this.levelUp = function (f, w, s) {
    var o = this;
    var s;
    if (f < w) {
      o.context.save();
      o.context.beginPath();
      o.context.fillStyle = "rgba(0,0,0,0.15)";
      o.context.fillRect(0, 0, o.width, o.height);
      o.context.closePath();
      o.context.beginPath();
      o.context.fillStyle = "rgba(0,0,0,0.7)";
      o.context.fillRect(0, o.height / 3, o.width, o.height / 3);
      o.context.closePath();
      o.context.beginPath();
      o.context.fillStyle = "#f00";
      o.context.shadowBlur = 100;
      o.context.shadowColor = "#f00";
      o.context.font = "italic bold 80px 微软雅黑";
      o.context.textAlign = "center";
      o.context.fillText("LEVEL." + level, o.width / 2, o.height / 2 + 20);
      o.context.closePath();
      o.context.beginPath();
      o.context.fillStyle = "#f00";
      o.context.font = "italic bold 30px 微软雅黑";
      o.context.shadowBlur = 30;
      o.context.shadowColor = "#f00";
      o.context.textAlign = "center";
      o.context.fillText(
        "无敌时刻 " + (s - f),
        this.width / 2,
        this.height * 0.6
      );
      o.myPlaneHp = 500;
      o.context.restore();
    }
  };

  this.drawScore = function () {
    var o = this;
    var scoreArr = new String(o.score).split("");
    var posx = this.width - scoreArr.length * 66;
    scoreArr.forEach(function (s, index) {
      var img = o.numberSource[s];
      o.context.drawImage(img, posx + 40 * index, 25, 64, img.height);
    });
  };

  this.checkIntersect = function (oa, ob) {
    var ax0 = oa.x;
    var ax1 = ax0 + oa.w;
    var ay0 = oa.y;
    var ay1 = ay0 + oa.h;

    var bx0 = ob.x;
    var bx1 = bx0 + ob.w;
    var by0 = ob.y;
    var by1 = by0 + ob.h;
    if (ax0 > bx1 || ax1 < bx0 || ay0 > by1 || ay1 < by0) {
      return false;
    }
    return true;
  };
}

//等网站加载完成后执行 匿名函数
window.onload = function () {
  var gamebox = document.getElementById("gamebox"); //获取绘制环境
  var game = new Game(gamebox);
  game.startGame();
};
