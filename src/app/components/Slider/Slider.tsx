"use client";

import React, { useState } from "react";

export const Slider = () => {
  const [value, setValue] = useState(1);

  return (
    <div className="relative w-80 h-10 items-center">
      <input
        className="w-full custom-slider"
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <div className="absolute">{value}</div>
    </div>
  );
};
