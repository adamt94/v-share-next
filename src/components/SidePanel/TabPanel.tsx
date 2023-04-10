import React, { useContext, useState } from "react";
import { VideoQueueContext } from "../Room/Room";
import ChatTab from "./Tabs/ChatTab";
import VideoTab from "./Tabs/VideoTab";

type Tab = {
  title: string;
  content: React.ReactNode;
};
type TabPanelProps = {
  defaultTab?: number;
  tabs: Tab[];
};

type TabButtonProps = {
  index: number;
  onClick: () => void;
  label: string;
  style?: string;
};

const TabButton = ({ index, onClick, label, style }: TabButtonProps) => {
  return (
    <button
      tabIndex={index}
      className={`flex items-center flex-1 p-2 rounded-md h-full justify-center ${style}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center on-surface-text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17 9H3a1 1 0 00-1 1v6a1 1 0 001 1h14a1 1 0 001-1V10a1 1 0 00-1-1zM3 5a1 1 0 00-1 1v2a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1H3z" />
        </svg>
        <span>{label}</span>
      </div>
    </button>
  );
};

export const TabPanel = ({ defaultTab = 1, tabs }: TabPanelProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-4 w-full surface-1">
        <TabButton
          index={0}
          style="surface-1"
          onClick={() => {
            setActiveTab(1);
          }}
          label={"Messages"}
        />
        <TabButton
          index={0}
          onClick={() => {
            setActiveTab(2);
          }}
          label={"Video Queue"}
        />
      </div>
      <div className="h-full surface-1 flex-grow overflow-y-auto">
        <div
          className={`h-full ${
            activeTab === 1 ? "surface-1" : " "
          }   rounded-md`}
        >
          <div className="flex flex-col flex-grow w-full surface-1 shadow-xl rounded-lg h-full">
            {activeTab === 1 ? <ChatTab /> : <VideoTab />}
          </div>
        </div>
      </div>
    </div>
  );
};
