import * as p5 from 'p5'

const MAX_TRAIL = 100;
const MAX_SLIMES = 200;
const MAX_WIDTH = 400;
const MAX_HEIGHT = 400;
const MAX_STEER = 0.3;
const MAX_RANDOM_STEER = 0.1;
const MAX_SENSOR_ARC = 90*(Math.PI/180);
const MAX_SENSOR_RANGE = 8;

class SlimeTrail {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

class Slime {
  x: number
  y: number
  heading: number
  speed: number
  trails: Array<SlimeTrail>
  sensory_samples: Array<number>

  constructor(x: number, y: number, heading: number) {
    this.x = x;
    this.y = y;
    this.heading = heading;
    this.speed = 1.5;
    this.trails = new Array(MAX_TRAIL)
    this.sensory_samples = new Array(3)
  }

  _move() {
    const maxSteer = 2;
    let [left, center, right] = this.sensory_samples
    let steer = 0
    if (left < center && right < center) {
        // Center trail is strong than anything left and right
        steer = 0
    } else if (left > center && right > center) {
        // Trails to the left and right, but not infront
        if (Math.random() <= 0.5) {
            // Go Left
            steer = -MAX_STEER
        } else {
            // Go Right
            steer = MAX_STEER
        }
    } else if (left < right) {
        steer = MAX_STEER + (Math.random() * MAX_RANDOM_STEER)
    } else if (left > right) {
        steer = -MAX_STEER - (Math.random() * MAX_RANDOM_STEER)
    } else {
        steer = 0
    }

    this.heading += steer
    const dx = (Math.cos(this.heading) * this.speed)
    const dy = (Math.sin(this.heading) * this.speed)

    if (this.x + dx > MAX_WIDTH || this.x + dx < 0) {
      this.x -= dx
      this.heading -= Math.PI / 2
    } else {
      this.x += dx
    }
    if (this.y + dy > MAX_HEIGHT || this.y + dy < 0) {
      this.y -= dy
      this.heading -= Math.PI / 2
    } else {
      this.y += dy
    }
    this.trails.unshift({ x: this.x, y: this.y })
    if (this.trails.length > MAX_TRAIL) {
      this.trails.pop()
    }
  }

  _preprocess_state() {
    this.heading = this._clamp_radians(this.heading)
  }

  _clamp_radians(radian: number) {
    let clamped = radian > (Math.PI*2) ? radian - (Math.PI*2) : radian
    clamped = clamped < 0 ? clamped + (Math.PI*2) : clamped
    return clamped
  }

  _sense(p: p5) {
    let forward_sense = this._sample_ahead_at_angle(p, this.heading)
    let left_sense = this._sample_ahead_at_angle(p, this.heading - (MAX_SENSOR_ARC/2))
    let right_sense = this._sample_ahead_at_angle(p, this.heading + (MAX_SENSOR_ARC/2))
    this.sensory_samples = [left_sense, forward_sense, right_sense]
  }

  _sample_ahead_at_angle(p: p5, angle: number) {
    let operator: Function = (a,b) => a+b
    operator = angle >= 0 && angle <= Math.PI ? (a,b) => a+b : (a,b) => a+b
    let sensed_x = Math.floor(operator(this.x, MAX_SENSOR_RANGE*Math.cos(angle)))
    operator = angle <= (3*Math.PI)/2 && angle >= Math.PI/2 ? (a,b) => a+b : (a,b) => a+b
    let sensed_y = Math.floor(operator(this.y, MAX_SENSOR_RANGE*Math.sin(angle)))
    let sensed_value = p.get(sensed_x, sensed_y)

    return sensed_value.reduce((a, b) => a + b) / sensed_value.length
  }

  update(p: p5) {
    this._preprocess_state()
    this._move()
    this._sense(p)
  }

  draw(p: p5) {
    const trailFadeStep = (255 - 23) / MAX_TRAIL
    this.trails.forEach((trail, i) => {
        const colorVal = 255 - (trailFadeStep * i)
        p.fill(p.color(colorVal, colorVal, colorVal));
        p.noStroke();
        p.circle(trail.x, trail.y, 2);
    })
  }
}


const sketch = (p: p5) => {
  const slimes = []

  p.setup = () => {
    p.createCanvas(MAX_WIDTH, MAX_HEIGHT);
    p.background(0);
  
    for (let i = 0; i < MAX_SLIMES; i++) {
      const slime = new Slime(
        Math.random() * MAX_WIDTH,
        Math.random() * MAX_HEIGHT,
        Math.random() * 2 * Math.PI)
      slime.draw(p)
      slimes.push(slime)
    }
  }

  p.draw = () => {
    p.background(p.color(23,23,23));
    slimes.forEach((slime) => {
      slime.update(p)
      slime.draw(p)
    })
  }
}

export { sketch }