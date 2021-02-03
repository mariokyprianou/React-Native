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

  const [getPreferences] = useLazyQuery(Preferences, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      console.log(res, '<-- notifications prefs');
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
    ],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <UserDataContext.Provider value={values}>
      {props.children}
    </UserDataContext.Provider>
  );
}
