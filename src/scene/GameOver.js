/* eslint-disable prefer-destructuring */

import Phaser from 'phaser';
import config from '../config/config';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  preload() {
    this.load.audio('sndOver', 'content/sndBtnOver');
    this.load.audio('sndDown', 'content/sndBtnDown');
  }

  create() {
    const score = this.sys.game.globals.score;
    this.title = this.add.text(config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    
    // FORM
    

    // Submit Form
    }
}

/* eslint-enable prefer-destructuring */
