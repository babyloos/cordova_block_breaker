let bar, balls, blocks;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // create bar
  bar = new Bar();
  const ball = new Ball();
  balls = new Array();
  balls.push(ball);

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

  const hitItemBlockCallback = function(x, y) {
    const ball = new Ball();
    ball.x = x;
    ball.y = y;
    balls.push(ball);
  };

  // move balls
  for (var i=0; i<balls.length; i++) {
    const ball = balls[i];
    ball.move();
    ball.reflectionBar(bar);
      for (var j=0; j<blocks.length; j++) {
        ball.reflectionBlock(blocks[j], hitItemBlockCallback);
      }
  }
  
  // draw bar
  fill(color('#FF0000'));
  rect(bar.x, bar.y, bar.width, bar.height);

  // draw balls
  for (var i=0; i<balls.length; i++) {
    const ball = balls[i];
    fill(ball.color);
    ellipse(ball.x, ball.y, ball.width, ball.height);
  }

  // draw blocks
  for (var i=0; i<blocks.length; i++) {
    const block = blocks[i];
    if (!block.isEnable) {
      continue;
    }
    fill(block.color);
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
  color;

  constructor() {
    this.color = color(randomInt(100, 255), randomInt(100, 255), randomInt(100, 255));
  }

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

  reflectionBlock(block, hitItemCallBack) {
    if (!block.isEnable) {
      return;
    }

    if (this.x > block.x && this.x < block.x + block.width && this.y > block.y && this.y < block.y + block.height) {
      this.vx *= -1;
      this.vy *= -1;
      block.isEnable = false;
      if (block.isItemBlock) {
        hitItemCallBack(this.x, this.y);
      }
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
  color = color(0, 255, 0);
  isItemBlock = false;

  constructor(column, row) {
    this.x = column * this.width + this.offsetX;
    this.y = row * this.height + this.offsetY;
    if (randomInt(0, 1) === 0) {
      console.log('isItemBlock');
      this.isItemBlock = true;
      this.color = color(255, 0, 0);
    }
  }
}

function randomInt(min, max) {
  return Math.floor(random() * (max + 1 - min)) + min; 
}
