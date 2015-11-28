(function() {
  'use strict';

    var Cargando;
    
  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {
    preload: function () {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
      this.load.setPreloadSprite(this.asset);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.loadResources();

      this.ready = false;
    },

    loadResources: function () {

        // load your assets here
        //MAPA
        this.game.load.crossOrigin = 'anonymous';
        this.load.image('backdrop', 'assets/fondoLasVegas.png');
        this.game.load.image('club', 'assets/Stripclub.png');
        this.game.load.image('hotel', 'assets/Hotel.png');
        this.game.load.image('taj', 'assets/TajMahal.png');
        this.game.load.image('muro', 'assets/muro.png');
        this.game.load.image('murofin', 'assets/murofin.png');
        this.game.load.image('murolateral', 'assets/murolateral.png');
        this.game.load.image('muroarriba', 'assets/muroarriba.png');
        this.game.load.image('cartel', 'assets/cartel.png');
        this.game.load.spritesheet('dude', 'assets/spriteInicio.png', 50, 60);

        //MINIJUEGO 1
        this.game.load.tilemap('prueba', 'assets/prueba.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('guitarra', 'assets/Guitarra.png');
        this.game.load.image('tiles', 'assets/scifi.png');
        this.game.load.spritesheet('elvis', 'assets/Sprite_Edificio.png', 50, 60);
        this.game.load.image('background', 'assets/Fondo_Edificio.png');

        //MINIJUEGO 2
        this.game.load.image("road", "assets/road.png");
        this.game.load.image("grieta", "assets/grieta.png");
        this.game.load.image("car", "assets/Coche.png");
        this.game.load.image("car1", "assets/car.png");
        
        //MINIJUEGO 3
        this.game.load.image("star", "./assets/Pollo.png");
        this.game.load.image("cactus1", "./assets/Cactus1.png");
        this.game.load.image("cactus2", "./assets/Cactus2.png");
        this.game.load.image("ground", "./assets/Suelo.png");
        this.game.load.spritesheet("dude1", "./assets/Sprite_Minijuego.png", 50, 60);

        //Banda Sonora
        this.game.load.audio('melodia1', 'assets/musica/melodia1.mp3');
        this.game.load.audio('melodia2', 'assets/musica/melodia2.mp3');
        this.game.load.audio('melodia3', 'assets/musica/melodia3.mp3');
        this.game.load.audio('acierto','assets/musica/acierto.mp3');
        this.game.load.audio('fallo','assets/musica/fallo.mp3');
        this.game.load.audio('guitar','assets/musica/guitar.mp3');
        this.game.load.audio('jump','assets/musica/jump.wav');
    
        //Has ganado y has perdido
        this.game.load.image("ganado", "./assets/HasGanado.png");
        this.game.load.image("perdido", "./assets/HasPerdido.png");
    },

    create: function () {
        Cargando = this.game.add.text(this.game.world.centerX - 50, this.game.world.centerY - 40, 'CARGANDO...', { 
            font: "24px Arial",
            fill: "#FFF"
        });
    },

    update: function () {
      if (this.ready) {
        this.game.state.start('mapa');
      }
    },

    onLoadComplete: function () {
        this.game.world.remove(Cargando);
        this.ready = true;
    }
  };

  window['mankinters'] = window['mankinters'] || {};
  window['mankinters'].Preloader = Preloader;
}());
