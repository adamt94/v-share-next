import React, { createContext, useState } from "react";
import Search from "../Search/Search";
import SidePanel from "../SidePanel/SidePanel";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

type VideoContextType = {
  currentVideoId: string;
  setCurrentVideoId: (url: string) => void;
};

export const CurrentVideoContext = createContext<VideoContextType>({
  currentVideoId: "",
  setCurrentVideoId: () => {},
});

export default function Room() {
  const [showSecondColumn, setShowSecondColumn] = useState<boolean>(false);
  const [currentVideoId, setCurrentVideoId] = useState<string>("");
  const firstColumnClass = showSecondColumn ? "w-full" : "w-full";

  const secondColumnClass = showSecondColumn ? "" : "hidden";

  return (
    <CurrentVideoContext.Provider value={{ currentVideoId, setCurrentVideoId }}>
      <div className="flex h-screen">
        <section
          className={`text-center flex flex-col gap-8 overflow-auto ${firstColumnClass}`}
          id="left-column"
        >
          <VideoPlayer />

          <section className="p-0  py-5 sm:p-5">
            <Search />
          </section>
        </section>
        <button
          onClick={() => {
            setShowSecondColumn(true);
          }}
          className={`absolute right-0 top-0 m-4 primary-container on-primary-container-text rounded-full p-2 focus:outline-none ${
            showSecondColumn && "hidden"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <aside
          className={`${secondColumnClass} overflow-hidden hide-scroll`}
          id="right-column"
        >
          <SidePanel
            isOpen={showSecondColumn}
            onToggle={(value) => {
              setShowSecondColumn(value);
            }}
          />
        </aside>
      </div>
    </CurrentVideoContext.Provider>
  );
}
