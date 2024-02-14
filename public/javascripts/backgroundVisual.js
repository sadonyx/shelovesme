var canvas;
let increment = 0.1;
let rows, columns;
let basePixels = 14;
let timeOffset = 0.01;

function setup () {
  frameRate(30);
  colorMode(RGBA, 255);
  canvas = createCanvas(windowWidth + 20, windowHeight + 20);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  background(254, 247, 82);
  rows = floor(height / basePixels);
  columns = floor(width / basePixels);
}

function draw () {
  translate(p5.Vector.fromAngle(millis() / 1000, 12)); //subtle cyclical movement
  let yOffset = 0;
  for (let y = -20; y < rows; y++) { // 20 adjusts for the borders
    let xOffset = 0;
    for (let x = -20; x < columns; x++) {
      xOffset += increment;
      noStroke();

      // draw orange squares
      fill(color(243, 177, 61, map(noise(xOffset, yOffset, timeOffset), 0, 1, -255, 255)))
      square(
        x * basePixels,
        y * basePixels,
        basePixels
      );

      // draw background color squares
      fill(color(254, 247, 82, map(noise(xOffset, yOffset, timeOffset), 0, 1, -255, 255)))
      square(
        (columns - (x + 20)) * basePixels, // 20 adjusts for the borders
        (rows - (y +  20)) * basePixels,
        basePixels
      );
    }
    timeOffset += increment * .001;
    yOffset += increment;
  }
}

// redraw canvas upon change in window size
function windowResized(){
  canvas = resizeCanvas(windowWidth + 20, windowHeight + 20);
  background(254, 247, 82);
  rows = floor(height / basePixels);
  columns = floor(width / basePixels);
}