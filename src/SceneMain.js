class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });

    this.score = 0;
    this.scoreText;

  }

  preload() {
    this.load.image("sprBg0", "../content/sprBg0.png");
    this.load.image("sprBg1", "../content/sprBg1.png");
    this.load.spritesheet("sprExplosion", "../content/sprExplosion.png", {
      frameWidth: 32,
      frameHEight: 32
    });

    this.load.spritesheet("sprEnemy0", "../content/sprEnemy0.png", {
      frameWidth: 16,
      frameHEight: 16
    });

    this.load.image("sprEnemy1", "../content/sprEnemy1.png");
    this.load.spritesheet("sprEnemy2", "../content/sprEnemy2.png", {
      frameWidth: 16,
      frameHEight: 16
    });

    this.load.image("sprLaserEnemy0", "../content/sprLaserEnemy0.png");
    this.load.image("sprLaserPlayer", "../content/sprLaserPlayer.png");
    this.load.spritesheet("sprPlayer", "../content/sprPlayer.png", {
      frameWidth: 16,
      frameHEight: 16
    });

    this.load.audio("sndExplode0", "../content/sndExplode0.wav");
    this.load.audio("sndExplode1", "../content/sndExplode1.wav");
    this.load.audio("sndLaser", "../content/sndLaser.wav");
  }


  getEnemiesByType(type) {

    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }

  create() {

    this.anims.create({
      key: "sprEnemy0",
      frames: this.anims.generateFrameNumbers("sprEnemy0"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprEnemy2",
      frames: this.anims.generateFrameNumbers("sprEnemy2"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });

    this.anims.create({
      key: "sprPlayer",
      frames: this.anims.generateFrameNumbers("sprPlayer"),
      frameRate: 20,
      repeat: -1
    });

    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1")
      ],
      laser: this.sound.add("sndLaser")
    };
    this.sfx.laser.play();

    this.backgrounds = [];
    for (var i = 0; i < 5; i++) { // create five scrolling backgrounds
      var bg = new ScrollingBackground(this, "sprBg0", i * 10);
      this.backgrounds.push(bg);
    }

    this.scoreText = this.add.text(this.game.config.width * 0, 0, "score: 0", {
      fontFamily: 'monospace',
      fontSize: 30,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });


    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "sprPlayer"
    );


    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback: function () {
        var enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }
        else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType("ChaserShip").length < 5) {

            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0
            );
          }
        }
        else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.playerLasers, this.enemies, function (playerLaser, enemy) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        this.score += 10;
        this.scoreText.setText("score" + this.score);
        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    // scoreText = game.add(16,16,"Score:0", {fontSize:'32',fill: "#000"})
    // this.scoreTotal = this.add.text(this.game.config.width * 0, 0, "score:0", {
    //   fontFamily: 'monospace',
    //   fontSize: 30,
    //   fontStyle: 'bold',
    //   color: '#ffffff',
    //   align: 'center'
    // });


    this.physics.add.overlap(this.player, this.enemies, function (player, enemy) {
      if (!player.getData("isDead") &&
        !enemy.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
        this.scoreTotal = 0;
      }

    });

  }// end


  update() {
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (enemy.x < -enemy.displayWidth ||
        enemy.x > this.game.config.width + enemy.displayWidth ||
        enemy.y < -enemy.displayHeight * 4 ||
        enemy.y > this.game.config.height + enemy.displayHeight) {

        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }

          enemy.destroy();
        }

      }
    }

    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }

    if (!this.player.getData("isDead")) {
      this.player.update();
      if (this.keyUp.isDown) {
        this.player.moveUp();
      }
      else if (this.keyDown.isDown) {
        this.player.moveDown();
      }
      if (this.keyLeft.isDown) {
        this.player.moveLeft();
      }
      else if (this.keyRight.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      }
      else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
    }
  }
}