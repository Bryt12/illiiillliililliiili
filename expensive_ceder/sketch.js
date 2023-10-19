function setup() {
  createCanvas(400, 400);

  // blendMode(ADD
}

function draw() {
  background(0);

  for (var i = 60; i < 100; i++) {
    mask = createGraphics(400, 400);
    mask.translate(0, -50);
    mask.colorMode(HSL, 1);
    let x = (abs(i) % 10) * 50;
    let y = floor(i / 10) * 50;

    y += 100 * noise(x / 100, y / 100) - 20;
    mask.translate(x, y);
    // mask.background(0)
    mask.blendMode(ADD);
    mask.noFill();
    // mask.noStroke()
    ctx = mask.canvas.getContext('2d');
    mask.circle(0, 0, 400 / 3);
    ctx.clip();
    eye(mask);
    image(mask, 0, 0);
  }

  noLoop();
}

function eye(mask) {
  let layers = 100;
  for (var i = 0; i < layers; i++) {
    layer(i, mask);
  }
}

function layer(lay, mask) {
  let n = random(20);
  let n2 = random(10, 40);
  let r = 300;

  for (var j = 0; j < n2; j++) {
    mask.rotate((2 * PI) / n2);
    for (var i = 0; i < n; i++) {
      mask.stroke(nc(i + lay * 100));
      let t = map(i, 0, n, 0, 10 * PI);
      let t2 = t * 1.2;
      let x = r * cos(t);
      let y = r * sin(t);

      let x2 = r * cos(t2);
      let y2 = r * sin(t2);

      mask.line(x, y, x2, y2);
    }
  }
}

function nc(i) {
  i = i / 50;
  return color(255 * noise(i), 255 * noise(i + 1), 255 * noise(i + 2), 10);
}
