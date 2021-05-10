
import { useApolloClient, useMutation } from '@apollo/client';
import { useNetInfo } from '@react-native-community/netinfo';
import React, {useState, useMemo, useCallback, useEffect, useRef} from 'react';
import fetchPolicy from '../../utils/fetchPolicy';
import DataContext from './Context';
import * as R from 'ramda';
import useUserData from '../data/useUserData';
import UseData from '../data/UseData';
import CompleteWorkout from '../../apollo/mutations/CompleteWorkout';
import { Auth } from 'aws-amplify';
import OfflineUtils from '../data/OfflineUtils';
import useLoading from '../loading/useLoading';


export default function DataProvider(props) {

    const {isConnected, isInternetReachable} = useNetInfo();
    const {firebaseLogEvent, analyticsEvents, getProfile} = useUserData();
    const {getProgramme} = UseData();
    const {setLoading} = useLoading();
  
    const [completeWorkout] = useMutation(CompleteWorkout);
  
  
    const offlineQueueCheck = useCallback( async() => {
      const user = await Auth.currentAuthenticatedUser().catch((err) => {
        return null;
      });

      const completedWorkoutsPayload = await OfflineUtils.getWorkoutPayloads();
      console.log("OfflineUtils: completedWorkoutsPayload", completedWorkoutsPayload.length);

      if (user && completedWorkoutsPayload.length > 0) {
       setLoading(true);
  
        // Do all completeWorkout mutations 
       const res = completedWorkoutsPayload.map(it => {
          return completeWorkout({
            variables: {
              input: it,   
            },
          })
        })
  

      Promise.all(res).then(async (result)=> {
        console.log("OfflineUtils: Promise.all", result);

        // Submit firebase logs
        const firebasePayload = await OfflineUtils.getFirebasePayloads()
        firebasePayload.map((it) => {
          firebaseLogEvent(analyticsEvents.completedWorkout, it);
        })

  
        // GetProgramme doens't return completed workouts straight away 
        setTimeout(async () => {
          await OfflineUtils.clearOfflineQueue();
          await getProfile();
          await getProgramme();
          setLoading(false);
        }, 5000);
        
      })
        
      }
    }, [isConnected, isInternetReachable, getProgramme, getProfile]);
  
  

    // On Network connection aquired
    useEffect(() => {
      console.log("OfflineUtils: hasInternet", isConnected && isInternetReachable)

      if (isConnected && isInternetReachable) {
        offlineQueueCheck();
      }
    }, [isConnected, isInternetReachable]);
  
    

  const values = useMemo(
    () => ({
        
      
    }),
    [
        
      
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <DataContext.Provider value={values}>{props.children}</DataContext.Provider>
  );
}