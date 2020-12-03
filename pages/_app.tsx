import { ApolloProvider, gql } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { getUsers } from "../lib/queries/index"

import "../styles/global.css";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  // apolloClient
  //   .query({
  //     query: gql(getUsers),
  //   })
  //   .then((result) => console.log("gql ", JSON.stringify(result)));
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
