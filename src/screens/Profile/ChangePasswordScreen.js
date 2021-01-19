/*
 * Created Date: Mon, 9th Nov 2020, 13:48:59 pm
 * Author: Kristyna Fojtikova
 * Email: kristyna.fojtikova@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {FormHook} from 'the-core-ui-module-tdforms';
import useDictionary from '../../hooks/localisation/useDictionary';
import TwoFieldChangeScreenUI from './TwoFieldChangeScreenUI';
import {Auth} from 'aws-amplify';
import {passwordRegex} from '../../utils/regex';
import {useNavigation} from '@react-navigation/native';

export default function ChangePasswordScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;
  const {ProfileDict} = dictionary;
  const {getValues, cleanValues, updateError} = FormHook();
  const navigation = useNavigation();

  // ** ** ** ** ** STYLES ** ** ** ** **
  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  const onPressChange = () => {
    const {
      changePasswordValue1: oldPassword,
      changePasswordValue2: newPassword,
    } = getValues();

    if (!newPassword || !passwordRegex.test(newPassword)) {
      updateError({
        name: 'changePasswordValue2',
        value: AuthDict.ChangePasswordFail,
      });
      return;
    }

    Auth.currentAuthenticatedUser()
      .then((user) => {
        return Auth.changePassword(user, oldPassword, newPassword);
      })
      .then((data) => {
        console.log(data);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        if (
          err.code === 'InvalidParameterException' ||
          err.code === 'NotAuthorizedException'
        ) {
          updateError({
            name: 'changePasswordValue2',
            value: AuthDict.ChangePasswordFail,
          });
        }
      });

    cleanValues();
  };

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <TwoFieldChangeScreenUI
      screenTitle={ProfileDict.ChangePasswordScreenTitle}
      firstFieldLabel={ProfileDict.ChangePasswordLabel1}
      secondFieldLabel={ProfileDict.ChangePasswordLabel2}
      firstFieldName={'changePasswordValue1'}
      secondFieldName={'changePasswordValue2'}
      buttonType={'changePassword'}
      onPressChange={onPressChange}
    />
  );
}
