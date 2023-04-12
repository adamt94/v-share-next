import { gql } from '@apollo/client'

export const GET_POPULAR_VIDEO_QUERY = gql`
  query popularVideos {
    getMostPopularVideos {
      title
      thumbnail
      src
      user
    }
  }
`

export type MessagesBySentDateQueryVariables = {
  roomId?: string
  createdAt?: string
  sortDirection?: 'ASC' | 'DESC'
  filter?: {
    user?: {
      eq?: string
    }
  }
  limit?: number
  nextToken?: string
}
export type Message = {
  user: string
  text: string
}

export type MessagesBySentDateQueryResult = {
  messagesBySentDate: {
    items: Message[]
    nextToken?: string
  }
}
export const MESSAGES_BY_SEND_DATE = gql`
  query MessagesBySentDate(
    $roomId: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesBySentDate(
      roomId: $roomId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        user
        text
      }
      nextToken
    }
  }
`
