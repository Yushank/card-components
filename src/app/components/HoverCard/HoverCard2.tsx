"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

export const HoverCard2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const container = containerRef.current;

    if (!container) {
      return;
    }

    //CAMERA
    const camera = new THREE.PerspectiveCamera(
      8,
      container?.offsetWidth / container?.offsetHeight,
      0.1,
      1000,
    ); //fov, aspect, near, far

    camera.position.set(0, 0, 10); //x,y,z

    //RENDERER
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(devicePixelRatio);
    container.appendChild(renderer.domElement); //making renderer render inside container as child

    //LIGHT
    const directionalLight = new THREE.DirectionalLight(0xffffff, 5); //color, intensity
    directionalLight.position.set(1, 1, 0); //x,y,z

    scene.add(directionalLight);

    //LOADER
    const loader = new GLTFLoader();

    let modelBaseRotationX = 0;
    let modelBaseZ = -1;
    let animationId: number;

    loader.load("/assets/low_poly_face.glb", (gltf) => {
      if (!container.isConnected) return;

      modelRef.current = gltf.scene;

      const wireframeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffcc,
        wireframe: true,
        wireframeLinewidth: 1,
      });

      modelRef.current.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.material = wireframeMaterial;
        }
      });

      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      modelRef.current.position.sub(center);
      modelRef.current.position.set(0, 0, -1);

      //for normalizing scale we find the biggest side and scale according to that
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 1 / maxDim;
      modelRef.current.scale.setScalar(scale);

      scene.add(modelRef.current);
    });

    function animate() {
      animationId = requestAnimationFrame(animate);

      const baseRotationY = Math.PI;
      const targetRotationY = baseRotationY;

      if (modelRef.current) {
        modelRef.current.rotation.y +=
          (targetRotationY - modelRef.current.rotation.y) * 0.05;
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      modelRef.current = null;
    };
  }, []);
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-120 h-120 flex items-center justify-center rounded-lg border border-blue-200 bg-[repeating-linear-gradient(315deg,#BFDBFE_0,#BFDBFE_1px,transparent_1px,transparent_50%)] bg-size-[10px_10px]">
        {/* CARD */}
        <div
          className="w-60 h-80 border-2 border-green-500 bg-gray-50 rounded-lg"
          ref={containerRef}
        ></div>
      </div>
    </div>
  );
};
