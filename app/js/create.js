import {game, celesticalBodieGroup, planetsGroup, moonsGroup, sprite, moon, graphics} from '../index';

import {test} from '../index';

export default function lol() {
    console.log(test);
}

// export default function create() {
//
//     var skyLayer = game.add.group();
//     var planet;
//     var moonsEllipse;
//     var planetPosition = {};
//
//
//     //  We're going to be using physics, so enable the Arcade Physics system
//     game.physics.startSystem(Phaser.Physics.ARCADE);
//
//     game.add.image(0, 0, 'stars');
//
//
//     celesticalBodieGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
//     celesticalBodieGroup.enableBody = true;
//
//     planetsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
//     planetsGroup.enableBody = true;
//
//     moonsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
//     moonsGroup.enableBody = true;
//
//     // sun.body.setCircle(5);
//
//     graphics = game.add.graphics();
//
//     ellipses.forEach((ellipse, idx) => {
//
//         drawEllipse(game.width / 2, game.height / 2, ellipse.width, ellipse.width / 2);
//
//         planetPosition.x = game.width / 2 - 15;
//         planetPosition.y = game.height / 2-15 + ellipse.width/2;
//
//
//         planet = planetsGroup.create(planetPosition.x, planetPosition.y, 'mars');
//         planet.body.setCircle(30);
//
//         if(planets[idx].moons !== null) {
//             // console.log(planets[idx].moons[0].name);
//             // 3 i 6 trzeba obliczyc oczywiscie
//             moon = moonsGroup.create(planetPosition.x+3, planetPosition.y+6, 'moon');
//             moon.title = planets[idx].moons[0].name;
//             //console.log(moon);
//
//         }
// //dodac mozliwosc paru ksiezycow - przejechac po tablicy moonsow a nie po 1 elemencie
//
//     });
//
//     //console.log(moonsGroup.children);
//
//     graphics.generateTexture;
//
//     sprite = game.add.sprite(game.width / 2, game.height / 2, graphics.generateTexture());
//     sprite.anchor.set(0.5);
//
//     //  And destroy the original graphics object
//     graphics.destroy();
//
//
//     var sun = celesticalBodieGroup.create(game.width/2 -32.5, game.height / 2 -32.5, 'sun');
//     sun.body.setCircle(50);
//
//     game.world.bringToTop(celesticalBodieGroup);
//
//     game.world.bringToTop(planetsGroup);
//     game.world.bringToTop(moonsGroup);
//
//     //zrobic grupe z grup i bringToTop
// }
