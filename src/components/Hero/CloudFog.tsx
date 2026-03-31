import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Volumetric fog shader ───
const fogVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fogFragmentShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uResolution;
  uniform vec3 uColorLight;
  uniform vec3 uColorDark;
  
  varying vec2 vUv;
  
  // Simplex-style noise for organic cloud shapes
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  // Fractal Brownian Motion for layered cloud detail
  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  void main() {
    vec2 uv = vUv;
    
    // Aspect ratio correction
    float aspect = uResolution.x / uResolution.y;
    vec2 uvCorrected = vec2(uv.x * aspect, uv.y);
    
    // Time-based drift (slow, organic movement)
    float time = uTime * 0.08;
    
    // Create layered fog with different scales and speeds
    vec3 pos1 = vec3(uvCorrected * 2.0, time * 0.5);
    vec3 pos2 = vec3(uvCorrected * 4.0 + 10.0, time * 0.7);
    vec3 pos3 = vec3(uvCorrected * 1.0 + 5.0, time * 0.3);
    
    float noise1 = fbm(pos1) * 0.6;
    float noise2 = fbm(pos2) * 0.3;
    float noise3 = fbm(pos3) * 0.4;
    
    float cloudNoise = noise1 + noise2 + noise3;
    
    // Vertical gradient — fog concentrated at bottom, fading up
    float verticalFade = 1.0 - smoothstep(0.0, 0.7, uv.y);
    
    // Horizontal variation — thicker in middle, thinner at edges
    float horizontalShape = 1.0 - pow(abs(uv.x - 0.5) * 2.0, 2.0) * 0.4;
    
    // Combine noise with gradients
    float fogDensity = (cloudNoise * 0.5 + 0.5) * verticalFade * horizontalShape;
    
    // Clamp and smooth
    fogDensity = smoothstep(0.1, 0.9, fogDensity);
    fogDensity = clamp(fogDensity, 0.0, 1.0);
    
    // Color gradient — lighter at top of fog, slightly darker at base
    vec3 fogColor = mix(uColorDark, uColorLight, uv.y * 0.5 + cloudNoise * 0.2);
    
    // Fade fog out as scroll progresses — smooth disappearance
    float scrollFade = 1.0 - smoothstep(0.0, 0.5, uScrollProgress);
    
    // Final output with alpha
    float alpha = fogDensity * 0.85 * scrollFade;
    
    gl_FragColor = vec4(fogColor, alpha);
  }
`;

interface FogPlaneProps {
  scrollProgress: number;
}

function FogPlane({ scrollProgress }: FogPlaneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
    uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    uColorLight: { value: new THREE.Color('#ffffff') },
    uColorDark: { value: new THREE.Color('#e8e4df') },
  }), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uScrollProgress.value = scrollProgress;
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={fogVertexShader}
        fragmentShader={fogFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

interface CloudFogProps {
  scrollProgress?: number;
  className?: string;
}

export function CloudFog({ scrollProgress = 0, className = '' }: CloudFogProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 50 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <FogPlane scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
