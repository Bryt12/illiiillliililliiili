let numberTriangles = 40;
let delta = 10;
let numberFlowers = 1;
let scaleRatio = 1;
let exportRatio = 4;
let seed = 0;
function setup() {
  angleMode(DEGREES);
  pixelDensity(10);

  let c = createCanvas(400, 400);

  // backgroundColor = color("#D6D3D6");
  backgroundColor = 255;
  seed = random(1000000);
  // seed = 151262.78460224584
  // randomSeed(114637.78602109298)
  seed = 872457.4494701393;
  randomSeed(seed);
  // 184526.5931923499
  // 184526.5931923499
  // backgroundColor = generateRandomColor()
  console.log(seed);
  // angle = random(360);
  angle = 167.45549728162587;

  console.log(angle);

  newCenters = [];
  squares = [];

  for (var i = 0; i < numberFlowers; i++) {
    let gradSquare = new GradSquare(angle);
    squares.push(gradSquare);
    newCenters.push(createVector(random(150, 200), random(150, 200)));
    // newCenters.push(createVector(random(200,200), random(200, 200)))
  }
}

function draw() {
  background(backgroundColor);

  for (var i = 0; i < squares.length; i++) {
    translate(newCenters[i].x, newCenters[i].y);
    squares[i].display();
  }
  // gradSquare.display();

  noLoop();
}

class GradSquare {
  constructor(angle) {
    this.colors = generateRandomColors(numberTriangles);
    // this.corners = [random(-200, 0), random(0, 200), random(0, 500), random(0, 200)]
    // // this.corners = [-145.10085869580507, 19.554004478966817, 127.0710107171908, 71.83486132416874]
    this.corners = [
      random(-145, -146),
      random(19, 20),
      127.0710107171908,
      71.83486132416874,
    ];
    // this.corners = [random(-500, 0), random(0, 50), random(0, 300), random(0, 100)]
    // this.corners = [-498.0175051605329, 3.0256650410592556, 41.435206797905266, 2.8052250389009714]
    console.log(this.corners);

    this.angle = angle;
  }

  display() {
    let topPoint = createVector(0, 0);
    let leftPoint = createVector(this.corners[0], this.corners[1]);
    let rightPoint = createVector(this.corners[2], this.corners[3]);
    angle += 0.44;
    fill(color(20, 100, 150));
    for (var i = 0; i < this.colors.length; i++) {
      //       let t_color_l = this.colors[i].levels

      //       let changeRate = 0.8
      //       let r = int(random() > changeRate)
      //       let g = int(random() > changeRate)
      //       let b = int(random() > changeRate)

      //       if (shouldChange(t_color_l[0]) && r == 1) {
      //         r = random(-delta, delta)
      //       }

      //       if (shouldChange(t_color_l[1]) && g == 1) {
      //         g = random(-delta, delta)
      //       }

      //       if (shouldChange(t_color_l)[2]&& b == 1) {
      //         b = random(-delta, delta)
      //       }

      //       this.colors[i] = color(
      //         t_color_l[0] + r,
      //         t_color_l[1] + g,
      //         t_color_l[2] + b,
      //         t_color_l[3])

      rotate(this.angle);
      fill(this.colors[i]);
      // noFill();
      translate(0, 0);
      triangle(
        topPoint.x,
        topPoint.y,
        leftPoint.x,
        leftPoint.y,
        rightPoint.x,
        rightPoint.y
      );
    }
  }
}

function shouldChange(value) {
  return value + delta < 255 && value + delta > 0;
}

function generateRandomColors(n) {
  var out = [];
  for (var i = 0; i < n; i++) {
    out.push(generateRandomColor());
  }
  return out;
}

function generateRandomColor() {
  return color(random(255), random(255), random(255), 30);
}

// function keyTyped() {
//   if (key === 's') {
//     console.log("Time to save!")
//     save('myCanvas.jpg');
//   }
// }

function keyPressed() {
  if (keyCode === 83) {
    // if "s" is pressed
    saveCanvas(seed + '.jpg');
  }
}
