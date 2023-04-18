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
export type MessageQuery = {
  user: string
  text: string
  roomId?: string
}

export type MessagesBySentDateQueryResult = {
  messagesBySentDate: {
    items: MessageQuery[]
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

export const GET_VIDEO_LIST_BY_RANK = gql`
  query VideoListByRank(
    $room: String
    $rank: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelVideoListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    videoListByRank(
      room: $room
      rank: $rank
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;


export const GET_LATEST_INTERACTION = gql`
  query LatestInteraction(
    $room: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInteractionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    latestInteraction(
      room: $room
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;

