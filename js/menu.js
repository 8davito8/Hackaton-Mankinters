(function() {
  'use strict';

  function Menu() {}

  Menu.prototype = {
      
    preload: function(){
        this.game.load.spritesheet('button', 'assets/images.jpg', 193, 71);
    },
    
    create: function () {
        this.game.stage.backgroundColor = '#182d3b';

        /*
        var juego1 = this.game.add.button(this.game.world.centerX - 95, 50, 'button', this.game1, this, 2, 1, 0);
        var juego2 = this.game.add.button(this.game.world.centerX - 95, 200, 'button', this.game2, this, 2, 1, 0);
        var juego3 = this.game.add.button(this.game.world.centerX - 95, 350, 'button', this.game3, this, 2, 1, 0);
        */
        
        var juego1 = this.game.add.text(this.game.world.centerX - 95, 50, "MINIJUEGO1",{ font: "24px Arial", fill: "#FFF" });
        var juego2 = this.game.add.text(this.game.world.centerX - 95, 200, "MINIJUEGO2",{ font: "24px Arial", fill: "#FFF" });
        var juego3 = this.game.add.text(this.game.world.centerX - 95, 350, "MINIJUEGO3",{ font: "24px Arial", fill: "#FFF" });
        
        juego1.inputEnabled = true;
        juego2.inputEnabled = true;
        juego3.inputEnabled = true;
        
        juego1.events.onInputDown.add(this.game1, this);
        juego2.events.onInputDown.add(this.game2, this);
        juego3.events.onInputDown.add(this.game3, this);
        
        
    },

    update: function () {

    },

    onDown: function () {
      this.game.state.start('game');
    },
      
    game1: function() {
        this.game.state.start('minijuego1');
    },
      
    game2: function(){
        this.game.state.start('minijuego2');
    },
      
    game3: function(){
        this.game.state.start('minijuego3');
    }
  };

  window['mankinters'] = window['mankinters'] || {};
  window['mankinters'].Menu = Menu;
}());
