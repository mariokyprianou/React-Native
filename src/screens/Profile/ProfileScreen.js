/*
 * Created Date: Wed, 11th Nov 2020, 11:13:40 am
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {FormHook} from 'the-core-ui-module-tdforms';
import ProfileScreenUI from './ProfileScreenUI';
import {useNavigation} from '@react-navigation/native';

export default function ProfileScreen() {
  // MARK: - Hooks
  const navigation = useNavigation();
  const {cleanErrors, getValues, updateError} = FormHook();

  // MARK: - Local

  // MARK: - Logic

  // MARK: - Actions
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

  const onPressNeedHelp = () => {
    console.log('TODO: - onPressNeedHelp');
  };

  const onPressLogout = () => {
    console.log('TODO: - onPressLogout');

    navigation.navigate('Onboarding');
  };

  const onPressNeedToSignOut = () => {
    console.log('TODO: - onPressNeedToSignOut');
  };

  // MARK: - Render
  return (
    <ProfileScreenUI
      onSaveChange={onSaveChanges}
      onPressNeedHelp={onPressNeedHelp}
      onPressLogout={onPressLogout}
      onPressNeedToSignOut={onPressNeedToSignOut}
    />
  );
}
