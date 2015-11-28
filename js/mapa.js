(function () {
    'use strict';

    var player;
    var casas;
    var cursors;
    var jumpButton;

    function mapa() {}

    mapa.prototype = {
        preload: function () {
            //this.game.stage.backgroundColor = '#85b5e1';

            //this.game.load.baseURL = 'http://examples.phaser.io/assets/';
            this.game.load.crossOrigin = 'anonymous';
            this.load.image('backdrop', 'assets/fondoLasVegasB.png');
            this.game.load.image('club', 'assets/Stripclub.png');
            this.game.load.image('hotel', 'assets/Hotel.png');
            this.game.load.image('taj', 'assets/TajMahal.png');
            this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

        },
        create: function () {
            this.game.world.setBounds(0, 0, 1200, 900);
            this.game.add.sprite(0, 0, 'backdrop');
            player = this.game.add.sprite(100, 500, 'dude');
            this.game.camera.follow(player);
            this.game.physics.arcade.enable(player);

            player.body.collideWorldBounds = true;
            //player.body.gravity.y = 500;
            player.animations.add('left', [0, 1, 2, 3], 10, true);
            player.animations.add('right', [5, 6, 7, 8], 10, true);

            casas = this.game.add.physicsGroup();

            casas.create(850, 65, 'club');
            casas.create(510, 13, 'hotel');
            casas.create(80, 25, 'taj');

            casas.setAll('body.immovable', true);

            cursors = this.game.input.keyboard.createCursorKeys();
        },
        update: function () {
            //this.game.physics.arcade.collide(player, casas);
            var parado = false;
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;

            if (cursors.left.isDown) {
                player.body.velocity.x = -250;
                player.animations.play('left');
                parado = true;
            } else if (cursors.right.isDown) {
                player.body.velocity.x = 250;
                player.animations.play('right');
                parado = true;
            }else if (cursors.up.isDown) {
                player.body.velocity.y = -250;
                parado = true;
            } else if (cursors.down.isDown) {
                player.body.velocity.y = 250;
                parado = true;
            }else{
                //  Stand still
                player.animations.stop();
                player.frame = 4;
            }
        },

        //        onInputDown: function () {
        //            this.this.game.state.start('menu');
        //        }
    };

    window['mankinters'] = window['mankinters'] || {};
    window['mankinters'].mapa = mapa;
}());
