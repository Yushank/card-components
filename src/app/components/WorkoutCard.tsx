"use client";

import {
  ArrowBigLeft,
  CircleX,
  Dot,
  SquareArrowDown,
  SquareArrowUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export const WorkoutCard = () => {
  const [notes, setNotes] = useState<{ text: string; createdAt: Date }[]>([]);
  const [input, setInput] = useState("");
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [openedNote, setOpenedNote] = useState<number | null>(null);

  function addNotes() {
    if (!input.trim()) return; //no input then return
    setNotes((prev) => [...prev, { text: input, createdAt: new Date() }]);
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
      const restored = parsed.map(
        (note: { text: string; createdAt: string }) => ({
          ...note,
          createdAt: new Date(note.createdAt),
        }),
      );
      setNotes(restored);
    }
  }, []);

  //Save each notes when created to localstorage
  useEffect(() => {
    localStorage.setItem("short-notes", JSON.stringify(notes));
  }, [notes]); //whenever changes in notes happen it saves

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
                  <span className="truncate min-w-0">{note.text}</span>
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
      ) : //Menu is active
      !isNoteOpen ? (
        //Note is not open
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
                className="flex items-center relative cursor-pointer"
                key={i}
                onMouseEnter={() => setIsHovered(i)}
                onMouseLeave={() => setIsHovered(null)}
                onClick={() => openNote(i)}
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
              </div>
            ))}
          </div>
        </div>
      ) : (
        //Note is open
        <div className="flex flex-col items-center bg-gray-900 border border-black rounded-lg h-80 w-60 p-2">
          <div className="flex flex-col p-2 w-full gap-4">
            <ArrowBigLeft
              className="text-gray-100 cursor-pointer"
              onClick={() => setIsNoteOpen(false)}
            />
            <div className="flex flex-col gap-10 pt-8">
              {/* note text */}
              <p className="text-gray-100 text-xl">
                {openedNote !== null ? notes[openedNote].text : ""}
              </p>
              {/* note date */}
              <p className="text-gray-400 text-xs">
                {openedNote !== null
                  ? notes[openedNote].createdAt.toLocaleString("en-In", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : ""}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
