"use client";

import { CircleX, Dot, SquareArrowDown, SquareArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

export const WorkoutCard = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  function addNotes() {
    if (!input.trim()) return; //no input then return
    setNotes((prev) => [...prev, input]);
    setInput(""); //clear input
  }

  function dropMenu() {
    setIsMenuActive(!isMenuActive);
  }

  function deleteNote(index: number) {
    setNotes(notes.toSpliced(index, 1));
  }

  // useEffect(() => {

  // }, [notes])
  return (
    <div>
      {/* Menu is not active */}
      {!isMenuActive ? (
        <div className="flex flex-col items-center bg-gray-50 border border-black rounded-lg h-80 w-60 p-2">
          {/* HEADING */}
          <div className="p-2 w-full flex justify-between">
            <p className="text-2xl font-helvetica font-medium text-gray-900">
              Short Notes
            </p>
            <SquareArrowDown
              className="w-4 h-4 cursor-pointer"
              onClick={dropMenu}
            />
          </div>

          {/* RECENT NOTES */}
          <div className="flex flex-col gap-4 p-4 w-full">
            <p className="text-sm font-helvetica font-light text-gray-400">
              recents
            </p>
            <div className="flex flex-col gap-2 h-15 w-full overflow-hidden">
              {notes.slice(-2).map((note, i) => (
                <p
                  className="flex text-sm font-helvetica font-light text-gray-900"
                  key={i}
                >
                  <Dot className="text-gray-900 shrink-0" />{" "}
                  <span className="truncate min-w-0">{note}</span>
                </p>
              ))}
            </div>
          </div>

          {/* INPUT BOX */}
          <div className="flex flex-col items-center border rounded-xl h-30 w-50">
            <input
              className="border rounded-lg h-15 w-45 m-2 p-1"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addNotes();
              }}
              placeholder="I need to do..."
            ></input>
            <button
              className="rounded-lg w-45 h-7 bg-gray-900 text-gray-50 mt-1 border cursor-pointer"
              onClick={addNotes}
            >
              Add note
            </button>
          </div>
        </div>
      ) : (
        //Menu is active
        <div className="flex flex-col items-center bg-gray-900 border border-black rounded-lg h-80 w-60 p-2">
          {/* HEADING */}
          <div className="p-2 w-full flex justify-between">
            <p className="text-2xl font-helvetica font-medium text-gray-50">
              Short Notes
            </p>
            <SquareArrowUp
              className="w-4 h-4 text-gray-50 cursor-pointer"
              onClick={dropMenu}
            />
          </div>

          {/* NOTES */}
          <div className="flex flex-col overflow-x-hidden gap-4 p-4 w-full">
            {notes.map((note, i) => (
              <div
                className="flex items-center relative"
                key={i}
                onMouseEnter={() => setIsHovered(i)}
                onMouseLeave={() => setIsHovered(null)}
              >
                {/* <p className="flex items-center text-sm font-helvetica font-light text-gray-100 truncate z-0"> */}
                <Dot className="text-gray-100 shrink-0" />
                <span className="truncate min-w-0 flex-1 text-sm font-helvetica font-light text-gray-100">
                  {note}
                </span>
                {/* </p> */}
                {isHovered === i && (
                  <CircleX
                    className="text-gray-300 cursor-pointer"
                    onClick={() => deleteNote(i)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
