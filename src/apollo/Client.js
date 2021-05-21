/*
 * Author: Joseph Clough (joseph.clough@thedistance.co.uk)
 * Created: Wed, 6th January 212021
 * Copyright 2021 - The Distance
 */
import {
  HttpLink,
  InMemoryCache,
  ApolloClient,
  ApolloLink,
} from '@apollo/client';
import {persistCache, AsyncStorageWrapper} from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';

import Authoriser from './ApolloMiddleware/Authoriser';
import {onError} from '@apollo/client/link/error';
import {RetryLink} from '@apollo/client/link/retry';

import Secrets from '../environment/Secrets';

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

  const authLink = new HttpLink({fetch: authFetch});

  const retryLink = new RetryLink({
    delay: {
      initial: 300,
      max: Infinity,
      jitter: true,
    },
    attempts: {
      max: 3,
      retryIf: (error, _operation) => !!error,
    },
  });

  const errorLink = onError((error) => {
    const {graphQLErrors, networkError} = error;

    if (graphQLErrors)
      graphQLErrors.map(({message, locations, path}) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    if (networkError)
      console.log(`[Network error]: ${networkError}`, networkError);
  });

  const cache = new InMemoryCache({});

  await persistCache({
    cache,
    storage: new AsyncStorageWrapper(AsyncStorage),
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, retryLink, authLink]),
    cache: cache,
  });

  return client;
}
