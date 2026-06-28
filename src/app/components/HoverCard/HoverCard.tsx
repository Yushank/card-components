"use client";

import React, { useEffect, useState } from "react";

export const HoverCard = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [circleMove, setCircleMove] = useState({ x: 0, y: 0 });
  const [gyroActive, setGyroActive] = useState(false);
  // const [circleScale, setCircleScale] = useState({ x: 0, y: 0 });

  const handleMouseMovement = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    //rotaion according to mouse position inside event div
    //in a range of -1 to 1
    const deltaX = (event.clientX - centerX) / (rect.width / 2);
    const deltaY = (event.clientY - centerY) / (rect.height / 2);

    setRotation({
      z: deltaX * -20,
      y: deltaX * 30,
      x: deltaY * 60,
    });

    setMouseCoords({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });

    setCircleMove({
      x: deltaX * -20,
      y: deltaY * 20,
    });

    // setCircleScale({
    //   x: 1,
    //   y: 1,
    // });
  };

  const handleMouseLeave = () => {
    setRotation({
      x: 0,
      y: 0,
      z: 0,
    });

    setCircleMove({
      x: 0,
      y: 0,
    });

    // setCircleScale({
    //   x: 0,
    //   y: 0,
    // });
  };

  const activateGyro = () => {
    setGyroActive(true);
    window.addEventListener(
      "deviceorientation",
      function (event: DeviceOrientationEvent): void {
        const gamma: number = Math.round(event.gamma ?? 0);
        const beta: number = Math.round(event.beta ?? 0);
        const alpha: number = Math.round(event.alpha ?? 0);
        console.log("gamma:", gamma);
        console.log("beta:", beta);
        console.log("alpha:", alpha);

        setRotation({
          z: gamma * -20,
          y: alpha * 30,
          x: beta * 60,
        });

        setCircleMove({
          x: beta * -20,
          y: gamma * 20,
        });
      },
    );
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-2">
      <button
        className={`w-30 h-10 rounded-xl ${gyroActive ? "bg-black" : "bg-white"}  border border-gray-800 p-2 ${gyroActive ? "text-gray-100" : "text-gray-700"} text-md font-medium tracking-wider`}
        onClick={activateGyro}
      >
        Device
      </button>
      <div
        onMouseMove={handleMouseMovement}
        onMouseLeave={handleMouseLeave}
        className="w-120 h-120 flex items-center justify-center border border-blue-500 rounded-xl bg-[repeating-linear-gradient(315deg,#93c5fd_0,#ef4444_1px,transparent_1px,transparent_50%)] bg-size-[10px_10px]"
        style={{ perspective: "1000px" }}
      >
        <div
          id="card"
          className="relative w-60 h-80 rounded-xl border-2 border-green-600 bg-gray-50 transition-transform duration-100 ease-out"
          style={{
            transform: `rotateZ(${rotation.z}deg) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`,
          }}
        >
          <p className="text-xs p-2 font-bold text-gray-500">YUSH</p>
          {/* <p>gamma: {rotation.z}</p> */}
          {/* Mask Container */}
          <div className="absolute top-10 left-29.5 w-30 h-60 border border-green-500 rounded-l-full overflow-hidden">
            <div
              className="absolute top-0 left-0 w-60 h-60 bg-gray border border-green-500 rounded-full transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${circleMove.x * 1.2}px, ${circleMove.y * 1.2}px)`,
              }}
            />

            <div
              className="absolute top-0 left-0 w-60 h-60 border border-green-500 rounded-full transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${circleMove.x * 2.6}px, ${circleMove.y * 2.6}px)`,
              }}
            />

            <div
              className="absolute top-0 left-0 w-60 h-60 border border-green-500 rounded-full transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${circleMove.x * 4.2}px, ${circleMove.y * 4.2}px)`,
              }}
            />

            <div
              className="absolute top-0 left-0 w-60 h-60 border border-green-500  rounded-full transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${circleMove.x * 6.0}px, ${circleMove.y * 6.0}px)`,
              }}
            />

            <div
              className="absolute top-0 left-0 w-60 h-60 border border-green-500  rounded-full transition-transform duration-100 ease-out bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]"
              style={{
                transform: `translate(${circleMove.x * 8.0}px, ${circleMove.y * 8.0}px)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
