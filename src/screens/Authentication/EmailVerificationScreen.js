/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 16:27:14 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useRef, useState} from 'react';
import {AppState, Alert} from 'react-native';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import PermissionScreenUI from './PermissionScreenUI';
import {useRoute} from '@react-navigation/core';
import {Auth} from 'aws-amplify';
import {useMutation} from '@apollo/client';
import ResendVerificationEmail from '../../apollo/mutations/ResendVerificationEmail';
import useUserData from '../../hooks/data/useUserData';

export default function EmailVerificationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {dictionary} = useDictionary();
  const navigation = useNavigation();
  const {AuthDict} = dictionary;
  const {
    params: {email, password, fromLogin},
  } = useRoute();
  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const {permissionsNeeded} = useUserData();

  const [resendEmail] = useMutation(ResendVerificationEmail);

  // useEffect(() => {
  //   AppState.addEventListener('change', handleAppStateChange);

  //   return () => {
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);

  useEffect(() => {
    setInterval(async () => {
      await Auth.signIn(email, password)
        .then(async (res) => {
          const permissionNeeded = await permissionsNeeded();

          if (permissionNeeded) {
            navigation.navigate(permissionNeeded);
          } else {
            navigation.navigate('TabContainer');
          }
        })
        .catch((error) => {
          console.log('not yet verified', error);
        });
    }, 1000);
  }, []);

  // ** ** ** ** ** STYLES ** ** ** ** **
  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  // async function handleAppStateChange(nextAppState) {
  //   if (
  //     appState.current.match(/inactive|background/) &&
  //     nextAppState === 'active'
  //   ) {
  //     await Auth.signIn(email, password)
  //       .then(async () => {
  //         const permissionNeeded = await permissionsNeeded();

  //         if (permissionNeeded) {
  //           navigation.navigate(permissionNeeded);
  //         } else {
  //           navigation.navigate('TabContainer');
  //         }
  //       })
  //       .catch((error) => {
  //         console.log('error signing in', error);
  //         Alert.alert(AuthDict.NotYetLoggedIn);
  //       });
  //   }

  //   appState.current = nextAppState;
  //   setAppStateVisible(appState.current);
  // }

  async function onPressButton() {
    await resendEmail({variables: {email}})
      .then(() => {
        Alert.alert(AuthDict.VerificationLinkSent);
      })
      .catch((err) => console.log(err));
  }

  async function onPressBottomButton() {
    Alert.alert(AuthDict.YouWillBeLoggedOut, '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          if (fromLogin === true) {
            navigation.goBack();
          } else {
            const permissionNeeded = await permissionsNeeded();

            if (permissionNeeded) {
              navigation.navigate(permissionNeeded);
            } else {
              navigation.navigate('MeetYourIcons', {switchProgramme: false});
            }
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
