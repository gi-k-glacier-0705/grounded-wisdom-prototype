uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;

varying vec2 vUv;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

float warpedNoise(vec2 p, float t) {
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t * 0.04),
    fbm(p + vec2(5.2, 1.3) + t * 0.03)
  );
  vec2 r = vec2(
    fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.05),
    fbm(p + 4.0 * q + vec2(8.3, 2.8) + t * 0.02)
  );
  return fbm(p + 4.0 * r);
}

float fogField(vec2 p, float t) {
  float d = 0.0;
  d += warpedNoise(p * 0.8 + vec2(10.0, 20.0), t * 0.6) * 0.25;
  d += warpedNoise(p * 1.5 + vec2(30.0, 40.0), t * 0.8) * 0.15;
  d += vnoise(p * 2.5 + t * 0.05) * 0.08;
  return d;
}

float softTendrils(vec2 p, float t) {
  vec2 q = vec2(0.0);
  q.x = fbm(p + vec2(0.0, 0.0) + t * 0.02);
  q.y = fbm(p + vec2(5.2, 1.3) + t * 0.03);
  return fbm(p + 3.0 * q);
}

void main() {
  vec2 uv = vUv;
  vec2 p = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);
  float t = u_time * 0.15;

  float mouseDist = length(u_mouse - uv);
  float mouseInfluence = smoothstep(0.5, 0.0, mouseDist) * 0.3;
  float mouseWarp = smoothstep(0.6, 0.0, mouseDist);

  float angle = mouseWarp * 0.5;
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  p = rot * p;
  p += (u_mouse - 0.5) * mouseInfluence;

  float field = fogField(p, t);
  float tendrils = softTendrils(p * 1.2 + vec2(50.0), t * 0.7);
  float combined = field * 0.6 + tendrils * 0.4;

  vec3 col1 = mix(u_color1, u_color2, smoothstep(0.2, 0.5, combined));
  vec3 col2 = mix(col1, u_color3, smoothstep(0.5, 0.8, combined));
  vec3 col3 = mix(col2, vec3(1.0, 0.98, 0.95), smoothstep(0.8, 1.0, combined));

  float breathing = sin(t * 2.0) * 0.05 + 1.0;
  vec3 color = col3 * breathing;

  float bright = smoothstep(0.6, 1.0, combined) * 0.3;
  color += vec3(bright);

  float vig = 1.0 - smoothstep(0.3, 1.2, length(uv - 0.5) * 1.5);
  color *= 0.7 + vig * 0.3;

  gl_FragColor = vec4(color, 1.0);
}
