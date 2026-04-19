"use client";

import { Dot } from "lucide-react";
import React, { useEffect, useState } from "react";

export const WorkoutCard = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState("");

  function addNotes() {
    if (!input.trim()) return; //no input then return
    setNotes((prev) => [...prev, input]);
    setInput(""); //clear input
  }

  // useEffect(() => {

  // }, [notes])
  return (
    <div className="flex flex-col items-center bg-gray-50 border border-black rounded-lg h-80 w-60 p-2">
      {/* HEADING */}
      <div className="p-2 w-full">
        <p className="text-2xl font-helvetica font-medium text-gray-900">
          Short Notes
        </p>
      </div>

      {/* RECENT NOTES */}
      <div className="flex flex-col gap-4 p-4 w-full">
        <p className="text-sm font-helvetica font-light text-gray-400">
          recents
        </p>
        <div className="flex flex-col gap-2 h-15 w-full overflow-hidden">
          {notes.map((note, i) => (
            <p
              className="flex text-sm font-helvetica font-light text-gray-900"
              key={i}
            >
              <Dot /> <span className="truncate">{note}</span>
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
  );
};
