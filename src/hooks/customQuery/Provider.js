import {useApolloClient} from '@apollo/client';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
import React, {useMemo, useCallback} from 'react';
import DataContext from './Context';
import * as R from 'ramda';

export default function DataProvider(props) {
  const {isConnected, isInternetReachable} = useNetInfo();

  const client = useApolloClient();

  async function isNetworkAvailable() {
    const response = await NetInfo.fetch();
    return response.isConnected; //&& response.isInternetReachable;
  }

  const runQuery = useCallback(
    async ({query, setValue, key, variables = {}}) => {
      const res = await isNetworkAvailable();
      console.log(`Query for: ${key}`, res ? 'network-only' : 'cache-only');
      return client
        .query({
          query,
          fetchPolicy: res ? 'network-only' : 'cache-only',
          variables,
        })
        .then((res) => {
          const newValue = R.path(['data', key], res);
          setValue && setValue(newValue);
          return {success: true, value: newValue};
        })
        .catch((err) => {
          console.warn(key, '- Err: ', err);
          return {success: false, error: err};
        });
    },
    [client],
  );

  // ** ** ** ** ** Memoize ** ** ** ** **

  const values = useMemo(
    () => ({
      runQuery,
    }),
    [runQuery],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
