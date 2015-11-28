(function () {
    'use strict';

    var bases;
    var cactus;
    var jugador;
    var comida;

    var suelo;
    var suelo2;

    var ancho;
    var alto;

    var juego;
    var cursors;
    var pausa;

    var GameOver;
    var textoPuntos;
    var puntos = 0;
    var sonidov;
    var sonidod;
    var jumps;


    function minijuego3() {}

    minijuego3.prototype = {

        preload: function () {
            sonidov = this.game.add.audio('acierto');
            sonidod = this.game.add.audio('fallo');
            jumps = this.game.add.audio('jump');
        },

        create: function () {

            this.game.world.setBounds(0, 0, 640, 480);

            juego = this.game;

            // FISICAS DEL JUEGO
            this.game.physics.startSystem(Phaser.Physics.Arcade);


            // BACKGROUND
            this.game.stage.backgroundColor = "#87CEEB";

            //TEXTO PUNTOS
            textoPuntos = this.game.add.text(32, 16, 'Score: ' + puntos, {
                font: "24px Arial",
                fill: "#000"
            });

            // BASES
            bases = this.game.add.group();
            bases.enableBody = true;

            //PARTE DEL SUELO
            suelo = bases.create(0, this.game.world.height - 68, 'ground');
            suelo.body.setSize(640, 0, 62, 8);

            //OTRA PARTE DEL SUELO
            suelo2 = bases.create(640, this.game.world.height - 68, 'ground');
            suelo2.body.setSize(640, 0, 62, 8);

            //suelo.scale.setTo(2,1); // 2. se repite x 2 veces --- 1. No se repite
            suelo.body.immovable = true; //No se puede mover
            suelo2.body.immovable = true; //No se puede mover

            //VELOCIDAD A LAS PARTES DEL SUELO
            suelo.body.velocity.x = -250;
            suelo2.body.velocity.x = -250;


            // JUGADOR
            jugador = this.game.add.sprite(this.game.world.width * 0.2, this.game.world.height - 68 - 55, 'dude1');

            // ACTIVA FISICAS PARA EL JUGADOR
            this.game.physics.arcade.enable(jugador);

            // PROPIEDADES FISICAS DEL JUGADOR
            jugador.body.bounce.y = 0; // REBOTE Y
            jugador.body.gravity.y = 700; // ALTURA DE SALTO
            jugador.body.collideWorldBounds = true; // REBOTE CONTRA BORDES DEL MUNDO
            jugador.body.velocity.x = 250;


            // ANIMACIONES JUGADOR
            // name, frames, frameRate, loop
            jugador.animations.add('right', [0, 1, 2], 10, true);
            jugador.animations.play('right');



            // CREAR CACTUS
            cactus = this.game.add.group();
            cactus.enableBody = true;

            //CREAR COMIDA
            comida = this.game.add.group();
            comida.enableBody = true;

            //LOOP CADA SEGUNDO PARA CREAR CACTUS O COMIDA
            this.game.time.events.loop(1500, this.crearCactus);

            //TECLAS
            cursors = this.game.input.keyboard.createCursorKeys();
            pausa = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);


            //DAS UN MAXIMO DE VELOCIDAD
            cactus.setAll('body.maxVelocity = 1500', 0);
            comida.setAll('body.maxVelocity = 1500', 0);

            //PONE EL SUELO DELANTE DE LOS CACTUS
            this.game.world.swap(cactus, bases);
            this.game.world.swap(comida, bases);
        },

        update: function () {

            if (jugador.x != this.game.world.width * 0.2)
                jugador.x = this.game.world.width * 0.2;

            //console.log(jugador.x);


            this.game.physics.arcade.collide(jugador, bases);
            this.game.physics.arcade.overlap(jugador, comida, this.subirPuntos, null, this);
            this.game.physics.arcade.overlap(jugador, cactus, this.salirNivel, null, this);

            puntos += 0.40;
            //jugador.body.velocity.y = 0;

            if (jugador.body.touching.down) {
                jugador.body.velocity.x = 250;
            } else {
                jugador.frame = 4;
            }

            if (suelo.x <= -640) {
                suelo.x = 640;
            }

            if (suelo2.x <= -640) {
                suelo2.x = 640;
            }

            if (pausa.isDown) {
                jugador.body.velocity.x = 0;
                jugador.body.velocity.y = 0;
                sonido.stop();
                this.game.state.start('mapa');
            }

            if (cursors.up.isDown && jugador.body.touching.down) {
                jumps.play();
                jugador.body.velocity.x = 0;
                jugador.body.velocity.y = -450;
                jugador.frame = 4;
            }

            if (!jugador.body.touching.down) {
                jugador.frame = 3;
            }

            textoPuntos.text = 'Score: ' + parseInt(puntos);

        },

        crearCactus: function () {

            if (Math.random() > Math.random()) {

                if (Math.random() > Math.random()) { //65 TAMAÑO SUELO, 50 O 25 TAMAÑO CACTUS
                    var cact = cactus.create(juego.world.width, juego.world.height - 62 - 50, 'cactus1');
                    cact.body.velocity.x = -1 * (250 + puntos * 0.3);
                } else if (Math.random() < Math.random()) {
                    var cact = cactus.create(juego.world.width, juego.world.height - 62 - 37.5, 'cactus1');
                    cact.body.velocity.x = -1 * (250 + puntos * 0.3);
                    cact.scale.setTo(0.75, 0.75);
                } else {
                    var cact = cactus.create(juego.world.width, juego.world.height - 62 - 85, 'cactus1');
                    cact.body.velocity.x = -1 * (250 + puntos * 0.3);
                    cact.scale.setTo(1.75, 1.75);
                }
            } else {

                if (Math.random() > Math.random()) {
                    var hamb = comida.create(juego.world.width, juego.world.height - 64 - 44, 'star');
                    hamb.body.velocity.x = -1 * (250 + puntos * 0.3);
                    hamb.scale.setTo(2, 2);
                }
            }
        },

        start: function () {

        },

        subirPuntos: function (jugador, hambb) {
            // SONIDO
            sonidov.play();
            
            puntos += 50;
            hambb.kill();
        },

        salirNivel: function (jugador, cac) {

            // SONIDO
            
            sonidod.play();
            //this.game.sound.setDecodedCallback(sonido, start, this);

            jugador.body.velocity.x = 0;
            cactus.setAll('body.velocity.x', 0);
            comida.setAll('body.velocity.x', 0);
            bases.setAll('body.velocity.x', 0);
            

            textoPuntos.visible = false;

            GameOver = this.game.add.text(this.game.world.centerX - 50, this.game.world.centerY - 12, 'Game Over', {
                font: "24px Arial",
                fill: "#000"
            });

            jugador.frame = 2;
            puntos = 0;

            this.game.time.events.loop(1000, function () {
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
    window['mankinters'].minijuego3 = minijuego3;
}());
