"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Model3DScene — the heavy R3F canvas, loaded on demand only (ModelViewer
 * dynamic-imports this with ssr:false, and only when a real avatar.glb exists
 * and the device is capable). Built on the three + @react-three/fiber already
 * in the project — no new 3D dependency.
 *
 * The model is auto-fitted (centered + scaled to a consistent height, so any
 * export frames correctly), lit with a quiet silver studio rig to match the
 * black-silver world, and given a slow breathing turn plus a whisper of cursor
 * parallax. `spin` is dropped for reduced motion. `liquidMetal` swaps every
 * material for a chrome monochrome finish (Mode B) to hide facial roughness.
 */
function Model({
  src,
  spin,
  liquidMetal,
}: {
  src: string;
  spin: boolean;
  liquidMetal: boolean;
}) {
  const gltf = useLoader(GLTFLoader, src);
  const group = useRef<THREE.Group>(null);

  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c8c8c8"),
        metalness: 1,
        roughness: 0.22,
      }),
    []
  );

  useLayoutEffect(() => {
    const g = group.current;
    if (!g) return;
    // center + scale to a stable height regardless of export origin/scale
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2.1 / maxDim;
    gltf.scene.scale.setScalar(scale);
    gltf.scene.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );
    if (liquidMetal) {
      gltf.scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh) m.material = chrome;
      });
    }
  }, [gltf, liquidMetal, chrome]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    if (spin) g.rotation.y += dt * 0.22;
    const targetX = state.pointer.y * 0.1;
    const targetY = state.pointer.x * 0.15;
    g.rotation.x += (targetX - g.rotation.x) * 0.04;
    if (!spin) g.rotation.y += (targetY - g.rotation.y) * 0.04;
  });

  return (
    <group ref={group}>
      <primitive object={gltf.scene} />
    </group>
  );
}

export default function Model3DScene({
  src,
  spin = true,
  liquidMetal = false,
}: {
  src: string;
  spin?: boolean;
  liquidMetal?: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 3.2], fov: 32 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
      frameloop="always"
    >
      {/* quiet silver studio rig */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.15} color="#ffffff" />
      <directionalLight position={[-4, 2, -3]} intensity={0.55} color="#c0c0c0" />
      <directionalLight position={[0, -3, 2]} intensity={0.25} color="#8e8e8e" />
      <Suspense fallback={null}>
        <Model src={src} spin={spin} liquidMetal={liquidMetal} />
      </Suspense>
    </Canvas>
  );
}
