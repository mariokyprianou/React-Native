import React, {useMemo, useEffect, useRef, useCallback} from 'react';
import {AppState} from 'react-native';
import DataContext from './Context';
import UseData from '../data/UseData';
import useLoading from '../loading/useLoading';

const originalDelay = 40 * 60 * 1000; // 40 minutes

export default function DataProvider(props) {
  // APPSTATE REFTCH DATA
  const appState = useRef(AppState.currentState);
  const {setLoading} = useLoading();
  const {refetchData} = UseData();

  const intervalRef = useRef();

  const handleAppStateChange = (nextAppState) => {
    if (appState.current.match(/background/) && nextAppState === 'active') {
      console.log('App has come to the foreground! refetchData');
      refetchData();

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

  // ** ** ** ** ** Memoize ** ** ** ** **
  const values = useMemo(() => ({}), []);

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}
