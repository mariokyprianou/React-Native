/*
 * Created Date: Mon, 9th Nov 2020, 13:30:27 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {FormHook} from 'the-core-ui-module-tdforms';
import useDictionary from '../../hooks/localisation/useDictionary';
import TwoFieldChangeScreenUI from './TwoFieldChangeScreenUI';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Headers/Header';
import Intercom from 'react-native-intercom';

export default function ChangeEmailScreen() {
  // MARK: - Hooks
  const navigation = useNavigation();

  const {dictionary} = useDictionary();
  const {ProfileDict} = dictionary;

  const {cleanErrors, getValues, updateError} = FormHook();

  // MARK: - Local
  const firstValueName = 'changeEmailValue1';
  const secondValueName = 'changeEmailValue2';

  // MARK: - Logic
  const changeEmail = (newEmail) => {
    // TODO: - Logic
    Intercom.updateUser({email: newEmail}); // insert this into the .then of the Auth.updateUserAttributes functions, before navigation
    navigation.navigate('Profile');
  };

  // MARK: - Actions
  const onPressChange = () => {
    const {
      changeEmailValue1: password,
      changeEmailValue2: newEmail,
    } = getValues();
    // TODO: - Verify Values
    changeEmail(newEmail);
  };

  // MARK: - Render
  return (
    <TwoFieldChangeScreenUI
      screenTitle={ProfileDict.ChangeEmailScreenTitle}
      firstFieldLabel={ProfileDict.ChangeEmailLabel1}
      secondFieldLabel={ProfileDict.ChangeEmailLabel2}
      secondFieldType="emailAddress"
      firstFieldName={firstValueName}
      secondFieldName={secondValueName}
      buttonType={'changeEmail'}
      onPressChange={onPressChange}
    />
  );
}
