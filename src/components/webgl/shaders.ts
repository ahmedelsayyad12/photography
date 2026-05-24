export const imageVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const imageFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform sampler2D uTextureNext;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uDistortion;
  uniform float uTransition;
  uniform float uRgbShift;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 m = (uMouse - 0.5) * 2.0;
    float wave = sin(uv.y * 12.0 + uTime * 0.8) * uDistortion * 0.015;
    uv.x += wave + m.x * uDistortion * 0.04;
    uv.y += m.y * uDistortion * 0.03;

    vec4 current = texture2D(uTexture, uv);
    vec2 uvNext = uv + vec2(uTransition * 0.08, uTransition * 0.02);
    vec4 next = texture2D(uTextureNext, uvNext);
    vec4 color = mix(current, next, smoothstep(0.0, 1.0, uTransition));

    float shift = uRgbShift * 0.003;
    color.r = mix(color.r, texture2D(uTexture, uv + vec2(shift, 0.0)).r, uDistortion);
    color.b = mix(color.b, texture2D(uTexture, uv - vec2(shift, 0.0)).b, uDistortion);

    gl_FragColor = color;
  }
`;
