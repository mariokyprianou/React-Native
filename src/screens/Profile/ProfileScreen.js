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

export default function ProfileScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const navigation = useNavigation();
  const {getValues} = FormHook();

  const onSaveChanges = () => {
    const {
      profile_firstName,
      profile_lastName,
      profile_email,
      profile_gender,
      profile_dateOfBirth,
      profile_country,
      profile_region,
    } = getValues();
    // TODO: - Verify Values
  };

  // ** ** ** ** ** STYLES ** ** ** ** **
  const styles = {
    view: {
      justifyContent: 'flex-end',
      margin: 0,
    },
  };

  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const onPressNeedHelp = () => {
    Intercom.displayMessenger();
  };

  const onPressLogout = () => {
    console.log('TODO: - onPressLogout');

    navigation.navigate('Onboarding');
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <>
      <ProfileScreenUI
        onSaveChange={onSaveChanges}
        onPressNeedHelp={onPressNeedHelp}
        onPressLogout={onPressLogout}
      />
    </>
  );
}
