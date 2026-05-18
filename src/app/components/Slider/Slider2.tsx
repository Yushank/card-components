import React, { useRef, useState } from "react";
import { motion } from "motion/react";

export const Slider2 = () => {
  const [value, setValue] = useState(0);

  const max = 9;

  const sliderRef = useRef<HTMLDivElement>(null);

  const progress = (value / max) * 100;

  return (
    <div className="w-full max-w-md mx-auto my-5 border border-green-500">
      {/* SLIDER CONTAINER */}
      <div ref={sliderRef} className="relative border border-red-500">
        {/* BARS */}
        <div className="flex gap-1">
          {/* creating bars */}
          {Array.from({ length: 10 }).map((_, i) => {
            // const barPct = (i / 9) * 100;

            return (
              <div
                key={i}
                onClick={() => setValue(i)}
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
          className="absolute top-0 w-4 h-4 bg-white border-4 border-gray-900 rounded-full cursor-grab active:cursor-grabbing"
          // drag="x"
          dragConstraints={sliderRef}
          onPan={(event, info) => {
            const rect = sliderRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = info.point.x - rect.left; //mouse point in screen above slider - slider position in screen (this gives mouse position inside slider)
            const percent = x / rect.width; //this gives what percentage of slider the mouse is in
            const nextValue = Math.round(percent * max); //this gives round value
            const clamped = Math.max(0, Math.min(max, nextValue)); //prevent overflow
            setValue(clamped);
          }}
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
      </div>
    </div>
  );
};
