import { useMutation } from "@apollo/client"
import { CREATE_INTERACTIONS } from "./mutations"

type UserInteraction = {
    input: string
    videoId: string
    isPlaying: boolean
    user: string
    currentVideoTime: number,
    room: string
}

export const sendUserInteraction = ({input,videoId, isPlaying, user, currentVideoTime, room}: UserInteraction) => {
    console.log("sendUserInteraction", input, videoId, isPlaying, user, currentVideoTime, room)
  const [setUserInteracted] = useMutation(CREATE_INTERACTIONS)
  setUserInteracted({
    variables: {
      input: {input: input, videoId: videoId, isPlaying: isPlaying, user: user, currentVideoTime: currentVideoTime, room: room
    }
  }})
}
    