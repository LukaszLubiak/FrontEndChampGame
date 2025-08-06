// START GAME VIEW
class WelcomeScene extends Phaser.Scene {
  constructor() {
    super('WelcomeScene');
  }

  preload() {
    this.load.image('logo', 'assets/images/frontend.png');
    this.load.image('startBtn', 'assets/images/start.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#1a1a1a');

    this.welcomeText = this.add.text(0, 0, 'Welcome to FrontEndChamp Game!', {
      fontFamily: 'Arial',
      fontSize: '32px', // initial value, will be updated responsively
      color: '#ffffff',
      fontStyle: 'bold',
      align: 'center',
      stroke: '#000000',
      strokeThickness: 3,
    });

    this.logo = this.add.image(0, 0, 'logo');
    this.logo.setScale(0.4);
    this.logo.setAlpha(0);

    this.tweens.add({
      targets: this.logo,
      alpha: 1,
      scale: 1,
      duration: 2000,
      ease: 'Power2',
    });

    this.time.delayedCall(2000, () => {
      this.startImage = this.add.image(0, 0, 'startBtn')
        .setInteractive({ useHandCursor: true })
        .setScale(0.5);

      this.startImage.on('pointerdown', () => {
        window.location.href = "game.html";
      });

      this.startImage.on('pointerover', () => this.startImage.setScale(0.55));
      this.startImage.on('pointerout', () => this.startImage.setScale(0.5));

      this.resizeContent();
    });

    this.scale.on('resize', this.resizeContent, this);

    this.resizeContent();
  }

  resizeContent() {
    const width = this.scale.width;
    const height = this.scale.height;

    // RESPONSIVENESS
    const baseFontSize = Phaser.Math.Clamp(width / 20, 16, 32);
    if (this.welcomeText) {
      this.welcomeText.setFontSize(baseFontSize);
      this.welcomeText.setPosition(width / 2, 40).setOrigin(0.5, 0);
    }

    if (this.logo) {
      this.logo.setPosition(width / 2, height / 2);
    }

    if (this.startImage) {
      this.startImage.setPosition(width / 2, height - 100);
    }
  }
}
