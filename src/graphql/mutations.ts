import { gql } from '@apollo/client'

export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      createdAt
      user
      text
      roomId
      updatedAt
    }
  }
`
export const CREATE_INTERACTIONS = gql `
  mutation CreateInteractions(
    $input: CreateInteractionsInput!
    $condition: ModelInteractionsConditionInput
  ) {
    createInteractions(input: $input, condition: $condition) {
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

export const UPDATE_VIDEO_LIST = gql`
  mutation UpdateVideoList(
    $input: UpdateVideoListInput!
    $condition: ModelVideoListConditionInput
  ) {
    updateVideoList(input: $input, condition: $condition) {
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

export const CREATE_VIDEO_LIST_ITEM = gql`
  mutation CreateVideoList(
    $input: CreateVideoListInput!
    $condition: ModelVideoListConditionInput
  ) {
    createVideoList(input: $input, condition: $condition) {
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

export const DELETE_VIDEO_LIST_ITEM = gql`
  mutation DeleteVideoList(
    $input: DeleteVideoListInput!
    $condition: ModelVideoListConditionInput
  ) {
    deleteVideoList(input: $input, condition: $condition) {
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