"use client";

import React, { use, useEffect, useRef, useState } from "react";
// import { Slider } from "../Slider/Slider";

export const SlidercostCard = () => {
  const [value, setValue] = useState(1);

  return (
    <div className="relative h-100 w-150">
      <div className="flex flex-col items-center justify-around border border-gray-900 rounded-lg shadow-md w-full h-full">
        <div className="border rounded-lg shadow-sm w-60 p-10 flex justify-center items-center">
          <p className="font-helvetica text-4xl text-shadow-black text-gray-700">
            {value * 3}
          </p>
        </div>
        <Slider value={value} onChange={setValue} />
      </div>
    </div>
  );
};

function Slider({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const bubbleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bubble = bubbleRef.current;
    if (bubble) {
      bubble.style.left = `${Number(value * 3)}px`;
    }
  });
  return (
    <div className="relative w-80 h-10 items-center">
      <input
        className="w-full custom-slider"
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div ref={bubbleRef} className="absolute font-helvetica text-gray-800">
        {value}
      </div>
    </div>
  );
}
