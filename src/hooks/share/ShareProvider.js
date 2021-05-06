
import { useApolloClient } from '@apollo/client';
import React, {useState, useMemo, useCallback, useEffect, useRef} from 'react';
import ShareMedia from '../../apollo/queries/ShareMedia';
import DataContext from './Context';


export default function DataProvider(props) {

    const client = useApolloClient();

    const ShareMediaType = {
        weekComplete: 'WEEK_COMPLETE',
        challengeComplete: 'CHALLENGE_COMPLETE', 
        progress: 'PROGRESS'
    };
    

    const getShareData = useCallback(async (shareType) => {

        return client.query({
            query: ShareMedia,
            fetchPolicy: 'no-cache',
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