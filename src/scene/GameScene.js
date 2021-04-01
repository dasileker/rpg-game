import 'phaser';

import config from '../config/config';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super({ key: 'GameScene' });
    
  }

  preload () {
    // load images
    this.load.image('background', 'assets/images/main-bg.png');
    this.load.image('enemy-one', 'assets/objects/enemy-one.png');
    this.load.image('enemy-two', 'assets/objects/enemy-two.png');
    this.load.image('enemy-laser', 'assets/objects/red-laser.png');
    this.load.image('player-laser', 'assets/objects/blue-laser.png');
    this.load.image('player', 'assets/objects/player-ship.png');
    this.load.audio('laser-sound', 'assets/sounds/laser-sound.ogg');
    this.load.audio('game-over-sound', 'assets/sounds/game-over.ogg');
    this.sys.game.globals.bgMusic.stop();
  }

  create () {
    // this.add.image(400, 300, 'logo');

    const img = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background',);


    const scalex = this.cameras.main.width / img.width;
    const scaleY = this.cameras.main.height / img.height;
    const scale = Math.max(scalex, scaleY);
    img.setScale(scale).setScrollFactor(0);

// add keys
    this.keyW = this.input.keyboard.addkey(Phaser.Input.Keyboard.Keycodes.UP);
    this.keyS = this.input.keyboard.addkey(Phaser.Input.Keyboard.Keycodes.DOWN);
    this.keyA = this.input.keyboard.addkey(Phaser.Input.Keyboard.Keycodes.LEFT);
    this.keyD = this.input.keyboard.addkey(Phaser.Input.Keyboard.Keycodes.RIGHT);

  }



  
};
