import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { getHeroScrollState } from "./scrollState.js";

const NODE_POSITIONS = [
  [-2.1, 1.2, -0.3],
  [2.15, 1.25, -0.45],
  [-2.35, -1.15, -0.25],
  [2.3, -1.05, -0.4],
  [0, 2.05, -0.65],
  [0.1, -2.05, -0.6],
];

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function segment(progress, start, end) {
  return clamp01((progress - start) / Math.max(0.001, end - start));
}

function ease(value) {
  return value * value * (3 - 2 * value);
}

function SystemScene() {
  const root = useRef();
  const core = useRef();
  const coreMaterial = useRef();
  const wireMaterial = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const ringC = useRef();
  const nodeRefs = useRef([]);
  const nodeMaterials = useRef([]);
  const lineRefs = useRef([]);
  const particleRef = useRef();
  const smooth = useRef(0);

  const particles = useMemo(() => {
    const count = 160;
    const values = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 3.4 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[i * 3 + 1] = radius * Math.cos(phi);
      values[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 1.5;
    }
    return values;
  }, []);

  useFrame((state, delta) => {
    const scroll = getHeroScrollState();
    smooth.current = THREE.MathUtils.damp(smooth.current, scroll.progress, 7.5, delta);
    const p = smooth.current;

    const awaken = ease(segment(p, 0.02, 0.2));
    const network = ease(segment(p, 0.16, 0.5));
    const expand = ease(segment(p, 0.48, 0.78));
    const exit = ease(segment(p, 0.82, 1));
    const velocity = THREE.MathUtils.clamp(scroll.velocity / 4200, -1, 1);

    if (root.current) {
      root.current.rotation.y = p * 1.7 + velocity * 0.08;
      root.current.rotation.x = -0.08 + p * 0.18 - velocity * 0.035;
      root.current.position.y = THREE.MathUtils.lerp(0.05, 0.18, expand);
      root.current.position.z = exit * 2.2;
      const scale = 0.88 + awaken * 0.12 + expand * 0.14 + exit * 1.25;
      root.current.scale.setScalar(scale);
    }

    if (core.current) {
      core.current.rotation.x += delta * (0.14 + p * 0.22);
      core.current.rotation.y += delta * (0.2 + p * 0.34);
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.025 * (1 - exit);
      core.current.scale.setScalar((0.78 + awaken * 0.22) * pulse);
    }

    if (coreMaterial.current) {
      coreMaterial.current.emissiveIntensity = 0.16 + awaken * 0.75 + network * 0.3;
      coreMaterial.current.opacity = 1 - exit * 0.28;
    }
    if (wireMaterial.current) wireMaterial.current.opacity = 0.12 + network * 0.34 - exit * 0.18;

    [ringA.current, ringB.current, ringC.current].forEach((ring, index) => {
      if (!ring) return;
      const directions = [1, -1, 1];
      ring.rotation.z += delta * (0.16 + index * 0.055) * directions[index];
      ring.rotation.y += delta * 0.035 * directions[index];
      const ringScale = 0.6 + awaken * 0.4 + expand * (0.12 + index * 0.035);
      ring.scale.setScalar(ringScale);
    });

    NODE_POSITIONS.forEach((target, index) => {
      const node = nodeRefs.current[index];
      const material = nodeMaterials.current[index];
      if (!node) return;
      const spread = 0.08 + network * 0.92 + expand * 0.24;
      node.position.set(target[0] * spread, target[1] * spread, target[2] * spread);
      const bob = Math.sin(state.clock.elapsedTime * 1.25 + index * 0.85) * 0.045 * network * (1 - exit);
      node.position.y += bob;
      node.scale.setScalar(0.2 + network * 0.8);
      if (material) material.opacity = Math.max(0, network * (1 - exit * 0.7));
    });

    lineRefs.current.forEach((line, index) => {
      const material = line?.material;
      if (!material) return;
      const local = ease(segment(p, 0.23 + index * 0.025, 0.47 + index * 0.025));
      material.opacity = local * (1 - exit * 0.82) * 0.62;
    });

    if (particleRef.current) {
      particleRef.current.rotation.y += delta * 0.018;
      particleRef.current.rotation.x = p * 0.08;
      particleRef.current.material.opacity = 0.18 + network * 0.24 - exit * 0.12;
    }

    state.camera.position.z = THREE.MathUtils.lerp(6.8, 5.6, expand) - exit * 2.2;
    state.camera.position.x = velocity * 0.16;
    state.camera.position.y = THREE.MathUtils.lerp(0.05, -0.08, p);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[2.7, 3.2, 4]} intensity={18} color="#00ff8a" distance={9} />
      <pointLight position={[-4, -2, 2]} intensity={6} color="#84ffd0" distance={10} />

      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#73ffc1" size={0.022} transparent opacity={0.22} sizeAttenuation depthWrite={false} />
      </points>

      <group ref={root}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.02, 5]} />
          <meshStandardMaterial
            ref={coreMaterial}
            color="#06120c"
            emissive="#00ff8a"
            emissiveIntensity={0.35}
            metalness={0.62}
            roughness={0.26}
            transparent
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.055, 3]} />
          <meshBasicMaterial ref={wireMaterial} color="#76ffc2" wireframe transparent opacity={0.22} />
        </mesh>

        <mesh ref={ringA} rotation={[1.1, 0.1, 0.2]}>
          <torusGeometry args={[1.72, 0.012, 8, 120]} />
          <meshBasicMaterial color="#6fffc0" transparent opacity={0.34} />
        </mesh>
        <mesh ref={ringB} rotation={[0.2, 1.1, -0.55]}>
          <torusGeometry args={[2.05, 0.01, 8, 120]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.16} />
        </mesh>
        <mesh ref={ringC} rotation={[0.65, 0.7, 1.05]}>
          <torusGeometry args={[2.42, 0.009, 8, 120]} />
          <meshBasicMaterial color="#00ff8a" transparent opacity={0.13} />
        </mesh>

        {NODE_POSITIONS.map((position, index) => (
          <group key={index}>
            <mesh ref={(node) => { nodeRefs.current[index] = node; }} position={[0, 0, 0]}>
              <sphereGeometry args={[0.13, 18, 18]} />
              <meshStandardMaterial
                ref={(material) => { nodeMaterials.current[index] = material; }}
                color={index % 2 ? "#d9fff0" : "#00ff8a"}
                emissive="#00ff8a"
                emissiveIntensity={0.65}
                transparent
                opacity={0}
                roughness={0.28}
              />
            </mesh>
            <Line
              ref={(line) => { lineRefs.current[index] = line; }}
              points={[[0, 0, 0], position]}
              color={index % 2 ? "#b6ffe0" : "#00ff8a"}
              lineWidth={0.65}
              transparent
              opacity={0}
            />
          </group>
        ))}
      </group>
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [0, 0, 6.8], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <SystemScene />
      </Canvas>
    </div>
  );
}
