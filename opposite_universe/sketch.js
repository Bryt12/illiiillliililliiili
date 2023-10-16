shatter = 30;
function setup() {
  createCanvas(400, 400);

  seed = int(random(10000000));
  // seed = 9805980
  seed = 5214384;
  // seed = 3530795
  console.log(seed);
  noiseSeed(seed);
  randomSeed(seed);
  outsideSeed = random(10000000);
  pixelDensity(5);

  colorMode(HSL, 1);
}

function draw() {
  background(255);
  let back = false;

  for (var i = 0; i < 6; i++) {
    mask = createGraphics(400, 400);
    ctx = mask.canvas.getContext('2d');
    mask.noStroke();
    randomSeed(outsideSeed);
    outsideSeed = random(10000000);
    let x1, y1, x2, y2;

    if (random() > 0.5) {
      if (random() > 0.5) {
        x1 = 0;
        y1 = random(-100, 500);
      } else {
        x1 = 400;
        y1 = random(-100, 500);
      }
    } else {
      if (random() > 0.5) {
        x1 = random(-100, 500);
        y1 = 0;
      } else {
        x1 = random(-100, 500);
        y1 = 400;
      }
    }

    x2 = random(-100, 500);
    y2 = y1;

    let x3 = x2;
    let y3 = random(-100, 500);

    let distubance = random(0);

    if (!back) {
      mask.rect(0, 0, 400, 400);
      back = true;
    } else {
      // mask.strokeWeight(10)
      // mask.stroke(0)
      mask.triangle(x1, y1, x2, y2, x3, y3);
    }

    ctx.clip();
    mask.push();
    mask.translate(
      int(random(-shatter, shatter)),
      int(random(-shatter, shatter))
    );
    noiseSeed(seed);
    randomSeed(seed);
    drawBackground(mask, distubance);
    mask.pop();

    image(mask, 0, 0);
  }

  noLoop();
}

function drawBackground(mask, distubance) {
  mask.noStroke();

  mask.rectMode(CENTER);
  mask.blendMode(ADD);

  for (var i = 0; i < 10; i++) {
    grid(5, 5, 80, 100, mask, distubance);
  }

  mask.blendMode(BLEND);

  for (var i = 0; i < 10; i++) {
    grid(7, 7, 30, 150, mask, distubance);
  }
}

function grid(nx, ny, w, a, mask, distubance) {
  mask.fill(rc(a, distubance));
  let delta = 30;
  let rx = random(-delta, delta);
  let ry = random(-delta, delta);

  let dx = width / nx;
  let dy = height / ny;
  for (var i = -5; i < nx + 2; i++) {
    for (var j = -2; j < ny + 1; j++) {
      mask.square(dx * i + 0.5 * dx + rx + j * 20, dy * j + 0.5 * dy + ry, w);
    }
  }
}

function rc(a, dis) {
  let h = (random(1) + dis) % 1;
  let l = random(0.5, 1);
  let s = random(0.5, 0.9);

  return color(h, l, s, a);
}

function keyPressed() {
  if (keyCode === 83) {
    // if "s" is pressed
    saveCanvas(seed + '.jpg');
  }
}
