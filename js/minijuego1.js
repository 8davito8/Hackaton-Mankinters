(function() {
  'use strict';

    var map;
    var layer;

  function minijuego1() {}

  minijuego1.prototype = {
    preload: function(){

        this.game.load.tilemap('prueba', 'assets/prueba.json', null, Phaser.Tilemap.TILED_JSON);

        this.game.load.image('tiles', 'assets/imagenes.png');
    },

    create: function () {
        this.game.stage.backgroundColor = '#787878';

        map = this.game.add.tilemap('prueba');
        map.addTilesetImage('imagenes', 'tiles');
        layer = map.createLayer('mapa');
        layer.resizeWorld();


    },

    update: function () {

    },

    onInputDown: function () {
      this.game.state.start('menu');
    }
  };

  window['mankinters'] = window['mankinters'] || {};
  window['mankinters'].minijuego1 = minijuego1;
}());
