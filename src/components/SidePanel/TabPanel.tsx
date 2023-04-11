import React, { useState } from "react";
import ChatTab from "./Tabs/Chat/Chat";
import VideoTab from "./Tabs/VideoQueue/VideoQueue";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

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
  icon?: React.ReactNode;
};

const TabButton = ({ index, onClick, label, style, icon }: TabButtonProps) => {
  return (
    <button
      tabIndex={index}
      className={`flex items-center flex-1 p-2 rounded-md h-full justify-center ${style}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center on-surface-text ${style}">
        {icon}
        <span>{label}</span>
      </div>
    </button>
  );
};

export const TabPanel = ({ defaultTab = 1, tabs }: TabPanelProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="flex flex-col h-full surface-1">
      <div className="flex items-center space-x-4 w-full">
        <TabButton
          index={0}
          style="surface-1"
          onClick={() => {
            setActiveTab(1);
          }}
          icon={<ChatBubbleOutlineIcon />}
          label={"Messages"}
        />
        <TabButton
          index={0}
          onClick={() => {
            setActiveTab(2);
          }}
          icon={<FormatListBulletedIcon />}
          label={"Video Queue"}
        />
      </div>
      <div className="h-full  flex-grow overflow-y-auto">
        <div
          className={`h-full ${
            activeTab === 1 ? "surface-1" : " "
          }   rounded-md`}
        >
          <div className="flex flex-col flex-grow w-full shadow-xl rounded-lg h-full">
            {activeTab === 1 ? <ChatTab /> : <VideoTab />}
          </div>
        </div>
      </div>
    </div>
  );
};
