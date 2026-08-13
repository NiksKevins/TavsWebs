"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  useMediaQuery,
  useMousePosition,
  useReducedMotion,
} from "@/hooks/useMotion";

function NetworkGlobe({
  mouse,
  pointCount,
}: {
  mouse: { x: number; y: number };
  pointCount: number;
}) {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  const { positions, connections } = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < pointCount; i++) {
      const y = 1 - (i / (pointCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * radius * 1.55,
          y * 1.55,
          Math.sin(theta) * radius * 1.55,
        ),
      );
    }

    const linkDist = pointCount > 36 ? 1.15 : 1.35;
    const lines: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < linkDist) {
          lines.push(
            pts[i].x,
            pts[i].y,
            pts[i].z,
            pts[j].x,
            pts[j].y,
            pts[j].z,
          );
        }
      }
    }

    return {
      positions: new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z])),
      connections: new Float32Array(lines),
    };
  }, [pointCount]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    if (!reduced) {
      group.current.rotation.y = t * 0.12 + mouse.x * 0.45;
      group.current.rotation.x = mouse.y * 0.25 + Math.sin(t * 0.2) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#67e8f9"
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[connections, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#14b8a6"
          transparent
          opacity={0.32}
          depthWrite={false}
        />
      </lineSegments>
      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshPhysicalMaterial
          color="#0a1220"
          metalness={0.85}
          roughness={0.15}
          transmission={0.55}
          thickness={0.6}
          transparent
          opacity={0.45}
          envMapIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

function Scene({ isDesktop }: { isDesktop: boolean }) {
  const mouse = useMousePosition();
  const reduced = useReducedMotion();
  const pointCount = isDesktop ? 48 : 28;

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 3, 4]} intensity={1.2} color="#5eead4" />
      <pointLight position={[-4, -2, -2]} intensity={0.7} color="#38bdf8" />
      <Float
        speed={reduced ? 0 : 1.2}
        rotationIntensity={reduced ? 0 : 0.25}
        floatIntensity={reduced ? 0 : 0.6}
      >
        <NetworkGlobe mouse={mouse} pointCount={pointCount} />
      </Float>
      {!reduced && isDesktop && (
        <Sparkles
          count={36}
          scale={6}
          size={2}
          speed={0.25}
          opacity={0.3}
          color="#99f6e4"
        />
      )}
    </>
  );
}

export function HeroScene() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="absolute inset-0 -z-0">
      <Canvas
        dpr={isDesktop ? [1, 1.5] : [1, 1]}
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{
          antialias: isDesktop,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene isDesktop={isDesktop} />
        </Suspense>
      </Canvas>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(5,7,12,0.55)_70%,rgba(5,7,12,0.95)_100%)]"
      />
    </div>
  );
}
