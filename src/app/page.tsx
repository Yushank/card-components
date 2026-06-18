import React from "react";
import { ShortnoteCard } from "./components/ShortnoteCard/ShortnoteCard";
import { SlidercostCard } from "./components/SliderCostCard/SlidercostCard";
import { DynamicNav1 } from "./components/Dynamic-Navigation/DynamicNav1";
import { HoverCard } from "./components/HoverCard/HoverCard";
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      {/* <ShortnoteCard /> */}
      {/* <SlidercostCard /> */}
      {/* <DynamicNav1 /> */}
      <HoverCard />
    </div>
  );
}
