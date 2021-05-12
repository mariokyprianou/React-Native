
import { useApolloClient } from '@apollo/client';
import { useNetInfo } from '@react-native-community/netinfo';
import React, {useState, useMemo, useCallback, useEffect, useRef} from 'react';
import fetchPolicy from '../../utils/fetchPolicy';
import DataContext from './Context';
import * as R from 'ramda';


export default function DataProvider(props) {

    const {isConnected, isInternetReachable} = useNetInfo();
    const client = useApolloClient();


    const runQuery =  useCallback(async ({
        query,
        setValue,
        key,
        variables = {},
        }) => {

        return client.query({
            query,
            fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
            variables,
            })
            .then(res => {
                const newValue = R.path(['data', key], res);
                setValue && setValue(newValue);
                return {success: true};;
            })
            .catch(err => {
                console.warn(key, '- Err: ', err);
                return {success: false, error: err};
            });

    }, [client, fetchPolicy, isConnected, isInternetReachable]);

  // ** ** ** ** ** Memoize ** ** ** ** **

  const values = useMemo(
    () => ({
        runQuery
    }),
    [
        runQuery
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}