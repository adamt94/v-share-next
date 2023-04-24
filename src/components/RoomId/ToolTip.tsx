import React, { ReactNode, useEffect, useRef, useState } from 'react'

interface TooltipProps {
  children: ReactNode
  text: string
  defaultShowTooltip?: boolean
  disabled?: boolean
}

function Tooltip({
  children,
  text,
  defaultShowTooltip = false,
  disabled
}: TooltipProps) {
  const [showTooltip, setShowTooltip] = useState(defaultShowTooltip)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const outerTooltipRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (!defaultShowTooltip) setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    if (!defaultShowTooltip) setShowTooltip(false)
  }

  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      const tooltipWidth = tooltipRef.current.offsetWidth
      const outerTooltipWidth = outerTooltipRef.current?.offsetWidth
      const tooltipx = tooltipWidth / 2
      const outerTooltipx = outerTooltipWidth / 2
      const position = tooltipx - outerTooltipx
      if (tooltipWidth) {
        tooltipRef.current.style.left = `${-(position / 2)}px`
      }
    }
  }, [])

  if (disabled) return <>{children}</>

  return (
    <div
      ref={outerTooltipRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute top-0 -translate-y-10 z-10  p-1 px-2 text-sm on-tertiary-container-text tertiary-container rounded-lg shadow-lg"
        >
          {text}
        </div>
      )}
    </div>
  )
}

export default Tooltip
