(function () {
    'use strict';

    var player;
    var casas;
    var cursors;
    var jumpButton;
    var muro;
    var posicion;
    var arrfinal=[[72,179,'murolateral'],[120,179,'murolateral'],[168,179,'murolateral'],[216,179,'murolateral'],[264,179,'murolateral'],[312,179,'murolateral'],[360,179,'murolateral'],[497.5,179,'murolateral'],[545.5,179,'murolateral'],[593.5,179,'murolateral'],[641.5,179,'murolateral'],[689.5,179,'murolateral'],[832,179,'murolateral'],[880,179,'murolateral'],[928,179,'murolateral'],[976,179,'murolateral'],[1024,179,'murolateral'],[1072,179,'murolateral'],[72,372,'murolateral'],[120,372,'murolateral'],[312,372,'murolateral'],[360,372,'murolateral'],[497.5,372,'murolateral'],[689.5,372,'murolateral'],[832,372,'murolateral'],[880,372,'murolateral'],[1024,372,'murolateral'],[1072,372,'murolateral'],[65,188,'muro'],[403.5,188,'muro'],[490,188,'muro'],[733.5,188,'muro'],[825,188,'muro'],[1115.5,188,'muro'],[65,236,'muro'],[403.5,236,'muro'],[490,236,'muro'],[733.5,236,'muro'],[825,236,'muro'],[1115.5,236,'muro'],[65,284,'muro'],[403.5,284,'muro'],[490,284,'muro'],[733.5,284,'muro'],[825,284,'muro'],[1115.5,284,'muro'],[65,332,'muro'],[403.5,332,'muro'],[490,332,'muro'],[733.5,332,'muro'],[825,332,'muro'],[1115.5,332,'muro'],[65,380,'murofin'],[403.5,380,'murofin'],[490,380,'murofin'],[733.5,380,'murofin'],[825,380,'murofin'],[1115.5,380,'murofin'],[65,179,'muroarriba'],[403.5,179,'muroarriba'],[490,179,'muroarriba'],[733.5,179,'muroarriba'],[825,179,'muroarriba'],[1115.5,179,'muroarriba']];

    function mapa() {}

    mapa.prototype = {
        preload: function () {
            //this.game.stage.backgroundColor = '#85b5e1';

            //this.game.load.baseURL = 'http://examples.phaser.io/assets/';
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
            this.game.load.image('vacio', 'assets/vacio.png');
            this.game.load.spritesheet('dude', 'assets/spriteInicio.png', 50, 60);

        },
        create: function () {
            this.game.world.setBounds(0, 0, 1200, 900);
            this.game.add.sprite(0, 0, 'backdrop');
            this.game.add.sprite(173, 360, 'vacio');
            player = this.game.add.sprite(400, this.game.world.height-150, 'dude');
            this.game.add.sprite(0,this.game.world.height-411,'cartel');
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

            for (var i = 0; i <  arrfinal.length; i++) {
                muro.create(arrfinal[i][0], arrfinal[i][1], arrfinal[i][2]);
            }

            muro.setAll('body.immovable', true);
            this.game.world.swap(muro, casas);

            cursors = this.game.input.keyboard.createCursorKeys();
        },
        update: function () {
            this.game.physics.arcade.overlap(player, vacio, pantalla1);
            this.game.physics.arcade.collide(player, muro);
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;

            if (cursors.left.isDown) {
                player.body.velocity.x = -250;
                player.animations.play('left');
                posicion = 9;
            } else if (cursors.right.isDown) {
                player.body.velocity.x = 250;
                player.animations.play('right');
                posicion = 3;
            } else if (cursors.up.isDown) {
                player.body.velocity.y = -250;
                player.animations.play('up');
                posicion = 0;
            } else if (cursors.down.isDown) {
                player.body.velocity.y = 250;
                player.animations.play('down');
                posicion = 6;
            } else {
                player.animations.stop();
                player.frame = posicion;
            }
        },
    };
    function pantalla1 () {
        this.game.state.start('minijuego1');
    }

    window['mankinters'] = window['mankinters'] || {};
    window['mankinters'].mapa = mapa;
}());
