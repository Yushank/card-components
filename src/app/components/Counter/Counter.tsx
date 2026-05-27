"use client";

import { MotionValue, useSpring, useTransform, motion } from "motion/react";
import React, { useEffect } from "react";

const fontSize = 50;
const padding = 0;
const height = fontSize + padding;

export const Counter = ({ value }: { value: number }) => {
  return (
    <div style={{ fontSize }} className="overflow-hidden px-6">
      <Digit value={value} />
    </div>
  );
};

function Digit({ value }: { value: number }) {
  let animatedValue = useSpring(value);
  //   console.log("animated value:", animatedValue);

  useEffect(() => {
    animatedValue.set(value);
  }, [value, animatedValue]);

  return (
    <div style={{ height }} className="relative w-10 tabular-nums">
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue; number: number }) {
  let y = useTransform(mv, (latest) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span
      style={{ y }}
      className="absolute inset-0 flex items-center justify-center "
    >
      {number * 3 + 3}
    </motion.span>
  );
}
