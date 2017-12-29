export default function lookForMoon(moonName, moonsGroup1) {
    var x = "";
    moonsGroup1.forEach((moon) => {
        if(moon.title === moonName) {
            x = moon;
        }
    });
    return x;
}