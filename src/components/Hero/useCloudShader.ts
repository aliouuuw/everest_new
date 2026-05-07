import { useCallback, useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2  u_res;

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 19.31);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i),              hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2  m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p  = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2  uv = gl_FragCoord.xy / u_res;
  float t  = u_time * 0.038;

  /* domain warp — two levels give organic cloud shapes */
  vec2 q = vec2(fbm(uv + t),
                fbm(uv + vec2(5.2, 1.3)));
  vec2 r = vec2(fbm(uv + 4.0 * q + vec2(1.7,  9.2) + 0.15  * t),
                fbm(uv + 4.0 * q + vec2(8.3,  2.8) + 0.126 * t));

  float f = fbm(uv + 4.0 * r + 0.07 * t);
  f = smoothstep(0.22, 0.78, f);

  /* brand palette: deep-night → everest green → lifted green, gold shimmer */
  vec3 c0   = vec3(0.016, 0.055, 0.052); /* #040e0d */
  vec3 c1   = vec3(0.004, 0.176, 0.165); /* #012d2a */
  vec3 c2   = vec3(0.024, 0.290, 0.267); /* ~#064a44 */
  vec3 gold = vec3(0.792, 0.580, 0.188); /* jaune-or */

  vec3 col = mix(c0, c1, f);
  col = mix(col, c2, f * f * 0.5);
  col += gold * 0.032 * smoothstep(0.64, 1.0, f);

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export function useCloudShader(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const rafRef       = useRef<number | null>(null);
  const glRef        = useRef<WebGLRenderingContext | null>(null);
  const uTimeRef     = useRef<WebGLUniformLocation | null>(null);
  const uResRef      = useRef<WebGLUniformLocation | null>(null);
  const startTimeRef = useRef<number>(0);

  const stop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!glRef.current) {
      const gl = (
        canvas.getContext('webgl') ??
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null)
      );
      if (!gl) return;
      glRef.current = gl;

      const prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER,   VERT));
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array([-1, -1,  1, -1,  -1, 1,  1, 1]),
        gl.STATIC_DRAW,
      );

      const pos = gl.getAttribLocation(prog, 'a_pos');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      uTimeRef.current = gl.getUniformLocation(prog, 'u_time');
      uResRef.current  = gl.getUniformLocation(prog, 'u_res');
    }

    startTimeRef.current = performance.now();
    const gl = glRef.current;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const w   = Math.floor(canvas.clientWidth  * dpr);
      const h   = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      const t = (performance.now() - startTimeRef.current) / 1000;
      gl.uniform1f(uTimeRef.current, t);
      gl.uniform2f(uResRef.current,  canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    render();
  }, [canvasRef]);

  useEffect(() => () => stop(), [stop]);

  return { start, stop };
}
