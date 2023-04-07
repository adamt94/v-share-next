import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Tooltip, Slider } from "@mui/material";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PersonIcon from "@mui/icons-material/Person";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";
import { convertToTime, convertToWholeSeconds } from "@/util/numberFormats";

// const useStyles = makeStyles({
//   volumeSlider: {
//     width: "3rem",
//     padding: "3px 0",
//     marginLeft: "2px",
//   },
//   slider: {
//     padding: 0,
//     position: "relative",
//   },
//   rail: {
//     height: "0.4rem",
//     bottom: 0,
//   },
//   sliderThumb: {
//     display: "none",
//   },
//   thumb: {
//     height: "14px",
//     width: "14px",
//     top: "-4px",
//   },
//   button: {
//     padding: "0px",
//   },
// });

// function ValueLabelComponent(props) {
//   const { children, open, valueLabelFormat } = props;
//   return (
//     <Tooltip open={open} enterTouchDelay={0} placement="top" title={}>
//       {children}
//     </Tooltip>
//   );
// }

type VideoPlayerControlsProps = {
  isPlaying: boolean;
  onPlaybackChange: () => void;
  onVolumeChange: (value: number) => void;
  onSeekMouseUp: (value: number) => void;
  onSeekMouseDown: () => void;
  onSeekChange: (value: number) => void;
  onSeek: boolean;
  played: number;
  hasNext: boolean;
  onNext: () => void;
  duration: number;
  elapsedTime: number;
  onToggleFullScreen: () => void;
  expandSeeker: boolean;
  numberOfUsers: number;
  volume: number;
};

export default function VideoPlayerControls({
  isPlaying,
  onPlaybackChange,
  onVolumeChange,
  onSeekMouseUp,
  onSeekMouseDown,
  onSeekChange,
  onSeek,
  played,
  hasNext,
  onNext,
  duration,
  elapsedTime,
  onToggleFullScreen,
  expandSeeker,
  numberOfUsers,
  volume,
}: VideoPlayerControlsProps) {
  const elapsedTimeString = convertToWholeSeconds(elapsedTime);
  return (
    <div className="surface-1">
      <div className="  px-2 w-full h-2 relative">
        <Slider
          className="p-0 absolute top-0 left-0 on-secondary secondary-text"
          min={0}
          onChange={(_, value) => {
            onSeekChange(value as number);
          }}
          value={elapsedTime}
          max={duration}
          onMouseDown={() => onSeekMouseDown()}
          onMouseUp={() => {}}
          onChangeCommitted={(_, value) => {
            onSeekMouseUp(value as number);
          }}
        />
      </div>
      <div className="flex items-center p-1 w-full gap-2">
        <button
          onClick={() => onPlaybackChange()}
          className="on-background-text"
        >
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon fontSize="medium" />}
        </button>
        <button
          disabled={hasNext == false}
          onClick={onNext}
          className="on-surface-text"
        >
          <SkipNextIcon fontSize="medium" />
        </button>
        <div className="flex flex-row w-36 px-4 gap-2 items-center">
          <button className="on-surface-text">
            <VolumeDownIcon fontSize="medium" />
          </button>
          <Slider
            className=" on-secondary secondary-text p-0"
            defaultValue={volume}
            onChange={(_, value) => onVolumeChange(value as number)}
            min={0}
            step={0.1}
            max={1}
            aria-labelledby="continuous-slider"
          />
        </div>
        <div className="flex flex-auto on-surface-text">
          <span>
            {convertToTime(elapsedTimeString) + "/" + convertToTime(duration)}
          </span>
        </div>

        <div className="on-surface-text">{numberOfUsers}</div>

        <PersonIcon className="secondary-text" />
        <button onClick={onToggleFullScreen} className=" on-surface-text">
          <FullscreenIcon fontSize="medium" />
        </button>
      </div>
    </div>
  );
}
