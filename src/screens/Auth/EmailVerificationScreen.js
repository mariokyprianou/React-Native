/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 16:27:14 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useRef, useState} from 'react';
import {Platform, AppState, Alert} from 'react-native';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import PermissionScreenUI from './PermissionScreenUI';
import {useRoute} from '@react-navigation/core';
import {Auth} from 'aws-amplify';
import {useMutation} from '@apollo/client';
import ResendVerificationEmail from '../../apollo/mutations/ResendVerificationEmail';

export default function EmailVerificationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {dictionary} = useDictionary();
  const navigation = useNavigation();
  const {AuthDict} = dictionary;
  const {
    params: {email, password, fromLogin},
  } = useRoute();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const [resendEmail] = useMutation(ResendVerificationEmail);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  // ** ** ** ** ** STYLES ** ** ** ** **
  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function handleAppStateChange(nextAppState) {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      await Auth.signIn(email, password)
        .then(() => {
          if (Platform.OS === 'android') {
            navigation.navigate('TabContainer');
          } else {
            navigation.navigate('Notifications');
          }
        })
        .catch((error) => {
          console.log('error signing in', error);
          Alert.alert(
            'You are not yet logged in - please verify your email address',
          );
        });
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  }

  async function onPressButton() {
    await resendEmail({variables: {email}})
      .then(() => {
        Alert.alert('Verification link sent');
      })
      .catch((err) => console.log(err));
  }

  async function onPressBottomButton() {
    Alert.alert('You will be logged out - do you wish to continue?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => {
          if (fromLogin === true) {
            navigation.goBack();
          } else {
            navigation.navigate('MeetYourIcons', {switchProgramme: false});
          }
        },
      },
    ]);
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
