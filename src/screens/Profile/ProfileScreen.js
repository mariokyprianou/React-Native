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

export default function ProfileScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {getValues} = FormHook();
  const {firebaseLogEvent, analyticsEvents} = useUserData();

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    view: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const onPressNeedHelp = () => {
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
