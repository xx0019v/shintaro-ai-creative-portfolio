import * as THREE from "three";

/**
 * The keychain itself, built rather than imported.
 *
 * Real dimensions, because in AR they are the whole point: a 58mm acrylic
 * plate, 3mm thick, with a 4mm hole and a 12mm split ring. Get these wrong
 * and the object reads as a toy sitting on the table — scale is the only
 * thing separating "a 3D model" from "that thing, there".
 */
const PLATE_MM = 58;
const THICK_MM = 3;
const HOLE_MM = 4;
const RING_MM = 12;
const MM = 0.001; // millimetres → metres, which is what WebXR speaks

type Mode = "ar" | "viewer";

/** Rounded-square outline with the lanyard hole punched out of it. */
function plateShape() {
  const s = (PLATE_MM * MM) / 2;
  const r = s * 0.28; // corner radius — acrylic is routed, never sharp
  const shape = new THREE.Shape();
  shape.moveTo(-s + r, -s);
  shape.lineTo(s - r, -s);
  shape.quadraticCurveTo(s, -s, s, -s + r);
  shape.lineTo(s, s - r);
  shape.quadraticCurveTo(s, s, s - r, s);
  shape.lineTo(-s + r, s);
  shape.quadraticCurveTo(-s, s, -s, s - r);
  shape.lineTo(-s, -s + r);
  shape.quadraticCurveTo(-s, -s, -s + r, -s);

  const hole = new THREE.Path();
  hole.absarc(0, s * 0.74, (HOLE_MM * MM) / 2, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return shape;
}

function buildKeychain(map: THREE.Texture) {
  const group = new THREE.Group();

  const geo = new THREE.ExtrudeGeometry(plateShape(), {
    depth: THICK_MM * MM,
    bevelEnabled: true,
    bevelThickness: 0.0004,
    bevelSize: 0.0004,
    bevelSegments: 2,
    curveSegments: 24,
  });
  geo.center();

  // ExtrudeGeometry's UVs run in world units, so the artwork would tile at a
  // seemingly random scale. Reproject from the bounding box instead, which
  // maps the print to the plate face exactly once.
  geo.computeBoundingBox();
  const bb = geo.boundingBox!;
  const w = bb.max.x - bb.min.x;
  const h = bb.max.y - bb.min.y;
  const pos = geo.attributes.position;
  const uv = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    uv[i * 2] = (pos.getX(i) - bb.min.x) / w;
    uv[i * 2 + 1] = (pos.getY(i) - bb.min.y) / h;
  }
  geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));

  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;

  // The plate is bare acrylic; the artwork goes on as two separate faces.
  //
  // Mapping the texture onto the extrusion directly puts a MIRRORED copy on
  // the back, because both caps share one material and one UV set. Turning
  // the object over showed the print backwards — which no real keychain does,
  // and which read as cheap the moment you rotated it. A double-sided print
  // is two correctly-oriented faces, so that is what this builds.
  const plate = new THREE.Mesh(
    geo,
    new THREE.MeshPhysicalMaterial({
      color: 0xf6f6f4,
      roughness: 0.16,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.06,
      side: THREE.DoubleSide,
    })
  );
  group.add(plate);

  const artSize = PLATE_MM * MM * 0.9;
  const artGeo = new THREE.PlaneGeometry(artSize, artSize);
  const artMat = new THREE.MeshPhysicalMaterial({
    map,
    transparent: true,
    // DoubleSide because a printed face has no back to cull, and because
    // relying on winding here is what left the reverse blank: whichever way
    // the plane ended up oriented, the opaque plate between the two prints
    // means only the near one is ever visible anyway.
    side: THREE.DoubleSide,
    roughness: 0.14,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
  });
  // Derive the face depth from the geometry, not from THICK_MM.
  //
  // ExtrudeGeometry adds the bevel on TOP of `depth`, so the plate is really
  // depth + 2*bevelThickness thick, and geo.center() then centres that larger
  // box. Placing the prints at the nominal half-thickness buried them inside
  // the acrylic — which is exactly what happened: both faces rendered blank
  // white, and no amount of side/culling changes could have fixed it.
  const zFace = bb.max.z + 0.00015;

  const front = new THREE.Mesh(artGeo, artMat);
  front.position.set(0, -artSize * 0.03, zFace);
  group.add(front);

  const back = new THREE.Mesh(artGeo, artMat);
  back.position.set(0, -artSize * 0.03, -zFace);
  back.rotation.y = Math.PI; // turned to face outward, so it is not mirrored
  group.add(back);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry((RING_MM * MM) / 2, 0.0007, 12, 48),
    new THREE.MeshStandardMaterial({ color: 0xd8dde3, roughness: 0.22, metalness: 1 })
  );
  ring.position.y = ((PLATE_MM * MM) / 2) * 0.74 + (RING_MM * MM) / 2 - 0.0035;
  group.add(ring);

  return group;
}

