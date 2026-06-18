"use client";

import React, { useEffect, useState } from "react";

export const HoverCard = () => {
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMovement = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (event.clientX - centerX) / (rect.width / 2);
    const deltaY = (event.clientY - centerY) / (rect.height / 2);

    setRotation({
      x: -deltaY * 30,
      y: deltaX * 30,
    });
    setMouseCoords({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMovement}
      onMouseLeave={handleMouseLeave}
      className="w-120 h-150 flex items-center justify-center border border-red-500"
      style={{ perspective: "1000px" }}
    >
      <div
        className="w-60 h-80 rounded-xl border-2 border-blue-500"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <p>Relative X: {Math.round(mouseCoords.x)}</p>
        <p>Relative Y: {Math.round(mouseCoords.y)}</p>
      </div>
    </div>
  );
};
