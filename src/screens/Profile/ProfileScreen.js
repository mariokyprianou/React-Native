/*
 * Created Date: Wed, 11th Nov 2020, 11:13:40 am
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {FormHook} from 'the-core-ui-module-tdforms';
import ProfileScreenUI from './ProfileScreenUI';
import {useNavigation} from '@react-navigation/native';
import Intercom from 'react-native-intercom';
import useUserData from '../../hooks/data/useUserData';
import displayAlert from '../../utils/DisplayAlert';
import {useNetInfo} from '@react-native-community/netinfo';
import useDictionary from '../../hooks/localisation/useDictionary';

export default function ProfileScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {isConnected, isInternetReachable} = useNetInfo();
  const navigation = useNavigation();
  const {getValues} = FormHook();
  const {firebaseLogEvent, analyticsEvents} = useUserData();
  const {dictionary} = useDictionary();
  const {OfflineMessage} = dictionary;

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    view: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const onPressNeedHelp = () => {
    if (!isConnected) {
      displayAlert({text: OfflineMessage});
    return;
    }

    firebaseLogEvent(analyticsEvents.accessedIntercom, {});
    Intercom.displayMessenger();
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <>
      <ProfileScreenUI onPressNeedHelp={onPressNeedHelp} />
    </>
  );
}
