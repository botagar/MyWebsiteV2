const MAX_TRAIL = 100;

class Slime {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.speed = 1;
    this.trails = new Array(MAX_TRAIL)
  }

  update() {
    const maxSteer = 3;
    const steer = maxSteer * Math.random()
    const rad = (this.dir + steer)//*360*(Math.PI/180)
    const dx = (Math.cos(rad) * this.speed)
    const dy = (Math.sin(rad) * this.speed)
    if (this.x + dx > 400 || this.x + dx < 0) {
      this.x -= dx
      this.dir -= Math.PI / 2
    } else {
      this.x += dx
    }
    if (this.y + dy > 400 || this.y + dy < 0) {
      this.y -= dy
      this.dir -= Math.PI / 2
    } else {
      this.y += dy
    }
    this.trails.unshift({ x: this.x, y: this.y })
    if (this.trails.length > MAX_TRAIL) {
      this.trails.pop()
    }
  }

  draw() {
    const trailFadeStep = 255 / MAX_TRAIL
    this.trails.forEach((trail, i) => {
      const colorVal = 255 - (trailFadeStep * i)
      fill(color(colorVal, colorVal, colorVal));
      noStroke();
      circle(trail.x, trail.y, 1);
    })
  }
}

const slimes = []

function setup() {
  createCanvas(400, 400);
  background(0);

  for (let i = 0; i < 20; i++) {
    const slime = new Slime(
      Math.random() * 400,
      Math.random() * 400,
      Math.random() * 2 * Math.PI)
    slime.draw()
    slimes.push(slime)
  }
}

function draw() {
  background(0);
  slimes.forEach((slime) => {
    slime.update()
    slime.draw()
  })
}

