class Scene1 extends Phaser.Scene {
    constructor() {
      super('inicio');
    }

    preload ()
    {
      this.load.image('logo', 'images/logo.png');
      this.load.image('background', 'images/background.jpg');
      this.load.image('ground', 'images/platform.png');
      this.load.image('star', 'images/star.png');
      this.load.image('bomb', 'images/bomb.png');
      this.load.spritesheet('dude', 'images/dude.png', { frameWidth: 32, frameHeight: 48 });
      this.load.audio('musica', 'assets/nivel1.mp3');    
      this.load.audio('moneda', 'assets/moneda.mp3');
    }

    create() 
    {
      // Movimiento y animaciones
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });

      this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
      });

      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
      });

      //siguiente scena
      
      var logo = this.add.image(400, 300, 'logo').setScale(1.1)
      logo.setInteractive()
      logo.on('pointerdown', () => this.scene.start('juego') );
    }
    
}
