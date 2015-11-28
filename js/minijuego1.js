(function () {
    'use strict';

    var map;
    var tileset;
    var layer;
    var player;
    var guitarra;
    var facing = 'left';
    var jumpTimer = 0;
    var cursors;
    var jumpButton;
    var bg;
    var collision;
    
    var pausa;
    var sonido;

    function minijuego1() {}

    minijuego1.prototype = {
        preload: function () {

        },

        create: function () {
            this.game.world.setBounds(0, 0, 640, 480);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.stage.backgroundColor = '#000000';

            bg = this.game.add.tileSprite(0, 0, 800, 600, 'background');
            bg.fixedToCamera = true;

            sonido = this.game.add.audio('melodia1');
            sonido.play();
            
            map = this.game.add.tilemap('prueba');
            map.addTilesetImage('scifi', 'tiles');

            map.setCollisionBetween(316,319);
            map.setCollisionBetween(299,301);
            map.setCollision(466);
            map.setCollision(220);

            layer = map.createLayer('mapa');
            layer.resizeWorld();

            player = this.game.add.sprite(32, this.game.world.height - 100, 'elvis');

            guitarra = this.game.add.image(300, 100, 'guitarra');
            //guitarra.enableBody = true;
            
            this.game.physics.enable(guitarra);
            this.game.physics.enable(guitarra, Phaser.Physics.ARCADE);
            //guitarra.body.gravity.y = 200;
            //guitarra.body.bounce.y = 0.2;
            
            this.game.physics.enable(player);
            
            this.game.physics.enable(player, Phaser.Physics.ARCADE);

            player.body.bounce.y = 0.1;
            player.body.collideWorldBounds = true;
            player.body.setSize(20, 32, 5, 16);

            player.body.gravity.y = 320;

            player.animations.add('left', [0, 1, 2], 10, true);
            player.animations.add('turn', [1], 10, true);
            player.animations.add('right', [4, 5, 6], 10, true);

            this.game.camera.follow(player);

            cursors = this.game.input.keyboard.createCursorKeys();
            jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            
            //TECLA PARA PAUSA
            pausa = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);



        },

        update: function () {

            this.game.physics.arcade.collide(player, layer);
            this.game.physics.arcade.collide(layer, guitarra);
            this.game.physics.arcade.overlap(player, guitarra);

            player.body.velocity.x = 0;

            if (cursors.left.isDown) {
                player.body.velocity.x = -150;

                if (facing != 'left') {
                    player.animations.play('left');
                    facing = 'left';
                }
            } else if (cursors.right.isDown) {
                player.body.velocity.x = 150;

                if (facing != 'right') {
                    player.animations.play('right');
                    facing = 'right';
                }
            } else {
                if (facing != 'idle') {
                    player.animations.stop();

                    if (facing == 'left') {
                        player.frame = 0;
                    } else {
                        player.frame = 5;
                    }

                    facing = 'idle';
                }
            }
            
            if (jumpButton.isDown && player.body.onFloor() && this.game.time.now > jumpTimer) {
                player.body.velocity.y = -250;
                jumpTimer = this.game.time.now + 350;
            }

            if(pausa.isDown){
                sonido.stop();
                this.game.physics.arcade.gravity.y = 0;
                player.body.gravity.y = 0;
                player.body.velocity.y = 0;
                player.body.velocity.x = 0;
                this.game.state.start('mapa');
            }
        },

        onInputDown: function () {
            this.game.state.start('mapa');
        }
    };

    window['mankinters'] = window['mankinters'] || {};
    window['mankinters'].minijuego1 = minijuego1;
}());