export async function mount({
  host,
  texture,
  mode,
}: {
  host: HTMLDivElement | null;
  texture: string;
  mode: Mode;
}): Promise<() => void> {
  if (!host) throw new Error("no host element");
  // Belt and braces: even with the caller revealing the host first, a zero box
  // here would silently produce a context that renders nothing.
  const w0 = host.clientWidth || host.getBoundingClientRect().width;
  const h0 = host.clientHeight || host.getBoundingClientRect().height;
  if (!w0 || !h0) throw new Error("host has no layout box yet");

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w0, h0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, w0 / h0, 0.01, 20);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x30343a, 2.2));
  const key = new THREE.DirectionalLight(0xffffff, 2.4);
  key.position.set(0.4, 0.8, 0.6);
  scene.add(key);

  const map = await new THREE.TextureLoader().loadAsync(texture);
  const keychain = buildKeychain(map);

  const disposables: Array<{ dispose: () => void }> = [map, renderer];
  let stopped = false;
  let session: XRSession | null = null;
  let reticle: THREE.Mesh | null = null;
  let hitTestSource: XRHitTestSource | null = null;
  let placed = false;

  const onResize = () => {
    if (!host.clientWidth) return;
    camera.aspect = host.clientWidth / host.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(host.clientWidth, host.clientHeight);
  };

  if (mode === "ar") {
    renderer.xr.enabled = true;

    reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.045, 0.052, 40).rotateX(-Math.PI / 2),
      new THREE.MeshBasicMaterial({ color: 0xe5e5e5, transparent: true, opacity: 0.85 })
    );
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);

    keychain.visible = false;
    scene.add(keychain);

    const xr = (navigator as Navigator & { xr: XRSystem }).xr;
    session = await xr.requestSession("immersive-ar", {
      requiredFeatures: ["hit-test", "local-floor"],
      optionalFeatures: ["dom-overlay"],
      domOverlay: { root: host },
    });
    await renderer.xr.setSession(session);

    const viewerSpace = await session.requestReferenceSpace("viewer");
    hitTestSource = (await session.requestHitTestSource?.({ space: viewerSpace })) ?? null;

    // Tap to drop it where the reticle is. Tapping again re-places it, so a
    // bad first placement is one tap to fix rather than a session restart.
    const onSelect = () => {
      if (!reticle?.visible) return;
      keychain.position.setFromMatrixPosition(reticle.matrix);
      keychain.quaternion.setFromRotationMatrix(reticle.matrix);
      // Lay it flat on the surface the way it would actually fall.
      keychain.rotateX(-Math.PI / 2);
      keychain.visible = true;
      placed = true;
    };
    session.addEventListener("select", onSelect);

    renderer.setAnimationLoop((_, frame) => {
      if (!frame || !hitTestSource || placed) {
        renderer.render(scene, camera);
        return;
      }
      const refSpace = renderer.xr.getReferenceSpace();
      const hits = frame.getHitTestResults(hitTestSource);
      if (refSpace && hits.length) {
        const pose = hits[0].getPose(refSpace);
        if (pose && reticle) {
          reticle.visible = true;
          reticle.matrix.fromArray(pose.transform.matrix);
        }
      } else if (reticle) {
        reticle.visible = false;
      }
      renderer.render(scene, camera);
    });
  } else {
    // Inline viewer: same object, drag to turn it over.
    camera.position.set(0, 0, 0.145);
    scene.add(keychain);

    let dragging = false;
    let px = 0;
    let py = 0;
    let vx = 0.004; // a slow idle turn, so it reads as an object not a picture
    let vy = 0;

    const down = (e: PointerEvent) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      vx = (e.clientX - px) * 0.005;
      vy = (e.clientY - py) * 0.005;
      px = e.clientX;
      py = e.clientY;
    };
    const up = (e: PointerEvent) => {
      dragging = false;
      renderer.domElement.releasePointerCapture?.(e.pointerId);
    };
    renderer.domElement.addEventListener("pointerdown", down);
    renderer.domElement.addEventListener("pointermove", move);
    renderer.domElement.addEventListener("pointerup", up);
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.style.cursor = "grab";

    renderer.setAnimationLoop(() => {
      if (stopped) return;
      keychain.rotation.y += vx;
      keychain.rotation.x += vy;
      if (!dragging) {
        // Ease back to the idle spin rather than stopping dead on release.
        vx += (0.004 - vx) * 0.03;
        vy += (0 - vy) * 0.06;
      }
      renderer.render(scene, camera);
    });

    window.addEventListener("resize", onResize);
    disposables.push({
      dispose: () => {
        renderer.domElement.removeEventListener("pointerdown", down);
        renderer.domElement.removeEventListener("pointermove", move);
        renderer.domElement.removeEventListener("pointerup", up);
        window.removeEventListener("resize", onResize);
      },
    });
  }

  return () => {
    stopped = true;
    renderer.setAnimationLoop(null);
    hitTestSource?.cancel?.();
    session?.end?.().catch(() => {});
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose?.();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat?.dispose?.();
    });
    disposables.forEach((d) => d.dispose());
    renderer.domElement.remove();
  };
}
