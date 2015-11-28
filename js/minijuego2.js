(function() {
  'use strict';

var juego;

var carretera; 
var cactus;
var cact1 , cact2;

var coche;
var coche1;
var position = [];
var count = 0;
 
var carGroup;
var obstacleGroup;
var targetGroup;
 
var obstacleSpeed = 150;
var obstacleDelay = 1400;

    
    function minijuego2() {}

  minijuego2.prototype = {
      
    preload: function() {
        this.game.load.image("road", "assets/road.png");
        this.game.load.image("cactus", "assets/Cactus 1.png");
        this.game.load.image("target", "assets/target.png");
        this.game.load.image("car", "assets/car.png");
        this.game.load.image("obstacle", "assets/obstacle.png");
    },
      
    create: function () {
        
        juego = this.game;
        
        this.game.stage.backgroundColor = '#F4D868';
          
        carretera = this.game.add.image(0, 0, "road");        
        carretera.x = this.game.world.centerX - carretera.width/2;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        carGroup = this.game.add.group();
        obstacleGroup = this.game.add.group();
        targetGroup = this.game.add.group();

        coche = this.game.add.sprite(this.game.world.centerX - 60, this.game.height /2, "car");
        this.game.physics.enable(coche, Phaser.Physics.ARCADE); 
        coche.tint = 0xff0000;  

        coche1 = this.game.add.sprite(this.game.world.centerX + 30, this.game.height - 80, "car");
        this.game.physics.enable(coche1, Phaser.Physics.ARCADE); 
        coche1.tint = 0x333333;  
        
        position = [coche.x, coche.x - 70];

        cactus = this.game.add.group();7
        cactus.enableBody = true;
        //this.game.input.onDown.add(moveCar);
        
        cact1 = cactus.create(100, -50, 'cactus');
        cact1.body.velocity.y = 200;

        cact2 = cactus.create(juego.world.width -100 -25, -50, 'cactus');
        cact2.body.velocity.y = 200;
        
        this.game.input.onDown.add(this.cambiarCarril);

    },

    update: function () {
       
        if(coche.x <= juego.world.centerX - 130 || coche.x >= juego.world.centerX -58){
            coche.body.velocity.x = 0;
        }
        
        if(cact1.y >= this.game.world.height){
            cact1.y = -50;
            cact2.y = -50;
        }
        
        /*this.game.physics.arcade.collide(carGroup, obstacleGroup, function(){
               this.game.state.start("menu");     
          });
          this.game.physics.arcade.collide(carGroup, targetGroup, function(c, t){
               t.destroy();
          });*/
    },
      
    cambiarCarril: function() {
         var steerTween = juego.add.tween(coche).to({
               angle: 20 - 40 * count
          }, 250 / 2, Phaser.Easing.Linear.None, true);
          steerTween.onComplete.add(function(){
               var steerTween = juego.add.tween(coche).to({
                    angle: 0
               }, 250 / 2, Phaser.Easing.Linear.None, true);
          })
          coche = 1 - count;
          var moveTween = juego.add.tween(coche).to({ 
               x: position[count],
          }, 250, Phaser.Easing.Linear.None, true);
    }

  };

function moveCar(e){
 var carToMove = Math.floor(e.position.x / (game.width / 2));
     if(cars[carToMove].canMove){
          cars[carToMove].canMove = false;
          cars[carToMove].side = 1 - cars[carToMove].side;
          var moveTween = game.add.tween(coche).to({ 
               x: position[count],
          }, carTurnSpeed, Phaser.Easing.Linear.None, true);
          moveTween.onComplete.add(function(){
               cars[carToMove].canMove = true;
          })
     }
};

    

  window['mankinters'] = window['mankinters'] || {};
  window['mankinters'].minijuego2 = minijuego2;
}());
