import React, { useState } from "react";

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

export const TabPanel = ({ defaultTab = 0, tabs }: TabPanelProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center space-x-4 w-full surface-1">
        <TabButton
          index={0}
          onClick={() => {
            setActiveTab(1);
          }}
          label={"Messages"}
        />
        <TabButton
          index={0}
          style="surface-1"
          onClick={() => {
            setActiveTab(2);
          }}
          label={"Video Queue"}
        />
      </div>
      <div className="h-full surface-1 flex-grow">
        {" "}
        <div
          className={`h-full ${
            activeTab === 1 ? "surface-1" : ""
          }   rounded-md`}
        >
          <div className="flex flex-col flex-grow w-full surface-1 shadow-xl rounded-lg h-full">
            <div className="flex flex-col flex-grow h-0  overflow-auto p-4">
              <div className="flex w-full mt-2 space-x-3 max-w-xs">
                <div>
                  <div className="surface on-surface-text p-3 rounded-r-lg rounded-bl-lg">
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                  <span className="text-xs outline-text leading-none">
                    2 min ago
                  </span>
                </div>
              </div>
              <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div>
                  <div className="primary on-primary-text p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod.
                    </p>
                  </div>
                  <span className="text-xs outline-text leading-none">
                    2 min ago
                  </span>
                </div>
              </div>
              <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div>
                  <div className="primary on-primary-text p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                  </div>
                  <span className="text-xs outline-text leading-none">
                    2 min ago
                  </span>
                </div>
              </div>
              <div className="flex w-full mt-2 space-x-3 max-w-xs">
                <div>
                  <div className="surface on-surface-text p-3 rounded-r-lg rounded-bl-lg">
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                  </div>
                  <span className="text-xs outline-text leading-none">
                    2 min ago
                  </span>
                </div>
              </div>
              <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div>
                  <div className="primary text-white p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                  </div>
                  <span className="text-xs outline-text leading-none">
                    2 min ago
                  </span>
                </div>
              </div>
              <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div>
                  <div className="primary on-primary-text p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt.
                    </p>
                  </div>
                  <span className="text-xs outline-text leading-none">
                    2 min ago
                  </span>
                </div>
              </div>
              <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div>
                  <div className="primary on-primary-text p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                  </div>
                  <span className="text-xs outline-text leading-none">
                    2 min ago
                  </span>
                </div>
              </div>
              <div className="flex w-full mt-2 space-x-3 max-w-xs">
                <div>
                  <div className="surface on-surface-text p-3 rounded-r-lg rounded-bl-lg">
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                  </div>
                  <span className="text-xs outline-text leading-none">
                    2 min ago
                  </span>
                </div>
              </div>
              <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div>
                  <div className="primary on-primary-text p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">Lorem ipsum dolor sit.</p>
                  </div>
                  <span className="text-xs outline-text leading-none">
                    2 min ago
                  </span>
                </div>
              </div>
            </div>

            <div className="surface-1 p-4">
              <input
                className="flex items-center h-10 w-full rounded px-3 text-sm surface on-surface-text"
                type="text"
                placeholder="Type your message…"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
