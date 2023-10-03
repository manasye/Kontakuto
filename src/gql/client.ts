import { ApolloClient, InMemoryCache } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "https://wpe-hiring.tokopedia.net/graphql",
  cache,
});

persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage),
}).then(() => {
  console.log("Cache persisted to local storage");
});

export default client;
