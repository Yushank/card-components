import React from "react";

export const CounterBg = ({ className = "" }) => {
  return (
    <div className={`z-0 ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 178 107"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="9" y="12" width="160" height="80" fill="#F2F3EE" />
        <rect width="9" height="12" fill="#F2F3EE" />
        <rect y="68" width="9" height="12" fill="#F2F3EE" />
        <rect x="9" y="68" width="9" height="12" fill="white" />
        <rect x="160" y="80" width="9" height="12" fill="white" />
        <rect x="165" y="12" width="9" height="12" fill="white" />
        <rect x="156" y="3" width="9" height="12" fill="white" />
        <rect x="9" y="6" width="9" height="12" fill="white" />
        <rect x="169" y="92" width="9" height="12" fill="#F2F3EE" />
        <rect x="169" width="9" height="12" fill="#F2F3EE" />
        <rect x="1" y="95" width="9" height="12" fill="#F2F3EE" />
      </svg>
    </div>
  );
};
