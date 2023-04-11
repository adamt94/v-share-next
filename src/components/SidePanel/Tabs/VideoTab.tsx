import { useCallback, useContext, useState } from "react";
// weird issue with dnd React Strict mode has to be disabled, issue not been fixed due to no more support
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import VideoCard from "./VideoCard";
import { CurrentVideoContext, VideoQueueContext } from "@/components/Room/Room";

import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function VideoTab() {
  const { videos, setVideos } = useContext(VideoQueueContext);
  const { setCurrentVideoId } = useContext(CurrentVideoContext);

  const onDragEnd = useCallback((result: DropResult) => {
    setVideos((prevVideos) => {
      const newVideos = [...prevVideos];
      const [removed] = newVideos.splice(result.source.index, 1);
      if (result.destination != null) {
        newVideos.splice(result.destination.index, 0, removed);
      }
      return newVideos;
    });
  }, []);

  if (videos.length === 0)
    return (
      <div className="flex flex-col justify-center items-center h-full on-surface-text opacity-70">
        Press the
        <AddCircleIcon className="mr-2" />
        to queue a video
      </div>
    );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="video-list">
          {(provided) => (
            <div
              className=" flex flex-col gap-5 p-5"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {videos.map((video, index) => (
                <VideoCard
                  key={video.src + index}
                  id={video.src + index}
                  heading={video.title}
                  subheading={video.user}
                  image={video.thumbnail}
                  onCardClick={() => {
                    setCurrentVideoId(video.src);
                  }}
                  onDelete={() => {
                    setVideos(videos.filter((_, i) => i !== index));
                  }}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
