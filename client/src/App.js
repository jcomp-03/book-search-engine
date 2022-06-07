import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloProvider, // ApolloProvider is a special type of React component that we'll use to provide data to all of the other components.
  ApolloClient, // ApolloClient is a constructor function that will help initialize the connection to the GraphQL API server.
  InMemoryCache, // InMemoryCache enables the Apollo Client instance to cache API response data so that we can perform requests more efficiently.
  createHttpLink, // createHttpLink allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

// establish a new link to the GraphQL server at its /graphql endpoint with createHttpLink()
const httpLink = createHttpLink({
  uri: '/graphql',
});

// essentially a middleware function that will retrieve the token for us and combine 
// it with the existing httpLink. Use the setContext() function to retrieve the token 
// from localStorage and set the HTTP request headers of every request to include 
// the token, whether the request needs it or not. If the request doesn't need the token, 
// our server-side resolver function won't check for it.
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// use the ApolloClient() constructor to instantiate the Apollo Client instance and create
// the connection to the API endpoint. Also instantiate a new cache object using new InMemoryCache()
// combine the authLink and httpLink objects so that every request retrieves the token and sets 
// the request headers before making the request to the API.
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // enable our entire application to interact with our Apollo Client instance
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
