"use client";

import { Building, Cloud, GraduationCap, Sun } from "lucide-react";
import React, { useState } from "react";
import { motion } from "motion/react";

export const DynamicNav1 = () => {
  const navLinks = [
    { title: "Office", icon: <Building /> },
    { title: "School", icon: <GraduationCap /> },
    { title: "Garden", icon: <Sun /> },
    { title: "Cloud", icon: <Cloud /> },
  ];

  const [isActive, setIsActive] = useState<Number | null>(null);

  return (
    <div className="flex items-center justify-center w-[60vw] h-[50vh] md:w-[30vw] shadow-md rounded-xl">
      <div className="flex items-center justify-center gap-2 w-full p-2">
        {navLinks.map((nav, i) => (
          <motion.div
            className="flex items-center justify-center h-12 w-16 gap-2 overflow-hidden rounded-xl border border-gray-400 cursor-pointer"
            key={i}
            onClick={() => setIsActive(i)}
            animate={{ width: isActive === i ? 100 : 50 }}
          >
            <span>{nav.icon}</span>
            {isActive === i ? <span>{nav.title}</span> : " "}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
