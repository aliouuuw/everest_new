import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // We use a full-screen quad, so we bypass modelViewMatrix and projectionMatrix
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColorMauve;
uniform vec3 uColorDarkMauve;
uniform vec3 uColorGold;
uniform vec3 uColorLight;

varying vec2 vUv;

// --- Noise Functions ---
float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f*f*(3.0-2.0*f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

#define OCTAVES 5
float fbm (in vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// Domain warping for more fluid, less rigid noise
float warpedFbm(in vec2 st) {
    vec2 q = vec2(fbm(st), fbm(st + vec2(5.2, 1.3)));
    vec2 r = vec2(fbm(st + 4.0 * q + vec2(1.7, 9.2)), fbm(st + 4.0 * q + vec2(8.3, 2.8)));
    return fbm(st + 4.0 * r);
}

void main() {
    // Normalize coordinates
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    
    // Fix aspect ratio for noise to avoid stretching
    vec2 stNoise = st;
    stNoise.x *= uResolution.x / uResolution.y;

    // 1. Base Sky Atmosphere (Light)
    vec3 skyColor = mix(uColorLight, vec3(0.96, 0.95, 0.97), st.y);
    vec3 color = skyColor;

    // 2. Sun / Ambient Gold Glow
    vec2 sunPos = vec2(uResolution.x/uResolution.y * 0.65, 0.5);
    float sunDist = distance(stNoise, sunPos);
    float sunGlow = exp(-sunDist * 2.0);
    color = mix(color, uColorGold, sunGlow * 0.15); // Subtle gold glow

    // 3. Abstract Mountain Layers
    // We create mountain ridges using absolute noise for sharper peaks
    
    // Back Mountain
    float m1Base = stNoise.x * 1.2 + uTime * 0.01;
    float m1Noise = fbm(vec2(m1Base, 0.0)) * 0.5 + 0.5; 
    float h1 = 0.5 + m1Noise * 0.35;
    float m1Mask = smoothstep(h1, h1 - 0.005, st.y);
    vec3 c1 = mix(skyColor, uColorMauve, 0.25);
    color = mix(color, c1, m1Mask);

    // Mid Mountain
    float m2Base = stNoise.x * 1.8 + uTime * 0.015 + 100.0;
    float m2Noise = fbm(vec2(m2Base, 1.0)) * 0.5 + 0.5;
    float h2 = 0.3 + m2Noise * 0.3;
    float m2Mask = smoothstep(h2, h2 - 0.005, st.y);
    vec3 c2 = mix(uColorMauve, uColorDarkMauve, 0.3);
    c2 = mix(c2, uColorLight, st.y * 0.4); // Fade down
    color = mix(color, c2, m2Mask);

    // Front Mountain Ridge
    float m3Base = stNoise.x * 2.5 + uTime * 0.02 + 200.0;
    float m3Noise = fbm(vec2(m3Base, 2.0)) * 0.5 + 0.5;
    float h3 = 0.15 + m3Noise * 0.25;
    float m3Mask = smoothstep(h3, h3 - 0.005, st.y);
    vec3 c3 = uColorDarkMauve;
    
    // Golden rim light
    float rim = smoothstep(h3 - 0.02, h3, st.y) * m3Mask;
    c3 = mix(c3, uColorGold, rim * 0.8);
    color = mix(color, c3, m3Mask);

    // 4. Foreground Fog / Clouds (Fluid rolling)
    float fogNoise = warpedFbm(stNoise * 2.0 + vec2(uTime * 0.03, uTime * 0.01));
    float fogMask = smoothstep(0.4, 0.0, st.y);
    vec3 fogColor = mix(uColorLight, vec3(1.0), 0.5); // Very bright mist
    color = mix(color, fogColor, fogNoise * fogMask * 0.6);

    // 5. Pronounced Grain / Noise (Granient Aesthetic)
    float grain = random(stNoise + uTime * 0.1);
    vec3 grainColor = mix(vec3(grain), uColorMauve, 0.15);
    color += (grainColor - 0.5) * 0.09;

    gl_FragColor = vec4(color, 1.0);
}
`;

const BackgroundShaderMaterial = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uColorMauve: { value: new THREE.Color('#8A5A94') },
      uColorDarkMauve: { value: new THREE.Color('#3A1440') },
      uColorGold: { value: new THREE.Color('#CA942F') },
      uColorLight: { value: new THREE.Color('#Fbfafc') },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    }
  });

  return (
    <mesh>
      {/* Full screen quad. Scale is 2,2 because NDC goes from -1 to 1 (width 2, height 2) */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

export const AtmosphericMountainWebGL: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 2]} // Cap DPR at 2 for performance
      >
        <BackgroundShaderMaterial />
      </Canvas>
    </div>
  );
};
