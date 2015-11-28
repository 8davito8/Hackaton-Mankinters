(function () {
    'use strict';

    var map;
    var tileset;
    var layer;
    var player;
    var facing = 'left';
    var jumpTimer = 0;
    var cursors;
    var jumpButton;
    var bg;
    var collision;
    
    var pausa;

    function minijuego1() {}

    minijuego1.prototype = {
        preload: function () {
            /*
            this.game.load.tilemap('prueba', 'assets/prueba.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tiles', 'assets/scifi.png');
            this.game.load.spritesheet('elvis', 'assets/Sprite Inicio (50x60).png', 50, 55);
            this.game.load.image('background', 'assets/sky.png');
            */
        },

        create: function () {
            this.game.world.setBounds(0, 0, 640, 480);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.stage.backgroundColor = '#000000';

            bg = this.game.add.tileSprite(0, 0, 800, 600, 'background');
            bg.fixedToCamera = true;

            map = this.game.add.tilemap('prueba');
            map.addTilesetImage('scifi', 'tiles');

            map.setCollisionBetween(211,220);
            map.setCollisionBetween(317,319);
            map.setCollision(461);

            layer = map.createLayer('mapa');
            layer.resizeWorld();

            this.game.physics.arcade.gravity.y = 450;

            player = this.game.add.sprite(150, 32, 'elvis');
            //player = this.game.add.sprite(32, this.game.world.height - 50, 'elvis');
            this.game.physics.enable(player);
            this.game.physics.enable(player, Phaser.Physics.ARCADE);

            player.body.bounce.y = 0.2;
            player.body.collideWorldBounds = true;
            player.body.setSize(20, 32, 5, 16);

            player.animations.add('left', [0, 1, 2, 3], 10, true);
            player.animations.add('turn', [4], 20, true);
            player.animations.add('right', [5, 6, 7, 8], 10, true);

            this.game.camera.follow(player);

            cursors = this.game.input.keyboard.createCursorKeys();
            jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            
            //TECLA PARA PAUSA
            pausa = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);



        },

        update: function () {

            this.game.physics.arcade.collide(player, layer);

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
