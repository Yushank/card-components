"use client";

import React, { use, useEffect, useRef, useState } from "react";
// import { Slider } from "../Slider/Slider";
import { Slider2 } from "../Slider/Slider2";
import { Counter } from "../Counter/Counter";
import { motion } from "motion/react";
import { CounterBg } from "../Svg/CounterBg";

export const SlidercostCard = () => {
  const [value, setValue] = useState(1);

  return (
    <div className="relative h-110 w-150">
      <div className="flex flex-col items-center justify-around border border-gray-900 rounded-lg shadow-md w-full h-full">
        {/* HEADER */}
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
        {/* COUNTER */}
        <div className="relative w-[50%] h-[50%] flex items-center justify-center">
          <CounterBg className="w-70 h-40" />
          <div className="absolute shadow-md rounded-2xl py-4 w-[65%] flex justify-center items-center bg-white">
            <div className="flex font-inter font-semibold text-4xl text-shadow-black text-gray-700">
              $ <Counter value={value} />
            </div>
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
        <div className="w-[68%]">
          <Slider2 value={value} onChange={setValue} max={60} />
        </div>
      </div>
    </div>
  );
};
