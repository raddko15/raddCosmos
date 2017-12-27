import { AU } from './globalFactors';

export const planets = [
    {
        name: "mercury",
        width: 0.39*AU,
        rotatingSpeed: 1800,
        color: 0xdb1c0f
    },
    {   name: "venus",
        width: 0.72*AU,
        rotatingSpeed: 1080,
        color: 0xebf441
    },
    {
        name: "earth",
        width: AU,
        rotatingSpeed: 720,
        color: 0x7af442
    },
    {
        name: "mars",
        width: 1.52*AU,
        rotatingSpeed: 2160,
        color: 0x9a21a5
    },
    {
        name: "jupiter",
        width: 0.5*AU,
        rotatingSpeed: 1440,
        color: 0x0b14bc
    },
    {
        name: "saturn",
        width: 1*AU,
        rotatingSpeed: 2520,
        color: 0x4d8985
    },
    {
        name: "uranus",
        width: 1.3*AU,
        rotatingSpeed: 1600,
        color: 0x3f4949
    },
    {
        name: "neptun",
        width: 1.5*AU,
        rotatingSpeed: 2400,
        color: 0xc47c2b
    }
];
