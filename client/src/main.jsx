import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import reducers from './reducers';

// Configure GraphQL
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Configure context for token authentication
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Custom cache config to suppress apollo err msg
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
    User: {
      keyFields: ["_id"],
      fields: {
        friends: {
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

// Configure Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

// Configure Redux Store
const store = configureStore({
  reducer: reducers,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);
