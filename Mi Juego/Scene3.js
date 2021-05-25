class Scene3 extends Phaser.Scene {
  constructor() 
  {
    super("creditos");
  }

  preload ()
  {
    //Background Creditos
    this.load.image('creditos', 'images/creditos.png');   
  }
    
  create() 
  {

    this.add.image(400, 300, 'creditos'); 

    // Puntuacion Final
    var puntajefinal = this.add.text(0, 0, 'Score: ' + score,  { fontFamily: 'TimeNewRoman', fontSize: 70, color: '#green' });
      
    Phaser.Display.Align.In.Center(puntajefinal, this.add.zone(400, 300, 800, 600));

    //Reiniciar Partida
    var restartButton = this.add.text(310, 400, 'Restart', { fontFamily: 'Arial', fontSize: 60, color: 'red' })
    .setInteractive()
    .on('pointerdown', () => this.reiniciar() );
  }

  reiniciar()
  {
    this.scene.start('juego');        
  }

    
}
  