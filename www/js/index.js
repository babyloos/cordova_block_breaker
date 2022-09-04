let bar;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // create bar
  bar = new Bar();
}

function draw() {
  // clear screen
  background('#000000');
  // draw bar
  fill(color('#FF0000'));
  rect(bar.x, bar.y, bar.width, bar.height);
  // move bar
  bar.x = mouseX - bar.width / 2;
  if (bar.x < 0) {
    bar.x = 0;
  } else if (bar.x + bar.width > windowWidth) {
    bar.x = windowWidth - bar.width;
  }
}

class Bar {
  width = 150;
  height = 30;
  x = windowWidth / 2 - this.width / 2;
  y = windowHeight - windowHeight / 6;
}
