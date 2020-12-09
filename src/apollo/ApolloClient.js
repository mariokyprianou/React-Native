/*
 * Created Date: Sat, 28th Dec 2019, 14:51:45 pm
 * Author: James Shaw
 * Email: james.shaw@thedistance.co.uk
 * Copyright (c) 2019 The Distance
 */

import {AsyncStorage} from 'react-native';
import {persistCache} from 'apollo-cache-persist';
import {ApolloClient, InMemoryCache, HttpLink} from 'apollo-boost';

import Environment from '../environment/Environment';
import TypeDefs from './TypeDefs';
import Secrets from '../environment/Secrets';
import Authoriser from './ApolloMiddleware/Authoriser';

export default async () => {
  const cache = new InMemoryCache();

  // Set up the fetch and headers
  const awsGraphQLFetch = async (uri, options) => {
    const storedLocale = await AsyncStorage.getItem('@language');

    console.log('LOCALE', storedLocale);
    console.log(Secrets('development'), '<---secrets');

    const locale = storedLocale ? storedLocale : undefined;
    const translateMap = {
      'en-GB': 'en',
      'hi-IN': 'hi',
      'ur-IN': 'ur',
    };
    const localisation = translateMap[locale];

    const Authorization = await Authoriser();

    const updatedOptions = {
      ...options,
      headers: {
        ...options.headers,
        Authorization,
        'Accept-Language': localisation,
      },
    };

    return fetch(uri, updatedOptions);
  };

  // Set up Link to external GraphQL endpoint
  const secrets = Secrets(Environment);
  const graphQLUrl = secrets.graphQLUrl ?? 'http://localhost:4000/';

  const httpLink = new HttpLink({
    uri: 'https://7dljjjdaud.execute-api.ap-south-1.amazonaws.com/graphql',
    fetch: awsGraphQLFetch,
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
