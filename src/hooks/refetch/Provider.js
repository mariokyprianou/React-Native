import React, {useMemo, useEffect, useRef, useCallback, useState} from 'react';
import {AppState} from 'react-native';
import DataContext from './Context';
import UseData from '../data/UseData';
import useLoading from '../loading/useLoading';
import useCommonData from '../data/useCommonData';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';

const originalDelay = 40 * 60 * 1000; // 40 minutes

export default function DataProvider(props) {
  // APPSTATE REFTCH DATA
  const appState = useRef(AppState.currentState);
  const {setLoading} = useLoading();
  const {refetchData} = UseData();
  const {getTrainers} = useCommonData();

  const {isConnected, isInternetReachable} = useNetInfo();
  // ** ** ** ** ** App State Change Refetch Handling  ** ** ** ** **
  const handleAppStateChange = (nextAppState) => {
    if (appState.current.match(/background/) && nextAppState === 'active') {
      console.log('App has come to the foreground! refetchData');
      refetchData();
      getTrainers();

      initInterval();
    }
    appState.current = nextAppState;
    console.log('appState.current', appState.current);
  };

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);
  // ** ** ** ** ** App State Change Refetch Handling  ** ** ** ** **

  // ** ** ** ** ** Interval Refetch Handling  ** ** ** ** **
  const intervalRef = useRef();

  const cancelInterval = useCallback(async () => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }, []);

  const initInterval = useCallback(async () => {
    console.log('Delay change: schedule refetch in 40 minutes');

    await cancelInterval();
    intervalRef.current = setInterval(() => {
      console.log('Delayed refetch! refetchData');
      refetchData();
    }, originalDelay);
  }, []);

  useEffect(() => {
    initInterval();
    return () => {
      cancelInterval();
    };
  }, []);
  // ** ** ** ** ** Interval Refetch Handling  ** ** ** ** **

  // ** ** ** ** ** Network Change Refetch Handling  ** ** ** ** **

  const [needRefetch, setNeedRefetch] = useState(false);

  useEffect(() => {
    if (needRefetch && isConnected && isInternetReachable) {
      console.log('RefetchHandler: Back online and needRefetch');

      refetchData();
      getTrainers();
      initInterval();
      setNeedRefetch(false);
    }
  }, [
    needRefetch,
    isConnected,
    isInternetReachable,
    refetchData,
    getTrainers,
    initInterval,
  ]);

  const networkListener = (state) => {
    if (!state.isConnected && !state.isInternetReachable) {
      console.log('RefetchHandler: went offline, needRefetch');

      setNeedRefetch(true);
    }
  };

  useEffect(() => {
    NetInfo.addEventListener(networkListener);
  }, []);
  // ** ** ** ** ** Network Change Refetch Handling  ** ** ** ** **

  // ** ** ** ** ** Memoize ** ** ** ** **
  const values = useMemo(() => ({}), []);

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
