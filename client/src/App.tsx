import React, { FC } from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import typeDefs from './typeDefs';

import Pages from './pages';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000/'
});

const client = new ApolloClient({
  cache,
  link,
  typeDefs
});

const App: FC = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Pages />
    </BrowserRouter>
  </ApolloProvider>
);
export default App;
