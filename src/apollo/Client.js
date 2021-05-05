/*
 * Author: Joseph Clough (joseph.clough@thedistance.co.uk)
 * Created: Wed, 6th January 212021
 * Copyright 2021 - The Distance
 */
import { HttpLink, InMemoryCache, ApolloClient } from '@apollo/client';
import { persistCache, AsyncStorageWrapper } from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';

import Authoriser from './ApolloMiddleware/Authoriser';
import {onError} from '@apollo/client/link/error';
import Secrets from '../environment/Secrets';

const errorLink = onError(
  ({graphQLErrors, networkError, operation, response}) => {
    if (graphQLErrors) {
      graphQLErrors.map(({message, locations, path}) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  },
);

export async function TDGraphQLProvider() {

  const authFetch = async (_, options) => {
    const storedLocale = await AsyncStorage.getItem('@language');

    const locale = storedLocale ? storedLocale : undefined;
    const translateMap = {
      'en-GB': 'en',
      'hi-IN': 'hi',
      'ur-IN': 'ur',
    };

    const {graphQLUrl} = Secrets();
    const Authorization = await Authoriser();

    const url = `${graphQLUrl}${Authorization ? 'auth' : 'graphql'}`;

    const headers = {
      ...options.headers,
      referer: 'rn',
      Authorization,
      'Accept-Language': translateMap[locale],
    };
    // console.log('headers', url);
    //console.log('headers', headers);
    return fetch(url, {
      ...options,
      headers: headers,
    });
  };

  const link = new HttpLink({fetch: authFetch});

  const cache =  new InMemoryCache({});

  await persistCache({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
  });

  const client = new ApolloClient({
    link: errorLink.concat(link),
    cache: cache,
  });

  return client;
}
