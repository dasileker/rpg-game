import Phaser from 'phaser';
import Base from '../Base';

export default class EnemyTwo extends Base {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy-two', 'EnemyTwo');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}
