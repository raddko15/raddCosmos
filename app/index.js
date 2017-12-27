import { planets } from './store/planets';
import { ellipses } from './store/ellipses'
import 'pixi';
import 'p2';
import Phaser from 'phaser';


var posX = 0;
var posY = 0;
const game = new Phaser.Game(1920, 1080, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var graphics;
var sprite;

var planets1;
var celesticalBodieGroup;

var ellipse1;

function drawEllipse(width, height, ellipseWidth) {
    var ellipseHeight = ellipseWidth/2;
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.drawEllipse(width, height, ellipseWidth, ellipseHeight);

   // ellipse1 = new Phaser.Ellipse(width, height, ellipseWidth, ellipseHeight);

}

function drawPlanetCss(width, height,planet, posX, posY) {
     graphics.lineStyle(1, planet.color, 1);
     graphics.beginFill(planet.color, 1);
     graphics.drawCircle(width + posX, height  + posY, planet.width);
     graphics.endFill();

}
function preload() {
    game.load.image('stars', 'app/assets/images/stars2.jpg');
    game.load.image('sun', 'app/assets/images/sun3.png');
    game.load.image('mars', 'app/assets/images/Mars2.png');
}


function create() {
    var skyLayer = game.add.group();

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

   //game.add.image(0, 0, 'stars');


    celesticalBodieGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
    celesticalBodieGroup.enableBody = true;

    // sun.body.setCircle(5);


    //var sun = celesticalBodies.create

    graphics = game.add.graphics();

    ellipses.forEach((ellipse, idx) => {

        drawEllipse(game.width / 2, game.height / 2, ellipse.width, ellipse.width / 2);

        var planet = celesticalBodieGroup.create(game.width / 2 -15, game.height / 2-15 + ellipse.width/2, 'mars');

        //planetsObj.push(celesticalBodieGroup.create(game.width / 2, game.height / 2 + ellipse.width/2, 'mars'));
        planet.body.setCircle(30);
        planet.z = 10;

       // planetsObj[idx].body.setCircle(10);

    });

    //graphics.generateTexture;
    var group1 = this.add.group();
    sprite = game.add.sprite(game.width / 2, game.height / 2, graphics.generateTexture());
    //sprite=game.add.group();
    console.log(sprite);
    sprite.anchor.set(0.5);

    //  And destroy the original graphics object
    graphics.destroy();

    // ellipses.forEach((ellipse, idx) => {
    //     var planet = celesticalBodieGroup.create(game.width / 2 -15, game.height / 2-15 + ellipse.width/2, 'mars');
    //     //planetsObj.push(celesticalBodieGroup.create(game.width / 2, game.height / 2 + ellipse.width/2, 'mars'));
    //     celesticalBodieGroup.children[idx].body.setCircle(100.5);
    // });

console.log(celesticalBodieGroup);
    var sun = celesticalBodieGroup.create(game.width/2 -32.5, game.height / 2 -32.5, 'sun');
    sun.body.setCircle(50);



    game.world.bringToTop(celesticalBodieGroup);
}

function update() {
//x = Acos(t)
//y = Bcos)(T)
    //graphics.clear();
//console.log(planetsObj);

    ellipses.forEach((ellipse, idx) => {
        posX = (ellipse.width * Math.cos(game.time.time / planets[idx].rotatingSpeed));
        posY = (ellipse.width/2 * Math.sin(game.time.time / planets[idx].rotatingSpeed));

       // drawEllipse(game.width/2, game.height/2, ellipse.width, ellipse.width/2);
      //  drawPlanetCss(game.width/2, game.height/2, planets[idx], posX, posY);


       // planetsObj[idx].body.setZeroVelocity();
         celesticalBodieGroup.children[idx].body.position.x = game.width/2 + posX - 15;
         celesticalBodieGroup.children[idx].body.position.y = game.height/2  + posY - 15;


       //   celesticalBodieGroup.children[idx].body.velocity.y=  100;
       // celesticalBodieGroup.children[idx].kill();

       // / planets1 = (celesticalBodieGroup.create(game.width/2 + posX, game.height/2  + posY, 'mars'));


       //   planetsObj[idx].body.velocity.y += posY/100;
        // planetsObj[idx].y = game.height/2  + posY;
         //console.log( planetsObj[idx].x);

        // graphics.lineStyle(1, planets[idx].color, 1);
        // graphics.beginFill(planets[idx].color, 1);
        // graphics.drawCircle(game.width/2 + posX, game.height/2  + posY, planets[idx].width);
        // graphics.endFill();


    });



}

// The mathematics is pretty simple, have a look at wikipedia.
//
//     You need to define your ellipse with a few parameters:
//
//     x, y: center of the ellipse
// a, b: semimajor and semiminor axes
// If you want to move on the elipses this means that you change the angle between the major axes and your position on the ellipse. Lets call this angle alpha.
//
//     Your position (X,Y) is:
//
//     X = x + (a * Math.cos(alpha));
// Y = y + (b * Math.sin(alpha));
// In order to move left or right you need to increase/decrease alpha and then recalculate your position.