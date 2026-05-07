"use client";

import React, { useState } from "react";

export const Slider = () => {
  const [value, setValue] = useState(1);

  return (
    <div className="relative">
      <input
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
