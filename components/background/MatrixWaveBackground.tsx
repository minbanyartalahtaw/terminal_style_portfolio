"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type WordSprite = {
  sprite: THREE.Sprite;
  phase: number;
  drift: number;
  baseY: number;
  bobAmplitude: number;
  bobSpeed: number;
};

const createWordTexture = (word: string): THREE.CanvasTexture => {
  const canvas = document.createElement("canvas");
  const fontSize = 54;
  const safeWord = word.trim() || "Word";

  canvas.width = Math.max(220, safeWord.length * 40);
  canvas.height = 128;

  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "rgba(170,255,200,0.95)");
    gradient.addColorStop(1, "rgba(122,244,255,0.95)");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `700 ${fontSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.shadowColor = "rgba(117, 255, 209, 0.72)";
    ctx.shadowBlur = 18;
    ctx.fillStyle = gradient;
    ctx.fillText(safeWord, canvas.width / 2, canvas.height / 2 + 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
};

interface MatrixWaveBackgroundProps {
  words?: string[];
}

export default function MatrixWaveBackground({ words = [] }: MatrixWaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const wordList = words.length ? words : ["Apple", "Mango", "dumark", "text"];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#060b11");
    scene.fog = new THREE.Fog("#060b11", 16, 80);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.set(0, 7, 26);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const ambient = new THREE.AmbientLight("#9cfec8", 0.62);
    scene.add(ambient);

    const directional = new THREE.DirectionalLight("#57d1ff", 0.95);
    directional.position.set(8, 14, 12);
    scene.add(directional);

    const grid = new THREE.GridHelper(130, 44, "#4af1a2", "#1e4c53");
    const gridMaterial = grid.material as THREE.Material;
    gridMaterial.transparent = true;
    gridMaterial.opacity = 0.55;
    grid.position.y = -5.2;
    grid.position.z = -10;
    scene.add(grid);

    const backGrid = new THREE.GridHelper(110, 30, "#3ad2ff", "#1c3e4f");
    const backGridMaterial = backGrid.material as THREE.Material;
    backGridMaterial.transparent = true;
    backGridMaterial.opacity = 0.2;
    backGrid.rotation.x = Math.PI / 2.8;
    backGrid.position.set(0, 9, -42);
    scene.add(backGrid);

    const wordTextures = new Map<string, THREE.CanvasTexture>();
    const wordSprites: WordSprite[] = [];
    const wordGroup = new THREE.Group();

    const yValues: number[] = [];
    const createUniqueY = (min: number, max: number, minGap: number): number => {
      let candidate = min;

      for (let attempt = 0; attempt < 40; attempt++) {
        candidate = min + Math.random() * (max - min);

        const hasConflict = yValues.some((y) => Math.abs(y - candidate) < minGap);
        if (!hasConflict) {
          yValues.push(candidate);
          return candidate;
        }
      }

      // If crowded, still insert with slight offset so values don't collapse.
      const fallback = candidate + (Math.random() - 0.5) * minGap;
      yValues.push(fallback);
      return fallback;
    };

    const spacing = 3;
    const cellsX = 20;
    const cellsZ = 17;
    const spriteCount = 110;

    for (let i = 0; i < spriteCount; i++) {
      const word = wordList[i % wordList.length];

      if (!wordTextures.has(word)) {
        wordTextures.set(word, createWordTexture(word));
      }

      const material = new THREE.SpriteMaterial({
        map: wordTextures.get(word),
        transparent: true,
        opacity: 0.84,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(material);
      const column = Math.floor(Math.random() * (cellsX * 2)) - cellsX;
      const row = Math.floor(Math.random() * (cellsZ * 2)) - cellsZ;

      const x = (column + 0.5) * spacing;
      const z = (row + 0.5) * spacing - 8;
      const baseY = createUniqueY(-11.5, 10.5, 0.14);
      const bobAmplitude = 0.2 + Math.random() * 0.38;
      const bobSpeed = 0.8 + Math.random() * 0.95;

      sprite.position.set(x, baseY, z);
      sprite.scale.set(2.6 + word.length * 0.24, 1.4, 1);

      wordSprites.push({
        sprite,
        phase: Math.random() * Math.PI * 2,
        drift: 0.01 + Math.random() * 0.016,
        baseY,
        bobAmplitude,
        bobSpeed,
      });

      wordGroup.add(sprite);
    }

    scene.add(wordGroup);

    const waveWidth = 96;
    const waveDepth = 76;
    const waveSegmentsX = 88;
    const waveSegmentsY = 66;
    const waveCount = (waveSegmentsX + 1) * (waveSegmentsY + 1);

    const wavePositions = new Float32Array(waveCount * 3);
    let ptr = 0;

    for (let y = 0; y <= waveSegmentsY; y++) {
      for (let x = 0; x <= waveSegmentsX; x++) {
        const nx = (x / waveSegmentsX - 0.5) * waveWidth;
        const nz = (y / waveSegmentsY - 0.5) * waveDepth;

        wavePositions[ptr++] = nx;
        wavePositions[ptr++] = 0;
        wavePositions[ptr++] = nz;
      }
    }

    const waveGeometry = new THREE.BufferGeometry();
    waveGeometry.setAttribute("position", new THREE.BufferAttribute(wavePositions, 3));

    const waveMaterial = new THREE.PointsMaterial({
      color: "#67ffca",
      size: 0.08,
      transparent: true,
      opacity: 0.44,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const wave = new THREE.Points(waveGeometry, waveMaterial);
    wave.position.set(0, -4.4, -11);
    wave.rotation.x = -1.06;
    scene.add(wave);

    const pointer = { x: 0, y: 0 };
    const targetCamera = new THREE.Vector3(0, 7, 26);
    let animationId = 0;

    const updateSize = () => {
      const { innerWidth, innerHeight } = window;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("resize", updateSize);
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointerMove);
    }

    const clock = new THREE.Clock();
    const positionAttr = waveGeometry.getAttribute("position") as THREE.BufferAttribute;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();

      for (let i = 0; i < waveCount; i++) {
        const idx = i * 3;
        const px = wavePositions[idx];
        const pz = wavePositions[idx + 2];

        const waveY =
          Math.sin(px * 0.23 + elapsed * 1.18) * 0.68 +
          Math.cos(pz * 0.26 + elapsed * 0.92) * 0.52;

        positionAttr.array[idx + 1] = waveY;
      }
      positionAttr.needsUpdate = true;

      for (const wordSprite of wordSprites) {
        wordSprite.sprite.position.y =
          wordSprite.baseY +
          Math.sin(elapsed * wordSprite.bobSpeed + wordSprite.phase) * wordSprite.bobAmplitude;

        wordSprite.baseY += 0.0075;
        if (wordSprite.baseY > 11.6) {
          wordSprite.baseY = -12.2;
        }

        wordSprite.sprite.position.x +=
          Math.sin(elapsed * 0.7 + wordSprite.phase) * wordSprite.drift;

        if (wordSprite.sprite.position.x > 62) {
          wordSprite.sprite.position.x = -62;
        }
      }

      targetCamera.x = pointer.x * 4.8;
      targetCamera.y = 7 - pointer.y * 2.9;
      camera.position.lerp(targetCamera, reduceMotion ? 0.03 : 0.085);

      const rotateLerp = reduceMotion ? 0.025 : 0.09;
      wordGroup.rotation.y = THREE.MathUtils.lerp(
        wordGroup.rotation.y,
        pointer.x * 0.2,
        rotateLerp,
      );
      wordGroup.rotation.x = THREE.MathUtils.lerp(
        wordGroup.rotation.x,
        -pointer.y * 0.12,
        rotateLerp,
      );
      grid.rotation.z = THREE.MathUtils.lerp(
        grid.rotation.z,
        pointer.x * 0.06,
        rotateLerp,
      );
      backGrid.rotation.y = THREE.MathUtils.lerp(
        backGrid.rotation.y,
        pointer.x * 0.14,
        rotateLerp,
      );
      camera.lookAt(0, -3.5, -11);

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(renderFrame);
    };

    animationId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("pointermove", onPointerMove);

      for (const wordSprite of wordSprites) {
        wordSprite.sprite.material.dispose();
      }

      wordTextures.forEach((texture) => texture.dispose());

      gridMaterial.dispose();
      backGridMaterial.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [words]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="matrix-overlay absolute inset-0"
      />

      <motion.div
        animate={{ backgroundPositionY: ["0px", "20px"] }}
        transition={{ duration: 7, ease: "linear", repeat: Infinity }}
        className="matrix-scanlines absolute inset-0"
      />
    </div>
  );
}