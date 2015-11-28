(function () {
    'use strict';

    var player;
    var casas;
    var cursors;
    var jumpButton;
    var muro;

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
            this.game.load.image('muro', 'assets/muro.png');
            this.game.load.image('murofin', 'assets/murofin.png');
            this.game.load.image('murolateral', 'assets/murolateral.png');
            this.game.load.spritesheet('dude', 'assets/spriteInicio.png', 50, 60);

        },
        create: function () {
            this.game.world.setBounds(0, 0, 1200, 900);
            this.game.add.sprite(0, 0, 'backdrop');
            player = this.game.add.sprite(100, 500, 'dude');
            this.game.camera.follow(player);
            this.game.physics.arcade.enable(player);

            player.body.collideWorldBounds = true;
            //player.body.gravity.y = 500;
            player.animations.add('left', [9, 10, 11], 10, true);
            player.animations.add('right', [3, 4, 5], 10, true);
            player.animations.add('up', [0, 1, 2], 10, true);
            player.animations.add('down', [6, 7, 8], 10, true);

            casas = this.game.add.physicsGroup();
            casas.create(80, 25, 'taj');
            casas.create(510, 13, 'hotel');
            casas.create(850, 65, 'club');
            casas.setAll('body.immovable', true);

            muro = this.game.add.physicsGroup();

            for (var i = 0; i < 7; i++) {
                muro.create(65 + i * 48, 188, 'murolateral');
            }
            for (var i = 0; i < 5; i++) {
                muro.create(490 + i * 48, 188, 'murolateral');
            }
            for (var i = 0; i < 7; i++) {
                muro.create(825 + i * 48, 188, 'murolateral');
            }

            for (var i = 0; i < 4; i++) {
                muro.create(65, 188 + i * 48, 'muro');
                muro.create(407, 188 + i * 48, 'muro');
                muro.create(490, 188 + i * 48, 'muro');
                muro.create(730, 188 + i * 48, 'muro');
                muro.create(825, 188 + i * 48, 'muro');
                muro.create(1167, 188 + i * 48, 'muro');
            }
            muro.create(65, 380, 'murofin');
            muro.create(407, 380, 'murofin');
            muro.create(490, 380, 'murofin');
            muro.create(730, 380, 'murofin');
            muro.create(825, 380, 'murofin');
            muro.create(1167, 380, 'murofin');


            muro.setAll('body.immovable', true);
            this.game.world.swap(muro, casas);

            cursors = this.game.input.keyboard.createCursorKeys();
        },
        update: function () {
            this.game.physics.arcade.collide(player, muro);
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
            } else if (cursors.up.isDown) {
                player.body.velocity.y = -250;
                player.animations.play('up');
                parado = true;
            } else if (cursors.down.isDown) {
                player.body.velocity.y = 250;
                player.animations.play('down');
                parado = true;
            } else {
                player.animations.stop();
                player.frame = 4;
            }
        },
    };

    window['mankinters'] = window['mankinters'] || {};
    window['mankinters'].mapa = mapa;
}());
