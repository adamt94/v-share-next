import { gql } from '@apollo/client'

export const ON_CREATE_MESSAGE = gql`
  subscription OnCreateMessage {
    onCreateMessage {
      id
      createdAt
      user
      text
      roomId
      updatedAt
      fi
    }
  }
`

export const SUBSCRIBE_TO_LATEST_INTERACTION = gql `
  subscription SubscribetoLatesInteraction($room: String!) {
    subscribetoLatesInteraction(room: $room) {
      id
      room
      input
      createdAt
      user
      currentVideoTime
      isPlaying
      videoId
      updatedAt
    }
  }
`;
