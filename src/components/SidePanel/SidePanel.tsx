import React, { useState } from 'react'
import { TabPanel } from './TabPanel'

type SidePanelProps = {
  onToggle: (isOpen: boolean) => void
  isOpen?: boolean
  style?: React.CSSProperties
  togglePanel?: () => void
}

const SidePanel = ({ onToggle, isOpen }: SidePanelProps) => {
  const togglePanel = () => {
    onToggle(!isOpen)
  }

  return (
    <div className="flex flex-col h-full sm:h-screen">
      <TabPanel
        tabs={[
          {
            title: 'Messages',
            content: <p>testing</p>
          },
          {
            title: 'Video Queue',
            content: <p>testing</p>
          }
        ]}
      />
      <button
        onClick={togglePanel}
        className="absolute right-0  bottom-0 sm:top-0 sm:bottom-auto m-2 surface-variant on-surface-variant-text rounded-full focus:outline-none"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  )
}

export default SidePanel
