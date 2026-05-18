"use client";

import React, { use, useEffect, useRef, useState } from "react";
// import { Slider } from "../Slider/Slider";
import { Slider2 } from "../Slider/Slider2";

export const SlidercostCard = () => {
  const [value, setValue] = useState(1);

  return (
    <div className="relative h-100 w-150">
      <div className="flex flex-col items-center justify-around border border-gray-900 rounded-lg shadow-md w-full h-full">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-bold font-doto text-gray-900">
            Pay only for what you generate
          </h1>
          <p className="text-xs font-inter text-gray-600">
            Start with a flat monthly rate that gives you
            <span className="text-gray-700 font-semibold pl-2">
              4000 credits.
            </span>
          </p>
        </div>
        <div className="">
          <div className="border rounded-2xl shadow-sm py-4 w-60 flex justify-center items-center">
            <p className="font-inter font-semibold tabular-nums text-5xl text-shadow-black text-gray-700">
              ${value * 3}
            </p>
          </div>
        </div>
        <div className=" flex flex-col gap-2">
          <p className="text-xs text-gray-800 font-inter font-semibold">
            This pricing scales as your generations do. No surprises - just
            usage.
          </p>
          <p className="text-xs text-gray-600 font-inter">
            Use the slider to preview your monthly cost. Custom pricing
            available.
          </p>
        </div>
        <div className="w-[68%] border border-blue-500">
          {/* <Slider value={value} onChange={setValue} /> */}
          <Slider2 />
        </div>
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
      bubble.style.left = `${Number(value * 3.8)}px`;
    }
  });
  return (
    <div className="w-120 h-10">
      <div className="relative items-center px-8">
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
      <div className="flex justify-between w-full">
        <p className="text-xs text-gray-600 font-inter">4000 credits</p>
        <p className="text-xs text-gray-600 font-inter">25000 credits</p>
      </div>
    </div>
  );
}
