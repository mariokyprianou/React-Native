/*
 * Jira Ticket:
 * Created Date: Mon, 16th Nov 2020, 16:27:14 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2020 The Distance
 */

import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import useDictionary from '../../hooks/localisation/useDictionary';
import {useNavigation} from '@react-navigation/native';
import PermissionScreenUI from './PermissionScreenUI';
import {useRoute} from '@react-navigation/core';
import {Auth} from 'aws-amplify';
import {useMutation} from '@apollo/client';
import ResendVerificationEmail from '../../apollo/mutations/ResendVerificationEmail';
import useUserData from '../../hooks/data/useUserData';
import AsyncStorage from '@react-native-community/async-storage';

export default function EmailVerificationScreen() {
  // ** ** ** ** ** SETUP ** ** ** ** **
  const {dictionary} = useDictionary();
  const navigation = useNavigation();
  const {AuthDict} = dictionary;
  const {
    params: {email, password, fromLogin},
  } = useRoute();
  const {permissionsNeeded, updateDefaultPreferences} = useUserData();
  const [resendEmail] = useMutation(ResendVerificationEmail);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    let interval = setInterval(async () => {
      await Auth.signIn(email, password)
        .then(async () => {
          clearInterval(interval);

          // New user needs to set these agains
          await AsyncStorage.setItem(
            '@DOWNLOAD_ENABLED',
            JSON.stringify(false),
          );
          await AsyncStorage.removeItem('@ANALYTICS_ASKED');
          await AsyncStorage.removeItem('@NOTIFICATIONS_ASKED');

          await updateDefaultPreferences();
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

    return () => {
      clearInterval(interval);
      interval = null;
    };
  }, []);

  useEffect(() => {
    if (buttonDisabled) {
      let interval = setInterval(async () => {
        setButtonDisabled(false);
      }, 1000 * 60 * 5); // 5 mins re-enable

      return () => {
        clearInterval(interval);
        interval = null;
      };
    }
  }, [buttonDisabled]);

  // ** ** ** ** ** STYLES ** ** ** ** **
  // ** ** ** ** ** FUNCTIONS ** ** ** ** **
  async function onPressButton() {
    await resendEmail({variables: {email}})
      .then(() => {
        setButtonDisabled(true);
        Alert.alert(AuthDict.VerificationLinkSent);
      })
      .catch((err) => console.log('resendEmail', err));
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
      closeModal={false}
      image={require('../../../assets/images/verifyEmailImage.png')}
      buttonType="resend"
      disabled={buttonDisabled}
      buttonVariant="gradient"
      bottomButtonType="verifyLater"
      onPressButton={onPressButton}
      onPressBottomButton={onPressBottomButton}
    />
  );
}
