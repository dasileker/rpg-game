import Base from '../Base';

export default class EnemyLaser extends Base {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy-laser');
    this.setTexture('enemy-laser');
    this.body.velocity.y = 200;
    this.setPosition(x, y);
    this.setScale(0.3);
    this.speed = 1.5;

    scene.physics.world.enable(this);
    scene.physics.add.collider(this, scene.playerLasers, this.shot, null, this);
  }

  preUpdate(time, delta) {
    if (this.active === false) {
      return;
    }
    super.preUpdate(time, delta);
    this.y -= this.speed;
  }
}
