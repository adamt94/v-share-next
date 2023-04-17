import React from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Tooltip
} from '@mui/material'

//icons
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import DeleteIcon from '@mui/icons-material/Delete'
import { Draggable } from 'react-beautiful-dnd'

export type VideoItemHorizontalProps = {
  id: string
  heading: string
  subheading: string
  image: string
  onCardClick: () => void
  onDelete: () => void
  index: number
}

export default function VideoItemHorizontal({
  id,
  heading,
  subheading,
  image,
  onCardClick,
  onDelete,
  index
}: VideoItemHorizontalProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card className="flex surface-variant h-40">
            <div className="w-1/2 relative">
              <CardContent className=" p-2 flex flex-col gap-3">
                <p className=" text-xs on-surface-variant-text">{heading}</p>
                <p className=" text-xs on-surface-variant-text opacity-70">
                  {subheading}
                </p>
              </CardContent>
              <div className="absolute bottom-1 right-1">
                <button
                  onClick={() => {
                    onDelete()
                  }}
                  aria-label="delete"
                >
                  <Tooltip title="delete" placement="top">
                    <DeleteIcon className="tertiary-text opacity-90" />
                  </Tooltip>
                </button>
              </div>
            </div>
            <CardActionArea onClick={onCardClick} className="w-1/2">
              <div className="h-full">
                <CardMedia
                  image={image}
                  title="heading"
                  className=" h-full w-full relative"
                />
                <div className="inset-0 absolute h-full w-full flex primary justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                  <PlayArrowIcon
                    style={{ fontSize: 90 }}
                    className="primary-text"
                  />
                </div>
                <div className="inset-0 absolute h-full w-full flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                  <PlayArrowIcon
                    style={{ fontSize: 90 }}
                    className="primary-text"
                  />
                </div>
              </div>
            </CardActionArea>
          </Card>
        </div>
      )}
    </Draggable>
  )
}
