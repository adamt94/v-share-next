import React, { useContext, useRef, useState } from "react";

import dynamic from "next/dynamic";
import { CurrentVideoContext } from "../Room/Room";
import VideoPlayerControls from "./VideoPlayerControls";
import { BaseReactPlayerProps } from "react-player/base";
import ReactPlayer from "react-player";
// This fixed SSR hydration issue cause by react-player
const ReactVideoPlayer = dynamic(() => import("./ReactPlayerWrapper"), {
  ssr: false,
});

export default function VideoPlayer() {
  const { currentVideoId } = useContext(CurrentVideoContext);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.1);
  const [duration, setDuration] = useState<number>(0);
  const [playedSeconds, setPlayedSeconds] = useState<number>(0);
  const [onSeeking, setOnSeeking] = useState<boolean>(false);
  const player = useRef<ReactPlayer>(null);

  const seekTo = (value: number) => {
    if (!player?.current) return;
    setPlayedSeconds(value);
    player.current.seekTo(value, "seconds");
  };

  const handleSeekMouseUp = (value: number) => {
    setOnSeeking(false);
    seekTo(value);
  };

  const handleSeekMouseDown = () => {
    setOnSeeking(true);
  };

  return (
    <section className="relative w-full flex flex-col">
      <ReactVideoPlayer
        playerRef={player}
        playerProps={{
          width: "100%",
          height: "100%",
          onEnded: () => {},
          controls: false,
          playing: isPlaying,
          volume: volume,
          url: currentVideoId,
          style: {
            position: "relative",
            paddingBottom: "56.25%",
          },
          onSeek: () => {
            console.log("onSeek");
            setOnSeeking(false);
          },
          onProgress: (data) => {
            if (!onSeeking) {
              setPlayedSeconds(data.playedSeconds);
            }
          },
          config: {
            youtube: {
              playerVars: { controls: 0 },
            },
          },
          onDuration: (data) => setDuration(data),
        }}
      />
      <VideoPlayerControls
        isPlaying={isPlaying}
        onPlaybackChange={() => {
          setIsPlaying(!isPlaying);
        }}
        volume={volume}
        onVolumeChange={(value: number) => setVolume(value)}
        onSeekChange={seekTo}
        onSeekMouseUp={handleSeekMouseUp}
        onSeekMouseDown={handleSeekMouseDown}
        onSeek={onSeeking}
        played={0}
        hasNext={false}
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
        duration={duration}
        elapsedTime={playedSeconds}
        onToggleFullScreen={function (): void {
          throw new Error("Function not implemented.");
        }}
        expandSeeker={false}
        numberOfUsers={0}
      />
    </section>
  );
}
