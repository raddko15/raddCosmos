import 'pixi';
import 'p2';
import Phaser from 'phaser';

import { planets, sunProps } from './store/planets';
import { ellipses } from './store/ellipses';
import drawEllipse from './js/celesticalObjects/ellipses';
import preload from './js/preload';
//import create from './js/create';
import lol from './js/create';

import lookForMoon from './js/celesticalObjects/moons';


export const game = new Phaser.Game(1920, 1080, Phaser.AUTO, '', {preload: preload, create: create, update: update});

export var test = "Radek";
lol();

export var graphics;
export var sprite;
export var moon;

export var celesticalBodieGroup;
export var planetsGroup;
export var moonsGroup;


function create() {
   // console.log(dimensions.width, dimensions.height);
    var planet;
    var planetPosition = {};

    game.physics.startSystem(Phaser.Physics.ARCADE);
    // game.add.image(0, 0, 'stars');


    celesticalBodieGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
    celesticalBodieGroup.enableBody = true;

    planetsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
    planetsGroup.enableBody = true;

    moonsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
    moonsGroup.enableBody = true;

    graphics = game.add.graphics();

    var sun = celesticalBodieGroup.create(game.width/2 - sunProps.width/2, game.height / 2 - sunProps.width/2, sunProps.name);
    sun.body.setCircle(sunProps.width);

    ellipses.forEach((ellipse, idx) => {

        drawEllipse(game.width / 2, game.height / 2, ellipse.width);

        //
        // planets.forEach(planet => {
        //     if (planet.ellipseId === idx) {

               planetPosition.x = game.width / 2 - planets[idx].width/2;
                planetPosition.y = game.height / 2 - planets[idx].width/2 + ellipse.width/2;


                planet = planetsGroup.create(planetPosition.x, planetPosition.y, planets[idx].name);
                planet.body.setCircle(planets[idx].width);

                if(planets[idx].moons !== null) {
                    // console.log(planets[idx].moons[0].name);
                    moon = moonsGroup.create(planetPosition.x+planets[idx].width/2 - planets[idx].moons[0].width/2 , planetPosition.y + planets[idx].width/2 - planets[idx].moons[0].width/2, planets[idx].moons[0].name);
                    moon.title = planets[idx].moons[0].name;
                }


//dodac mozliwosc paru ksiezycow - przejechac po tablicy moonsow a nie po 1 elemencie

    });


    sprite = game.add.sprite(game.width / 2, game.height / 2, graphics.generateTexture());
    sprite.anchor.set(0.5);

    //  And destroy the original graphics object
    graphics.destroy();

    game.world.bringToTop(celesticalBodieGroup);
    game.world.bringToTop(moonsGroup);
    game.world.bringToTop(planetsGroup);


    //zrobic grupe z grup i bringToTop
}
function update() {
//x = Acos(t)
//y = Bcos)(T)

    let posX = 0;
    let posY = 0;
    //
    ellipses.forEach((ellipse, idx) => {

                let planetMap =  planetsGroup.children[idx];
                let planetStore = planets[idx];
                let moonsStore = planets[idx].moons;
                posX = (ellipse.width * Math.cos(game.time.time / planetStore.rotatingSpeed));
                posY = (ellipse.width / 2 * Math.sin(game.time.time / planetStore.rotatingSpeed));


                planetMap.body.position.x = game.width / 2 + posX -  planetStore.width/2;
                planetsGroup.children[idx].body.position.y = game.height / 2 + posY - planetStore.width/2;


                if (moonsStore !== null) {

                    let moonX = (moonsStore[0].ellipse * Math.cos(game.time.time / moonsStore[0].rotatingSpeed));
                    let moonY = (moonsStore[0].ellipse / 2 * Math.sin(game.time.time / moonsStore[0].rotatingSpeed));
                    hideMoonBehindPlanet(moonX, moonY, moonsStore[0].ellipse, moonsStore[0].width);

                    moon = lookForMoon(moonsStore[0].name, moonsGroup.children);
                    moon.body.position.x = planetMap.body.position.x  + planets[idx].width/2 - moonsStore[0].width/2+ moonX;
                    moon.body.position.y = planetMap.body.position.y + planets[idx].width/2.5 - moonsStore[0].width/2 + moonY;
                }

    });

}
function hideMoonBehindPlanet(moonX, moonY, moonsEllipse, moonsWidth) {
    if(moonY > 0 && moonX < moonsEllipse + moonsWidth && moonX > - moonsEllipse/2 - moonsWidth) {

        game.world.bringToTop(moonsGroup);
    }
    else {
        game.world.bringToTop(planetsGroup);
    }
}