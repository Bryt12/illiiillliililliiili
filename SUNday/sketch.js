speed = 0.02
num_lines = 5000
num_circles = 50

function setup() {
  createCanvas(400, 400);
  pixelDensity(10)
  
  seed = random(1000000)
  randomSeed(seed)
  
  x = 0
  y = 0
  line_starts = []
  for (var i = 0; i < num_lines; i++) {
    line_starts.push([random(-400,400), random(-400,400), color(random(255),random(200),random(150))])
  }
}

function draw() {
  background(220);
  noFill()
  
  // circle(200, 200, 350)
  translate(200, 200)
  let di = 200
  
  for (var i = 0; i < line_starts.length; i ++) {
    stroke(line_starts[i][2])
    
    line(line_starts[i][0], line_starts[i][1], (di/2) * sin(x), (di/2) * cos(y))
  }
  fill("white")
  circle((di/2) * sin(x), (di/2) * cos(y), 10)
  
  x += speed
  y += speed
  
  noLoop()
}

function keyPressed() {
  if (keyCode === 83) { // if "s" is pressed
    saveCanvas(seed + ".jpg");
  }
}
