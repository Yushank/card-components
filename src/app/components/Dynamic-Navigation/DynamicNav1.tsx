"use client";

import { Building, Cloud, GraduationCap, Sun } from "lucide-react";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export const DynamicNav1 = () => {
  const navLinks = [
    { title: "Office", icon: <Building /> },
    { title: "School", icon: <GraduationCap /> },
    { title: "Garden", icon: <Sun /> },
    { title: "Cloud", icon: <Cloud /> },
  ];

  const [isActive, setIsActive] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-center w-[60vw] h-[50vh] md:w-[30vw] shadow-md rounded-xl">
      <div className="flex items-center justify-center gap-4 w-full p-2">
        {navLinks.map((nav, i) => (
          <motion.div
            className="flex items-center relative h-12 gap-2 p-2 rounded-xl bg-gray-50 shadow-sm cursor-pointer overflow-hidden"
            key={i}
            onClick={() => setIsActive(i)}
            animate={{ width: isActive === i ? 100 : 50 }}
            // transition={{
            //   type: "tween",
            //   stiffness: 300,
            //   damping: 50,
            // }}
          >
            <div className="shrink-0 absolute top-3 left-3">{nav.icon}</div>
            <AnimatePresence>
              {isActive === i ? (
                <motion.div
                  className="overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.3,
                  }}
                >
                  <p className="absolute top-4 left-11 whitespace-nowrap text-sm font-medium">
                    {nav.title}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
