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
