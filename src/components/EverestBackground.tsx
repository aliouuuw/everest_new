import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, MathUtils } from 'three';
import * as THREE from 'three';

// =============================================================================
// GLSL SHADERS — Liquid gradient terrain with glossy reflections
// =============================================================================

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uIntensity;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  //
  // Simplex 2D noise
  //
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187,
      0.366025403784439,
     -0.577350269189626,
      0.024390243902439
    );
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x_) - 0.5;
    vec3 ox = floor(x_ + 0.5);
    vec3 a0 = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Soft, majestic mountain displacement
  float getElevation(vec2 pos, float t) {
    // We want a single cohesive mountain range.
    // 1) Base massive sweeping mountain shape using low frequency noise
    float baseShape = snoise(pos * 0.04) * 8.0;
    
    // 2) A long diagonal ridge line to act as the primary summit
    // Instead of a repeating sine wave, we use a single soft ridge
    float ridgeDist = abs(pos.x + pos.y * 0.5 - 2.0);
    float ridge = 4.0 * exp(-ridgeDist * ridgeDist * 0.08);
    
    // 3) Flowing valleys and slopes (medium frequency, slow moving)
    float valleys = snoise(pos * 0.12 - t * 0.08) * 2.5;
    
    // 4) Subtle terrain texture (no sharp jaggedness)
    float texture = snoise(pos * 0.3 + t * 0.1) * 0.4;

    // Combine for a landscape with distinct peaks and sweeping valleys
    float elevation = baseShape + ridge + valleys + texture;
    
    // Smooth the base so it flattens out into a valley floor
    return smoothstep(-6.0, 10.0, elevation) * 12.0 * uIntensity - 4.0;
  }

  void main() {
    vUv = uv;

    vec3 pos = position;
    // Slow down time for a majestic, massive scale feel
    float t = uTime * uSpeed * 0.15; 

    // Get current elevation
    float elevation = getElevation(pos.xy, t);
    pos.z += elevation;

    vElevation = elevation;
    vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;

    // --- Compute Analytical Normals ---
    // Sample neighboring points to calculate smooth normal
    float offset = 0.2; // wider offset for smoother normals on a huge terrain
    vec3 posU = position + vec3(offset, 0.0, 0.0);
    vec3 posV = position + vec3(0.0, offset, 0.0);
    
    posU.z += getElevation(posU.xy, t);
    posV.z += getElevation(posV.xy, t);
    
    // Calculate tangent vectors and cross product for normal
    vec3 tangentX = normalize(posU - pos);
    vec3 tangentY = normalize(posV - pos);
    
    // Store varying normal (transform to world space)
    vNormal = normalize(normalMatrix * cross(tangentX, tangentY));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec3 uColor1; // Deep anchor (Dark Mauve)
  uniform vec3 uColor2; // Mid Mountain (Mauve)
  uniform vec3 uColor3; // Atmospheric depth (Pale mauve-gray/Ivory)
  uniform vec3 uColor4; // Warm accent (Champagne gold)
  uniform vec3 uCameraPos;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    // Normalize and flip normal if necessary depending on view
    vec3 N = normalize(vNormal);
    vec3 V = normalize(uCameraPos - vWorldPos);

    if (!gl_FrontFacing) {
      N = -N;
    }

    // ─── Elevation-based Color Mapping ───
    // Map colors based on elevation (peaks vs valleys) and normal orientation
    // Higher peaks get warmer/lighter, deep valleys stay deep mauve
    float heightMix = smoothstep(-2.0, 8.0, vElevation);
    float angleMix = dot(N, vec3(0.0, 0.0, 1.0)) * 0.5 + 0.5;
    
    // Combine height and angle for a fluid gradient flow
    float colorParam = heightMix * 0.8 + angleMix * 0.2;

    // Smooth spline interpolation for Granient colors (Ivory, Mauve, Gold)
    vec3 color = uColor1; // Deep mauve base in valleys
    color = mix(color, uColor2, smoothstep(0.15, 0.45, colorParam)); // Mid mauve
    color = mix(color, uColor3, smoothstep(0.4, 0.75, colorParam)); // Pale mauve/ivory transition
    color = mix(color, uColor4, smoothstep(0.7, 1.0, colorParam)); // Peak highlights (Gold)

    // ─── Lighting & Matte/Satin Reflections ───
    // Primary light (warm, coming from above/right, like a gentle sun glow)
    vec3 lightDir1 = normalize(vec3(1.0, 1.5, 2.0));
    vec3 H1 = normalize(lightDir1 + V);
    float diff1 = max(dot(N, lightDir1), 0.0);
    
    // Softer, wider specular for a matte/satin mountain terrain look (NOT wet/glue)
    float spec1 = pow(max(dot(N, H1), 0.0), 12.0) * 0.25;

    // Secondary light (cool ambient fill from the left)
    vec3 lightDir2 = normalize(vec3(-1.0, -0.5, 1.0));
    vec3 H2 = normalize(lightDir2 + V);
    float diff2 = max(dot(N, lightDir2), 0.0);
    float spec2 = pow(max(dot(N, H2), 0.0), 8.0) * 0.15;

    // Fresnel rim light (pronounced champagne gold along the edges as per PRD)
    float fresnel = pow(1.0 - max(dot(N, V), 0.0), 3.0) * 0.5;

    // Combine diffuse lighting
    // High ambient light to maintain the light, airy atmosphere of the PRD
    vec3 ambient = color * 0.6; 
    vec3 diffuse = color * (diff1 * 0.3 + diff2 * 0.2);
    
    // Specular highlights (soft warm for primary)
    vec3 specular = vec3(1.0, 0.95, 0.9) * spec1 + vec3(0.9, 0.9, 1.0) * spec2;
    
    // Fresnel glow (Champagne gold rim)
    vec3 fresnelGlow = uColor4 * fresnel;

    vec3 finalColor = ambient + diffuse + specular + fresnelGlow;

    // ─── Post-processing ───
    
    // Depth of Field Blur Simulation (darken/soften areas far from center)
    float focalDist = length(vUv - vec2(0.5, 0.4));
    float dofMix = smoothstep(0.3, 0.9, focalDist);
    vec3 blurColor = mix(finalColor, uColor3, 0.5); // fade into ivory/pale mauve
    finalColor = mix(finalColor, blurColor, dofMix);

    // Subtle vignette
    float vignette = 1.0 - smoothstep(0.5, 1.5, length(vUv - 0.5));
    finalColor *= mix(0.9, 1.0, vignette);

    // HDR tone mapping approximation
    finalColor = finalColor / (finalColor + vec3(1.0));
    // Gamma correction
    finalColor = pow(finalColor, vec3(1.0 / 2.2));

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// --- COMPONENT ---

interface ThemeColors {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  background: string;
}

// Light theme aligned exactly with PRD: Strategic Summit (Ivory, Mauve, Champagne Gold)
const defaultTheme: ThemeColors = {
  background: '#Fbfafc', // Ivory white background
  color1: '#3A1440', // Deep anchor (Dark Mauve)
  color2: '#68456f', // Mid Mountain (Mauve)
  color3: '#e6dfe8', // Atmospheric depth (Pale mauve-gray/Ivory)
  color4: '#ca942f', // Warm accent (Champagne gold)
};

// Alternative themes
export const themes = {
  lightSummit: defaultTheme,
  sunsetPeak: {
    background: '#0a0a14',
    color1: '#0a0a14',
    color2: '#c91461',
    color3: '#ff5e4d',
    color4: '#1bc2b8',
  },
  neonSummit: {
    background: '#141E30',
    color1: '#141E30',
    color2: '#243B55',
    color3: '#E55D87',
    color4: '#5FC3E4',
  }
};

interface TerrainProps {
  intensity: number;
  speed: number;
  theme: ThemeColors;
}

// Camera position constant — shared between Canvas and uniforms
const CAMERA_POS = new THREE.Vector3(0, 1.5, 4);

const Terrain = ({ intensity, speed, theme }: TerrainProps) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Smooth mouse tracking
  const pointer = useRef({ x: 0, y: 0 });
  const targetPointer = useRef({ x: 0, y: 0 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uIntensity: { value: intensity },
      uColor1: { value: new Color(theme.color1) },
      uColor2: { value: new Color(theme.color2) },
      uColor3: { value: new Color(theme.color3) },
      uColor4: { value: new Color(theme.color4) },
      uCameraPos: { value: CAMERA_POS.clone() },
    }),
    [theme, speed, intensity]
  );

  // Update uniforms when props change
  useMemo(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uSpeed.value = speed;
      materialRef.current.uniforms.uIntensity.value = intensity;
      materialRef.current.uniforms.uColor1.value.set(theme.color1);
      materialRef.current.uniforms.uColor2.value.set(theme.color2);
      materialRef.current.uniforms.uColor3.value.set(theme.color3);
      materialRef.current.uniforms.uColor4.value.set(theme.color4);
    }
  }, [theme, speed, intensity]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // Keep camera position uniform in sync
      materialRef.current.uniforms.uCameraPos.value.copy(state.camera.position);
    }

    // Subtle mouse parallax + organic drift
    if (meshRef.current) {
      targetPointer.current.x = state.pointer.x * 0.08;
      targetPointer.current.y = state.pointer.y * 0.05;

      pointer.current.x = MathUtils.lerp(pointer.current.x, targetPointer.current.x, 0.03);
      pointer.current.y = MathUtils.lerp(pointer.current.y, targetPointer.current.y, 0.03);

      const driftX = Math.sin(state.clock.elapsedTime * 0.15) * 0.015;
      const driftY = Math.cos(state.clock.elapsedTime * 0.12) * 0.01;

      // Adjusted rotation to look at the mountain landscape
      meshRef.current.rotation.x = -Math.PI / 2 + 0.4 + pointer.current.y + driftY;
      meshRef.current.rotation.z = pointer.current.x + driftX;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2 + 0.4, 0, 0]}
      position={[0, -2.5, -2]}
    >
      <planeGeometry args={[40, 40, 300, 300]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export interface EverestBackgroundProps {
  intensity?: number;
  speed?: number;
  colorTheme?: 'lightSummit' | 'sunsetPeak' | 'neonSummit' | ThemeColors;
  className?: string;
}

export default function EverestBackground({
  intensity = 1.2,
  speed = 0.5,
  colorTheme = 'lightSummit',
  className = '',
}: EverestBackgroundProps) {
  
  const theme = typeof colorTheme === 'string' ? themes[colorTheme] : colorTheme;

  return (
    <div 
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      style={{ zIndex: 0, backgroundColor: theme.background }}
    >
      <Canvas
        camera={{
          position: [CAMERA_POS.x, CAMERA_POS.y, CAMERA_POS.z],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <Terrain intensity={intensity} speed={speed} theme={theme} />
        <color attach="background" args={[theme.background]} />
      </Canvas>
      
      {/* Optional: Add a subtle overlay for extra grain/noise to make it feel more organic */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\"0 0 200 200\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cfilter id=\\"noiseFilter\\"%3E%3CfeTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.65\\" numOctaves=\\"3\\" stitchTiles=\\"stitch\\"%3E%3C/feTurbulence%3E%3C/filter%3E%3Crect width=\\"100%25\\" height=\\"100%25\\" filter=\\"url(%23noiseFilter)\\"%3E%3C/rect%3E%3C/svg%3E")',
        }}
      />
    </div>
  );
}
