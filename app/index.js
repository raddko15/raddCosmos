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
var planetsGroup;
var moonsGroup;


function drawEllipse(width, height, ellipseWidth) {
    var ellipseHeight = ellipseWidth/2;
    graphics.lineStyle(2, 0xffffff, 1);
    graphics.drawEllipse(width, height, ellipseWidth, ellipseHeight);
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

   game.add.image(0, 0, 'stars');


    celesticalBodieGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
    celesticalBodieGroup.enableBody = true;

    planetsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
    planetsGroup.enableBody = true;

    moonsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
    moonsGroup.enableBody = true;

    // sun.body.setCircle(5);

    graphics = game.add.graphics();

    ellipses.forEach((ellipse, idx) => {

        drawEllipse(game.width / 2, game.height / 2, ellipse.width, ellipse.width / 2);

        planetPosition.x = game.width / 2 - 15;
        planetPosition.y = game.height / 2-15 + ellipse.width/2;


        planet = planetsGroup.create(planetPosition.x, planetPosition.y, 'mars');
        planet.body.setCircle(30);

        if(planets[idx].moons !== null) {
           // console.log(planets[idx].moons[0].name);
            // 3 i 6 trzeba obliczyc oczywiscie
            moon = moonsGroup.create(planetPosition.x+3, planetPosition.y+6, 'moon');
            moon.title = planets[idx].moons[0].name;
            //console.log(moon);

        }
//dodac mozliwosc paru ksiezycow - przejechac po tablicy moonsow a nie po 1 elemencie

    });

    console.log(moonsGroup.children);

    graphics.generateTexture;

    sprite = game.add.sprite(game.width / 2, game.height / 2, graphics.generateTexture());
    sprite.anchor.set(0.5);

    //  And destroy the original graphics object
    graphics.destroy();


    var sun = celesticalBodieGroup.create(game.width/2 -32.5, game.height / 2 -32.5, 'sun');
    sun.body.setCircle(50);

    game.world.bringToTop(celesticalBodieGroup);

    game.world.bringToTop(planetsGroup);
    game.world.bringToTop(moonsGroup);

    //zrobic grupe z grup i bringToTop
}

function update() {
//x = Acos(t)
//y = Bcos)(T)

    var posX = 0;
    var posY = 0;

    ellipses.forEach((ellipse, idx) => {
        posX = (ellipse.width * Math.cos(game.time.time / planets[idx].rotatingSpeed));
        posY = (ellipse.width / 2 * Math.sin(game.time.time / planets[idx].rotatingSpeed));

        // drawEllipse(game.width/2, game.height/2, ellipse.width, ellipse.width/2);
        //  drawPlanetCss(game.width/2, game.height/2, planets[idx], posX, posY);


        planetsGroup.children[idx].body.position.x = game.width / 2 + posX - 15;
        planetsGroup.children[idx].body.position.y = game.height / 2 + posY - 15;
// trzeba stworzyc chyba nowa grupe dla ksiezycow bo idzie petla po celesticalBodieGroup
        // if(planets[idx].moons !== null) {
        //     moon = celesticalBodieGroup.create(celesticalBodieGroup.children[idx].body.position.x, celesticalBodieGroup.children[idx].body.position.y - 30, 'moon');
        //
        // }
          if(planets[idx].moons !== null) {
             // console.log(lookForMoon(planets[idx].moons.name, moonsGroup.children ));
             // console.log(planets[idx].moons[0].name);
              moon = lookForMoon(planets[idx].moons[0].name, moonsGroup.children );
var x = lookForMoon(planets[idx].moons[0].name, moonsGroup.children);
             // console.log(moonsGroup.children);
            //  console.log(moonsGroup.children);
           //  console.log(x);
            var moonX = (30 * Math.cos(game.time.time / 300));
            var moonY = (30 * Math.sin(game.time.time / 300));

            moon.body.position.x = planetsGroup.children[idx].body.position.x +3   + moonX;
            moon.body.position.y = planetsGroup.children[idx].body.position.y +6 + moonY;

          }

    });



}
function lookForMoon(moonName, moonsGroup1) {
   var x = "";
    moonsGroup1.forEach((moon , idx) => {
        if(moon.title === moonName) {
          //  console.log(moon.title);
           x = moon;
        }


    });
    return x;


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