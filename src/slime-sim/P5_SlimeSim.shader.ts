import * as p5 from 'p5'
import frag from './shaders/slimeSim.frag'
import vert from './shaders/slimeSim.vert'

const sketch = (p: p5) => {
    let slimeSimeShader: p5.Shader

    p.preload = () => {
        slimeSimeShader = p.loadShader(vert, frag);
    }

    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        p.noStroke();
    }
  
    p.draw = () => {
        p.shader(slimeSimeShader);
        slimeSimeShader.setUniform('time', p.frameCount * 0.01)

        p.rect(0,0,p.windowWidth, p.windowHeight);
    }

    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight)
    }
  }
  
  export { sketch }