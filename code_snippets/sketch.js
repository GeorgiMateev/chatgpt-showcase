let horseX = 0;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(255);
  drawHorse(horseX, height / 2);
  animateHorse();
}

function drawHorse(x, y) {
  fill(150, 75, 0);
  noStroke();

  // Body
  ellipse(x, y, 100, 50);

  // Head
  ellipse(x + 60, y - 30, 40, 20);

  // Legs
  rect(x - 30, y + 25, 10, 40);
  rect(x + 10, y + 25, 10, 40);
  rect(x - 10, y + 25, 10, 40);
  rect(x + 30, y + 25, 10, 40);
}

function animateHorse() {
  horseX += 2;
  if (horseX > width) {
    horseX = -100;
  }
}
