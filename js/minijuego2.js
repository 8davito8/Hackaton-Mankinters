(function () {
    'use strict';

    var juego;

    var pausa;
    var sonido;
    
    var carretera;
    var cactus;
    var cact1, cact2;

    var coche;
    var coche1;
    var position = [];
    var count = 1;

    var grieta;

    var GameOver;

    function minijuego2() {}

    minijuego2.prototype = {

        preload: function () {
        },

        create: function () {
            
            this.game.world.setBounds(0, 0, 640, 480);

            juego = this.game;

            this.game.stage.backgroundColor = '#F4D868';

            carretera = this.game.add.image(0, 0, "road");
            carretera.x = this.game.world.centerX - carretera.width / 2;

            this.game.physics.startSystem(Phaser.Physics.ARCADE);


            // SONIDO
            sonido = this.game.add.audio('melodia1');
            sonido.play();
            
            // COCHE ROJO
            coche = this.game.add.sprite(this.game.world.centerX - 60, this.game.height - 80, "car");
            this.game.physics.enable(coche, Phaser.Physics.ARCADE);
            coche.body.velocity.y = -20;


            //COCHE NEGRO
            coche1 = this.game.add.sprite(this.game.world.centerX + 30, this.game.height - 80, "car1");
            this.game.physics.enable(coche1, Phaser.Physics.ARCADE);
            coche1.tint = 0x333333;

            // POSICIONES 1 CARRIL U OTRO
            position = [coche.x - 70, coche.x];

            //CACTUS
            cactus = this.game.add.group();
            cactus.enableBody = true;
            //this.game.input.onDown.add(moveCar);

            cact1 = cactus.create(100, -50, 'cactus1');
            cact1.body.velocity.y = 200;

            cact2 = cactus.create(juego.world.width - 100 - 25, -50, 'cactus1');
            cact2.body.velocity.y = 200;


            //GRIETAS PARA ESQUIVAR
            grieta = this.game.add.group();
            grieta.enableBody = true;

            //CREAR GRIETAS CADA SEGUNDO Y MEDIO EN CADA CARRIL DE FORMA ALEATORIA
            this.game.time.events.loop(1500, function () {
                var gri;

                if (Math.random() > Math.random()) {
                    gri = grieta.create(juego.world.centerX - 60, -50, 'grieta');
                } else {
                    gri = grieta.create(juego.world.centerX - 140, -50, 'grieta');
                }
                gri.scale.setTo(0.15, 0.15);
                gri.body.velocity.y = 150;
            });

            //CLICK DE RATON
            this.game.input.onDown.add(this.cambiarCarril);

            //PONER LOS COCHES DELANTE DE LAS GRIETAS PARA QUE NO PASE LA GRIETA POR ENCIMA
            this.game.world.swap(grieta, coche);
            
            // TECLA PARA PAUSA
            pausa = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        },

        update: function () {

            //COCHE NEGRO GANA TU PIERDES
            if (coche.y <= 0) {
                Ganar();
            }
            
            //COCHE NEGRO GANA TU PIERDES
            if (coche1.y <= 0) {
                finish();
            }

            // ACCION AL TOCAR GRIETAS
            this.game.physics.arcade.overlap(coche, grieta, this.aceleran, null, this);

            // APARECEN LOS CACTUS OTRA VEZ ARRIBA
            if (cact1.y >= this.game.world.height) {
                cact1.y = -50;
                cact2.y = -50;
            }

            if(pausa.isDown){
                sonido.stop();
                coche.body.velocity.y = 0;
                coche.body.velocity.x = 0;
               this.game.state.start('mapa');
            }

        },

        cambiarCarril: function () {

            //GIRA EL COCHE 20º Y LUEGO LO PONE A 0 
            var steerTween = juego.add.tween(coche).to({
                angle: 20 - 40 * count
            }, 250 / 2, Phaser.Easing.Linear.None, true);
            steerTween.onComplete.add(function () {
                juego.add.tween(coche).to({
                    angle: 0
                }, 250 / 2, Phaser.Easing.Linear.None, true);
            }, this);
            count = 1 - count;

            //MUEVE EL COCHE AL OTRO CARRIL SEGUN EL COUNT
            var moveTween = juego.add.tween(coche).to({
                x: position[count],
            }, 250, Phaser.Easing.Linear.None, true);


        },

        aceleran: function () {
            //ACELERA EL COCHE NEGRO
            var moveTween = juego.add.tween(coche1).to({
                y: coche1.y - 20,
            }, 250, Phaser.Easing.Linear.None, true);
        }


    };

    function finish() {
        
        sonido.stop();
        
        GameOver = juego.add.text(juego.world.centerX - 32, juego.world.centerY - 16, 'Game Over', {
            font: "24px Arial",
            fill: "#000"
        });

        juego.time.events.loop(1000, function () {
            //this.game.time.events.stop();
            juego.world.remove(GameOver);
            juego.state.start('mapa');
        });
    }
    
    function Ganar() {
        
        sonido.stop();
        
        GameOver = juego.add.text(juego.world.centerX - 32, juego.world.centerY - 16, 'Has Ganado', {
            font: "24px Arial",
            fill: "#000"
        });

        juego.time.events.loop(1000, function () {
            juego.world.remove(GameOver);
            juego.state.start('mapa');
        });
    }


    window['mankinters'] = window['mankinters'] || {};
    window['mankinters'].minijuego2 = minijuego2;
}());
