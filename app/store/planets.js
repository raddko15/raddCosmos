import { AU } from './globalFactors';

export const planets = [
    {
        name: "mercury",
        width: 0.39*AU,
        rotatingSpeed: 1800,
        color: 0xdb1c0f,
        moons: null

    },
    {   name: "venus",
        width: 0.72*AU,
        rotatingSpeed: 1080,
        color: 0xebf441,
        moons: null
    },
    {
        name: "earth",
        width: AU,
        rotatingSpeed: 720,
        color: 0x7af442,
        moons:
            [
                {
                    name: 'moon',
                    rotatingSpeed: 1800,
                    ellipse: 100
                }
            ]
    },
    {
        name: "mars",
        width: 1.52*AU,
        rotatingSpeed: 2160,
        color: 0x9a21a5,
        moons: null
    },
    {
        name: "jupiter",
        width: 0.5*AU,
        rotatingSpeed: 1440,
        color: 0x0b14bc,
        moons: null
    },
    {
        name: "saturn",
        width: 1*AU,
        rotatingSpeed: 2520,
        color: 0x4d8985,
        moons: null
    },
    {
        name: "uranus",
        width: 1.3*AU,
        rotatingSpeed: 1600,
        color: 0x3f4949,
        moons: null
    },
    {
        name: "neptun",
        width: 1.5*AU,
        rotatingSpeed: 2400,
        color: 0xc47c2b,
        moons: null
    }
];
