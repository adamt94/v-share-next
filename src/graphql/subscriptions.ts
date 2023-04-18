import { gql } from '@apollo/client'

export const ON_CREATE_MESSAGE = gql`
subscription OnCreateMessage {
    onCreateMessage {
      createdAt
      id
      roomId
      text
      updatedAt
      user
    }
  }
`

export const SUBSCRIBE_TO_LATEST_INTERACTION = gql `
  subscription subscribetoLatesInteraction($room: String!) {
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

export const SUBSCRIBE_TO_VIDEO_LIST = gql `
  subscription SubscribetoVideoList($room: String!) {
    subscribetoVideoList(room: $room) {
      id
      room
      videoId
      description
      title
      channelTitle
      imgurl
      rank
      platform
      src
      thumbnail
      user
      live
      started_at
      createdAt
      updatedAt
    }
  }
`;


export const SUBSCRIBE_TO_MESSAGES = gql`
  subscription SubscribeToMessages($roomId: String!) {
    subscribeToMessages(roomId: $roomId) {
      roomId
      text
      user
    }
  }
`;
  
