(function () {
    'use strict';

    var player;
    var platforms;
    var cursors;
    var jumpButton;

    function mapa() {}

    mapa.prototype = {
        preload: function () {
            //this.game.stage.backgroundColor = '#85b5e1';

            //this.game.load.baseURL = 'http://examples.phaser.io/assets/';
            this.game.load.crossOrigin = 'anonymous';
            this.load.image('backdrop', 'assets/fondoLasVegasB.png');
            this.game.load.image('player', 'sprites/phaser-dude.png');
            this.game.load.image('platform', 'sprites/platform.png');

        },
        create: function () {
            //            this.input.onDown.add(this.onInputDown, this);
            //
            //            this.this.game.physics.startSystem(Phaser.Physics.ARCADE);
            //            this.this.game.stage.backgroundColor = '#000000';
            //
            //            var bg = this.this.game.add.tileSprite(0, 0, 800, 600, 'background');
            this.game.add.sprite(0, 0, 'backdrop');
            player = this.game.add.sprite(100, 200, 'player');

            this.game.physics.arcade.enable(player);

            player.body.collideWorldBounds = true;
            //player.body.gravity.y = 500;

            platforms = this.game.add.physicsGroup();

            platforms.create(500, 150, 'platform');
            platforms.create(-200, 300, 'platform');
            platforms.create(400, 450, 'platform');

            platforms.setAll('body.immovable', true);

            cursors = this.game.input.keyboard.createCursorKeys();
            jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        },
        update: function () {
            this.game.physics.arcade.collide(player, platforms);

            player.body.velocity.x = 0;
            player.body.velocity.y = 0;

            if (cursors.left.isDown) {
                player.body.velocity.x = -250;
            } else if (cursors.right.isDown) {
                player.body.velocity.x = 250;
            }

            if (cursors.up.isDown) {
                player.body.velocity.y = -250;
            }else if(cursors.down.isDown){
                player.body.velocity.y = 250;
            }
        },

//        onInputDown: function () {
//            this.this.game.state.start('menu');
//        }
    };

    window['mankinters'] = window['mankinters'] || {};
    window['mankinters'].mapa = mapa;
}());
