(function() {
  'use strict';

  function minijuego3() {}

  minijuego3.prototype = {
    create: function () {
      this.input.onDown.add(this.onInputDown, this);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#000000';

        bg = game.add.tileSprite(0, 0, 800, 600, 'background');
    },

    update: function () {

    },

    onInputDown: function () {
      this.game.state.start('menu');
    }
  };

  window['mankinters'] = window['mankinters'] || {};
  window['mankinters'].minijuego3 = minijuego3;
}());