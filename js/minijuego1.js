(function () {
    'use strict';

    var map;
    var tileset;
    var layer;
    
    var player;
    var guitarra;    
    
    var GameOver;
    
    var sonido;
    var facing = 'left';
    var jumpTimer = 0;
    
    var cursors;
    var jumpButton;
    var juego;
    
    var bg;
    var collision;
    
    var pausa;
    var sonido;

    var ganado;

    function minijuego1() {}

    minijuego1.prototype = {
        preload: function () {
            sonido = this.game.add.audio('guitar');
        },

        create: function () {
            
            juego = this.game;
            
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

            guitarra = this.game.add.group();
            guitarra.enableBody = true;
            var guitar = guitarra.create(450, 100, 'guitarra');
            
            this.game.physics.enable(guitarra);
            this.game.physics.enable(guitarra, Phaser.Physics.ARCADE);
            guitar.body.gravity.y = 200;
            guitar.body.bounce.y = 0.2;
            
            this.game.physics.enable(player);
            
            this.game.physics.enable(player, Phaser.Physics.ARCADE);

            player.body.bounce.y = 0.1;
            player.body.collideWorldBounds = true;
            player.body.setSize(20, 32, 5, 16);

            player.body.gravity.y = 320;

            player.animations.add('right', [0, 1, 2], 10, true);
            player.animations.add('turn', [1], 10, true);
            player.animations.add('left', [4, 5, 6], 10, true);

            this.game.camera.follow(player);

            cursors = this.game.input.keyboard.createCursorKeys();
            jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            
            //TECLA PARA PAUSA
            pausa = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);



        },

        update: function () {

            this.game.physics.arcade.collide(player, layer);
            this.game.physics.arcade.collide(layer, guitarra);
            this.game.physics.arcade.overlap(player, guitarra, this.ganar);

            player.body.velocity.x = 0;

             
            if(cursors.up.isDown && player.body.onFloor()){
                //console.log('entra');
                player.body.velocity.y = -250;                
                jumpTimer = this.game.time.now + 350;
            }

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
            

            if(player.body.velocity.x < 0 && !player.body.onFloor()){
                player.frame = 7;
            }else if(player.body.velocity.x > 0 && !player.body.onFloor()){
                player.frame = 3;
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
        
        ganar: function(play, guitar){
            sonido.play();
            juego.world.remove(guitarra);
            player.body.velocity.x = 0;
            ganado = juego.add.sprite(200, 180, 'ganado');
//            GameOver = juego.add.text(juego.world.centerX - 50, juego.world.centerY - 12, 'Game Over', {
//                font: "24px Arial",
//                fill: "#000"
//            });

            juego.time.events.loop(1000, function () {
                //this.game.time.events.stop();
                juego.world.remove(GameOver);
                juego.state.start('mapa');
            });
       },

        onInputDown: function () {
            this.game.state.start('mapa');
        }
    };

    window['mankinters'] = window['mankinters'] || {};
    window['mankinters'].minijuego1 = minijuego1;
}());
