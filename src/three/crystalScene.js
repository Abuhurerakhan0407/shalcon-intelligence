import * as THREE from "three";

/**
 * createCrystalScene — lightweight cinematic hero scene (Phase 4, Option B).
 *
 * Raw THREE.js only. No R3F, no postprocessing (no bloom/SSR), no shadows,
 * no physics, no particle overload. Design:
 *   - central low-poly "crystal core" (icosahedron, flat-shaded)
 *   - a small ring of orbiting shards (cones), count clamped 5..12
 *   - emissive emerald (#00FF94), soft ambient fog, dark void
 *   - static base camera + very low-intensity mouse parallax
 *   - slow group rotation (CPU-safe)
 *
 * Performance guards:
 *   - devicePixelRatio capped at 1.5
 *   - antialias only when DPR === 1 (cheaper on hi-dpi)
 *   - render loop paused when tab hidden / element off-screen
 *   - full dispose() tears down geometries, materials, renderer, listeners
 *
 * @param {HTMLElement} container - element to mount the <canvas> into
 * @param {object} [opts]
 * @param {number} [opts.shardCount=9] - orbiting shard count (clamped 5..12)
 * @returns {{ dispose: () => void }}
 */
export function createCrystalScene(container, opts = {}) {
  const GREEN = 0x00ff94;
  const BG = 0x030308;
  const shardCount = Math.max(5, Math.min(12, opts.shardCount ?? 9));

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  // ── Renderer ──
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const renderer = new THREE.WebGLRenderer({
    antialias: dpr === 1,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(dpr);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = false; // no shadows (perf)
  const canvas = renderer.domElement;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.display = "block";
  container.appendChild(canvas);

  // ── Scene + fog (dark void) ──
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(BG, 0.055);

  // ── Camera (static base) ──
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  const CAM_Z = 12;
  camera.position.set(0, 0, CAM_Z);
  camera.lookAt(0, 0, 0);

  // ── Lighting ──
  const ambient = new THREE.AmbientLight(0x334455, 0.6); // low ambient
  scene.add(ambient);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.7); // soft directional
  dirLight.position.set(4, 6, 8);
  scene.add(dirLight);

  const rimLight = new THREE.PointLight(GREEN, 1.4, 40); // emerald rim for depth
  rimLight.position.set(-6, 2, 4);
  scene.add(rimLight);

  // ── Shared material (emissive emerald, low roughness) ──
  const crystalMat = new THREE.MeshStandardMaterial({
    color: 0x0a1f18,
    emissive: GREEN,
    emissiveIntensity: 0.55,
    roughness: 0.25,
    metalness: 0.1,
    flatShading: true,
  });

  // ── Root group (slow rotation applied here) ──
  const group = new THREE.Group();
  scene.add(group);

  // Central crystal core — low poly icosahedron
  const coreGeo = new THREE.IcosahedronGeometry(2.1, 0);
  const core = new THREE.Mesh(coreGeo, crystalMat);
  group.add(core);

  // Faint wireframe overlay on the core for a "data crystal" read
  const wireGeo = new THREE.IcosahedronGeometry(2.14, 0);
  const wireMat = new THREE.MeshBasicMaterial({
    color: GREEN,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const wire = new THREE.Mesh(wireGeo, wireMat);
  group.add(wire);

  // Orbiting shards — elongated cones scattered on a ring
  const shardGeo = new THREE.ConeGeometry(0.28, 1.5, 6);
  const shards = [];
  for (let i = 0; i < shardCount; i++) {
    const shard = new THREE.Mesh(shardGeo, crystalMat);
    const angle = (i / shardCount) * Math.PI * 2;
    const radius = 4.2 + (i % 3) * 0.5;
    shard.userData = {
      angle,
      radius,
      speed: 0.12 + (i % 4) * 0.03,
      bobOffset: i * 1.7,
      yBase: (Math.sin(i * 2.3) * 1.6),
    };
    shard.position.set(
      Math.cos(angle) * radius,
      shard.userData.yBase,
      Math.sin(angle) * radius
    );
    shard.rotation.z = angle;
    group.add(shard);
    shards.push(shard);
  }

  // ── Mouse parallax (very low intensity) ──
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  const onPointerMove = (e) => {
    // normalized -0.5..0.5
    target.x = e.clientX / window.innerWidth - 0.5;
    target.y = e.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  // ── Resize ──
  const onResize = () => {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener("resize", onResize);

  // ── Render loop (rAF, CPU-safe) ──
  let rafId = null;
  let running = true;
  let last = 0;
  const clock = new THREE.Clock();

  const renderFrame = (t) => {
    rafId = requestAnimationFrame(renderFrame);
    // ~60fps cap
    if (t - last < 15.5) return;
    last = t;

    const elapsed = clock.getElapsedTime();

    // slow group rotation
    group.rotation.y += 0.0022;
    core.rotation.x += 0.0016;
    core.rotation.y -= 0.0011;
    wire.rotation.copy(core.rotation);

    // shard orbit + individual bob (desynced)
    for (const s of shards) {
      const u = s.userData;
      const a = u.angle + elapsed * u.speed;
      s.position.x = Math.cos(a) * u.radius;
      s.position.z = Math.sin(a) * u.radius;
      s.position.y = u.yBase + Math.sin(elapsed * 0.8 + u.bobOffset) * 0.35;
      s.rotation.y += 0.01;
    }

    // ease camera toward parallax target (very subtle)
    current.x += (target.x - current.x) * 0.04;
    current.y += (target.y - current.y) * 0.04;
    camera.position.x = current.x * 1.6;
    camera.position.y = -current.y * 1.2;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };

  const start = () => {
    if (!running) {
      running = true;
      clock.start();
    }
    if (rafId === null) rafId = requestAnimationFrame(renderFrame);
  };
  const stop = () => {
    running = false;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  // Pause when tab hidden (saves CPU/battery)
  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener("visibilitychange", onVisibility);

  // Pause when hero scrolled out of view
  let observer = null;
  if (typeof IntersectionObserver === "function") {
    observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.01 }
    );
    observer.observe(container);
  }

  start();

  // ── Dispose ──
  const dispose = () => {
    stop();
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    if (observer) observer.disconnect();

    coreGeo.dispose();
    wireGeo.dispose();
    shardGeo.dispose();
    crystalMat.dispose();
    wireMat.dispose();
    renderer.dispose();

    if (canvas.parentNode === container) container.removeChild(canvas);
  };

  return { dispose };
}
