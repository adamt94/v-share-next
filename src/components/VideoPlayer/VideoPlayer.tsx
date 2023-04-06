import React from "react";

import dynamic from "next/dynamic";
// This fixed SSR hydration issue cause by react-player
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export default function VideoPlayer() {
  return (
    <section className="relative w-full">
      <ReactPlayer
        onReady={() => {}}
        width="100%"
        height="100%"
        onEnded={() => {}}
        controls={false}
        playing={false}
        volume={100}
        url={
          "https://www.youtube.com/embed/shW9i6k8cB0?autoplay=1&mute=0&controls=0&origin=https%3A%2F%2Fwww.v-share.tv&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1"
        }
        style={{
          position: "relative",
          paddingBottom: "56.25%",
        }}
        onProgress={() => {}}
        config={{
          youtube: {
            playerVars: { controls: 0 },
          },
        }}
        onDuration={() => {}}
      />
    </section>
  );
}
