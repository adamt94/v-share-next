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
    }
  }
`
