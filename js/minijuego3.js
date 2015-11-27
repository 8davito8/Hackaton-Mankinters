(function() {
  'use strict';

    var bases;
    var jugador;
    
  function minijuego3() {}

  minijuego3.prototype = {
      
    preload: function() {

        this.game.load.image("pipe", "./assets/pipe.png");
        this.game.load.image("ground", "./assets/platform.png");
        this.game.load.spritesheet("dude", "./assets/dude.png", 32, 48);

    },
    
    create: function () {
        
        // FISICAS DEL JUEGO
        this.game.physics.startSystem(Phaser.Physics.Arcade);


        // BACKGROUND
        this.game.stage.backgroundColor = "#87CEEB";


        
        // BASES
        bases = this.game.add.group();
        bases.enableBody = true;

        var suelo = bases.create(0, this.game.world.height -32, 'ground');

        suelo.scale.setTo(2,1); // 2. se repite x 2 veces --- 1. No se repite
        suelo.body.immovable = true; //No se puede mover


        // JUGADOR
        jugador = this.game.add.sprite(this.game.world.width*0.2, this.game.world.height-100, 'dude');

        
        // ACTIVA FISICAS PARA EL JUGADOR
        this.game.physics.arcade.enable(jugador);

        // PROPIEDADES FISICAS DEL JUGADOR
        //jugador.body.immovable = true;
        jugador.body.bounce.y = 0.3; // REBOTE Y
        jugador.body.gravity.y = 800; // ALTURA DE SALTO
        jugador.body.collideWorldBounds = true; // REBOTE CONTRA BORDES

        
        // ANIMACIONES JUGADOR
        // name, frames, frameRate, loop
        jugador.animations.add('right', [5,6,7,8], 10, true);
        
    },

    update: function () {
        this.game.physics.arcade.collide(jugador, bases);
        jugador.animations.play('right');
    },

    onInputDown: function () {
      this.game.state.start('menu');
    }
  };

  window['mankinters'] = window['mankinters'] || {};
  window['mankinters'].minijuego3 = minijuego3;
}());
