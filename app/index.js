import 'pixi';
import 'p2';
import Phaser from 'phaser';

import { planets } from './store/planets';
import { ellipses } from './store/ellipses';
import preload from './js/preload';


export const game = new Phaser.Game(1920, 1080, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var graphics;
var sprite;
var moon;

var celesticalBodieGroup;



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



function create() {
    var skyLayer = game.add.group();
    var planet;
    var moonsEllipse;

    var planetPosition = {};


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

        planetPosition.x = game.width / 2 - 15;
        planetPosition.y = game.height / 2-15 + ellipse.width/2;


        planet = celesticalBodieGroup.create(planetPosition.x, planetPosition.y, 'mars');
        planet.body.setCircle(30);

        if(planets[idx].moons !== null) {
            console.log(planets[idx].moons[0].name);
            moon = celesticalBodieGroup.create(planetPosition.x - 30, planetPosition.y - 30, 'moon');

        }




    });

    graphics.generateTexture;

    sprite = game.add.sprite(game.width / 2, game.height / 2, graphics.generateTexture());
    sprite.anchor.set(0.5);

    //  And destroy the original graphics object
    graphics.destroy();


    var sun = celesticalBodieGroup.create(game.width/2 -32.5, game.height / 2 -32.5, 'sun');
    sun.body.setCircle(50);

    game.world.bringToTop(celesticalBodieGroup);
}

function update() {
//x = Acos(t)
//y = Bcos)(T)
    //graphics.clear();
    var posX = 0;
    var posY = 0;

    ellipses.forEach((ellipse, idx) => {
        posX = (ellipse.width * Math.cos(game.time.time / planets[idx].rotatingSpeed));
        posY = (ellipse.width / 2 * Math.sin(game.time.time / planets[idx].rotatingSpeed));

        // drawEllipse(game.width/2, game.height/2, ellipse.width, ellipse.width/2);
        //  drawPlanetCss(game.width/2, game.height/2, planets[idx], posX, posY);


        celesticalBodieGroup.children[idx].body.position.x = game.width / 2 + posX - 15;
        celesticalBodieGroup.children[idx].body.position.y = game.height / 2 + posY - 15;
// trzeba stworzyc chyba nowa grupe dla ksiezycow bo idzie petla po celesticalBodieGroup
        // if(planets[idx].moons !== null) {
        //     moon = celesticalBodieGroup.create(celesticalBodieGroup.children[idx].body.position.x, celesticalBodieGroup.children[idx].body.position.y - 30, 'moon');
        //
        // }
    //      if(planets[idx].moons !== null) {
    //     moon.body.position.x = celesticalBodieGroup.children[idx].body.position.x - 30;
    //     moon.body.position.y = celesticalBodieGroup.children[idx].body.position.y - 30;
    // }

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