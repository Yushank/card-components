"use client";

import {
  ArrowBigLeft,
  CircleX,
  Dot,
  SquareArrowDown,
  SquareArrowUp,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export const ShortnoteCard = () => {
  const [notes, setNotes] = useState<{ text: string; date: number }[]>([]);
  const [input, setInput] = useState("");
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [openedNote, setOpenedNote] = useState<number | null>(null);

  const mainRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(0);
  const [origin, setOrigin] = useState({ centerX: 0, centerY: 0 });

  function addNotes() {
    if (!input.trim()) return; //no input then return
    const newNote = { text: input, date: Date.now() };
    setNotes((prev) => [...prev, newNote]);
    setInput(""); //clear input
  }

  function dropMenu() {
    setIsMenuActive(!isMenuActive);
  }

  function deleteNote(index: number) {
    setNotes(notes.toSpliced(index, 1));
  }

  function openNote(index: number) {
    setIsNoteOpen(true);
    setOpenedNote(index);
  }

  //load notes from loaclstorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("short-notes");
    if (saved) {
      const parsed = JSON.parse(saved);
      const restored = parsed.map((note: { text: string; date: string }) => ({
        ...note,
        date: new Date(note.date),
      }));
      setNotes(restored);
    }
  }, []);

  //Save each notes when created to localstorage
  useEffect(() => {
    localStorage.setItem("short-notes", JSON.stringify(notes));
  }, [notes]); //whenever changes in notes happen it saves

  // clip path animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const calculateRadius = () => {
      if (!mainRef.current) return;

      const rect = mainRef.current.getBoundingClientRect();

      const centerX = rect.width / 2;
      const centerY = 0;

      setOrigin({ centerX, centerY });

      const distances = [
        Math.hypot(centerX, centerY),
        Math.hypot(window.innerWidth - centerX, centerY),
        Math.hypot(centerX, window.innerHeight - centerY),
        Math.hypot(window.innerWidth - centerX, window.innerHeight - centerY),
      ];

      return Math.max(...distances);
    };

    if (isMenuActive) {
      const maxRadius = calculateRadius();
      setRadius(0);

      requestAnimationFrame(() => {
        setRadius(maxRadius!);
      });
    } else {
      setRadius(0);
    }
  }, [isMenuActive]);

  return (
    <div className="relative h-80 w-60 overflow-hidden">
      {/* Menu is not active */}
      <>
        {/* MAIN NOTES SECTION */}
        <div
          className="absolute flex flex-col items-center bg-gray-50 border border-black rounded-lg h-full w-full p-2 justify-between"
          ref={mainRef}
        >
          {/* heading */}
          <div className="p-2 w-full flex justify-between">
            <p className="text-2xl font-helvetica font-medium text-gray-900">
              Short Notes
            </p>
            <SquareArrowDown
              className="w-4 h-4 cursor-pointer"
              onClick={dropMenu}
            />
          </div>

          {/* recent notes */}
          <div className="flex flex-col gap-4 p-4 w-full">
            <p className="text-sm font-helvetica font-light text-gray-400">
              recents
            </p>
            <div className="flex flex-col justify-around h-20 w-full overflow-hidden">
              {notes.slice(-2).map((note, i) => (
                <motion.div
                  className="flex text-sm font-helvetica font-light text-gray-900 bg-white/10 backdrop-blur-xl border border-white/20 rounded-md shadow-sm h-8"
                  key={note.date}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <Dot className="text-gray-900 shrink-0" />{" "}
                  <span className="truncate min-w-0">{note.text}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* input box */}
          <div className="flex flex-col items-center h-20 w-50">
            <input
              className="border rounded-lg h-20 w-full m-2 p-1"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addNotes();
              }}
              placeholder="I need to do..."
            ></input>
          </div>
        </div>

        {/* NOTES LIST SECTION */}
        <div
          ref={listRef}
          className={`absolute flex flex-col items-center bg-gray-900 border border-black rounded-lg h-full w-full p-2 transition-all duration-600 ease-in-out ${isMenuActive ? "visible" : "invisible"}`}
          style={{
            backgroundColor: "#101828",
            clipPath: `circle(${radius}px at ${origin.centerX}px ${origin.centerY}px)`,
          }}
          aria-hidden={!isMenuActive}
        >
          {/* heading */}
          <div className="p-2 w-full flex justify-between">
            <p className="text-2xl font-helvetica font-medium text-gray-50">
              Short Notes
            </p>
            <SquareArrowUp
              className="w-4 h-4 text-gray-50 cursor-pointer"
              onClick={dropMenu}
            />
          </div>

          {/* notes */}
          <div className="flex flex-col overflow-x-hidden gap-4 p-4 w-full">
            <AnimatePresence initial={false}>
              {notes.map((note, i) => (
                <motion.div
                  className="flex items-center relative cursor-pointer bg-white/10  border border-white/20 rounded-md h-8"
                  key={note.date}
                  onMouseEnter={() => setIsHovered(i)}
                  onMouseLeave={() => setIsHovered(null)}
                  onClick={() => openNote(i)}
                  layout
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    layout: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    },
                    // this makes the item shifts smoothly after deletion
                  }}
                >
                  {/* <p className="flex items-center text-sm font-helvetica font-light text-gray-100 truncate z-0"> */}
                  <Dot className="text-gray-100 shrink-0" />
                  <span className="truncate min-w-0 flex-1 text-sm font-helvetica font-light text-gray-100">
                    {note.text}
                  </span>
                  {/* </p> */}
                  {isHovered === i && (
                    <CircleX
                      className="text-gray-300 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); //prevent trigering the parent div from clicking, only this circle will be clicked
                        deleteNote(i);
                      }}
                    />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </>

      {/* Note is open */}
      <AnimatePresence>
        {isNoteOpen && (
          <motion.div
            key={notes[openedNote!].date}
            className="absolute flex flex-col items-center bg-gray-900 border border-black rounded-lg h-full w-full p-2 "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="flex flex-col p-2 w-full gap-4">
              <ArrowBigLeft
                className="text-gray-100 cursor-pointer"
                onClick={() => setIsNoteOpen(false)}
              />
              <div className="flex flex-col gap-10 pt-8 overflow-hidden">
                {/* note text */}
                <p className="text-gray-100 text-xl wrap-break-word overflow-hidden">
                  {openedNote !== null ? notes[openedNote].text : ""}
                </p>
                {/* note date */}
                <p className="text-gray-400 text-xs">
                  {openedNote !== null
                    ? new Date(notes[openedNote].date).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
