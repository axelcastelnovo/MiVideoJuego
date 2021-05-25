class Scene2 extends Phaser.Scene {
    constructor() {
      super('juego');
    }

    create ()
    {
        // Reproduccion de Musica
        musica = this.sound.add('musica', {loop: true});
    
        musica.play();
        
        //Background
        this.add.image(400, 300, 'background');

        // Plataformarmas:fisica y posición
        platforms = this.physics.add.staticGroup();

        
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        
        platforms.create(400, 600, 'ground').setScale(2).refreshBody();

        platforms.create(750, 420, 'ground');
    
        platforms.create(370, 340,'ground').setScale(0.3).refreshBody();
    
        platforms.create(0, 200, 'ground');
        platforms.create(750, 220, 'ground');
    
        platforms.create(350, 150,'ground').setScale(0.2).refreshBody();

        //Player        
        player = this.physics.add.sprite(100, 450, 'dude');

        
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.setScale(1);

        //  Eventos
        if (cursors =! undefined)
        {
            cursors = this.input.keyboard.createCursorKeys();
        }
            

        // Estrellas
        stars = this.physics.add.group(
        {
            key: 'star',
            repeat: 11,
            setXY: { x: 14, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) 
        {                     
            child.setBounceY(Phaser.Math.FloatBetween(0.6, 0.9));
            child.x += Phaser.Math.FloatBetween(-15, 15) 
            if (Phaser.Math.FloatBetween(0, 1) > 0.5)
            {
                child.score = 15;
                child.setTint(0xff0000);
            } 
            else
            {
                child.score = 5;
            }
        });

        //Bombas: fisicas
        bombs = this.physics.add.group();

        //  puntuacion en pantalla
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fontFamily:'TimeNewRoman', fill: 'red' });


        //Fisicas generales
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);

        
        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        // Inicializacion de variables.
        score = 0;
        gameOver = false;

        //Tiempo
        initialTime = 45
        
        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
        timeText = this.add.text(500, 16, 'Countdown', { fontSize: '32px', fontFamily:'TimeNewRoman', fill: 'red' });

        this.jumps = 0;
    }

    update ()
    {
        if (gameOver)
        {       
            return
        }
        
        
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-330);
        }
    }

    collectStar (player, star)
    {
        star.disableBody(true, true);

        //  Puntaje
        score += star.score;
        scoreText.setText('Score: ' + score);

        // Sonido moneda
        let sound = this.sound.add('moneda');
        sound.play();

        // Conteo de estrellas
        if (stars.countActive(true) === 0)
        {
           
            stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

             
            // Cada ronda se suma un nivel y se le resta 3 segundos al tiempo inicial
            level += 3
            initialTime = 45 - level;
        }
    }


    //Colision personaje y bomba
    hitBomb (player, bomb)
    {
        this.gameOver();
    }
    

    gameOver()
    {        
        gameOver = true;
        this.physics.pause();
        
        player.setTint(0xff0000);
        
        player.anims.play('turn');  

        // Detener la musica
        musica.stop();

        // Boton Game Over
        var gameOverButton = this.add.text(700, 500, 'Game Over', { fontFamily: 'TimeNewRoman', fontSize: 70, color: '#ff0000' })
        .setInteractive()
        .on('pointerdown', () => this.scene.start('creditos'));
        
        Phaser.Display.Align.In.Center(gameOverButton, this.add.zone(400, 300, 800, 600)); 
    }
    

    onSecond() {
        if (! gameOver)
        {       
            //descuento de segundos
            initialTime = initialTime - 1; // One second
            timeText.setText('Countdown: ' + initialTime);
            if (initialTime == 0) {
                timedEvent.paused = true;
                this.gameOver()
            }            
        }
    }
}