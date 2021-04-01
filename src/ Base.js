import Phaser from 'phaser';

class Base extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);

    this.setData('Dead', false);
    this.setData('type', type);
    this.scene = scene;
    this.scene.physics.world.enableBody(this, 0);

  }

  
}