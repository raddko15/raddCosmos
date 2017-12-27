import { planets } from './store/planets';
import { ellipses } from './store/ellipses'
import 'pixi';
import 'p2';
import Phaser from 'phaser';
//

var angle = 0;
var posX = 0;
var posY = 0;
var game = new Phaser.Game(1920, 1080, Phaser.AUTO, '', {preload: preload, create: create, update: update});
var graphics;
function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}


function create() {
    // game.time.advancedTiming = true;
    // game.time.desiredFps = 60;
    // game.time.slowMotion = 1.0;
//    var position = {
//        x: game.width -
//    y: game.height -
// }
    // ellipse = new Phaser.Ellipse(game.world.centerX, game.world.centerY, 300, 550);


        graphics = game.add.graphics();
    ellipses.forEach((ellipse, idx) => {
        graphics.lineStyle(1, 0x00ff00, 1);
        graphics.drawEllipse(game.width / 2, game.height / 2, ellipse.width, ellipse.width/2);

        // graphics.beginFill(0xFF0000, 1);
        graphics.drawCircle(game.width / 2, game.height / 2 - planets[idx].width/2 + ellipse.width, 10);



    })};
    function update() {

//x = Acos(t)
//y = Bcos)(T)

       graphics.clear();

       ellipses.forEach((ellipse, idx) => {
           graphics.lineStyle(1, 0x00ff00, 1);
           graphics.drawEllipse(game.width / 2, game.height / 2, ellipse.width, ellipse.width/2);
           posX = (ellipse.width *Math.cos(game.time.time/1080));
           posY =  (ellipse.width/2 *Math.sin(game.time.time/1080));
           graphics.lineStyle(1, planets[idx].color, 1);
           graphics.beginFill(planets[idx].color, 1);
         //  graphics.drawCircle(game.width / 2, game.height / 2 - planets[idx].width/2, 10);
           graphics.drawCircle(game.width/2+posX, game.height/2 + posY, planets[idx].width);
           graphics.endFill();
//console.log((ellipse.height));
           angle= angle + 1;


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