/*
 * Created Date: Sat, 28th Dec 2019, 14:51:45 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

import {AsyncStorage} from '@react-native-community/async-storage';
import {persistCache} from 'apollo-cache-persist';
import {ApolloClient, InMemoryCache, HttpLink} from 'apollo-boost';

import Environment from '../environment/Environment';
import TypeDefs from './TypeDefs';
import Secrets from '../environment/Secrets';
import Authoriser from './ApolloMiddleware/Authoriser';

export default async () => {
  const cache = new InMemoryCache();

  // Set up the fetch and headers
  const apolloFetch = async (uri, options) => {
    // User Apollo Middleware
    const Authorization = await Authoriser();
    const updatedOptions = {
      ...options,
      headers: {
        ...options.headers,
        Authorization,
      },
    };

    return fetch(uri, updatedOptions);
  };

  // Set up Link to external GraphQL endpoint
  const secrets = Secrets(Environment);
  const graphQLUrl = secrets.graphQLUrl ?? '';
  const httpLink = new HttpLink({
    uri: graphQLUrl,
    fetch: apolloFetch,
  });

  const client = new ApolloClient({
    link: httpLink,
    cache,
    typeDefs: TypeDefs,
    connectToDevTools: true,
  });

  try {
    await persistCache({
      cache,
      storage: AsyncStorage,
      debug: true,
    });
  } catch (error) {
    console.error('Error restoring Apollo cache', error);
    return null;
  }

  return client;
};
