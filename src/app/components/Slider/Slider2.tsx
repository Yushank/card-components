import React, { useRef, useState } from "react";
import { motion } from "motion/react";

interface sliderProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
}
export const Slider2 = ({ value, onChange, max }: sliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const progress = (value / max) * 100;

  const getValueFromX = (clientX: number) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left; //mouse point in screen above slider - slider position in screen (this gives mouse position inside slider)
    const percent = x / rect.width; //this gives what percentage of slider the mouse is in
    const nextValue = Math.round(percent * max); //this gives round value
    const clamped = Math.max(0, Math.min(max, nextValue)); //prevent overflow
    onChange(clamped);
  };

  return (
    <div className="w-full max-w-md mx-auto my-5">
      {/* SLIDER CONTAINER */}
      <motion.div
        ref={sliderRef}
        className="relative"
        style={{ touchAction: "none", userSelect: "none" }} //prevents scroll interference and text selection while dragging
        onPointerDown={(e) => {
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
          getValueFromX(e.clientX);
          //this makes the whole slider container clickable and send a value which moves the thumb where it is clicked
          //we remove onclick from each bars and do this instead
        }}
        onPan={(_, info) => {
          getValueFromX(info.point.x);
        }}
      >
        {/* BARS */}
        <div className="flex gap-1">
          {/* creating bars */}
          {Array.from({ length: 10 }).map((_, i) => {
            // const barPct = (i / 9) * 100;

            return (
              <div
                key={i}
                // onClick={() => setValue(i)}
                className={
                  i <= value
                    ? "flex-1 h-4 bg-blue-500"
                    : "flex-1 h-4 bg-gray-300"
                }
              />
            );
          })}
        </div>

        {/* THUMB */}
        <motion.div
          className="absolute top-0 w-4 h-4 bg-white border-4 border-gray-900 rounded-full cursor-grab active:cursor-grabbing pointer-events-none"
          // drag="x"
          // dragConstraints={sliderRef}

          animate={{
            left: `${progress}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          style={{
            transform: "translateX(-50%)",
          }}
        />
      </motion.div>
    </div>
  );
};
