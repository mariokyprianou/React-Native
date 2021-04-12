
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { useNetInfo } from '@react-native-community/netinfo';
import React, {useState, useMemo, useCallback, useEffect, useRef} from 'react';
import ShareMedia from '../../apollo/queries/ShareMedia';
import fetchPolicy from '../../utils/fetchPolicy';
import DataContext from './Context';


export default function DataProvider(props) {

    const {isConnected, isInternetReachable} = useNetInfo();

    const client = useApolloClient();

    const ShareMediaType = {
        weekComplete: 'WEEK_COMPLETE',
        challengeComplete: 'CHALLENGE_COMPLETE', 
        progress: 'PROGRESS'
    };
    

    const getShareData = useCallback(async (shareType) => {

        return client.query({
            query: ShareMedia,
            fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
            variables: {
                type: shareType
            },
        })
        .then((res) => {
            return res.data.shareMedia;
        })
        .catch((err) => console.log(err, 'getShareData error'));
    }, []);


  // ** ** ** ** ** Memoize ** ** ** ** **

  const values = useMemo(
    () => ({
        ShareMediaType,
        getShareData
    }),
    [
        ShareMediaType,
        getShareData
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}