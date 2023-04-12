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