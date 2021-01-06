/*
 * Author: Joseph Clough (joseph.clough@thedistance.co.uk)
 * Created: Wed, 6th January 212021
 * Copyright 2021 - The Distance
 */
import {HttpLink, InMemoryCache, ApolloClient} from '@apollo/client';
import {persistCache} from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';
import TypeDefs from './TypeDefs';
import Authoriser from './ApolloMiddleware/Authoriser';
import {onError} from '@apollo/client/link/error';

const errorLink = onError(
  ({graphQLErrors, networkError, operation, response}) => {
    console.log('GQL-OPERATION', JSON.stringify(operation));
    console.log('GQL-RESPONSE', response);
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
  const cache = new InMemoryCache();
  const uri = 'https://7dljjjdaud.execute-api.ap-south-1.amazonaws.com/';

  const authFetch = async (_, options) => {
    const storedLocale = await AsyncStorage.getItem('@language');

    console.log('LOCALE', storedLocale);

    const locale = storedLocale ? storedLocale : undefined;
    const translateMap = {
      'en-GB': 'en',
      'hi-IN': 'hi',
      'ur-IN': 'ur',
    };
    const localisation = translateMap[locale];
    const Authorization = await Authoriser();
    console.log('AUTH', Authorization);
    const url = `https://7dljjjdaud.execute-api.ap-south-1.amazonaws.com/${
      Authorization ? 'auth' : 'graphql'
    }`;
    console.log('URL', url);
    console.log('GQL', options);
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        referer: 'rn',
        Authorization,
        'Accept-Language': localisation,
      },
    });
  };

  const link = new HttpLink({fetch: authFetch});

  const client = new ApolloClient({
    link: errorLink.concat(link),
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
}
