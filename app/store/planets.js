import { AU, speedFactor } from './globalFactors';

export const sunProps = {
    name: "sun",
    width: 200
};
export const planets = [
    {
        name: "mercury",
        width: 20,
        rotatingSpeed: 1800*speedFactor,
        color: 0xdb1c0f,
        moons: null,
        ellipseId:0

    },

    {
        name: "venus",
        width:46,
        rotatingSpeed: 720*speedFactor,
        color: 0x7af442,
        moons: null,
        ellipseId:1
    },
    {
        name: "earth",
        width: 48,
        rotatingSpeed: 2160*speedFactor,
        color: 0x9a21a5,
        moons:  [
            {
                name: 'moon',
                rotatingSpeed: 300,
                width: 16,
                ellipse: 40,
            }
        ],
        ellipseId:2
    },
    {
        name: "mars",
        width: 30,
        rotatingSpeed: 2520*speedFactor,
        color: 0x4d8985,
        moons: null,
        ellipseId:3
    },
    {
        name: "jupiter",
        width: 90,
        rotatingSpeed: 3000*speedFactor,
        color: 0x0b14bc,
        moons:  null,
        ellipseId:4
    },

    {
        name: "saturn",
        width: 90,
        rotatingSpeed: 1600*speedFactor,
        color: 0x3f4949,
        moons: null,
        ellipseId:5
    },
    {
        name: "uranus",
        width: 60,
        rotatingSpeed: 2400*speedFactor,
        color: 0xc47c2b,
        moons: null,
        ellipseId:6
    },
    {   name: "neptune",
        width: 58,
        rotatingSpeed: 1080*speedFactor,
        color: 0xebf441,
        moons:
            [
                {
                    name: 'triton',
                    rotatingSpeed: 300,
                    width: 12,
                    ellipse: 40
                }
            ],
        ellipseId:7
    },
];
