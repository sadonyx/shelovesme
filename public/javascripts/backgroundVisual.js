var canvas;
let increment = 0.1
let rows, columns
let basePixels = 5
let frameRateDisplay
let timeOffset = 0.01

function setup () {
  colorMode(RGBA, 255)
  canvas = createCanvas(windowWidth + 10, windowHeight + 10)
  canvas.position(0,0)
  canvas.style('z-index', '-1')
  background(254, 247, 82)
  rows = floor(height / basePixels)
  columns = floor(width / basePixels)
}

 function draw () {
  let yOffset = 0
  for (let y = 0; y < rows; y++) {
    let xOffset = 0
    for (let x = 0; x < columns; x++) {
      xOffset += increment
      noStroke()
      fill(color(243, 177, 61, map(noise(xOffset, yOffset, timeOffset), 0, 1, -255, 255)))

      square(
        x * basePixels,
        y * basePixels,
        basePixels
      )
      
    }
    timeOffset += increment * .001
    yOffset += increment
  }
}