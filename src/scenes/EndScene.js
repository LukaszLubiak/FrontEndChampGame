class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');
  }

  preload() {
    this.load.image('logo', 'assets/images/end.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#222');

    this.logo = this.add.image(0, 0, 'logo').setScale(0.5);

    this.thanksText = this.add.text(0, 0, 'Thanks for playing!\nHave a great day!', {
      fontFamily: 'Arial',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5);

    this.restartBtn = this.add.text(0, 0, 'RESTART', {
      fontFamily: 'Arial',
      color: '#ffffff',
      backgroundColor: '#28a745',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    this.restartBtn.on('pointerdown', () => {
      window.location.href = "index.html";
    });

    this.resizeContent(); // Set initial layout
    this.scale.on('resize', this.resizeContent, this);
  }

  resizeContent() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Responsive but stable font sizes
    const fontScale = Phaser.Math.Clamp(width / 800, 0.7, 1.3);
    this.thanksText.setFontSize(32 * fontScale);
    this.restartBtn.setFontSize(28 * fontScale);

    // Keep consistent vertical alignment using percentage-based positions
    this.logo.setPosition(width / 2, height * 0.35);
    this.thanksText.setPosition(width / 2, height * 0.5);
    this.restartBtn.setPosition(width / 2, height * 0.8);

    // Padding adjustment based on scale
    this.restartBtn.setPadding({
      x: 20 * fontScale,
      y: 10 * fontScale
    });
  }
}

