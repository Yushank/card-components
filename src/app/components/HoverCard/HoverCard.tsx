"use client";

import React, { useState } from "react";

export const HoverCard = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const handleMouseMovement = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    //rotaion according to mouse position inside event div
    //in a range of -1 to 1
    const deltaX = (event.clientX - centerX) / (rect.width / 2);
    const deltaY = (event.clientY - centerY) / (rect.height / 2);

    setRotation({
      z: deltaX * -20,
      y: deltaX * 30,
      x: deltaY * 60,
    });

    setMouseCoords({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setRotation({
      x: 0,
      y: 0,
      z: 0,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMovement}
      onMouseLeave={handleMouseLeave}
      className="w-120 h-120 flex items-center justify-center border border-red-500 rounded-xl bg-[repeating-linear-gradient(315deg,#ef4444_0,#ef4444_1px,transparent_1px,transparent_50%)] bg-size-[10px_10px]"
      style={{ perspective: "1000px" }}
    >
      <div
        className="w-60 h-80 rounded-xl border-2 border-blue-500 bg-gray-50"
        style={{
          transform: `rotateZ(${rotation.z}deg) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`,
          transformStyle: "preserve-3d",
        }}
      ></div>
    </div>
  );
};
