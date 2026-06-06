import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface sliderProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
}
export const Slider2 = ({ value, onChange, max }: sliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const stableCountRef = useRef(0);
  const lastActiveRef = useRef<number | null>(null);

  const [activeLine, setActiveLine] = useState<number | null>(null);

  const progress = (value / max) * 100;

  //take lineRef and from there take its boundingClientRect to know left and right distances
  //then match that with thumbRef, if it sits well on top of it then return that lineRef to
  const detectCollision = (): number | null => {
    if (!thumbRef.current) return null;

    const thumbRect = thumbRef.current.getBoundingClientRect();

    for (let i = 0; i < lineRef.current.length; i++) {
      const line = lineRef.current[i];
      if (!line) continue;
      const lineRect = line.getBoundingClientRect();
      if (
        thumbRect.right >= lineRect.left &&
        thumbRect.left <= lineRect.right
      ) {
        return i;
      }
    }
    return null;
  };

  const startCollisionLoop = () => {
    if (rafRef.current !== null) return; // already a loop is running

    stableCountRef.current = 0; //set the loop count to 0 initally
    lastActiveRef.current = null; //no active ref

    const loop = () => {
      const active = detectCollision();
      setActiveLine(active); //set the active line as the line which we got from checking collision in detectCollision

      if (active === lastActiveRef.current) {
        stableCountRef.current++;
      } else {
        stableCountRef.current = 0;
        lastActiveRef.current = null;
      }
      //if the active line is the same as last active line then keep the loop count increasing
      //if not then make the count 0 and last active as null
      //so that we can start count for new active line

      if (stableCountRef.current < 40) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        rafRef.current = null;
      }
      //if current loop count is still under 40 then keep the loop running
      //else return rafRef as null to reset it
      //why we do this? - because we check for 40ms if there is a change in active line, whether thumb has moved over new line
    };

    rafRef.current = requestAnimationFrame(loop);
  };

  //cancel any running loop on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const getValueFromX = (clientX: number) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = clientX - rect.left; //mouse point in screen above slider - slider position in screen (this gives mouse position inside slider)
    const percent = x / rect.width; //this gives what percentage of slider the mouse is in
    const nextValue = Math.round(percent * max); //this gives round value
    const clamped = Math.max(0, Math.min(max, nextValue)); //prevent overflow
    onChange(clamped);

    // once we get a new value from moving thumb on the slider, clicking or sliding
    //we cancel old active line loop and start new
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startCollisionLoop();
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
          {Array.from({ length: 60 }).map((_, i) => {
            // const barPct = (i / 9) * 100;

            return (
              <motion.div
                key={i}
                ref={(el) => {
                  lineRef.current[i] = el;
                }}
                // onClick={() => setValue(i)}
                className={"flex-1 h-4 bg-gray-300"}
                animate={{
                  scaleY: activeLine === i ? 2.5 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              />
            );
          })}
        </div>

        {/* THUMB */}
        <motion.div
          className="absolute top-0 w-4 h-4 bg-white border-4 border-gray-900 rounded-full cursor-grab active:cursor-grabbing pointer-events-none"
          // drag="x"
          // dragConstraints={sliderRef}

          ref={thumbRef}
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
