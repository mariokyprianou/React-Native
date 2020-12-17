/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 16:27:14 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React from 'react';
import {Platform} from 'react-native';
import useDictionary from '../../hooks/localisation/useDictionary';
import PermissionScreenUI from './PermissionScreenUI';
import {useRoute} from '@react-navigation/core';
import {Auth} from 'aws-amplify';

export default function EmailVerificationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {dictionary} = useDictionary();
  const {AuthDict} = dictionary;
  const {
    params: {email, password},
  } = useRoute();

  // ** ** ** ** ** STYLES ** ** ** ** **
  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function onPressButton() {
    // TO DO - resend verification email mutation
  }

  async function onPressBottomButton() {
    // Check verified - if verified go to home screen/notifications
    await Auth.signIn(email, password)
      .then(() => {
        if (Platform.OS === 'android') {
          navigation.navigate('TabContainer');
        } else {
          navigation.navigate('Notifications');
        }
      })
      .catch((error) => {
        // what to do if not verified??
        console.log('error signing in', error);
      });
  }

  // ** ** ** ** ** RENDER ** ** ** ** **
  return (
    <PermissionScreenUI
      title={AuthDict.VerifyEmailTitle}
      text={AuthDict.VerifyEmail}
      buttonType="resend"
      bottomButtonType="goBackLower"
      onPressButton={onPressButton}
      onPressBottomButton={onPressBottomButton}
    />
  );
}
