(function() {
  'use strict';

  function minijuego1() {}

  minijuego1.prototype = {
    create: function () {
      this.input.onDown.add(this.onInputDown, this);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#000000';

        var bg = this.game.add.tileSprite(0, 0, 800, 600, 'background');
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
