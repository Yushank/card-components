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
          <Slider2 value={value} onChange={setValue} max={9} />
        </div>
      </div>
    </div>
  );
};
