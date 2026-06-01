"use client";

import { motion, AnimatePresence } from "motion/react";
import React from "react";

const fontSize = 40;
const padding = 0;
const height = fontSize + padding;

export const Counter = ({ value }: { value: number }) => {
  const digits = String(value + 3).split("");
  //convert value into string then split, so we can work freely for each column

  return (
    <div
      style={{ fontSize, height, lineHeight: `${height}px` }}
      className="flex px-2 tabular-nums justify-center overflow-hidden"
    >
      <AnimatePresence mode="popLayout">
        {/* we map digits, if we have 9 we have one digitColumn if we have 10 a two char then another digitColumn will be rendered */}
        {digits.map((char, index) => {
          const placeValueKey = digits.length - 1 - index;
          //this let us move the characters on right index not animate abruptely
          //if we go from 9->10, thats going from 1 char to 2 char so 9 was in 0th index but when 10 comes the 1 char of 10 comes in 0th index
          //so now instead of rolling the numbers from 9->0 we roll 9->1, therefore with this maths we will roll 9-> 0 and it will not feel weird

          return (
            <DigitColumn
              key={`digit-${placeValueKey}`}
              digit={parseInt(char)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
};

function DigitColumn({ digit }: { digit: number }) {
  return (
    <div style={{ height }} className="relative w-[0.65em] overflow-hidden">
      <motion.div
        className="absolute inset-0 flex flex-col items-center w-full"
        initial={{ y: 0 }}
        animate={{ y: -digit * height }} //we just use motion.div internal animation to move the strip up and down instead of complex math
        transition={{
          type: "spring",
          stiffness: 160,
          damping: 22,
          mass: 0.6,
        }}
      >
        {[...Array(10).keys()].map((i) => (
          <span
            className="flex items-center justify-center w-full"
            key={i}
            style={{ height }}
          >
            {i}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
