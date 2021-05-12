
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
import CompleteWorkoutWithRes from '../../apollo/mutations/CompleteWorkoutWithRes';


export default function DataProvider(props) {

    const {isConnected, isInternetReachable} = useNetInfo();
    const {firebaseLogEvent, analyticsEvents, getProfile} = useUserData();
    const {getProgramme, processProgramme} = UseData();
    const {setLoading} = useLoading();
  
    const [completeWorkout] = useMutation(CompleteWorkoutWithRes);
  
  
    const offlineQueueCheck = useCallback( async() => {
      const user = await Auth.currentAuthenticatedUser().catch((err) => {
        return null;
      });
      const completedWorkoutsPayload = await OfflineUtils.getWorkoutPayloads();
      console.log("OfflineUtils: completedWorkoutsPayload", completedWorkoutsPayload.length);

      if (user && completedWorkoutsPayload.length > 0) {
       setLoading(true);
  
        // Do all completeWorkout mutations 
      let completed = 0;
      const lastPayload = completedWorkoutsPayload.pop();


      // Complete all workouts expect last one 
      completedWorkoutsPayload.map(it => {
        completeWorkout({
          variables: {
            input: it,   
          },
        }).then(async () => {
          completed = completed + 1;

          if (completed === completedWorkoutsPayload.length) {

            // Complete last workout and return programme
            // Need to do this otherwise so we only get programme after submitting the last workout
            const res = await completeWorkout({
              variables: {
                input: lastPayload,   
              },
            });

            // Submit firebase logs
            const firebasePayload = await OfflineUtils.getFirebasePayloads()
            firebasePayload.map((it) => {
              firebaseLogEvent(analyticsEvents.completedWorkout, it);
            })

            processProgramme(res.data.completeWorkout.programme);
            await OfflineUtils.clearOfflineQueue();
            await getProfile();
            setLoading(false);
          }
        })
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