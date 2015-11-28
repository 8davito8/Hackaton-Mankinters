(function() {
  'use strict';

var game;
 
var cars = [];
var carColors = [0xff0000, 0x0000ff];
var carTurnSpeed = 250;
 
var carGroup;
var obstacleGroup;
var targetGroup;
 
var obstacleSpeed = 150;
var obstacleDelay = 1400;

    
    function minijuego2() {}

  minijuego2.prototype = {
      
    preload: function() {
        this.game.load.image("road", "assets/road.png");
        this.game.load.image("target", "assets/target.png");
        this.game.load.image("car", "assets/car.png");
        this.game.load.image("obstacle", "assets/obstacle.png");
    },
      
    create: function () {
          game.add.image(0, 0, "road");
          game.physics.startSystem(Phaser.Physics.ARCADE);
          carGroup = game.add.group();
          obstacleGroup = game.add.group();
          targetGroup = game.add.group();
          for(var i = 0; i < 2; i++){
               cars[i] = game.add.sprite(0, game.height - 80, "car");
               cars[i].positions = [game.width * (i * 4 + 1) / 8, game.width * (i * 4 + 3) / 8];
               cars[i].anchor.set(0.5);
               cars[i].tint = carColors[i];  
               cars[i].canMove = true;
               cars[i].side = i;
               cars[i].x = cars[i].positions[cars[i].side];
               game.physics.enable(cars[i], Phaser.Physics.ARCADE); 
               cars[i].body.allowRotation = false;
               cars[i].body.moves = false;  
               carGroup.add(cars[i]);
          }
          game.input.onDown.add(moveCar);
          game.time.events.loop(obstacleDelay, function(){
               for(var i = 0; i < 2; i++){
                    /*if(game.rnd.between(0, 1) == 1){
                         var obstacle = new Obstacle(game, i);
                         game.add.existing(obstacle);
                         obstacleGroup.add(obstacle);  
                    }
                    else{
                         var target = new Target(game, i);
                         game.add.existing(target);
                         targetGroup.add(target);        
                    }*/
               }
          }); 
    },

    update: function () {
          game.physics.arcade.collide(carGroup, obstacleGroup, function(){
               game.state.start("PlayGame");     
          });
          game.physics.arcade.collide(carGroup, targetGroup, function(c, t){
               t.destroy();
          });
    }

  };

function moveCar(e){
     var carToMove = Math.floor(e.position.x / (game.width / 2));
     if(cars[carToMove].canMove){
          cars[carToMove].canMove = false;
          var steerTween = game.add.tween(cars[carToMove]).to({
               angle: 20 - 40 * cars[carToMove].side
          }, carTurnSpeed / 2, Phaser.Easing.Linear.None, true);
          steerTween.onComplete.add(function(){
               var steerTween = game.add.tween(cars[carToMove]).to({
                    angle: 0
               }, carTurnSpeed / 2, Phaser.Easing.Linear.None, true);
          })
          cars[carToMove].side = 1 - cars[carToMove].side;
          var moveTween = game.add.tween(cars[carToMove]).to({ 
               x: cars[carToMove].positions[cars[carToMove].side],
          }, carTurnSpeed, Phaser.Easing.Linear.None, true);
          moveTween.onComplete.add(function(){
               cars[carToMove].canMove = true;
          })
     }
};

    

  window['mankinters'] = window['mankinters'] || {};
  window['mankinters'].minijuego2 = minijuego2;
}());
