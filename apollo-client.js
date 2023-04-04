import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://pannfirhkfdgthaagou27kyu4a.appsync-api.eu-west-2.amazonaws.com/graphql",
    cache: new InMemoryCache(),
    headers: {
        "x-api-key": "da2-pmsyvd7wtnct3b4sbnjdxqbgxq"
    }
});

export default client;