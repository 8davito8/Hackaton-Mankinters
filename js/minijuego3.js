(function() {
  'use strict';

    var bases;
    var cactus;
    var jugador;
    var comida;

    var ancho;
    var alto;

    var juego;
    var cursors;
    var pausa;

    var GameOver;
    var textoPuntos;
    var puntos = 0;


  function minijuego3() {}

  minijuego3.prototype = {

    preload: function() {

        this.game.load.image("star", "./assets/star.png");
        this.game.load.image("pipe", "./assets/pipe.png");
        this.game.load.image("ground", "./assets/platform.png");
        this.game.load.spritesheet("dude", "./assets/dude.png", 32, 48);

    },

    create: function () {

        juego = this.game;

        // FISICAS DEL JUEGO
        this.game.physics.startSystem(Phaser.Physics.Arcade);


        // BACKGROUND
        this.game.stage.backgroundColor = "#87CEEB";


        //TEXTO PUNTOS
        textoPuntos = this.game.add.text(32, 16, 'Score: ' + puntos, { font: "24px Arial", fill: "#000" });

        // BASES
        bases = this.game.add.group();
        bases.enableBody = true;

        var suelo = bases.create(0, this.game.world.height -32, 'ground');

        suelo.scale.setTo(2,1); // 2. se repite x 2 veces --- 1. No se repite
        suelo.body.immovable = true; //No se puede mover
        suelo.z = 1;


        // JUGADOR
        jugador = this.game.add.sprite(this.game.world.width*0.2, this.game.world.height-100, 'dude');

        // ACTIVA FISICAS PARA EL JUGADOR
        this.game.physics.arcade.enable(jugador);

        // PROPIEDADES FISICAS DEL JUGADOR
        //jugador.body.immovable = true;
        jugador.body.bounce.y = 0.1; // REBOTE Y
        jugador.body.gravity.y = 700; // ALTURA DE SALTO
        jugador.body.collideWorldBounds = true; // REBOTE CONTRA BORDES


        // ANIMACIONES JUGADOR
        // name, frames, frameRate, loop
        jugador.animations.add('right', [5,6,7,8], 10, true);
        jugador.animations.play('right');



        // CREAR CACTUS
        cactus = this.game.add.group();
        cactus.enableBody = true;

        //CREAR COMIDA
        comida = this.game.add.group();
        comida.enableBody = true;

        //LOOP CADA SEGUNDO PARA CREAR CACTUS O COMIDA
        this.game.time.events.loop(1500, this.crearCactus);

        //TECLAS
        cursors = this.game.input.keyboard.createCursorKeys();
        pausa = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);


        cactus.setAll('body.maxVelocity = 1000', 0);
        comida.setAll('body.maxVelocity = 1000', 0);

        this.game.world.swap(cactus, bases);

    },

    update: function () {
        this.game.physics.arcade.collide(jugador, bases);
        this.game.physics.arcade.overlap(jugador, comida, this.subirPuntos, null, this);
        this.game.physics.arcade.overlap(jugador, cactus, this.salirNivel, null, this);

        puntos += 0.25;
        //jugador.body.velocity.y = 0;

        if(pausa.isDown){
            this.game.state.start('menu');
        }

        if(cursors.up.isDown && jugador.body.touching.down){
            jugador.body.velocity.y = -450;
        }

        textoPuntos.text = 'Score: ' + parseInt(puntos);

    },

    crearCactus: function() {

        if(Math.random() > Math.random()){

            var altura = Math.random() * (100 - 64) + 64;

            var cact = cactus.create(juego.world.width, juego.world.height - altura, 'pipe');
            cact.body.velocity.x = -1 * (250 + puntos*0.3);
        }else{
            var hamb = comida.create(juego.world.width, juego.world.height - 64, 'star');
            hamb.body.velocity.x = -1 * (250 + puntos*0.3);
        }
    },

    subirPuntos: function(jugador, hambb) {
        puntos += 50;
        hambb.kill();

    },

    salirNivel: function(jugador, cac) {

        cactus.setAll('body.velocity.x', 0);
        comida.setAll('body.velocity.x', 0);

        textoPuntos.visible = false;

        GameOver = this.game.add.text(this.game.world.centerX - 50, this.game.world.centerY - 12, 'Game Over', {
            font: "24px Arial", fill: "#000"
        });

        jugador.frame = 4;
        puntos = 0;

        this.game.time.events.loop(1000, function(){
            //this.game.time.events.stop();
            juego.world.remove(GameOver);
            juego.state.start('menu');
        });
    },

    onInputDown: function () {
      this.game.state.start('menu');
    }
  };

  window['mankinters'] = window['mankinters'] || {};
  window['mankinters'].minijuego3 = minijuego3;
}());
