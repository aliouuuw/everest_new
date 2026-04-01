import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── GLSL Shaders ────────────────────────────────────────────────
// Atmospheric mountain landscape matching the hero image palette:
// Deep indigo sky → rich purple ridges → lavender mist → golden peak highlights

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uOpacity;

varying vec2 vUv;

// Hero image color palette
const vec3 COL_SKY_TOP    = vec3(0.949, 0.937, 0.953);   // #f2eff3 warm ivory
const vec3 COL_SKY_BOT    = vec3(0.878, 0.835, 0.890);   // #e0d5e3 soft lavender
const vec3 COL_RIDGE_FAR  = vec3(0.600, 0.420, 0.640);   // #996ba3 muted purple
const vec3 COL_RIDGE_MID  = vec3(0.420, 0.250, 0.470);   // #6b4078 rich purple
const vec3 COL_RIDGE_NEAR = vec3(0.260, 0.110, 0.300);   // #421c4d deep mauve
const vec3 COL_GOLD       = vec3(0.792, 0.580, 0.184);   // #ca942f gold highlights
const vec3 COL_MIST       = vec3(0.920, 0.890, 0.930);   // #ebe3ed lavender mist
const vec3 COL_SNOW       = vec3(0.960, 0.950, 0.970);   // #f5f2f8 snow white

// ── Noise ──
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p, int octaves) {
  float val = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 6; i++) {
    if (i >= octaves) break;
    val += amp * noise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return val;
}

// ── Mountain ridge function ──
// Creates a jagged ridge line at a given height
float ridge(vec2 st, float baseHeight, float scale, float seed, float sharpness) {
  float n = fbm(vec2(st.x * scale + seed + uTime * 0.008, seed), 5);
  float h = baseHeight + n * 0.35;
  return smoothstep(h, h - sharpness, st.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  vec2 stN = vec2(st.x * aspect, st.y);

  // 1. Sky gradient (warm ivory to soft lavender, bottom-heavy)
  vec3 color = mix(COL_SKY_BOT, COL_SKY_TOP, smoothstep(0.0, 1.0, st.y));

  // 2. Subtle golden glow from top-right (sun position)
  vec2 sunPos = vec2(aspect * 0.7, 0.75);
  float sunDist = distance(stN, sunPos);
  float sunGlow = exp(-sunDist * 3.0);
  color = mix(color, COL_GOLD, sunGlow * 0.08);

  // 3. Far mountain range (softest, lightest purple)
  float m1 = ridge(stN, 0.50, 1.0, 0.0, 0.015);
  vec3 c1 = mix(COL_RIDGE_FAR, COL_SNOW, 0.5); // Very faded
  // Golden rim light on peaks
  float rim1 = smoothstep(0.50 + fbm(vec2(stN.x * 1.0 + uTime * 0.008, 0.0), 5) * 0.35 - 0.015,
                           0.50 + fbm(vec2(stN.x * 1.0 + uTime * 0.008, 0.0), 5) * 0.35, st.y) * m1;
  c1 = mix(c1, COL_GOLD, rim1 * 0.3);
  color = mix(color, c1, m1 * 0.4);

  // 4. Mid mountain range (richer purple)
  float m2 = ridge(stN, 0.35, 1.6, 50.0, 0.012);
  vec3 c2 = mix(COL_RIDGE_MID, COL_MIST, 0.4);
  float rim2 = smoothstep(0.35 + fbm(vec2(stN.x * 1.6 + 50.0 + uTime * 0.008, 50.0), 5) * 0.35 - 0.012,
                           0.35 + fbm(vec2(stN.x * 1.6 + 50.0 + uTime * 0.008, 50.0), 5) * 0.35, st.y) * m2;
  c2 = mix(c2, COL_GOLD, rim2 * 0.5);
  color = mix(color, c2, m2 * 0.5);

  // 5. Near mountain range (deepest mauve, most prominent)
  float m3 = ridge(stN, 0.18, 2.2, 120.0, 0.008);
  vec3 c3 = COL_RIDGE_NEAR;
  float rim3 = smoothstep(0.18 + fbm(vec2(stN.x * 2.2 + 120.0 + uTime * 0.008, 120.0), 5) * 0.35 - 0.008,
                           0.18 + fbm(vec2(stN.x * 2.2 + 120.0 + uTime * 0.008, 120.0), 5) * 0.35, st.y) * m3;
  c3 = mix(c3, COL_GOLD, rim3 * 0.6);
  color = mix(color, c3, m3 * 0.6);

  // 6. Rolling fog/clouds at bottom
  float fogN = fbm(stN * 3.0 + vec2(uTime * 0.02, uTime * 0.005), 4);
  float fogMask = smoothstep(0.35, 0.0, st.y);
  color = mix(color, COL_MIST, fogN * fogMask * 0.5);

  // 7. Subtle film grain
  float grain = hash(stN * 500.0 + uTime * 0.5);
  color += (grain - 0.5) * 0.025;

  // Output with opacity control
  gl_FragColor = vec4(color, uOpacity);
}
`;

// ─── R3F Scene Components ────────────────────────────────────────

const MountainShader: React.FC<{ opacity: number }> = ({ opacity }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uOpacity: { value: opacity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
      materialRef.current.uniforms.uOpacity.value = opacity;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
};

// ─── Exported Component ──────────────────────────────────────────

interface ValuePropsBackgroundProps {
  opacity?: number;
  className?: string;
}

export const ValuePropsBackground: React.FC<ValuePropsBackgroundProps> = ({
  opacity = 0.18,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only mount the Canvas when the section is near the viewport (perf)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ pointerEvents: 'none' }}
    >
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 1] }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: 'low-power',
          }}
          dpr={[1, 1.5]}
          style={{ pointerEvents: 'none' }}
        >
          <MountainShader opacity={opacity} />
        </Canvas>
      )}
    </div>
  );
};
