import { ApolloClient, InMemoryCache } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import { split, HttpLink } from '@apollo/client'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from '@apollo/client/link/ws'

import { v4 as uuid4 } from 'uuid'
import { print as graphqlPrinter } from 'graphql'

const API_URL =
  'https://pannfirhkfdgthaagou27kyu4a.appsync-api.eu-west-2.amazonaws.com/graphql'
const API_KEY = 'da2-pmsyvd7wtnct3b4sbnjdxqbgxq'
const WSS_URL = API_URL.replace('https', 'wss').replace(
  'appsync-api',
  'appsync-realtime-api'
)
const HOST = API_URL.replace('https://', '').replace('/graphql', '')
const api_header = {
  host: HOST,
  'x-api-key': API_KEY
}

const header_encode = (obj) => btoa(JSON.stringify(obj))
const connection_url =
  WSS_URL +
  '?header=' +
  header_encode(api_header) +
  '&payload=' +
  header_encode({})

class UUIDOperationIdSubscriptionClient extends SubscriptionClient {
  generateOperationId() {
    // AppSync recommends using UUIDs for Subscription IDs but SubscriptionClient uses an incrementing number
    return uuid4()
  }
  processReceivedData(receivedData) {
    try {
      const parsedMessage = JSON.parse(receivedData)
      if (parsedMessage?.type === 'start_ack') return // sent by AppSync but meaningless to us
    } catch (e) {
      throw new Error('Message must be JSON-parsable. Got: ' + receivedData)
    }
    super.processReceivedData(receivedData)
  }
}

const createAppSyncGraphQLOperationAdapter = () => ({
  applyMiddleware: async (options, next) => {
    // AppSync expects GraphQL operation to be defined as a JSON-encoded object in a "data" property
    options.data = JSON.stringify({
      query:
        typeof options.query === 'string'
          ? options.query
          : graphqlPrinter(options.query),
      variables: options.variables
    })

    // AppSync only permits authorized operations
    options.extensions = { authorization: api_header }

    // AppSync does not care about these properties
    delete options.operationName
    delete options.variables
    // Not deleting "query" property as SubscriptionClient validation requires it

    next()
  }
})

const wsLink =
  typeof window !== 'undefined'
    ? new UUIDOperationIdSubscriptionClient(
        connection_url,
        {
          timeout: 5 * 60 * 1000,
          reconnect: true,
          lazy: true,
          connectionCallback: (err) =>
            console.log('connectionCallback', err ? 'ERR' : 'OK', err || '')
        },
        WebSocket
      ).use([createAppSyncGraphQLOperationAdapter()])
    : null

// const wsLink =
//     typeof window !== "undefined"? new WebSocketLink(
//       new SubscriptionClient("wss://pannfirhkfdgthaagou27kyu4a.appsync-api.eu-west-2.amazonaws.com/graphql", {
//         connectionParams: {
//           authToken: "da2-pmsyvd7wtnct3b4sbnjdxqbgxq"
//         }
//       })
//     ) : null;

const httpLink = new HttpLink({
  uri: 'https://pannfirhkfdgthaagou27kyu4a.appsync-api.eu-west-2.amazonaws.com/graphql',
  headers: {
    'x-api-key': 'da2-pmsyvd7wtnct3b4sbnjdxqbgxq'
  }
})

const splitlink =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        wsLink,
        httpLink
      )
    : null

const client = new ApolloClient({
  link: splitlink,

  cache: new InMemoryCache()
})

export default client
