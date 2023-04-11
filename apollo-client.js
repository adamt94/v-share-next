import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';

//https://pannfirhkfdgthaagou27kyu4a.appsync-api.eu-west-2.amazonaws.com/graphql
//  headers: {
//     "x-api-key": "da2-pmsyvd7wtnct3b4sbnjdxqbgxq"
// }
const wsLink =
    typeof window !== "undefined"? new GraphQLWsLink(createClient({
    url: 'ws://pannfirhkfdgthaagou27kyu4a.appsync-api.eu-west-2.amazonaws.com/graphqls',
    connectionParams: {
        authToken: 'da2-pmsyvd7wtnct3b4sbnjdxqbgxq',
      },
  })) : null;

  const httpLink = new HttpLink({
    uri: 'https://pannfirhkfdgthaagou27kyu4a.appsync-api.eu-west-2.amazonaws.com/graphql',
    headers: {
            "x-api-key": "da2-pmsyvd7wtnct3b4sbnjdxqbgxq"
        }
  });


  const splitlink =
  typeof window !== "undefined" && wsLink != null? split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  ): null

const client = new ApolloClient({link: splitlink,

      cache: new InMemoryCache()
});

export default client;