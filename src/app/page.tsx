import React from "react";
import { ShortnoteCard } from "./components/ShortnoteCard/ShortnoteCard";
import { SlidercostCard } from "./components/SliderCostCard/SlidercostCard";
export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      {/* <ShortnoteCard /> */}
      <SlidercostCard />
    </div>
  );
}
