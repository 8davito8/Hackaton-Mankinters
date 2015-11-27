window.addEventListener('load', function () {
  'use strict';

  var ns = window['mankinters'];
  var game = new Phaser.Game(640, 480, Phaser.AUTO, 'mankinters-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('minijuego1', ns.minijuego1);
  game.state.add('minijuego2', ns.minijuego2);
  game.state.add('minijuego3', ns.minijuego3);
  game.state.add('game', ns.Game);
  /* yo phaser:state new-state-files-put-here */
  game.state.start('boot');
}, false);
