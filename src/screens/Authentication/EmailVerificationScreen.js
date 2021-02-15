/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 16:27:14 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect} from 'react';
import {Alert} from 'react-native';
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
  const {permissionsNeeded} = useUserData();
  const [resendEmail] = useMutation(ResendVerificationEmail);

  useEffect(() => {
    const interval = setInterval(async () => {
      await Auth.signIn(email, password)
        .then(async () => {
          clearInterval(interval);
          const permissionNeeded = await permissionsNeeded();

          if (permissionNeeded) {
            navigation.navigate(permissionNeeded);
          } else {
            navigation.reset({
              index: 1,
              routes: [{name: 'TabContainer'}],
            });
          }
        })
        .catch((error) => {
          console.log('not yet verified', error);
        });
    }, 1000);
  }, []);

  // ** ** ** ** ** STYLES ** ** ** ** **
  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
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
