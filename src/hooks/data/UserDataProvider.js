/*
 * Created Date: Thu, 14th Jan 2021, 16:39:16 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2021 JM APP DEVELOPMENT LTD
 */

import React, {useState, useCallback} from 'react';
import {Platform} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import {useLazyQuery} from '@apollo/client';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';
import UserDataContext from './UserDataContext';
import Preferences from '../../apollo/queries/Preferences';
import * as R from 'ramda';
import {format} from 'date-fns';
import analytics from '@react-native-firebase/analytics';

export default function UserDataProvider(props) {
  const {isConnected, isInternetReachable} = useNetInfo();

  const [userData, setUserData] = useState({});
  const [preferences, setPreferences] = useState({});

  const [timeZones, setTimeZones] = useState([
    'Asia/Kolkata',
    'Europe/London',
    'Africa/Johannesburg',
    'America/Cordoba',
    'America/Honolulu',
    'America/Anchorage',
    'America/Campo_Grande',
    'America/Chicago',
    'America/Detroit',
    'America/Halifax',
    'America/Los_Angeles',
    'America/New_York',
    'America/Noronha',
    'America/Phoenix',
    'America/Sao_Paulo',
    'America/St_Johns',
    'America/Vancouver',
    'Asia/Aden',
    'Asia/Colombo',
    'Asia/Dhaka',
    'Asia/Dubai',
    'Asia/Jakarta',
    'Asia/Jerusalem',
    'Asia/Kabul',
    'Asia/Kamchatka',
    'Asia/Karachi',
    'Asia/Kathmandu',
    'Asia/Makassar',
    'Asia/Moscow',
    'Asia/Muscat',
    'Asia/Qatar',
    'Asia/Riyadh',
    'Asia/Seoul',
    'Asia/Shanghai',
    'Asia/Taipei',
    'Asia/Tehran',
    'Asia/Tokyo',
    'Asia/Urumqi',
    'Atlantic/Cape_Verde',
    'Australia/Adelaide',
    'Australia/Darwin',
    'Australia/Syndey',
    'Europe/Istanbul',
    'Europe/Madrid',
    'Europe/Paris',
    'Europe/Rome',
    'Pacific/Pago_Pago',
    'Pacific/Tongatapu',
  ]);

  const [analyticsEvents] = useState({
    registration: 'REGISTRATION', // done
    signIn: 'SIGN_IN', // done
    selectedTrainer: 'SELECTED_TRAINER', // dne
    leftTrainer: 'LEFT_TRAINER', // done
    restartContinueTrainer: 'RESTART_CONTINUE_TRAINER', // done
    completedWorkout: 'COMPLETED_WORKOUT', // done
    startedWorkout: 'STARTED_WORKOUT', // done
    completedExercise: 'COMPLETED_EXERCISE', // done
    startedExercise: 'STARTED_EXERCISE', // done
    newSubscription: 'SUBSCRIPTION',
    cancelSubscription: 'CANCEL_SUBSCRIPTION',
    completedChallenge: 'COMPLETED_CHALLENGE',
    accessedIntercom: 'ACCESSED_INTERCOM', // done
    shareSelectedTrainer: 'SHARE_SELECTED_TRAINER', // done
    shareCompletedWorkout: 'SHARE_COMPLETED_WORKOUT', // done
    shareCompletedChallenge: 'SHARE_COMPLETED_CHALLENGE',
    shareTransformation: 'SHARE_TRANSFORMATION', // done
  });

  const [getPreferences] = useLazyQuery(Preferences, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      const data = res.preferences;
      setPreferences(data);
    },
    onError: (error) => console.log(error),
  });

  const permissionsNeeded = useCallback(async () => {
    if (Platform.OS !== 'ios') {
      return null;
    }

    const analyticsEnabled = await AsyncStorage.getItem('@ANALYTICS_ASKED');
    const notificationsEnabled = await AsyncStorage.getItem(
      '@NOTIFICATIONS_ASKED',
    );

    if (R.isNil(notificationsEnabled)) {
      return 'Notifications';
    }
    if (R.isNil(analyticsEnabled)) {
      return 'Analytics';
    }
  }, []);

  const firebaseLogEvent = useCallback((event, params = {}) => {
    const time = format(new Date(), 'hh:mm');
    const date = format(new Date(), 'dd/MM/yyyy');

    let data = {
      time,
      date,
    };
    if (userData && userData.email) {
      data = {...data, email: userData.email};
    }

    console.log('AnalyticsEvent: ' + event + ' : ' + {...data, ...params});

    analytics()
      .logEvent(event, {...data, ...params})
      .catch((error) => {
        console.log('AnalyticsEventError', error);
      });
  }, []);

  // ** ** ** ** ** Memoize ** ** ** ** **
  const values = React.useMemo(
    () => ({
      userData,
      setUserData,
      preferences,
      getPreferences,
      setPreferences,
      permissionsNeeded,
      timeZones,
      setTimeZones,
      firebaseLogEvent,
      analyticsEvents,
    }),
    [
      userData,
      setUserData,
      preferences,
      getPreferences,
      setPreferences,
      permissionsNeeded,
      timeZones,
      setTimeZones,
      firebaseLogEvent,
      analyticsEvents,
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <UserDataContext.Provider value={values}>
      {props.children}
    </UserDataContext.Provider>
  );
}
