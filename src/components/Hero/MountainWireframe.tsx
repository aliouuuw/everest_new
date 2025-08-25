import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';

interface MountainWireframeProps {
  className?: string;
  color?: THREE.ColorRepresentation;
  opacity?: number;
  elevationScale?: number;
  noiseScale?: number;
  rotateSpeed?: number;
  parallaxStrength?: number;
}

export const MountainWireframe: React.FC<MountainWireframeProps> = ({
  className = '',
  color = 0xffffff,
  opacity = 0.6,
  elevationScale = 1.0,
  noiseScale = 0.06,
  rotateSpeed = 0.0015,
  parallaxStrength = 0.08,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mountainRef = useRef<THREE.Group | null>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null; // Transparent background

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    camera.position.set(0, 10, 30);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    rendererRef.current = renderer;
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent

    // Create mountain group
    const mountainGroup = new THREE.Group();
    mountainRef.current = mountainGroup;
    scene.add(mountainGroup);

    // Create a single mountain surface using coherent noise with radial falloff (monochrome wireframe)
    const createMountainMesh = (
      width: number,
      height: number,
      segments: number
    ) => {
      const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
      const vertices = geometry.attributes.position.array as Float32Array;

      const noise = new ImprovedNoise();
      const seed = Math.random() * 1000;
      const spatialFrequency = noiseScale; // spatial frequency

      // Radial falloff centered at (0,0)
      const maxDist = Math.max(width, height) * 0.5;

      const fbm = (x: number, y: number) => {
        let value = 0;
        let amplitude = 1;
        let frequency = 1;
        let amplitudeSum = 0;
        for (let octave = 0; octave < 5; octave++) {
          const n = noise.noise(x * frequency, y * frequency, seed);
          value += n * amplitude;
          amplitudeSum += amplitude;
          amplitude *= 0.5;
          frequency *= 2;
        }
        return value / amplitudeSum; // normalize
      };

      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];

        const nx = x * spatialFrequency;
        const ny = y * spatialFrequency;

        // Fractal noise and ridged component for sharp peaks
        const base = fbm(nx, ny); // [-1,1]
        const ridge = 1 - Math.abs(base); // [0,1], peaks emphasized

        // Radial falloff to form a mountain that fades to the edges
        const dist = Math.sqrt(x * x + y * y);
        let falloff = 1 - Math.pow(dist / maxDist, 2);
        falloff = Math.max(0, falloff);

        const elevation = (base * 4 + ridge * 8) * falloff * elevationScale;
        vertices[i + 2] = elevation;
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();

      const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: opacity,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 2; // lay flat
      mesh.position.y = 0;
      return mesh;
    };

    const mountainMesh = createMountainMesh(80, 80, 160);
    mountainGroup.add(mountainMesh);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Gentle rotation with pointer-based parallax
      if (mountainGroup) {
        mountainGroup.rotation.y += rotateSpeed;
        const targetX = mouseRef.current.y * (parallaxStrength * 0.4);
        const targetY = mouseRef.current.x * parallaxStrength;
        mountainGroup.rotation.x += (targetX - mountainGroup.rotation.x) * 0.06;
        mountainGroup.rotation.z += (targetY * 0.3 - mountainGroup.rotation.z) * 0.06;
      }

      // Animate camera
      const time = Date.now() * 0.001;
      camera.position.x = Math.sin(time * 0.2) * 5;
      camera.position.z = 30 + Math.cos(time * 0.3) * 3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // GSAP animations for entrance
    gsap.fromTo(
      mountainGroup.rotation,
      { y: -Math.PI },
      { y: 0, duration: 3, ease: "power2.out" }
    );

    gsap.fromTo(
      mountainGroup.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 2, ease: "back.out(1.7)" }
    );

    // Fade in the mountain wireframe
    gsap.fromTo(
      (mountainMesh.material as THREE.MeshBasicMaterial),
      { opacity: 0 },
      { opacity: opacity, duration: 1.2, ease: 'power2.out', delay: 0.2 }
    );

    // Resize handler
    const handleResize = () => {
      if (!canvasRef.current || !camera || !renderer) return;
      
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Pointer parallax handler
    const handlePointerMove = (event: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      const normalizedX = (event.clientX / innerWidth) * 2 - 1; // [-1,1]
      const normalizedY = (event.clientY / innerHeight) * 2 - 1; // [-1,1]
      mouseRef.current.x = normalizedX;
      mouseRef.current.y = -normalizedY; // invert Y so up is positive
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', handlePointerMove);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Clean up Three.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, [color, opacity, elevationScale, noiseScale, rotateSpeed, parallaxStrength]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};
