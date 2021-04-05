import Phaser from 'phaser';
import Base from '../Base';
import EnemyLaser from './EnemyLaser';

export default class EnemyOne extends Base {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy-one', 'EnemyOne');

    this.body.velocity.y = Phaser.Math.Between(60, 100);

    this.shotFrequency = this.scene.time.addEvent({
      delay: 1100,
      callback() {
        const laser = new EnemyLaser(this.scene, this.x, this.y);
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  shot() {
    if (this.shotFrequency !== undefined) {
      if (this.shotFrequency) {
        this.shotFrequency.remove(false);
      }
    }
  }
}
