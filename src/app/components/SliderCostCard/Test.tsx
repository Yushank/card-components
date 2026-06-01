import React from "react";
import { CounterBg } from "../Svg/CounterBg";

export const Test = () => {
  return (
    <div className="relative w-100 h-100 bg-white-100 flex items-center justify-center">
      <CounterBg className="w-84 h-50" />
      <div className="absolute bg-white rounded-md shadow-md text-md w-[30%] h-[20%] flex items-center justify-center">
        Hello
      </div>
    </div>
  );
};
