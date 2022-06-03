precision mediump float;
#define PHI 1.61803398874989484820459 // Φ = Golden Ratio   

varying vec2 vTexCoord;

uniform float time;
uniform int num_agents;

struct Agent {
	vec2 position;
	float angle;
};

struct AgentConfig {
  float moveSpeed;
	float turnRate;

	float sensorAngleDegrees;
	float sensorOffsetDst;
	int sensorSize;
	vec4 colour;
};

float gold_noise(vec2 xy, float seed){
  return fract(tan(distance(xy*PHI, xy)*seed)*xy.x);
}

int numAgents;

float rand(vec2 co)
{
    highp float a = 12.9898;
    highp float b = 78.233;
    highp float c = 43758.5453;
    highp float dt= dot(co.xy ,vec2(a,b));
    highp float sn= mod(dt,3.14);
    return fract(sin(sn) * c);
}

void main() {
  vec2 coord = vTexCoord; // -1:x:1 -1:y:1
  
  float seed = time;
  vec4 coordVal = vec4(rand(coord + vec2(seed*1.0, seed+1.0)),rand(coord + vec2(seed*2.0, seed+2.0)),rand(coord + vec2(seed*3.0, seed+3.0)), 1.0);

  gl_FragColor = coordVal;
}