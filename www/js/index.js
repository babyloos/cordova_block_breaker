let bar, ball, blocks;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // create bar
  bar = new Bar();
  ball = new Ball();
  // create blocks
  blocks = new Array();
  for (var i=0; i<3; i++) {
    for (var j=0; j<5; j++) {
      const block = new Block(j, i);
      blocks.push(block);
    }
  }
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
  for (var i=0; i<blocks.length; i++) {
    ball.reflectionBlock(blocks[i]);
  }
  
  // draw bar
  fill(color('#FF0000'));
  rect(bar.x, bar.y, bar.width, bar.height);

  // draw ball
  fill(color('#0000FF'));
  ellipse(ball.x, ball.y, ball.width, ball.height);

  // draw blocks
  fill(color('#00FF00'));
  for (var i=0; i<blocks.length; i++) {
    const block = blocks[i];
    if (!block.isEnable) {
      continue;
    }
    rect(block.x, block.y, block.width, block.height);
  }
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
    if (this.x > bar.x && this.x < bar.x + bar.width && this.y > bar.y && this.y < bar.y + bar.height) {
      this.vy *= -1;
    }
  }

  reflectionBlock(block) {
    if (!block.isEnable) {
      return;
    }

    if (this.x > block.x && this.x < block.x + block.width && this.y > block.y && this.y < block.y + block.height) {
      this.vx *= -1;
      this.vy *= -1;
      block.isEnable = false;
    }
  }
}

class Block {
  isEnable = true;
  width = 70;
  height = 30;
  x = 0;
  y = 0;
  offsetX = 40;
  offsetY = 50;

  constructor(column, row) {
    this.x = column * this.width + this.offsetX;
    this.y = row * this.height + this.offsetY;
  }
}
