/*
 * Created Date: Thu, 14th Jan 2021, 16:39:16 pm
 * Author: Christos Demetriou
 * Email: christos.demetiou@thedistance.co.uk
 * Copyright (c) 2021 JM APP DEVELOPMENT LTD
 */

import React, {useState, useMemo, useEffect, useLayoutEffect} from 'react';
import {Auth} from 'aws-amplify';

import {useQuery, useMutation, useLazyQuery} from '@apollo/client';
import fetchPolicy from '../../utils/fetchPolicy';
import {useNetInfo} from '@react-native-community/netinfo';
import UserDataContext from './UserDataContext';
import Preferences from '../../apollo/queries/Preferences';

export default function UserDataProvider(props) {
  const {isConnected, isInternetReachable} = useNetInfo();

  const [userData, setUserData] = useState({});
  const [preferences, setPreferences] = useState({});

  const [getPreferences] = useLazyQuery(Preferences, {
    fetchPolicy: fetchPolicy(isConnected, isInternetReachable),
    onCompleted: (res) => {
      console.log(res);
      const data = res.preferences;
      setPreferences(data);
    },
    onError: (error) => console.log(error),
  });

  // ** ** ** ** ** Memoize ** ** ** ** **
  const values = React.useMemo(
    () => ({
      userData,
      setUserData,
      preferences,
      getPreferences,
      setPreferences,
    }),
    [userData, setUserData, preferences, getPreferences, setPreferences],
  );

  // ** ** ** ** ** Return ** ** ** ** **
  return (
    <UserDataContext.Provider value={values}>
      {props.children}
    </UserDataContext.Provider>
  );
}
