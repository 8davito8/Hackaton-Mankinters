(function() {
  'use strict';

  function minijuego2() {}

  minijuego2.prototype = {
      
    preload: function() {
        
    },
      
    create: function () {
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#FF00FF';


    },

    update: function () {

    }

  };

  window['mankinters'] = window['mankinters'] || {};
  window['mankinters'].minijuego2 = minijuego2;
}());
