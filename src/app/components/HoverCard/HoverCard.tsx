"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

export const HoverCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateZ = useTransform(x, [-1, 1], [-20, 20]);
  const rotateY = useTransform(x, [-1, 1], [-30, 30]);
  const rotateX = useTransform(y, [-1, 1], [-60, 60]);

  const handleMouseMovement = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    //mouse position inside event div
    const mouseX = (event.clientX - centerX) / (rect.width / 2);
    const mouseY = (event.clientY - centerY) / (rect.height / 2);

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const customTransformTemplate = ({ rotateX, rotateY, rotateZ }: any) => {
    return `rotate(${rotateZ}) rotateY(${rotateY}) rotateX(${rotateY})`;
  };

  return (
    <div
      onMouseMove={handleMouseMovement}
      onMouseLeave={handleMouseLeave}
      className="w-120 h-150 flex items-center justify-center border border-red-500 rounded-xl bg-[repeating-linear-gradient(315deg,#ef4444_0,#ef4444_1px,transparent_1px,transparent_50%)] bg-size-[10px_10px]"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        className="w-60 h-80 rounded-xl border-2 border-blue-500 bg-gray-50"
        style={{
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: "preserve-3d",
        }}
        transformTemplate={customTransformTemplate}
      ></motion.div>
    </div>
  );
};
