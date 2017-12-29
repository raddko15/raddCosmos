import { graphics } from './../../index';

export default function drawEllipse(width, height, ellipseWidth) {
    var ellipseHeight = ellipseWidth/2;
    graphics.lineStyle(0.3, 0xffffff, 1);
    graphics.drawEllipse(width, height, ellipseWidth, ellipseHeight);
}
