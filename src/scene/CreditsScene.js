import 'phaser';

import config from '../config/config';

export default class CreditsScene extends Phaser.Scene {
  constructor () {
    super('Credits');
  }

  preload () {
  }

  create() {
    
    this.cerditsText = this.add.text(0, 0, 'Credits', {
      fontSize: '32',
      fill: '#fff',
    });

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height,
    )

    Phaser.Display.Align.In.Center(this.cerditsText, this.zone);

    Phaser.Display.Align.In.Center(this.madeByText, this.zone);

    this.madeByText.setY(900);

    this.creditsTween = this.tweens.add({
      target: this.cerditsText,
      y: -100,
      ease: 'Power1',
      duration: 5000,
      delay: 3000,
    })



  }
};
