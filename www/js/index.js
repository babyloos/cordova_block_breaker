let bar, ball;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // create bar
  bar = new Bar();
  ball = new Ball();
}

function draw() {
  // clear screen
  background('#000000');
  // move bar
  bar.x = mouseX - bar.width / 2;
  if (bar.x < 0) {
    bar.x = 0;
  } else if (bar.x + bar.width > windowWidth) {
    bar.x = windowWidth - bar.width;
  }

  // move ball
  ball.move();
  ball.reflectionBar(bar);
  
  // draw bar
  fill(color('#FF0000'));
  rect(bar.x, bar.y, bar.width, bar.height);

  // draw ball
  fill(color('#0000FF'));
  ellipse(ball.x, ball.y, ball.width, ball.height);
}

class Bar {
  width = 150;
  height = 30;
  x = windowWidth / 2 - this.width / 2;
  y = windowHeight - windowHeight / 6;
}

class Ball {
  width = 25;
  height = 25;
  x = windowWidth / 2 - this.width / 2;
  y = windowHeight / 2 - this.height / 2;
  vx = 5;
  vy = 5;

  move() {
    this.x += this.vx;
    this.y += this.vy;

    // wall reflection
    if (this.x < 0 || this.x > windowWidth) {
      this.vx *= -1;
    }
    if (this.y < 0 || this.y > windowHeight) {
      this.vy *= -1;
    }
  }

  reflectionBar(bar) {
    if (this.x > bar.x && this.x + this.width < bar.x + bar.width &&
        this.y > bar.y && this.y + this.height < bar.y + bar.height) {
      this.vx *= -1;
      this.vy *= -1;
    }
  }
}
